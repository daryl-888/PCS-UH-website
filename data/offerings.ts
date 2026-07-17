export type Offering = {
  node: string;
  title: string;
  description: string;
  icon: string; // key into the icon map in Offerings.tsx
  status: string;
  /** short metadata chips, e.g. BEGINNER_SAFE */
  chips: string[];
};

export const offerings: Offering[] = [
  {
    node: "[NODE-A1]",
    title: "Project Workshops",
    description:
      "Build CUDA kernels, GPU image filters, and simulations, hands-on.",
    icon: "cpu",
    status: "RUNNING",
    chips: ["BEGINNER_SAFE", "HANDS_ON"],
  },
  {
    node: "[NODE-A2]",
    title: "Technical Info Sessions",
    description:
      "Deep dives on GPU architecture, HPC, CUDA, and systems programming.",
    icon: "circuit",
    status: "SCHEDULED",
    chips: ["HANDS_ON", "PORTFOLIO_READY"],
  },
  {
    node: "[NODE-B1]",
    title: "Hackathons",
    description:
      "Team-based optimization and profiling challenges under time pressure.",
    icon: "boxes",
    status: "PIPELINE",
    chips: ["PORTFOLIO_READY", "INDUSTRY_SIGNAL"],
  },
  {
    node: "[NODE-B2]",
    title: "Industry Connections",
    description:
      "Recruiters, alumni, resume pools, and hardware company access.",
    icon: "network",
    status: "ACTIVE",
    chips: ["INDUSTRY_SIGNAL", "BEGINNER_SAFE"],
  },
];
