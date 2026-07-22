export type NavLink = {
  label: string;
  href: string;
  /** monospace index shown in the command-palette mobile menu */
  cmd: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", cmd: "00" },
  { label: "About", href: "/about", cmd: "01" },
  { label: "Events", href: "/events", cmd: "02" },
  { label: "Projects", href: "/projects", cmd: "03" },
  { label: "Membership", href: "/membership", cmd: "04" },
  { label: "Sponsor", href: "/sponsor", cmd: "05" },
];

/** Landing-page-only in-page anchors, used for the scroll-spy on `/`. */
export const landingSections = [
  { id: "home", label: "Home" },
  { id: "mission", label: "Mission" },
  { id: "offer", label: "Offer" },
  { id: "github", label: "GitHub" },
  { id: "join", label: "Join" },
];

export const GITHUB_URL = "https://github.com/uh-pcs"; // TODO: replace with real org URL
export const MEMBERSHIP_FORM_URL = "https://forms.gle/pUnpEViWWytWnwxQA";
export const DISCORD_URL = "#"; // TODO: replace with Discord invite
export const LINKEDIN_URL = "#"; // TODO: replace with LinkedIn page
export const INSTAGRAM_URL = "#"; // TODO: replace with Instagram
export const CONTACT_EMAIL = "contact@uh-pcs.org";
