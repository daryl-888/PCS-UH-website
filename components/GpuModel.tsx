"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { type MotionValue, useMotionValueEvent } from "framer-motion";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { usePrefersReducedMotion, useIsMobile, useTabVisible } from "@/lib/hooks";

const MODEL_URL = "/models/geforce_rtx_4090_founders_edition.glb";

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
const POSE_Y = [-0.15, 0.75, -0.85, 1.35, 1.9];
/** rotation around the depth axis (barrel roll / tilt) */
const POSE_Z = [1.5, 1.05, 0.45, 0.12, 0.18];
/** rotation around the horizontal axis (pitch) */
const POSE_X = [0.05, 0.22, -0.18, 0.24, 0.1];
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
  const { scene } = useGLTF(MODEL_URL);
  const { size } = useThree();

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

    if (paused) {
      // reduced-motion / hidden tab: snap straight to the scroll-dictated
      // pose, no idle drift
      group.current.rotation.set(targetRotX, targetY, targetRotZ);
      group.current.position.set(targetTX, targetTY, targetTZ);
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
  });

  return (
    <group
      ref={group}
      rotation={[POSE_X[0], POSE_Y[0], POSE_Z[0]]}
      position={[POSE_TX[0], POSE_TY[0], POSE_TZ[0]]}
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
        {/* clean, neutral studio lighting — no color cast, so the card
            reads crisp and true-to-metal instead of tinted */}
        <directionalLight position={[-2.2, 6, -3.5]} intensity={3.4} color="#ffffff" />
        <directionalLight position={[6, -0.5, 2.5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[1, 1, 6]} intensity={0.6} color="#ffffff" />
        <directionalLight position={[-5, -2, 2]} intensity={0.35} color="#f2f4f5" />
        <ambientLight intensity={0.06} />

        <Suspense fallback={null}>
          <Float
            speed={reduced ? 0 : 1}
            rotationIntensity={reduced ? 0 : 0.05}
            floatIntensity={reduced ? 0 : 0.07}
          >
            <GpuCard paused={paused} mobile={mobile} scrollProgress={scrollProgress} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
