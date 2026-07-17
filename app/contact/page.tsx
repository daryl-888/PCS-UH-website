import type { Metadata } from "next";
import {
  GraduationCap,
  Building2,
  Users,
  FlaskConical,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import SiteChrome from "@/components/SiteChrome";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import { CONTACT_EMAIL } from "@/data/nav";

export const metadata: Metadata = {
  title: "Contact — UH PCS",
  description: "Reach UH PCS — students, sponsors, recruiters, faculty, and alumni.",
};

type Track = {
  icon: LucideIcon;
  label: string;
  description: string;
  subject: string;
};

const TRACKS: Track[] = [
  {
    icon: GraduationCap,
    label: "Student Inquiry",
    description: "Questions about joining, workshops, or projects.",
    subject: "Student Inquiry",
  },
  {
    icon: Building2,
    label: "Sponsor Inquiry",
    description:
      "Partner with UH PCS — workshops, talks, and hiring pipelines.",
    subject: "Sponsorship Inquiry",
  },
  {
    icon: Users,
    label: "Recruiter Inquiry",
    description: "Access resume pools and post opportunities to members.",
    subject: "Recruiter Inquiry",
  },
  {
    icon: FlaskConical,
    label: "Research Collaboration",
    description:
      "Faculty and labs looking to collaborate with student teams.",
    subject: "Research Collaboration",
  },
  {
    icon: Handshake,
    label: "Alumni Mentorship",
    description: "Give back — mentor current members or speak at an event.",
    subject: "Alumni Mentorship",
  },
];

export default function ContactPage() {
  return (
    <SiteChrome>
      <section className="relative pb-8 pt-36 md:pt-44">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-gpu">
              /// CONTACT
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-textPrimary sm:text-5xl md:text-6xl">
              Let&apos;s talk.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-textSecondary">
              Route your message to the right officer — we respond within 48
              hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="relative border-t border-line py-16 md:py-24"
        aria-label="Inquiry tracks"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((track, i) => (
              <Reveal key={track.label} delay={(i % 3) * 0.08} as="li">
                <GlassCard className="flex h-full flex-col p-6" corners beam>
                  <span className="grid h-11 w-11 place-items-center rounded-md border border-line bg-graphite text-gpu">
                    <track.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-textPrimary">
                    {track.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-textSecondary">
                    {track.description}
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                      `UH PCS — ${track.subject}`
                    )}`}
                    className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-textMuted transition-colors hover:text-mint"
                  >
                    Email us →
                  </a>
                </GlassCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </SiteChrome>
  );
}
