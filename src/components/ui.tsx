"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

/** Bouton « magnétique » : il suit légèrement le curseur puis revient en place. */
export function MagneticButton({
  children,
  className = "",
  strength = 0.28,
  ...props
}: HTMLMotionProps<"button"> & { strength?: number; children: ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });

  function onMove(e: MouseEvent<HTMLButtonElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      style={{ x, y }}
      className={`shine inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-shadow ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/** Pose les coordonnées de la souris dans --mx / --my pour l'effet .spotlight */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Apparition au défilement (scroll reveal) */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase ${
        dark ? "border-white/15 bg-white/5 text-white/80" : "border-brand-500/20 bg-brand-500/5 text-brand-600"
      }`}
    >
      <span className={`size-1.5 rounded-full ${dark ? "bg-mint-400" : "bg-brand-500"}`} />
      {children}
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <defs>
          <linearGradient id="lg-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5B5BF7" />
            <stop offset="1" stopColor="#FF8A3D" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#lg-logo)" />
        <path d="M7.5 15.5 16 8.5l8.5 7" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14.2" y="15" width="3.6" height="9" rx="1.8" fill="#fff" />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">
        Immo<span className="text-sun-500">Topia</span>
      </span>
    </span>
  );
}

export { fcfa as formatFcfa } from "@/lib/format";
