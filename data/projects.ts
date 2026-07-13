export type Project = {
  id: string;
  name: string;
  type: string;
  stack: string[];
  status: "Optimizing" | "Workshop Ready" | "Deployed" | "Prototype";
  description: string;
  repo: string;
  /** hidden stats revealed on hover */
  stats: { label: string; value: string }[];
  /** thumbnail flavor rendered with CSS */
  visual: "blur" | "matrix" | "cpu" | "particles";
};

export const projects: Project[] = [
  {
    id: "PRJ-001",
    name: "CUDA Image Blur",
    type: "Parallel Processing",
    stack: ["CUDA C", "C++", "OpenCV"],
    status: "Optimizing",
    description:
      "GPU-accelerated Gaussian blur comparing CPU and CUDA performance.",
    repo: "https://github.com/uh-pcs/cuda-image-blur", // TODO: real repo
    stats: [
      { label: "SPEEDUP", value: "38.4x vs CPU" },
      { label: "KERNEL", value: "2D convolution" },
      { label: "MEMORY", value: "Shared-mem tiling" },
    ],
    visual: "blur",
  },
  {
    id: "PRJ-002",
    name: "Matrix Multiplication Kernel Lab",
    type: "GPU Fundamentals",
    stack: ["CUDA", "C++", "Nsight Compute"],
    status: "Workshop Ready",
    description:
      "Learn tiling, shared memory, occupancy, and memory coalescing.",
    repo: "https://github.com/uh-pcs/matmul-kernel-lab", // TODO: real repo
    stats: [
      { label: "OCCUPANCY", value: "94% achieved" },
      { label: "TILE SIZE", value: "32 × 32" },
      { label: "THROUGHPUT", value: "~1.1 TFLOPS" },
    ],
    visual: "matrix",
  },
  {
    id: "PRJ-003",
    name: "8-Bit CPU Emulator",
    type: "Computer Architecture",
    stack: ["C++", "Assembly Concepts"],
    status: "Deployed",
    description:
      "Cycle-level emulator for teaching low-level architecture and instruction flow.",
    repo: "https://github.com/uh-pcs/8bit-cpu-emulator", // TODO: real repo
    stats: [
      { label: "ISA", value: "16 instructions" },
      { label: "CLOCK", value: "Cycle-accurate" },
      { label: "REGISTERS", value: "A, B, PC, SP, FLAGS" },
    ],
    visual: "cpu",
  },
  {
    id: "PRJ-004",
    name: "Parallel Particle Simulation",
    type: "Simulation",
    stack: ["C++", "CUDA", "Three.js Visualization"],
    status: "Prototype",
    description:
      "Particle simulation accelerated with parallel compute and visualized in the browser.",
    repo: "https://github.com/uh-pcs/parallel-particles", // TODO: real repo
    stats: [
      { label: "PARTICLES", value: "1M @ 60fps" },
      { label: "SOLVER", value: "Spatial hash grid" },
      { label: "RENDER", value: "WebGL instancing" },
    ],
    visual: "particles",
  },
];
