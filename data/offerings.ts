export type Offering = {
  node: string;
  title: string;
  description: string;
  icon: string; // key into the icon map in Offerings.tsx
  status: string;
};

export const offerings: Offering[] = [
  {
    node: "[NODE-A1]",
    title: "CUDA Workshops",
    description:
      "Hands-on sessions teaching thread hierarchy, memory models, kernels, profiling, and optimization.",
    icon: "cpu",
    status: "RUNNING",
  },
  {
    node: "[NODE-A2]",
    title: "GPU Architecture Deep Dives",
    description:
      "Learn how modern GPUs execute workloads, schedule warps, move memory, and accelerate AI.",
    icon: "circuit",
    status: "SCHEDULED",
  },
  {
    node: "[NODE-B1]",
    title: "Parallel Programming Projects",
    description:
      "Build image filters, matrix multiplication kernels, simulation systems, mini renderers, and performance tools.",
    icon: "boxes",
    status: "RUNNING",
  },
  {
    node: "[NODE-B2]",
    title: "Industry Info Sessions",
    description:
      "Events with companies and recruiters in HPC, AI infrastructure, hardware, and cloud computing.",
    icon: "network",
    status: "PIPELINE",
  },
  {
    node: "[NODE-C1]",
    title: "Research & Project Teams",
    description:
      "Small teams exploring AI efficiency, scientific computing, distributed systems, and performance engineering.",
    icon: "flask",
    status: "RECRUITING",
  },
  {
    node: "[NODE-C2]",
    title: "Career Pipeline",
    description:
      "Resume reviews, internship prep, GitHub project polishing, and sponsor member pools.",
    icon: "rocket",
    status: "ACTIVE",
  },
];
