"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";

const MODEL_URL = "/models/geforce_rtx_4090_founders_edition.glb";
const PCS_GREEN = new THREE.Color("#00E676");

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

/** Loads the GLB, normalizes its scale/centering, and idles it elegantly. */
function GpuCard({ paused, mobile }: { paused: boolean; mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  // Fit any model into a ~4.2 unit frame and center it on origin.
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 4.2 / maxDim;
    scene.scale.setScalar(scale);
    const center = new THREE.Box3()
      .setFromObject(scene)
      .getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  useFrame((state) => {
    if (paused || !group.current) return;
    const t = state.clock.elapsedTime;
    // gentle sculptural sway rather than a full spin — reads as a
    // deliberate product shot, not a spinning trophy
    const sway = Math.sin(t * 0.16) * 0.22;
    group.current.rotation.y = -0.85 + sway;
    // cursor parallax — the card leans gently toward the pointer
    if (!mobile) {
      const targetX = 0.05 + state.pointer.y * -0.06;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetX,
        0.04
      );
    }
  });

  return (
    <group ref={group} rotation={[0.05, -0.85, 0.16]}>
      <primitive object={scene} />
    </group>
  );
}

export default function GpuModel({
  className,
  offsetX = 0,
}: {
  className?: string;
  /** shifts the card along X — lets callers bleed it toward one edge for background use */
  offsetX?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  return (
    <div className={className}>
      <Canvas
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ position: [0, 0.3, 500], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <StudioEnvironment />
        {/* bright rim tracing the card edges, like a softbox behind-above */}
        <directionalLight position={[-3, 5, -4]} intensity={2.2} color="#ffffff" />
        {/* soft key light from front-right */}
        <directionalLight position={[4, 2, 6]} intensity={0.9} color="#ffffff" />
        {/* faint brand-green kiss of light in the shadow side */}
        <pointLight position={[-5, -2, 2]} intensity={9} color={PCS_GREEN} />
        <ambientLight intensity={0.06} />

        <Suspense fallback={null}>
          <group position={[offsetX, 0, 0]}>
            <Float
              speed={reduced ? 0 : 1}
              rotationIntensity={reduced ? 0 : 0.08}
              floatIntensity={reduced ? 0 : 0.35}
            >
              <GpuCard paused={reduced} mobile={mobile} />
            </Float>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
