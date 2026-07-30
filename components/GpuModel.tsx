"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { type MotionValue, useMotionValueEvent } from "framer-motion";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { usePrefersReducedMotion, useIsMobile, useTabVisible } from "@/lib/hooks";

const MODEL_URL = "/models/geforce_rtx_4090_founders_edition.glb";

// --- TEMPORARY DIAGNOSTIC: remove once the small-model bug is fixed ---
// Live scene/camera values written from inside the Canvas; read by the
// <DiagOverlay> DOM element rendered outside the Canvas.
type Diag = {
  initSceneScale: number | null;
  initMaxDim: number | null;
  initGroupScale: number | null;
  initCamFov: number | null;
  initCamZ: number | null;
  initCanvasW: number | null;
  initCanvasH: number | null;
  liveSceneScale: number;
  liveGroupScale: number;
  liveCamFov: number;
  liveCamZ: number;
  liveCanvasW: number;
  liveCanvasH: number;
  mountCount: number;
};
const diag: Diag = {
  initSceneScale: null,
  initMaxDim: null,
  initGroupScale: null,
  initCamFov: null,
  initCamZ: null,
  initCanvasW: null,
  initCanvasH: null,
  liveSceneScale: 0,
  liveGroupScale: 0,
  liveCamFov: 0,
  liveCamZ: 0,
  liveCanvasW: 0,
  liveCanvasH: 0,
  mountCount: 0,
};
let mountCounter = 0;
// Expose to DevTools console for easy inspection.
if (typeof window !== "undefined") {
  (window as unknown as { __pcsDiag?: Diag }).__pcsDiag = diag;
}
// ------------------------------------------------------------------

/** TEMPORARY diagnostic: writes the live + first-frame camera/canvas
 *  values to the shared diag object so the DOM-side <DiagOverlay> can
 *  display them. Rendered inside the Canvas. */
function DiagWriter() {
  const { camera, size } = useThree();
  useFrame(() => {
    const cam = camera as THREE.PerspectiveCamera;
    if (diag.initCamFov === null) {
      diag.initCamFov = cam.fov;
      diag.initCamZ = camera.position.z;
      diag.initCanvasW = size.width;
      diag.initCanvasH = size.height;
    }
    diag.liveCamFov = cam.fov;
    diag.liveCamZ = camera.position.z;
    diag.liveCanvasW = size.width;
    diag.liveCanvasH = size.height;
  });
  return null;
}

// ---------------------------------------------------------------------
// SCROLL CHOREOGRAPHY — this is the one spot that controls how the GPU
// turns, drifts, and dollies as the page scrolls. One entry per
// landing-page section stop: [hero, mission, offer, github, join].
// SCROLL_STOPS is the 0→1 scroll progress where each pose applies; the
// other arrays are the pose values at that same index. All of it is read
// through interpolateStops() below, once per rendered frame.
// ---------------------------------------------------------------------
const SCROLL_STOPS = [0, 1 / 4, 2 / 4, 3 / 4, 1];
/** rotation around the vertical axis (turntable spin) */
const POSE_Y = [-1, 0, -0.85, 1.35, 1.9];
/** rotation around the depth axis (barrel roll / tilt) */
const POSE_Z = [1, 1.3, 0.45, 0.12, 0.18];
/** rotation around the horizontal axis (pitch) */
const POSE_X = [-1, 1.3, -0.18, 0.24, 0.1];
// Lateral drift (world units) — this is what actually dodges the text
// columns; it's signed to match whichever side is empty on the *page* at
// that section (world +X renders on the right of the screen, world -X on
// the left, since the camera sits on-axis at x=0 looking at the origin
// with no roll). Column sides live in the section components:
//   [0] hero    — copy in the LEFT column  → push GPU RIGHT (+)
//   [1] mission — copy in the RIGHT column → push GPU LEFT  (-)
//   [2] offer   — copy in the LEFT column  → push GPU RIGHT (+)
//   [3] github  — copy centered/narrow     → small nudge only
//   [4] join    — copy centered, GPU faded → small nudge only
// These are tuned against a ~16:9 desktop window and then scaled per
// viewport at render time — see `lateralScale` in GpuCard below.
const POSE_TX = [58, -68, 74, 18, -10];
/** vertical drift (world units) */
const POSE_TY = [-4, 8, -10, 5, -3];
/** depth drift (world units) — moves the card itself closer/farther,
 *  independent of the camera dolly below, for real X+Y+Z movement. */
const POSE_TZ = [0, -22, 18, -14, 10];
/** camera distance — SMALLER = zoomed in, LARGER = zoomed out. Stop 0
 *  (hero) is the tight framing; it pulls back further at each later stop
 *  so the lateral drift above still reads as a full, uncropped card. */
const POSE_ZOOM = [300, 365, 415, 445, 465];
/** uniform scale multiplier applied directly to the card's own group, on
 *  top of the camera dolly above — an extra, independent lever on the
 *  card's apparent size at each stop. Rotation (POSE_X/Y/Z) is never
 *  touched by this channel. */
const POSE_SCALE = [1.08, 1, 0.94, 0.88, 0.85];

/** Canvas height the camera FOV / lighting rig were authored against.
 *  Everything below this line reacts to *page/viewport* scale only — the
 *  GPU card's own pose (rotation, position, POSE_SCALE) is untouched by it. */
const BASE_VIEWPORT_HEIGHT = 900;
const BASE_FOV = 32;

/** The aspect ratio POSE_TX/POSE_TZ were tuned against. Wider windows show
 *  more world-width for the same vertical FOV, so lateral drift needs to
 *  scale up to still clear the same fraction of the screen; narrower/taller
 *  windows scale it down so the card is never pushed off-frame. */
const BASE_ASPECT = 16 / 9;

/**
 * Piecewise-linear interpolation across SCROLL_STOPS/a pose array — shared
 * by every pose channel. Called directly inside useFrame with the current
 * scroll value instead of going through a `useTransform` + a
 * `useMotionValueEvent` subscription per channel: that would be 6 derived
 * MotionValues re-evaluating on every raw scroll event (which can fire far
 * more often than the display refresh rate). Reading `.get()` once per
 * *rendered* frame and interpolating inline is strictly less work and one
 * fewer moving part per pose channel.
 */
function interpolateStops(t: number, stops: number[], values: number[]) {
  if (t <= stops[0]) return values[0];
  const last = stops.length - 1;
  if (t >= stops[last]) return values[last];
  for (let i = 0; i < last; i++) {
    if (t <= stops[i + 1]) {
      const localT = (t - stops[i]) / (stops[i + 1] - stops[i]);
      return THREE.MathUtils.lerp(values[i], values[i + 1], localT);
    }
  }
  return values[last];
}

/**
 * Generates studio reflections locally (no network HDR needed) so the
 * card's metals and plastics read as a premium product render.
 */
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    return () => {
      scene.environment = null;
      envMap.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/**
 * The one scroll subscription the whole scene needs. In "demand" frameloop
 * mode (reduced motion or a hidden tab) nothing re-renders on its own, so
 * this nudges a single frame whenever scroll actually changes — both
 * GpuCard and CameraRig read the live scroll value during that frame.
 */
function ScrollInvalidator({
  paused,
  scrollProgress,
}: {
  paused: boolean;
  scrollProgress: MotionValue<number>;
}) {
  const { invalidate } = useThree();
  useMotionValueEvent(scrollProgress, "change", () => {
    if (paused) invalidate();
  });
  return null;
}

/** Dollies the camera in/out on scroll — the "zoom in at hero, zoom out
 *  as sections pass" move, decoupled from the card's own rotation/drift. */
function CameraRig({
  paused,
  mobile,
  scrollProgress,
}: {
  paused: boolean;
  mobile: boolean;
  scrollProgress: MotionValue<number>;
}) {
  const { camera } = useThree();

  // Snap the camera to the scroll-dictated distance before the first paint.
  // Without this, a remount (e.g. navigating back to "/") starts the dolly
  // from the Canvas's hardcoded initial camera z (POSE_ZOOM[0]) regardless
  // of actual scroll position, and visibly dollies into place over ~1s.
  useLayoutEffect(() => {
    const targetZ =
      interpolateStops(scrollProgress.get(), SCROLL_STOPS, POSE_ZOOM) *
      (mobile ? 1.2 : 1);
    camera.position.z = targetZ;
  }, [camera, mobile, scrollProgress]);

  useFrame(() => {
    // Mobile stacks content instead of dodging left/right, so it doesn't
    // need the wide lateral drift — pull back a bit further instead, to
    // keep the card from dominating a small screen.
    const targetZ =
      interpolateStops(scrollProgress.get(), SCROLL_STOPS, POSE_ZOOM) *
      (mobile ? 1.2 : 1);

    if (paused) {
      camera.position.z = targetZ;
      return;
    }
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.045);
  });

  return null;
}

/** Widens the camera's FOV as the viewport (page) shrinks, so the framing
 *  stays readable at any window/page scale — purely a viewport response,
 *  independent of the scroll-driven dolly above and of the card's own pose. */
function ResponsiveCameraRig() {
  const { camera, size } = useThree();

  // useLayoutEffect (not useEffect) so the FOV is corrected BEFORE the
  // first paint. Otherwise the model renders one frame at the Canvas's
  // hardcoded initial FOV (32) before the responsive adjustment runs,
  // which can briefly read as the wrong size on first mount.
  useLayoutEffect(() => {
    const rigScale = THREE.MathUtils.clamp(
      size.height / BASE_VIEWPORT_HEIGHT,
      0.55,
      1.25
    );
    const perspective = camera as THREE.PerspectiveCamera;
    perspective.fov = THREE.MathUtils.clamp(BASE_FOV / rigScale, 24, 44);
    perspective.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

/** Studio lighting rig, sized to the current viewport. Directional lights
 *  only care about direction (position → origin), not literal distance, so
 *  "scaling" them is expressed as intensity here — brighter on a small/
 *  shrunk page canvas, settling back down on a large one — rather than a
 *  position change that would be a visual no-op. */
function LightingRig() {
  const { size } = useThree();
  const intensityScale = THREE.MathUtils.clamp(
    BASE_VIEWPORT_HEIGHT / size.height,
    0.85,
    1.35
  );

  return (
    <>
      <directionalLight
        position={[-2.2, 6, -3.5]}
        intensity={3.4 * intensityScale}
        color="#ffffff"
      />
      <directionalLight
        position={[6, -0.5, 2.5]}
        intensity={1.8 * intensityScale}
        color="#ffffff"
      />
      <directionalLight
        position={[1, 1, 6]}
        intensity={0.6 * intensityScale}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, -2, 2]}
        intensity={0.35 * intensityScale}
        color="#f2f4f5"
      />
      <ambientLight intensity={0.06} />
    </>
  );
}

/** Loads the GLB, normalizes its scale/centering, and turns to face the
 *  scroll-driven pose. */
function GpuCard({
  paused,
  mobile,
  scrollProgress,
}: {
  paused: boolean;
  mobile: boolean;
  scrollProgress: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, scene);
  const { size } = useThree();

  // The GLB's built-in clip targets only Fan_Back and Fan_Front, preserving
  // the card and fan transforms while rotating each fan around its authored
  // local axis.
  useEffect(() => {
    const fanAction = actions["Takeoff Mode"];
    if (!fanAction || paused) return;
    fanAction.timeScale = 0.8;
    fanAction.reset().play();
    return () => {
      fanAction.stop();
    };
  }, [actions, paused]);

  // Fit any model into a ~90 unit frame, center it, and punch up its
  // materials — a tight camera on stock envMapIntensity reads flat, so we
  // push reflectivity and cut roughness for a glossier, show-off finish.
  // (90 units, not the original ~6, because the camera now sits ~300 units
  // back on a telephoto lens — see the Canvas camera prop below.)
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 90 / maxDim;
    scene.scale.setScalar(scale);
    // --- TEMP DIAG: capture the values useMemo measures + computes ---
    diag.initMaxDim = (diag.initMaxDim === null) ? maxDim : diag.initMaxDim;
    diag.initSceneScale = (diag.initSceneScale === null) ? scale : diag.initSceneScale;
    diag.liveSceneScale = scale;
    // ---------------------------------------------------------------
    const center = new THREE.Box3()
      .setFromObject(scene)
      .getCenter(new THREE.Vector3());
    scene.position.sub(center);

    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const mat of materials) {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.envMapIntensity = 2.4;
          mat.roughness = Math.max(0.12, mat.roughness * 0.55);
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  // Snap the card to the scroll-dictated pose before the first paint.
  // Without this, the model renders one frame at its hardcoded initial
  // pose (scale ~1) and then visibly lerps up to the real pose — most
  // noticeably as the card growing from a small idle scale up to its
  // real size.
  useLayoutEffect(() => {
    if (!group.current) return;
    const t = scrollProgress.get();
    const aspect = size.width / Math.max(size.height, 1);
    const lateralScale = mobile
      ? 0.18
      : THREE.MathUtils.clamp(aspect / BASE_ASPECT, 0.6, 1.45);

    group.current.rotation.set(
      interpolateStops(t, SCROLL_STOPS, POSE_X),
      interpolateStops(t, SCROLL_STOPS, POSE_Y),
      interpolateStops(t, SCROLL_STOPS, POSE_Z)
    );
    group.current.position.set(
      interpolateStops(t, SCROLL_STOPS, POSE_TX) * lateralScale,
      interpolateStops(t, SCROLL_STOPS, POSE_TY),
      interpolateStops(t, SCROLL_STOPS, POSE_TZ) * lateralScale
    );
    group.current.scale.setScalar(
      interpolateStops(t, SCROLL_STOPS, POSE_SCALE)
    );
  }, [mobile, scrollProgress, size]);

  useFrame((state) => {
    if (!group.current) return;
    const t = scrollProgress.get();

    const aspect = size.width / Math.max(size.height, 1);
    // Mobile gets only a sliver of the lateral/depth drift (the layout
    // stacks vertically there, so there's no side to dodge toward);
    // desktop scales the drift with how much extra width the window has
    // relative to the ~16:9 baseline it was tuned against.
    const lateralScale = mobile
      ? 0.18
      : THREE.MathUtils.clamp(aspect / BASE_ASPECT, 0.6, 1.45);

    const targetY = interpolateStops(t, SCROLL_STOPS, POSE_Y);
    const targetRotZ = interpolateStops(t, SCROLL_STOPS, POSE_Z);
    const targetRotX = interpolateStops(t, SCROLL_STOPS, POSE_X);
    const targetTX = interpolateStops(t, SCROLL_STOPS, POSE_TX) * lateralScale;
    const targetTY = interpolateStops(t, SCROLL_STOPS, POSE_TY);
    const targetTZ = interpolateStops(t, SCROLL_STOPS, POSE_TZ) * lateralScale;
    const targetScale = interpolateStops(t, SCROLL_STOPS, POSE_SCALE);

    if (paused) {
      // reduced-motion / hidden tab: snap straight to the scroll-dictated
      // pose instead of lerping.
      group.current.rotation.set(targetRotX, targetY, targetRotZ);
      group.current.position.set(targetTX, targetTY, targetTZ);
      group.current.scale.setScalar(targetScale);
      return;
    }

    const clock = state.clock.elapsedTime;
    // Two mismatched sine frequencies (a Lissajous-style wobble) instead of
    // a single sway, so the idle motion never looks like it's just looping.
    const swayY = Math.sin(clock * 0.14) * 0.05 + Math.sin(clock * 0.37 + 1.3) * 0.02;
    const swayX = Math.cos(clock * 0.11) * 0.018;

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY + swayY, 0.055);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRotZ, 0.055);
    let pitch = targetRotX + swayX;
    if (!mobile) pitch += state.pointer.y * -0.04;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pitch, 0.055);

    let tx = targetTX;
    if (!mobile) tx += state.pointer.x * 4;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, tx, 0.045);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetTY, 0.045);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetTZ, 0.045);
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.045)
    );

    // --- TEMP DIAG: capture live group scale + first-frame snapshot ---
    diag.liveGroupScale = group.current.scale.x;
    if (diag.initGroupScale === null && diag.mountCount > 0) {
      // only set after mount effect has run (see useEffect below)
    }
    // --------------------------------------------------------------
  });

  // --- TEMP DIAG: increment a mount counter on every GpuCard mount ---
  useEffect(() => {
    diag.mountCount = ++mountCounter;
    // Capture first-frame group scale on the next paint — read here from
    // the ref after the layout effect has snapped it below.
    if (group.current && diag.initGroupScale === null) {
      diag.initGroupScale = group.current.scale.x;
    }
  }, []);
  // ------------------------------------------------------------------

  return (
    <group
      ref={group}
      rotation={[POSE_X[0], POSE_Y[0], POSE_Z[0]]}
      position={[POSE_TX[0], POSE_TY[0], POSE_TZ[0]]}
      scale={[POSE_SCALE[0], POSE_SCALE[0], POSE_SCALE[0]]}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function GpuModel({
  className,
  scrollProgress,
}: {
  className?: string;
  /** 0→1 document scroll progress; drives the card's turntable pose */
  scrollProgress: MotionValue<number>;
}) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const tabVisible = useTabVisible();
  const paused = reduced || !tabVisible;

  return (
    <div className={className}>
      <Canvas
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ position: [0, 0.3, POSE_ZOOM[0]], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={paused ? "demand" : "always"}
      >
        <StudioEnvironment />
        <ScrollInvalidator paused={paused} scrollProgress={scrollProgress} />
        <CameraRig paused={paused} mobile={mobile} scrollProgress={scrollProgress} />
        <ResponsiveCameraRig />
        {/* clean, neutral studio lighting — no color cast, so the card
            reads crisp and true-to-metal instead of tinted; sized to the
            current viewport by LightingRig */}
        <LightingRig />

        <Suspense fallback={null}>
          <GpuCard paused={paused} mobile={mobile} scrollProgress={scrollProgress} />
        </Suspense>

        {/* TEMP DIAG: writes camera/canvas values every frame */}
        <DiagWriter />
      </Canvas>
      {/* TEMP DIAG: visible overlay showing live + first-frame values */}
      <DiagOverlay />
    </div>
  );
}

useGLTF.preload(MODEL_URL);

/** TEMPORARY diagnostic: DOM-side overlay that reads the shared diag
 *  object and renders the values as fixed-position text so we can see
 *  exactly what's wrong on first mount vs after navigation.  Remove
 *  once the root cause is fixed. */
function DiagOverlay() {
  const [, setTick] = useState(0);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setTick((t) => (t + 1) % 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const d = diag;
  const fmt = (n: number | null) => (n === null ? "null" : n.toFixed(2));
  return (
    <div
      style={{
        position: "fixed",
        top: 70,
        right: 12,
        zIndex: 95,
        background: "rgba(0,0,0,0.85)",
        color: "#10b981",
        font: "11px/1.45 ui-monospace, monospace",
        padding: "8px 10px",
        borderRadius: "6px",
        border: "1px solid #10b981",
        minWidth: "230px",
        pointerEvents: "none",
        whiteSpace: "pre",
      }}
    >
      <div style={{ color: "#f59e0b", marginBottom: 4 }}>
        GPU DIAG (mount #{d.mountCount})
      </div>
      <div style={{ textDecoration: "underline" }}>first frame</div>
      {`sceneScale: ${fmt(d.initSceneScale)}`}
      {`\nmaxDim:     ${fmt(d.initMaxDim)}`}
      {`\ngroupScale: ${fmt(d.initGroupScale)}`}
      {`\ncamFov:     ${fmt(d.initCamFov)}`}
      {`\ncamZ:       ${fmt(d.initCamZ)}`}
      {`\ncanvas:     ${fmt(d.initCanvasW)}x${fmt(d.initCanvasH)}`}
      <div style={{ textDecoration: "underline", marginTop: 6 }}>
        live
      </div>
      {`sceneScale: ${fmt(d.liveSceneScale)}`}
      {`\ngroupScale: ${fmt(d.liveGroupScale)}`}
      {`\ncamFov:     ${fmt(d.liveCamFov)}`}
      {`\ncamZ:       ${fmt(d.liveCamZ)}`}
      {`\ncanvas:     ${fmt(d.liveCanvasW)}x${fmt(d.liveCanvasH)}`}
    </div>
  );
}
