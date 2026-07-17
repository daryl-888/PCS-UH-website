"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { type MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { usePrefersReducedMotion, useIsMobile, useTabVisible } from "@/lib/hooks";

const MODEL_URL = "/models/geforce_rtx_4090_founders_edition.glb";
const PCS_GREEN = new THREE.Color("#00E676");

// One pose per landing-page section (hero, mission, offer, github, join) —
// the card starts lying horizontal in the hero and turns to a new angle as
// each section scrolls into view, so the render reads as one continuous
// piece choreographed to the whole (now 5-section) page.
const SCROLL_STOPS = [0, 1 / 4, 2 / 4, 3 / 4, 1];
const POSE_Y = [-0.15, 0.6, -0.55, 1.1, 1.6];
const POSE_Z = [1.5, 0.85, 0.3, 0.05, 0.1];
const POSE_X = [0.05, 0.12, -0.05, 0.14, 0.08];

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
  const { invalidate } = useThree();

  // Fit any model into a ~90 unit frame, center it, and punch up its
  // materials — a tight camera on stock envMapIntensity reads flat, so we
  // push reflectivity and cut roughness for a glossier, show-off finish.
  // (90 units, not the original ~6, because the camera now sits ~500 units
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

  const rotY = useTransform(scrollProgress, SCROLL_STOPS, POSE_Y);
  const rotZ = useTransform(scrollProgress, SCROLL_STOPS, POSE_Z);
  const rotX = useTransform(scrollProgress, SCROLL_STOPS, POSE_X);
  const target = useRef({ y: POSE_Y[0], z: POSE_Z[0], x: POSE_X[0] });

  useMotionValueEvent(rotY, "change", (v) => {
    target.current.y = v;
    if (paused) invalidate();
  });
  useMotionValueEvent(rotZ, "change", (v) => {
    target.current.z = v;
    if (paused) invalidate();
  });
  useMotionValueEvent(rotX, "change", (v) => {
    target.current.x = v;
    if (paused) invalidate();
  });

  useFrame((state) => {
    if (!group.current) return;
    if (paused) {
      // reduced-motion: snap straight to the scroll-dictated pose, no idle drift
      group.current.rotation.set(target.current.x, target.current.y, target.current.z);
      return;
    }
    const t = state.clock.elapsedTime;
    const sway = Math.sin(t * 0.14) * 0.05;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, target.current.y + sway, 0.055);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, target.current.z, 0.055);
    let targetX = target.current.x;
    if (!mobile) targetX += state.pointer.y * -0.04;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.055);
  });

  return (
    <group ref={group} rotation={[POSE_X[0], POSE_Y[0], POSE_Z[0]]}>
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

  return (
    <div className={className}>
      <Canvas
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ position: [0, 0.3, 300], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced || !tabVisible ? "demand" : "always"}
      >
        <StudioEnvironment />
        {/* hard grazing rim from upper-back — traces a bright specular
            streak along the top edge and fan ring, like the reference shot */}
        <directionalLight position={[-2.2, 6, -3.5]} intensity={3.4} color="#ffffff" />
        {/* low side glint raking across the brushed shroud for a hot highlight */}
        <directionalLight position={[6, -0.5, 2.5]} intensity={1.8} color="#ffffff" />
        {/* soft front fill so the shadow side doesn't go fully black */}
        <directionalLight position={[1, 1, 6]} intensity={0.55} color="#dff5ea" />
        {/* faint brand-green kiss of light in the shadow side — directional
            (not point) so it stays direction-only regardless of the model's
            world scale */}
        <directionalLight position={[-5, -2, 2]} intensity={0.45} color={PCS_GREEN} />
        <ambientLight intensity={0.04} />

        <Suspense fallback={null}>
          <Float
            speed={reduced ? 0 : 1}
            rotationIntensity={reduced ? 0 : 0.05}
            floatIntensity={reduced ? 0 : 0.07}
          >
            <GpuCard paused={reduced} mobile={mobile} scrollProgress={scrollProgress} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
