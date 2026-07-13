import Reveal from "@/components/Reveal";
import { LINKS } from "@/data/site";

/** Minimal anchor for the Events nav link — one calm line, no clutter. */
export default function EventsStrip() {
  return (
    <section id="events" aria-label="Events" className="relative py-6">
      <div className="mx-auto max-w-wide px-6 lg:px-12">
        <Reveal>
          <div className="circuit-divider" aria-hidden />
          <div className="flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-textMuted">
              Events — workshops, hackathons &amp; info sessions announced each semester
            </p>
            <a
              href={LINKS.discord}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-pcs transition-colors hover:text-pcsBright"
            >
              Get announcements →
            </a>
          </div>
          <div className="circuit-divider" aria-hidden />
        </Reveal>
      </div>
    </section>
  );
}
