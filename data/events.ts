export type PcsEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  level: "Beginner" | "Intermediate" | "All Levels";
};

// TODO: update dates/times/rooms each semester.
export const events: PcsEvent[] = [
  {
    id: "EVT-01",
    title: "Intro to CUDA: Your First Kernel",
    date: "TBA — Fall Semester",
    time: "6:00 PM",
    location: "PGH — Room TBA",
    tags: ["CUDA", "Hands-on"],
    level: "Beginner",
  },
  {
    id: "EVT-02",
    title: "GPU Architecture 101",
    date: "TBA — Fall Semester",
    time: "6:00 PM",
    location: "PGH — Room TBA",
    tags: ["Architecture", "Lecture"],
    level: "Beginner",
  },
  {
    id: "EVT-03",
    title: "Parallel Matrix Multiplication Lab",
    date: "TBA — Fall Semester",
    time: "6:00 PM",
    location: "PGH — Room TBA",
    tags: ["CUDA", "Lab", "Optimization"],
    level: "Intermediate",
  },
  {
    id: "EVT-04",
    title: "NVIDIA / HPE Style Industry Night",
    date: "TBA — Fall Semester",
    time: "6:30 PM",
    location: "Student Center — Room TBA",
    tags: ["Industry", "Recruiting", "Networking"],
    level: "All Levels",
  },
  {
    id: "EVT-05",
    title: "Performance Profiling with Nsight",
    date: "TBA — Fall Semester",
    time: "6:00 PM",
    location: "PGH — Room TBA",
    tags: ["Profiling", "Tools"],
    level: "Intermediate",
  },
  {
    id: "EVT-06",
    title: "AI Infrastructure Career Panel",
    date: "TBA — Fall Semester",
    time: "6:30 PM",
    location: "Student Center — Room TBA",
    tags: ["Careers", "AI Infra", "Panel"],
    level: "All Levels",
  },
];
