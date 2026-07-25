export type PcsEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  level: "Beginner" | "Intermediate" | "All Levels";
};

// Sourced from the UH PCS Sponsorship Packet (2026–2027) roadmap — keep this
// in sync with data/roadmap.ts when the semester schedule changes. Time and
// location are TBA until the club confirms specifics for that session; skill
// level isn't broken out per-session in the packet, so everything defaults
// to "All Levels" rather than guessing.
export const events: PcsEvent[] = [
  {
    id: "EVT-01",
    title: "General Meeting 1",
    date: "Sep 1, 2026",
    time: "7:00 PM – 9:00 PM",
    location: "TBA",
    tags: ["General Meeting"],
    level: "All Levels",
  },
  {
    id: "EVT-02",
    title: "Linux Workshop",
    date: "Sep 3, 2026",
    time: "TBA",
    location: "TBA",
    tags: ["Linux", "Workshop"],
    level: "All Levels",
  },
  {
    id: "EVT-03",
    title: "Resume Workshop",
    date: "Sep 8, 2026",
    time: "TBA",
    location: "TBA",
    tags: ["Resume", "Professional Development"],
    level: "All Levels",
  },
  {
    id: "EVT-04",
    title: "Interview Prep (pending)",
    date: "Sep 21, 2026",
    time: "TBA",
    location: "TBA",
    tags: ["Interview Prep", "Professional Development"],
    level: "All Levels",
  },
  {
    id: "EVT-05",
    title: "Info Session",
    date: "Sep 29, 2026",
    time: "TBA",
    location: "TBA",
    tags: ["Info Session", "Professional Development"],
    level: "All Levels",
  },
  {
    id: "EVT-06",
    title: "NVIDIA DLI",
    date: "TBD",
    time: "TBA",
    location: "TBA",
    tags: ["NVIDIA", "Workshop"],
    level: "All Levels",
  },
  {
    id: "EVT-07",
    title: "General Meeting 2",
    date: "Oct 8, 2026",
    time: "7:00 PM – 9:00 PM",
    location: "TBA",
    tags: ["General Meeting"],
    level: "All Levels",
  },
  {
    id: "EVT-08",
    title: "CUDA Blur",
    date: "Oct 13, 2026",
    time: "TBA",
    location: "TBA",
    tags: ["CUDA", "Workshop"],
    level: "All Levels",
  },
  {
    id: "EVT-09",
    title: "Hackathon (Oct–Nov)",
    date: "TBD",
    time: "TBA",
    location: "TBA",
    tags: ["Hackathon", "Competition"],
    level: "All Levels",
  },
  {
    id: "EVT-10",
    title: "Raytracer",
    date: "Oct 22, 2026",
    time: "TBA",
    location: "TBA",
    tags: ["Raytracing", "Workshop"],
    level: "All Levels",
  },
  {
    id: "EVT-11",
    title: "Collab (November)",
    date: "Nov 1, 2026",
    time: "TBA",
    location: "TBA",
    tags: ["Collab", "Project"],
    level: "All Levels",
  },
  {
    id: "EVT-12",
    title: "General Meeting 3",
    date: "Nov 4, 2026",
    time: "7:00 PM – 9:00 PM",
    location: "TBA",
    tags: ["General Meeting"],
    level: "All Levels",
  },
  {
    id: "EVT-13",
    title: "Optimizer",
    date: "Nov 10, 2026",
    time: "TBA",
    location: "TBA",
    tags: ["Optimization", "Workshop"],
    level: "All Levels",
  },
];
