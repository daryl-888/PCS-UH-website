"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useIsMobile, useTabVisible } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type ParticleNetworkProps = {
  className?: string;
  /** particles per 1000x1000px of canvas area */
  density?: number;
  /** hard cap regardless of canvas size */
  maxParticles?: number;
  /** max distance (px) at which two particles draw a connecting line */
  linkDistance?: number;
  /** draws one enlarged, brighter "hub" node with dashed spokes to its nearest links — the boot-screen satellite icon */
  hub?: boolean;
  /** nudges nearby particles away from the pointer */
  interactive?: boolean;
};

type Particle = { x: number; y: number; vx: number; vy: number; r: number; hub?: boolean };

const COLORS = ["16,185,129", "110,231,183", "20,241,217"]; // gpu, mint, holo (rgb triplets)

/**
 * Lightweight Canvas2D drifting node-network — the "compute cluster" motif
 * used both full-intensity on the boot screen and as a faint ambient
 * backdrop on the landing page. Deliberately Canvas2D, not a second WebGL
 * context: the page already runs one Three.js canvas (GpuModel), and a
 * few dozen 2D dots + line segments is orders of magnitude cheaper than
 * standing up another GL context for what's purely decorative motion.
 */
export default function ParticleNetwork({
  className,
  density = 0.09,
  maxParticles = 70,
  linkDistance = 150,
  hub = false,
  interactive = false,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const tabVisible = useTabVisible();
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const count = Math.min(
        Math.round((area / 1_000_000) * density * 1000 * (mobile ? 0.5 : 1)),
        mobile ? Math.round(maxParticles * 0.5) : maxParticles
      );

      particles = Array.from({ length: Math.max(count, 8) }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 1.1 + Math.random() * 1.3,
        hub: hub && i === 0,
      }));
      if (hub && particles[0]) {
        particles[0].x = width / 2;
        particles[0].y = height / 2;
        particles[0].vx = 0;
        particles[0].vy = 0;
        particles[0].r = 5;
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!p.hub) {
          if (interactive && pointer.current) {
            const dx = p.x - pointer.current.x;
            const dy = p.y - pointer.current.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 120 * 120) {
              const d = Math.sqrt(d2) || 1;
              p.vx += (dx / d) * 0.02;
              p.vy += (dy / d) * 0.02;
            }
          }
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.995;
          p.vy *= 0.995;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
          p.y = Math.max(0, Math.min(height, p.y));
        }
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const reach = a.hub || b.hub ? linkDistance * 1.6 : linkDistance;
          if (dist > reach) continue;
          const alpha = (1 - dist / reach) * (a.hub || b.hub ? 0.5 : 0.22);
          ctx.strokeStyle = `rgba(110,231,183,${alpha})`;
          ctx.lineWidth = a.hub || b.hub ? 1 : 0.6;
          if (a.hub || b.hub) ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // nodes
      particles.forEach((p, i) => {
        if (p.hub) {
          const pulse = 0.7 + Math.sin(t / 500) * 0.3;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(t / 4000);
          ctx.strokeStyle = `rgba(20,241,217,${0.7 * pulse})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(0, -p.r * 2);
          ctx.lineTo(p.r * 2, 0);
          ctx.lineTo(0, p.r * 2);
          ctx.lineTo(-p.r * 2, 0);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
          ctx.fillStyle = `rgba(20,241,217,${0.9 * pulse})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const color = COLORS[i % COLORS.length];
          ctx.fillStyle = `rgba(${color},0.75)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const ro = new ResizeObserver(seed);
    ro.observe(canvas);
    seed();

    // Listened on window rather than the canvas: the canvas stays
    // pointer-events-none (it's decorative, sitting over real content), so
    // it never receives its own pointer events.
    const handlePointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    if (interactive) window.addEventListener("pointermove", handlePointer);

    if (reduced) {
      draw(0);
    } else if (tabVisible) {
      const loop = (t: number) => {
        draw(t);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (interactive) window.removeEventListener("pointermove", handlePointer);
    };
  }, [density, maxParticles, linkDistance, hub, interactive, reduced, mobile, tabVisible]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none block h-full w-full", className)}
    />
  );
}
