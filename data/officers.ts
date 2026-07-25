export type Officer = {
  id: string;
  name: string;
  role: string;
  /** "—" where not yet published — avoid guessing a real officer's major. */
  major: string;
  focus: string;
  contact: string;
  phone?: string;
};

// Sourced from the UH PCS Sponsorship Packet (2026–2027), closing page —
// the four officers listed there as sponsorship contacts. Events Lead and
// Sponsorship Lead are still placeholders pending real names.
export const officers: Officer[] = [
  {
    id: "[MAINTAINER-01]",
    name: "Daryl Alfaro",
    role: "President",
    major: "—",
    focus: "GPU computing · Org direction",
    contact: "mailto:Dpalfaro@cougarnet.uh.edu",
    phone: "(346) 221-6817",
  },
  {
    id: "[MAINTAINER-02]",
    name: "Nguyen Hang",
    role: "Senior Vice President",
    major: "—",
    focus: "Workshops · Curriculum",
    contact: "mailto:Nghang@cougarnet.uh.edu",
    phone: "(415) 279-3342",
  },
  {
    id: "[MAINTAINER-03]",
    name: "Michael Hernandez",
    role: "VP Technical Operations",
    major: "—",
    focus: "Infrastructure · GitHub org",
    contact: "mailto:Mahern69@cougarnet.uh.edu",
    phone: "(832) 716-3924",
  },
  {
    id: "[MAINTAINER-04]",
    name: "Jimmy Vieyra",
    role: "VP Technical Relations",
    major: "—",
    focus: "Industry outreach · Speakers",
    contact: "mailto:Jvieyra@cougarnet.uh.edu",
    phone: "(832) 897-3668",
  },
  {
    id: "[MAINTAINER-05]",
    name: "Officer Name",
    role: "Events Lead",
    major: "Computer Science",
    focus: "Sessions · Logistics",
    contact: "#",
  },
  {
    id: "[MAINTAINER-06]",
    name: "Officer Name",
    role: "Sponsorship Lead",
    major: "MIS",
    focus: "Sponsors · Funding pipeline",
    contact: "#",
  },
];
