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
    major: "Computer Engineering",
    focus: "GPU computing · Org direction",
    contact: "Dpalfaro@cougarnet.uh.edu",
    phone: "(346) 221-6817",
  },
  {
    id: "[MAINTAINER-02]",
    name: "Nguyen Hang",
    role: "Senior Vice President",
    major: "Computer Science",
    focus: "Workshops · Curriculum",
    contact: "Nghang@cougarnet.uh.edu",
    phone: "(415) 279-3342",
  },
  {
    id: "[MAINTAINER-03]",
    name: "Michael Hernandez",
    role: "VP Technical Operations",
    major: "Computer Science",
    focus: "Infrastructure · GitHub org",
    contact: "Mahern69@cougarnet.uh.edu",
    phone: "(832) 716-3924",
  },
  {
    id: "[MAINTAINER-04]",
    name: "Jimmy Vieyra",
    role: "VP Technical Relations",
    major: "Computer Science",
    focus: "Industry outreach · Speakers",
    contact: "Jvieyra@cougarnet.uh.edu",
    phone: "(832) 897-3668",
  },
  {
    id: "[MAINTAINER-05]",
    name: "Bao Vu",
    role: "Director of Brand Strategy",
    major: "Finance",
    focus: "Branding · Growth",
    contact: "gvu2@cougarnet.uh.edu",
    phone: "(617) 980-0040",
  },
  {
    id: "[MAINTAINER-06]",
    name: "Nicole Ventura",
    role: "Treasurer",
    major: "Accounting",
    focus: "Financial management · Budgeting",
    contact: "#",
  },
];
