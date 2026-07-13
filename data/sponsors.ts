export type SponsorBenefit = {
  id: string;
  title: string;
  description: string;
};

export const sponsorBenefits: SponsorBenefit[] = [
  {
    id: "SB-01",
    title: "General Meeting Access",
    description: "Present to members at general meetings throughout the semester.",
  },
  {
    id: "SB-02",
    title: "Technical Workshop Opportunities",
    description: "Host branded workshops on your stack, tools, or hardware.",
  },
  {
    id: "SB-03",
    title: "Resume & Member Pool Access",
    description: "Direct access to a curated pool of compute-focused students.",
  },
  {
    id: "SB-04",
    title: "Social Media Promotion",
    description: "Event and brand promotion across UH PCS channels.",
  },
  {
    id: "SB-05",
    title: "Banquet Visibility",
    description: "Recognition and presence at end-of-semester banquets.",
  },
  {
    id: "SB-06",
    title: "Company Project Collaboration",
    description: "Scope a student project team around a problem you care about.",
  },
  {
    id: "SB-07",
    title: "Hackathon Support",
    description: "Sponsor tracks, prizes, or compute credits upon request.",
  },
];
