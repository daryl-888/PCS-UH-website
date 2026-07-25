// Sourced from the UH PCS Sponsorship Packet (2026–2027), "Timeline of Events" (page 5).

export type RoadmapCategory =
  | "UH Events"
  | "General Meetings"
  | "Workshops"
  | "Professional Development"
  | "Other";

export type RoadmapEvent = {
  id: string;
  title: string;
  category: RoadmapCategory;
  /** ISO yyyy-mm-dd, or null when the packet lists the date as TBD */
  date: string | null;
};

export const roadmapEvents: RoadmapEvent[] = [
  { id: "RM-01", title: "Cats Back Day 1", category: "UH Events", date: "2026-08-25" },
  { id: "RM-02", title: "Cats Back Day 2", category: "UH Events", date: "2026-08-26" },
  { id: "RM-03", title: "General Meeting 1", category: "General Meetings", date: "2026-09-01" },
  { id: "RM-04", title: "Linux Workshop", category: "Workshops", date: "2026-09-03" },
  { id: "RM-05", title: "Resume Workshop", category: "Professional Development", date: "2026-09-08" },
  { id: "RM-06", title: "Career Fair (Day 1–2)", category: "UH Events", date: "2026-09-16" },
  { id: "RM-07", title: "Interview Prep (pending)", category: "Professional Development", date: "2026-09-21" },
  { id: "RM-08", title: "Info Session", category: "Professional Development", date: "2026-09-29" },
  { id: "RM-09", title: "NVIDIA DLI", category: "Workshops", date: null },
  { id: "RM-10", title: "General Meeting 2", category: "General Meetings", date: "2026-10-08" },
  { id: "RM-11", title: "CUDA Blur", category: "Workshops", date: "2026-10-13" },
  { id: "RM-12", title: "Hackathon (Oct–Nov)", category: "Other", date: null },
  { id: "RM-13", title: "Raytracer", category: "Workshops", date: "2026-10-22" },
  { id: "RM-14", title: "Collab (November)", category: "Other", date: "2026-11-01" },
  { id: "RM-15", title: "General Meeting 3", category: "General Meetings", date: "2026-11-04" },
  { id: "RM-16", title: "Optimizer", category: "Workshops", date: "2026-11-10" },
];

/** Tailwind color tokens per category, shared by the calendar dots/legend. */
export const categoryTone: Record<RoadmapCategory, string> = {
  "UH Events": "bg-holo",
  "General Meetings": "bg-gpu",
  Workshops: "bg-mint",
  "Professional Development": "bg-amber-300",
  Other: "bg-textMuted",
};
