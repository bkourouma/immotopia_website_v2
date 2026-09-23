import type { ReactNode } from "react";

/** Bandeau sombre en tête des pages secondaires (le menu est conçu pour un fond sombre). */
export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pt-36 pb-16 text-center text-white md:pb-20">
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_70%)]" />
      <div aria-hidden className="absolute top-10 left-1/2 -z-10 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500/40 to-sun-500/25 blur-[130px]" />
      <div className="mx-auto max-w-4xl px-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/80 uppercase backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-mint-400" /> {eyebrow}
        </span>
        <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl">{title}</h1>
        {children && <div className="mx-auto mt-5 max-w-2xl text-lg text-white/65">{children}</div>}
      </div>
    </section>
  );
}
