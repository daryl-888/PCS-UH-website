"use client";

import { CalendarDays, Clock3, MapPin } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import { events } from "@/data/events";

export default function Events() {
  return (
    <section
      id="events"
      className="relative border-t border-line py-28 md:py-36"
      aria-label="Upcoming events"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            code="SEC.04 // SCHEDULER"
            title="Upcoming Compute Sessions"
            subtitle="Queued workshops, labs, and industry nights. Initialize your compute path."
          />
        </Reveal>

        <ol className="relative space-y-5 border-l border-line pl-6 sm:pl-10">
          {events.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.06} as="li">
              <div className="relative">
                {/* timeline node */}
                <span
                  aria-hidden
                  className="absolute -left-[31px] top-6 grid h-3 w-3 place-items-center sm:-left-[47px]"
                >
                  <span className="absolute h-3 w-3 animate-pulse-dot rounded-full border border-gpu bg-obsidian" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gpu" />
                </span>

                <GlassCard className="p-5 sm:p-6" beam>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-textMuted">
                        {event.id} // QUEUED
                      </p>
                      <h3 className="mt-1 font-display text-lg font-bold text-textPrimary sm:text-xl">
                        {event.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-textSecondary">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-gpu" aria-hidden />
                          {event.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5 text-gpu" aria-hidden />
                          {event.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-gpu" aria-hidden />
                          {event.location}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm border border-line px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-textMuted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href="#join"
                      className="shrink-0 rounded-md border border-lineActive bg-gpu/12 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mint transition-all hover:bg-gpu/25 hover:shadow-glow"
                    >
                      RSVP
                    </a>
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2}>
          <p className="mt-10 border-l-2 border-gpu/50 pl-4 font-mono text-xs leading-relaxed text-textMuted">
            Events are updated throughout the semester. Join UH PCS to receive
            workshop materials, announcements, and project access.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
