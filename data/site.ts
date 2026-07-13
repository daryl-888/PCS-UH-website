export const LINKS = {
  github: "#", // TODO: real GitHub org URL
  discord: "#", // TODO: real Discord invite
  linkedin: "#", // TODO: real LinkedIn page
  email: "uhpcs@uh.edu", // TODO: real inbox
  membershipForm: "#membership", // TODO: point at real membership form / GetInvolved page
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "What We Offer", href: "#offer" },
  { label: "Projects", href: "#projects" },
  { label: "Events", href: "#events" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

export const heroLabels = [
  "GPU ARCHITECTURE",
  "PARALLEL THREADS",
  "CUDA KERNELS",
  "MEMORY BANDWIDTH",
];

export const kpis = [
  {
    value: "+17.9%",
    label:
      "Software developer job growth, 2023–2033, compared with 4% for all occupations.",
  },
  {
    value: "≈36%",
    label: "Data scientist growth, among the fastest U.S. occupations.",
  },
  {
    value: "≈2x",
    label: "Projected rise in AI data center power demand by 2030.",
  },
];

export const aiMarketChart = {
  title: "Global AI market size",
  subtitle: "Projected to grow 36.6% CAGR through 2030",
  source:
    "Sources: U.S. Bureau of Labor Statistics, Grand View Research, International Energy Agency.",
  bars: [
    { year: "2024", value: 0.28, label: "$0.28T" },
    { year: "2026", value: 0.52, label: "$0.52T" },
    { year: "2028", value: 0.97, label: "$0.97T" },
    { year: "2030", value: 1.81, label: "$1.81T" },
  ],
};

export const offers = [
  {
    title: "Workshops",
    description:
      "Hands-on sessions in Linux, CUDA, raytracing, and optimization — real skills, not just theory.",
  },
  {
    title: "Hackathons",
    description:
      "Team-based competitions where students apply what they have learned, with mentors judging, guiding, and giving feedback.",
  },
  {
    title: "Project Pool",
    description:
      "Collaborative builds ranging from single-day challenges to semester-long projects, often shaped around real technical problems and sponsor interests.",
  },
  {
    title: "Industry Access",
    description:
      "Info sessions and general meetings where company representatives explain real projects, career paths, and opportunities in advanced computing.",
  },
];

export const featuredProject = {
  name: "8-Bit CPU Emulator",
  description:
    "A cycle-aware emulator that models fetch, decode, and execute behavior in software — built as an educational tool for understanding how hardware works below the surface.",
  terminal: [
    "> LOAD A, 0x04",
    "> ADD A, 0x02",
    "> PC: 0x0032",
    "> ACC: 0x06",
    "> CYCLES: 128",
  ],
};

export const projects = [
  {
    name: "CUDA Image Processing Lab",
    description:
      "Build GPU-accelerated image filters using CUDA kernels and memory-aware optimization.",
  },
  {
    name: "Parallel Conway's Game of Life",
    description: "Explore grid-based simulation and parallel update patterns.",
  },
  {
    name: "Raytracing / Rendering Lab",
    description:
      "Learn how graphics workloads can be accelerated through parallel execution.",
  },
];

export const membershipBenefits = [
  "Workshops and technical labs",
  "Hackathons and build nights",
  "Project pool access",
  "Industry-facing events",
  "Community and mentorship",
  "Resume-building technical experience",
];
