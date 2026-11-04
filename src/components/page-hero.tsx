import type { ReactNode } from "react";

/** Bandeau sombre en tête des pages secondaires (le menu est conçu pour un fond sombre). */
export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pt-28 pb-14 text-center text-white sm:pt-36 sm:pb-16 md:pb-20">
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_70%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[720px] w-[1200px] -translate-x-1/2" style={{ background: "radial-gradient(closest-side, rgba(91,91,247,0.3), rgba(255,138,61,0.1) 55%, transparent)" }} />
      <div className="mx-auto max-w-4xl px-4 sm:px-5">
        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.1em] sm:text-xs sm:tracking-[0.14em] text-white/80 uppercase backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-mint-400" /> {eyebrow}
        </span>
        <h1 className="mt-6 font-display text-3xl leading-[1.1] font-bold tracking-tight text-balance sm:text-4xl md:text-6xl sm:leading-[1.05]">{title}</h1>
        {children && <div className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-white/65">{children}</div>}
      </div>
    </section>
  );
}
