export type NavLink = {
  label: string;
  href: string;
  /** monospace index shown in the command-palette mobile menu */
  cmd: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home", cmd: "00" },
  { label: "Mission", href: "#mission", cmd: "01" },
  { label: "Workshops", href: "#workshops", cmd: "02" },
  { label: "Projects", href: "#projects", cmd: "03" },
  { label: "Events", href: "#events", cmd: "04" },
  { label: "Officers", href: "#officers", cmd: "05" },
  { label: "Sponsors", href: "#sponsors", cmd: "06" },
  { label: "Join", href: "#join", cmd: "07" },
];

export const GITHUB_URL = "https://github.com/uh-pcs"; // TODO: replace with real org URL
export const DISCORD_URL = "#"; // TODO: replace with Discord invite
export const LINKEDIN_URL = "#"; // TODO: replace with LinkedIn page
export const INSTAGRAM_URL = "#"; // TODO: replace with Instagram
export const CONTACT_EMAIL = "uhpcs@uh.edu"; // TODO: replace with real inbox
