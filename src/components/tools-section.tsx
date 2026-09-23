import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolsGrid } from "./tools/tools-grid";
import { Eyebrow } from "./ui";

/** Section « Outils gratuits » de la page d'accueil */
export function ToolsSection() {
  return (
    <section id="outils" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Outils gratuits</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl">
              Essayez avant même <span className="text-gradient-dark">de nous parler.</span>
            </h2>
            <p className="mt-5 text-lg text-ink-900/60">Quittances, baux et calculateurs, gratuits et sans inscription.</p>
          </div>
          <Link
            href="/outils"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-900/15 px-5 py-3 text-sm font-semibold transition hover:bg-ink-900 hover:text-white"
          >
            Tous les outils <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-12">
          <ToolsGrid />
        </div>
      </div>
    </section>
  );
}
