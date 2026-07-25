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
    repo: "https://github.com/daryl-888/DD-Emuluted", // TODO: real repo
    stats: [
      { label: "ISA", value: "16 instructions" },
      { label: "CLOCK", value: "Cycle-accurate" },
      { label: "REGISTERS", value: "A, B, PC, SP, FLAGS" },
    ],
    visual: "cpu",
    featured: true,
  },
];
