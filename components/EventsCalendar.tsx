"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TerminalCard from "@/components/TerminalCard";
import { roadmapEvents, categoryTone, type RoadmapEvent } from "@/data/roadmap";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/** Defaults the calendar to the month of the first dated roadmap event. */
function initialMonth(): { year: number; month: number } {
  const dated = roadmapEvents.find((event) => event.date);
  if (!dated?.date) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }
  const [year, month] = dated.date.split("-").map(Number);
  return { year, month: month - 1 };
}

/** Full weeks (Sun–Sat) covering `month`, padded with adjacent-month days. */
function buildWeeks(year: number, month: number) {
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: { date: Date; inMonth: boolean }[] = [];

  for (let i = startWeekday; i > 0; i--) {
    cells.push({ date: new Date(year, month, 1 - i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const next = new Date(cells[cells.length - 1].date);
    next.setDate(next.getDate() + 1);
    cells.push({ date: next, inMonth: false });
  }

  const weeks: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/** Hover target for a single day's event — the popover reads time/location/
 *  description straight off RoadmapEvent, falling back to placeholders
 *  until the club publishes real details for that session. */
function EventPill({ event }: { event: RoadmapEvent }) {
  return (
    <div className="group/pill relative">
      <p
        className="flex cursor-default items-start gap-1 truncate text-[8px] leading-tight text-textSecondary sm:text-[9px]"
      >
        <span
          className={cn("mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full", categoryTone[event.category])}
          aria-hidden
        />
        <span className="truncate">{event.title}</span>
      </p>
      <div className="pointer-events-none absolute left-1/2 top-full z-30 mt-1.5 w-56 -translate-x-1/2 rounded-md border border-lineActive bg-black p-3 opacity-0 shadow-glow transition-opacity duration-150 group-hover/pill:opacity-100">
        <p className="font-mono text-[10px] tracking-[0.16em] text-gpu">{event.title}</p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-textMuted">
          {event.category}
        </p>
        <dl className="mt-2 space-y-1 font-mono text-[10px] text-textSecondary">
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 text-textMuted">TIME</dt>
            <dd>{event.time ?? "TBA"}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 text-textMuted">LOCATION</dt>
            <dd>{event.location ?? "TBA"}</dd>
          </div>
        </dl>
        <p className="mt-2 text-[11px] leading-relaxed text-textSecondary">
          {event.description ?? "Details coming soon."}
        </p>
      </div>
    </div>
  );
}

/** Navigable month-grid view of the semester roadmap (packet "Timeline of
 *  Events") — hover an event for its detail popover. */
export default function EventsCalendar() {
  const initial = useMemo(initialMonth, []);
  const [year, setYear] = useState(initial.year);
  const [month, setMonth] = useState(initial.month);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, RoadmapEvent[]>();
    for (const event of roadmapEvents) {
      if (!event.date) continue;
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, []);

  const undated = useMemo(() => roadmapEvents.filter((e) => !e.date), []);
  const weeks = useMemo(() => buildWeeks(year, month), [year, month]);
  const todayISO = toISODate(new Date());

  const goPrev = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };
  const goNext = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <TerminalCard label="pcs://events/calendar" contentClassName="p-4 pb-10 sm:p-6 sm:pb-12" corners>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous month"
          className="grid h-8 w-8 place-items-center rounded-md border border-line text-textSecondary transition-colors hover:border-lineActive hover:text-mint"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <p className="font-display text-base font-bold text-textPrimary sm:text-lg">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next month"
          className="grid h-8 w-8 place-items-center rounded-md border border-line text-textSecondary transition-colors hover:border-lineActive hover:text-mint"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-textMuted sm:text-[10px]">
        {WEEKDAYS.map((day) => (
          <div key={day} className="p-1.5 text-center sm:p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map(({ date, inMonth }, i) => {
          const iso = toISODate(date);
          const dayEvents = eventsByDate.get(iso) ?? [];
          const isToday = iso === todayISO;
          return (
            <div
              key={i}
              className={cn(
                "min-h-[58px] rounded-sm border border-line/60 p-1 sm:min-h-[76px] sm:p-1.5",
                !inMonth && "opacity-30",
                isToday && "border-lineActive bg-gpu/10"
              )}
            >
              <p
                className={cn(
                  "font-mono text-[9px] sm:text-[10px]",
                  isToday ? "text-mint" : "text-textMuted"
                )}
              >
                {date.getDate()}
              </p>
              <div className="mt-1 space-y-0.5">
                {dayEvents.map((event) => (
                  <EventPill key={event.id} event={event} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {undated.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-textMuted">
            Date TBD
          </p>
          <div className="flex flex-wrap gap-2">
            {undated.map((event) => (
              <span
                key={event.id}
                className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1 font-mono text-[10px] text-textSecondary"
              >
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", categoryTone[event.category])}
                  aria-hidden
                />
                {event.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </TerminalCard>
  );
}
