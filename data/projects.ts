export type Project = {
  id: string;
  name: string;
  type: string;
  stack: string[];
  status: "Optimizing" | "Workshop Ready" | "Deployed" | "Prototype";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  repo: string;
  /** hidden stats revealed on hover */
  stats: { label: string; value: string }[];
  /** thumbnail flavor rendered with CSS */
  visual: "blur" | "matrix" | "cpu" | "particles";
  /** shown on the landing GitHub panel */
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "PRJ-001",
    name: "8-Bit CPU Emulator",
    type: "Computer Architecture",
    stack: ["C++", "Assembly Concepts"],
    status: "Deployed",
    difficulty: "Beginner",
    description:
      "A cycle-accurate emulator teaching fetch, decode, execute, and registers.",
    repo: "https://github.com/uh-pcs/8bit-cpu-emulator", // TODO: real repo
    stats: [
      { label: "ISA", value: "16 instructions" },
      { label: "CLOCK", value: "Cycle-accurate" },
      { label: "REGISTERS", value: "A, B, PC, SP, FLAGS" },
    ],
    visual: "cpu",
    featured: true,
  },
  {
    id: "PRJ-002",
    name: "CUDA Image Blur Kernel",
    type: "Parallel Processing",
    stack: ["CUDA C", "C++", "OpenCV"],
    status: "Optimizing",
    difficulty: "Intermediate",
    description:
      "GPU-accelerated convolution with shared-memory tiling and performance scaling.",
    repo: "https://github.com/uh-pcs/cuda-image-blur", // TODO: real repo
    stats: [
      { label: "SPEEDUP", value: "38.4x vs CPU" },
      { label: "KERNEL", value: "2D convolution" },
      { label: "MEMORY", value: "Shared-mem tiling" },
    ],
    visual: "blur",
    featured: true,
  },
  {
    id: "PRJ-003",
    name: "Parallel Conway's Game of Life",
    type: "Simulation",
    stack: ["CUDA", "C++", "Stencil Compute"],
    status: "Workshop Ready",
    difficulty: "Intermediate",
    description:
      "A parallel cellular automata simulation using stencil computation on the GPU.",
    repo: "https://github.com/uh-pcs/parallel-game-of-life", // TODO: real repo
    stats: [
      { label: "GRID", value: "4096 × 4096" },
      { label: "PATTERN", value: "Stencil update" },
      { label: "THROUGHPUT", value: "600+ gen/s" },
    ],
    visual: "matrix",
    featured: true,
  },
  {
    id: "PRJ-004",
    name: "Matrix Multiplication Kernel Lab",
    type: "GPU Fundamentals",
    stack: ["CUDA", "C++", "Nsight Compute"],
    status: "Workshop Ready",
    difficulty: "Beginner",
    description:
      "Learn tiling, shared memory, occupancy, and memory coalescing.",
    repo: "https://github.com/uh-pcs/matmul-kernel-lab", // TODO: real repo
    stats: [
      { label: "OCCUPANCY", value: "94% achieved" },
      { label: "TILE SIZE", value: "32 × 32" },
      { label: "THROUGHPUT", value: "~1.1 TFLOPS" },
    ],
    visual: "matrix",
    featured: false,
  },
  {
    id: "PRJ-005",
    name: "Parallel Particle Simulation",
    type: "Simulation",
    stack: ["C++", "CUDA", "Three.js Visualization"],
    status: "Prototype",
    difficulty: "Advanced",
    description:
      "Particle simulation accelerated with parallel compute and visualized in the browser.",
    repo: "https://github.com/uh-pcs/parallel-particles", // TODO: real repo
    stats: [
      { label: "PARTICLES", value: "1M @ 60fps" },
      { label: "SOLVER", value: "Spatial hash grid" },
      { label: "RENDER", value: "WebGL instancing" },
    ],
    visual: "particles",
    featured: false,
  },
];
