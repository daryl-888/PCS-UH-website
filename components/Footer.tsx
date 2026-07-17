import Link from "next/link";
import {
  Github,
  Linkedin,
  Instagram,
  MessagesSquare,
  Mail,
} from "lucide-react";
import {
  navLinks,
  GITHUB_URL,
  DISCORD_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
} from "@/data/nav";

const systemStats = [
  { label: "SYSTEM_UPTIME", value: "99.9%" },
  { label: "THREADS_ACTIVE", value: "1024" },
  { label: "LATENCY", value: "24MS" },
  { label: "MODE", value: "PARALLEL" },
];

const socials = [
  { label: "GitHub", href: GITHUB_URL, icon: Github },
  { label: "Discord", href: DISCORD_URL, icon: MessagesSquare },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: Linkedin },
  { label: "Instagram", href: INSTAGRAM_URL, icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-obsidian" aria-label="Footer">
      {/* system status bar */}
      <div className="border-b border-line bg-graphite/50">
        <div className="mx-auto flex max-w-site flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3 font-mono text-[10px] tracking-[0.2em] text-textMuted sm:px-6 lg:px-10">
          <span className="flex items-center gap-2 text-gpu">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gpu" aria-hidden />
            [SYSTEM.ONLINE]
          </span>
          {systemStats.map((stat) => (
            <span key={stat.label}>
              {stat.label}: <span className="text-textSecondary">{stat.value}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-site gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr,1fr,1fr] lg:px-10">
        {/* identity */}
        <div>
          <p className="font-display text-lg font-bold tracking-[0.1em] text-textPrimary">
            UH PCS
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-textMuted">
            UNIVERSITY OF HOUSTON PARALLEL COMPUTING SOCIETY
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-textSecondary">
            A student organization teaching the compute stack behind modern AI,
            graphics, and scientific computing — one kernel at a time.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-textSecondary transition-colors hover:text-mint"
          >
            <Mail className="h-3.5 w-3.5 text-gpu" aria-hidden />
            {CONTACT_EMAIL}
          </a>
        </div>

        {/* quick links */}
        <nav aria-label="Footer">
          <p className="mb-4 font-mono text-[10px] tracking-[0.24em] text-textMuted">
            /NAVIGATE
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-xs text-textSecondary transition-colors hover:text-mint"
                >
                  <span className="mr-1.5 text-gpu/70">›</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* socials */}
        <div>
          <p className="mb-4 font-mono text-[10px] tracking-[0.24em] text-textMuted">
            /UPLINK
          </p>
          <ul className="space-y-2.5">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-mono text-xs text-textSecondary transition-colors hover:text-mint"
                >
                  <social.icon className="h-3.5 w-3.5 text-gpu" aria-hidden />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* bottom bar with the single UH-red micro accent */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-10">
          <p className="font-mono text-[10px] tracking-[0.18em] text-textMuted">
            © {new Date().getFullYear()} UH PARALLEL COMPUTING SOCIETY ·{" "}
            <span className="text-uhred">■</span> UNIVERSITY OF HOUSTON
          </p>
          <p className="font-mono text-[10px] tracking-[0.18em] text-textMuted">
            EXIT_CODE: 0 · PROCESS COMPLETE
          </p>
        </div>
      </div>
    </footer>
  );
}
