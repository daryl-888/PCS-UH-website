import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import Reveal from "@/components/Reveal";
import Events from "@/components/Events";
import EventsCalendar from "@/components/EventsCalendar";

export const metadata: Metadata = {
  title: "Events — UH PCS",
  description: "Upcoming UH PCS workshops, hackathons, and info sessions.",
};

export default function EventsPage() {
  return (
    <SiteChrome>
      <section className="relative pb-8 pt-36 md:pt-44">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-gpu">
              /// EVENTS
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-textPrimary sm:text-5xl md:text-6xl">
              Plan your semester.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-textSecondary">
              Workshops, hackathons, and industry nights — updated every
              semester.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="relative border-t border-line py-16 md:py-24"
        aria-label="Semester calendar"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-gpu">
              SEC.03 // ROADMAP
            </p>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-textPrimary sm:text-3xl">
              Fall 2026 Calendar
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-textSecondary">
              The full semester roadmap — UH events, general meetings,
              workshops, and professional-development sessions, by date.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            <EventsCalendar />
          </Reveal>
        </div>
      </section>

      <Events />
    </SiteChrome>
  );
}
