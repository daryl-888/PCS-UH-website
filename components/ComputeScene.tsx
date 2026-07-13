"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

/* ------------------------------------------------------------------ */
/* Palette                                                             */
/* ------------------------------------------------------------------ */
const GPU_GREEN = new THREE.Color("#10B981");
const MATRIX = new THREE.Color("#22C55E");
const MINT = new THREE.Color("#6EE7B7");
const HOLO = new THREE.Color("#14F1D9");
const DIM = new THREE.Color("#0A2417");

type SceneProps = {
  paused: boolean;
  /** hover multiplies pulse + stream speed */
  active: boolean;
  mobile: boolean;
};

/* ------------------------------------------------------------------ */
/* GPU die: slab + neon edge wireframe + 8x8 instanced SM cores        */
/* ------------------------------------------------------------------ */
function GpuDie({ paused, active }: { paused: boolean; active: boolean }) {
  const coresRef = useRef<THREE.InstancedMesh>(null);
  const dieGlowRef = useRef<THREE.MeshBasicMaterial>(null);

  const GRID = 8;
  const COUNT = GRID * GRID;

  const slabGeo = useMemo(() => new THREE.BoxGeometry(3, 0.22, 3), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(slabGeo), [slabGeo]);
  const coreGeo = useMemo(() => new THREE.BoxGeometry(0.24, 0.1, 0.24), []);
  const coreMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
      }),
    []
  );

  // Lay the cores out in an 8x8 matrix on top of the slab.
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const mesh = coresRef.current;
    if (!mesh) return;
    const t = paused ? 0 : state.clock.elapsedTime;
    const speed = active ? 2.6 : 1.4;

    let i = 0;
    for (let x = 0; x < GRID; x++) {
      for (let z = 0; z < GRID; z++) {
        const px = (x - GRID / 2 + 0.5) * 0.34;
        const pz = (z - GRID / 2 + 0.5) * 0.34;
        // Diagonal compute wave sweeping across the die.
        const wave = Math.sin(t * speed + (x + z) * 0.55) * 0.5 + 0.5;
        dummy.position.set(px, 0.16 + wave * 0.045, pz);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        color.copy(DIM).lerp(x % 2 === z % 2 ? MINT : HOLO, 0.15 + wave * (active ? 0.95 : 0.7));
        mesh.setColorAt(i, color);
        i++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    if (dieGlowRef.current) {
      dieGlowRef.current.opacity = 0.1 + (Math.sin(t * 1.6) * 0.5 + 0.5) * 0.12;
    }
  });

  return (
    <group>
      {/* dark PCB slab */}
      <mesh geometry={slabGeo}>
        <meshStandardMaterial
          color="#050D09"
          metalness={0.85}
          roughness={0.35}
          emissive="#052014"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* neon wireframe edges */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color={GPU_GREEN} transparent opacity={0.9} />
      </lineSegments>

      {/* glowing interposer plane under the cores */}
      <mesh position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.85, 2.85]} />
        <meshBasicMaterial
          ref={dieGlowRef}
          color={GPU_GREEN}
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 64 SM cores */}
      <instancedMesh
        ref={coresRef}
        args={[coreGeo, coreMat, COUNT]}
        frustumCulled={false}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Thread field: thousands of drifting parallel-thread particles       */
/* ------------------------------------------------------------------ */
function ThreadField({ paused, mobile }: { paused: boolean; mobile: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = mobile ? 900 : 2600;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // hollow sphere shell around the die
      const r = 3.2 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.7;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      c.copy(Math.random() > 0.72 ? HOLO : Math.random() > 0.5 ? MATRIX : GPU_GREEN);
      const dim = 0.35 + Math.random() * 0.65;
      col[i * 3] = c.r * dim;
      col[i * 3 + 1] = c.g * dim;
      col[i * 3 + 2] = c.b * dim;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state, delta) => {
    if (paused || !ref.current) return;
    ref.current.rotation.y += delta * 0.045;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Stream loops: faint orbital tracks + glowing data packets           */
/* ------------------------------------------------------------------ */
type Loop = {
  curve: THREE.CatmullRomCurve3;
  tube: THREE.TubeGeometry;
  packetCount: number;
  speed: number;
  color: THREE.Color;
};

function makeLoop(
  radius: number,
  height: number,
  tilt: number,
  wobble: number,
  packetCount: number,
  speed: number,
  color: THREE.Color
): Loop {
  const pts: THREE.Vector3[] = [];
  const SEGMENTS = 24;
  for (let i = 0; i < SEGMENTS; i++) {
    const a = (i / SEGMENTS) * Math.PI * 2;
    pts.push(
      new THREE.Vector3(
        Math.cos(a) * (radius + Math.sin(a * 3) * wobble),
        height + Math.sin(a * 2 + tilt) * wobble * 1.6,
        Math.sin(a) * (radius + Math.cos(a * 2) * wobble)
      )
    );
  }
  const curve = new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.6);
  const tube = new THREE.TubeGeometry(curve, 128, 0.008, 6, true);
  return { curve, tube, packetCount, speed, color };
}

function StreamLoops({ paused, active, mobile }: SceneProps) {
  const packetsRef = useRef<THREE.InstancedMesh>(null);

  const loops = useMemo<Loop[]>(() => {
    const base: Loop[] = [
      makeLoop(2.5, 0.5, 0, 0.18, 6, 0.045, HOLO),
      makeLoop(3.1, -0.35, 1.4, 0.28, 5, -0.034, GPU_GREEN),
      makeLoop(3.8, 0.9, 2.6, 0.4, 5, 0.026, MINT),
    ];
    if (!mobile) base.push(makeLoop(4.6, -0.9, 4.1, 0.5, 6, -0.02, MATRIX));
    return base;
  }, [mobile]);

  const totalPackets = useMemo(
    () => loops.reduce((sum, l) => sum + l.packetCount, 0),
    [loops]
  );

  const packetGeo = useMemo(() => new THREE.BoxGeometry(0.05, 0.05, 0.3), []);
  const packetMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pt = useMemo(() => new THREE.Vector3(), []);
  const tangentPt = useMemo(() => new THREE.Vector3(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const mesh = packetsRef.current;
    if (!mesh) return;
    const t = paused ? 0 : state.clock.elapsedTime;
    const boost = active ? 2.2 : 1;

    let i = 0;
    for (const loop of loops) {
      for (let p = 0; p < loop.packetCount; p++) {
        const u =
          (((t * loop.speed * boost + p / loop.packetCount) % 1) + 1) % 1;
        loop.curve.getPointAt(u, pt);
        loop.curve.getPointAt((u + 0.01) % 1, tangentPt);
        dummy.position.copy(pt);
        dummy.lookAt(tangentPt);
        const pulse = 0.75 + Math.sin(t * 6 + i * 1.7) * 0.25;
        dummy.scale.setScalar(pulse);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        color.copy(loop.color).multiplyScalar(active ? 1.4 : 1);
        mesh.setColorAt(i, color);
        i++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      {loops.map((loop, i) => (
        <mesh key={i} geometry={loop.tube}>
          <meshBasicMaterial
            color={loop.color}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      <instancedMesh
        ref={packetsRef}
        args={[packetGeo, packetMat, totalPackets]}
        frustumCulled={false}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Satellite nodes: floating octahedrons wired back to the die         */
/* ------------------------------------------------------------------ */
function SatelliteNodes({ paused }: { paused: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);

  const nodes = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const N = 6;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 + 0.4;
      arr.push(
        new THREE.Vector3(
          Math.cos(a) * (3.4 + (i % 2) * 0.9),
          Math.sin(i * 2.1) * 1.4,
          Math.sin(a) * (3.4 + ((i + 1) % 2) * 0.9)
        )
      );
    }
    return arr;
  }, []);

  const linesGeo = useMemo(() => {
    const positions: number[] = [];
    for (const n of nodes) positions.push(0, 0, 0, n.x, n.y, n.z);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, [nodes]);

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (i >= nodes.length) return;
        child.position.y = nodes[i].y + Math.sin(t * 0.9 + i * 1.3) * 0.18;
        child.rotation.y = t * 0.6 + i;
        child.rotation.x = t * 0.4;
      });
    }
    if (lineMatRef.current) {
      lineMatRef.current.opacity = 0.12 + (Math.sin(t * 1.8) * 0.5 + 0.5) * 0.14;
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        {nodes.map((n, i) => (
          <mesh key={i} position={n}>
            <octahedronGeometry args={[0.11, 0]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? GPU_GREEN : HOLO}
              wireframe
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
      </group>
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial
          ref={lineMatRef}
          color={GPU_GREEN}
          transparent
          opacity={0.18}
        />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Rig: base rotation + mouse-parallax tilt                            */
/* ------------------------------------------------------------------ */
function Rig({
  paused,
  active,
  mobile,
  children,
}: SceneProps & { children: React.ReactNode }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (paused) return;
    if (inner.current) {
      inner.current.rotation.y += delta * (active ? 0.22 : 0.1);
    }
    if (outer.current && !mobile) {
      // gentle pointer tilt
      const targetX = state.pointer.y * 0.14;
      const targetY = state.pointer.x * 0.2;
      outer.current.rotation.x = THREE.MathUtils.lerp(
        outer.current.rotation.x,
        targetX,
        0.05
      );
      outer.current.rotation.y = THREE.MathUtils.lerp(
        outer.current.rotation.y,
        targetY,
        0.05
      );
    }
  });

  return (
    <group ref={outer}>
      <group ref={inner} rotation={[0.32, 0.7, 0]}>
        {children}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */
export default function ComputeScene({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [active, setActive] = useState(false);

  return (
    <div
      className={className}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      role="img"
      aria-label="Animated 3D visualization of a GPU compute cluster with parallel data streams"
    >
      <Canvas
        dpr={[1, mobile ? 1.5 : 1.75]}
        camera={{ position: [4.4, 2.8, 5.6], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={reduced ? "demand" : "always"}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 6, 4]} intensity={40} color={GPU_GREEN} />
        <pointLight position={[-6, -3, -5]} intensity={26} color={HOLO} />

        <Rig paused={reduced} active={active} mobile={mobile}>
          <Float
            speed={reduced ? 0 : 1.3}
            rotationIntensity={reduced ? 0 : 0.18}
            floatIntensity={reduced ? 0 : 0.55}
          >
            <GpuDie paused={reduced} active={active} />
          </Float>
          <StreamLoops paused={reduced} active={active} mobile={mobile} />
          <SatelliteNodes paused={reduced} />
          <ThreadField paused={reduced} mobile={mobile} />
        </Rig>
      </Canvas>
    </div>
  );
}
