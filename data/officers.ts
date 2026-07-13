export type Officer = {
  id: string;
  name: string;
  role: string;
  major: string;
  focus: string;
  contact: string;
};

// TODO: replace placeholder names/majors/contacts with real officers.
export const officers: Officer[] = [
  {
    id: "[MAINTAINER-01]",
    name: "Officer Name",
    role: "President",
    major: "Computer Science",
    focus: "GPU computing · Org direction",
    contact: "#",
  },
  {
    id: "[MAINTAINER-02]",
    name: "Officer Name",
    role: "Vice President",
    major: "Computer Engineering",
    focus: "Workshops · Curriculum",
    contact: "#",
  },
  {
    id: "[MAINTAINER-03]",
    name: "Officer Name",
    role: "Technical Operations",
    major: "Computer Science",
    focus: "Infrastructure · GitHub org",
    contact: "#",
  },
  {
    id: "[MAINTAINER-04]",
    name: "Officer Name",
    role: "Technical Relations",
    major: "Electrical Engineering",
    focus: "Industry outreach · Speakers",
    contact: "#",
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
