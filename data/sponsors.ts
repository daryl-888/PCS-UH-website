export type SponsorBenefit = {
  id: string;
  title: string;
  description: string;
};

export const sponsorBenefits: SponsorBenefit[] = [
  {
    id: "SB-01",
    title: "Company Logo",
    description: "Your logo displayed on our website, social media, and merchandise.",
  },
  {
    id: "SB-02",
    title: "General Meeting Access",
    description: "Present and run live Q&A with members at our 3 general meetings each semester.",
  },
  {
    id: "SB-03",
    title: "Dedicated Discord Channel",
    description: "A dedicated channel in our Discord where your recruiters have direct contact with our student body.",
  },
  {
    id: "SB-04",
    title: "Resume & Member Pool Access",
    description: "Direct access to our members' resumes and academic info for recruiting and talent sourcing.",
  },
  {
    id: "SB-05",
    title: "Annual Banquet Invite",
    description: "Join our end-of-year banquet with a speaker slot for a company representative.",
  },
  {
    id: "SB-06",
    title: "Exclusive Technical Workshop",
    description: "Host up to 2 company-oriented workshops per semester on your stack, tools, or hardware.",
  },
  {
    id: "SB-07",
    title: "Hackathon Sponsorship",
    description: "Sponsor a hackathon — judge, guide, and interact with the aspiring student body of UH.",
  },
  {
    id: "SB-08",
    title: "Company-Sponsored Project",
    description: "Host a day-to-semester-long project, giving members real problem-solving exposure and you a look at talent.",
  },
];
