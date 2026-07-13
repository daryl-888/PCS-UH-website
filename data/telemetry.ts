export type TelemetryStat = {
  label: string;
  value: string;
  /** if set, animate a counter up to this number and append `suffix` */
  count?: number;
  suffix?: string;
};

export const telemetryStats: TelemetryStat[] = [
  { label: "MEMBERS ONLINE", value: "128+", count: 128, suffix: "+" },
  { label: "WORKSHOPS PLANNED", value: "CUDA / C++ / GPU ARCH" },
  { label: "CURRENT FOCUS", value: "PARALLEL PROGRAMMING" },
  { label: "INDUSTRY MODE", value: "RECRUITER OUTREACH" },
  { label: "COMPUTE STATUS", value: "SCALING" },
];

export const terminalLines: string[] = [
  "[10:42:01] kernel workshop initialized",
  "[10:42:03] CUDA stream synchronized",
  "[10:42:05] student project node connected",
  "[10:42:08] recruiter event pipeline active",
  "[10:42:12] warp scheduler nominal — 32 threads/warp",
  "[10:42:15] membership queue accepting requests",
];

export const marqueeTerms: string[] = [
  "CUDA",
  "TENSOR CORES",
  "WARP SCHEDULING",
  "SHARED MEMORY",
  "NCCL",
  "MEMORY COALESCING",
  "OCCUPANCY",
  "NSIGHT COMPUTE",
  "SIMT",
  "HBM BANDWIDTH",
  "KERNEL FUSION",
  "DISTRIBUTED TRAINING",
  "MPI",
  "OPENMP",
  "PCIe / NVLINK",
  "RAY TRACING",
];
