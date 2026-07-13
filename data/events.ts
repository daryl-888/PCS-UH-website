export type PcsEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
};

// TODO: update dates/times/rooms each semester.
export const events: PcsEvent[] = [
  {
    id: "EVT-01",
    title: "Intro to CUDA: Your First Kernel",
    date: "TBA — Fall Semester",
    time: "6:00 PM",
    location: "PGH — Room TBA",
    tags: ["CUDA", "Beginner", "Hands-on"],
  },
  {
    id: "EVT-02",
    title: "GPU Architecture 101",
    date: "TBA — Fall Semester",
    time: "6:00 PM",
    location: "PGH — Room TBA",
    tags: ["Architecture", "Lecture"],
  },
  {
    id: "EVT-03",
    title: "Parallel Matrix Multiplication Lab",
    date: "TBA — Fall Semester",
    time: "6:00 PM",
    location: "PGH — Room TBA",
    tags: ["CUDA", "Lab", "Optimization"],
  },
  {
    id: "EVT-04",
    title: "NVIDIA / HPE Style Industry Night",
    date: "TBA — Fall Semester",
    time: "6:30 PM",
    location: "Student Center — Room TBA",
    tags: ["Industry", "Recruiting", "Networking"],
  },
  {
    id: "EVT-05",
    title: "Performance Profiling with Nsight",
    date: "TBA — Fall Semester",
    time: "6:00 PM",
    location: "PGH — Room TBA",
    tags: ["Profiling", "Tools", "Intermediate"],
  },
  {
    id: "EVT-06",
    title: "AI Infrastructure Career Panel",
    date: "TBA — Fall Semester",
    time: "6:30 PM",
    location: "Student Center — Room TBA",
    tags: ["Careers", "AI Infra", "Panel"],
  },
];
