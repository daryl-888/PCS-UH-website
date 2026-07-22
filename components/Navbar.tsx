"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, Github, Menu, X, ChevronRight } from "lucide-react";
import { navLinks, GITHUB_URL, MEMBERSHIP_FORM_URL } from "@/data/nav";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Navbar opacity increases once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the command palette is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-line backdrop-blur-md transition-colors duration-300",
          scrolled ? "bg-obsidian/85" : "bg-obsidian/45"
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6 lg:px-10"
          aria-label="Primary"
        >
          {/* Left: identity */}
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-md border border-lineActive bg-panel text-gpu shadow-glow">
              <Cpu className="h-4 w-4" aria-hidden />
            </span>
            <span className="font-display text-sm font-bold tracking-[0.14em] text-textPrimary">
              UH PCS
            </span>
            <span className="hidden items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-gpu sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gpu" />
              [SYSTEM.ONLINE]
            </span>
          </Link>

          {/* Center: links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative rounded-sm px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
                      isActive
                        ? "text-mint"
                        : "text-textSecondary hover:text-textPrimary"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-[1px] h-px bg-gpu shadow-glowStrong"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: CTAs */}
          <div className="flex items-center gap-2.5">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UH PCS on GitHub"
              className="hidden h-9 w-9 items-center justify-center rounded-md border border-line text-textSecondary transition-colors hover:border-lineActive hover:text-mint sm:flex"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={MEMBERSHIP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md border border-lineActive bg-gpu/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mint transition-all hover:bg-gpu/25 hover:shadow-glow sm:block"
            >
              Become a Member
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-textPrimary lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <Menu className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile: full-screen command palette */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-obsidian/97 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-4 sm:px-6">
              <span className="font-mono text-[11px] tracking-[0.24em] text-gpu">
                » RUN: NAVIGATE --TARGET
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-textPrimary"
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-6 sm:px-6" aria-label="Mobile">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-md border border-transparent px-4 py-4 transition-colors hover:border-line hover:bg-panel"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-textMuted">
                          {link.cmd}
                        </span>
                        <span className="font-display text-2xl font-bold uppercase tracking-tight text-textPrimary group-hover:text-mint">
                          {link.label}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-4 w-4 text-textMuted group-hover:text-gpu"
                        aria-hidden
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-line px-6 py-5">
              <a
                href={MEMBERSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-md border border-lineActive bg-gpu/15 px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-mint"
              >
                Become a Member
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
