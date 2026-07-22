// Sourced from the UH PCS Sponsorship Packet (2026–2027).

export type SponsorStat = {
  label: string;
  value: string;
  detail: string;
};

/** "Who you're supporting" + market-demand figures, packet pages 3. */
export const sponsorStats: SponsorStat[] = [
  {
    label: "CS_STUDENTS",
    value: "9.9%",
    detail: "of the UH student body — the core of our membership.",
  },
  {
    label: "ENGINEERING_STUDENTS",
    value: "10.8%",
    detail: "across UH programs PCS is built to reach and develop.",
  },
  {
    label: "AI_MARKET_CAGR",
    value: "36.6%",
    detail: "Global AI market growth through 2030 — $0.28T → $1.81T.",
  },
  {
    label: "DEV_JOB_GROWTH",
    value: "+17.9%",
    detail: "Software-developer job growth, 2023–33 — vs. 4% for all occupations.",
  },
  {
    label: "DATA_SCI_GROWTH",
    value: "~36%",
    detail: "Data-scientist growth — among the fastest of any U.S. occupation.",
  },
  {
    label: "AI_POWER_DEMAND",
    value: "~2×",
    detail: "Rise in AI data-center power demand by 2030 — the GPU era at scale.",
  },
];

export type ProgramType = {
  id: string;
  title: string;
  description: string;
};

/** "Our Events" — the recurring programming sponsors plug into, packet page 6. */
export const programTypes: ProgramType[] = [
  {
    id: "PROG-01",
    title: "Info Sessions",
    description:
      "Company reps share how parallel computing and AI show up in their day-to-day work — real projects, tools, and career paths.",
  },
  {
    id: "PROG-02",
    title: "Hackathons",
    description:
      "Timed, team-based competitions applying workshop skills to a real problem, with industry mentors judging and guiding teams.",
  },
  {
    id: "PROG-03",
    title: "General Meetings",
    description:
      "Our core recurring meetings, three times a semester — club updates plus a company presentation and live Q&A.",
  },
  {
    id: "PROG-04",
    title: "Workshops",
    description:
      "Hands-on sessions — Linux and CUDA fundamentals through raytracing and optimization — alongside student leads and visiting engineers.",
  },
  {
    id: "PROG-05",
    title: "Project Pool",
    description:
      "A running lineup of collaborative builds, from single-day challenges to semester-long projects, often alongside a sponsoring company.",
  },
  {
    id: "PROG-06",
    title: "Professional Development",
    description:
      "Resume workshops, interview prep, and career-readiness sessions that turn technical skill into a strong application.",
  },
];

export type SponsorTier = {
  name: string;
  price: string;
};

/** Partnership levels, packet page 4. */
export const sponsorTiers: SponsorTier[] = [
  { name: "Bronze", price: "$150" },
  { name: "Silver", price: "$300" },
  { name: "Gold", price: "$500" },
  { name: "Platinum", price: "$1,000" },
];

export type TierBenefitRow = {
  label: string;
  /** included per tier, aligned to sponsorTiers order */
  included: [boolean, boolean, boolean, boolean];
};

export const tierBenefits: TierBenefitRow[] = [
  { label: "Company Logo", included: [true, true, true, true] },
  { label: "General Meetings", included: [true, true, true, true] },
  { label: "Dedicated Discord Channel", included: [false, true, true, true] },
  { label: "Member Resume Pool Access", included: [false, true, true, true] },
  { label: "Annual Banquet", included: [false, false, true, true] },
  { label: "Exclusive Technical Workshop", included: [false, false, true, true] },
  { label: "Hackathon Sponsorship", included: [false, false, false, true] },
  { label: "Company-Sponsored Project", included: [false, false, false, true] },
];

export type SponsorContact = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

/** Sponsorship packet closing page — direct officer contacts, packet page 8. */
export const sponsorContacts: SponsorContact[] = [
  {
    name: "Daryl Alfaro",
    role: "President",
    email: "Dpalfaro@cougarnet.uh.edu",
    phone: "(346) 221-6817",
  },
  {
    name: "Nguyen Hang",
    role: "Senior Vice President",
    email: "Nghang@cougarnet.uh.edu",
    phone: "(415) 279-3342",
  },
  {
    name: "Jimmy Vieyra",
    role: "VP Technical Relations",
    email: "Jvieyra@cougarnet.uh.edu",
    phone: "(832) 897-3668",
  },
  {
    name: "Michael Hernandez",
    role: "VP Technical Operations",
    email: "Mahern69@cougarnet.uh.edu",
    phone: "(832) 716-3924",
  },
];

export const GIVING_PORTAL_URL = "https://giving.uh.edu/gift";

/** "How to donate" steps, packet page 7 — the one-time-gift alternative to a tiered sponsorship. */
export const donateSteps: string[] = [
  "Visit giving.uh.edu/gift.",
  'Choose the "Colleges & Programs" tab (not Priorities or Campus Life).',
  "Select Cullen College of Engineering → Cullen College of Engineering General → Engineering Student Organizations.",
  'Add "Unrestricted gift for the Parallel Computing Society" in the comments box, then complete your gift.',
];
