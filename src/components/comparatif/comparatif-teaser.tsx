"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { comparatifHref, domains, products, rows, rowsOf, scores } from "@/lib/comparatif";
import { SmartLink } from "../smart-link";
import { Eyebrow, Reveal, trackSpotlight } from "../ui";

/** Section « Comparatif » de l'accueil : une tuile par domaine, chacune ouvre sa section sur /comparatif. */
export function ComparatifTeaser() {
  const total = scores();
  return (
    <section id="comparatif" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <Eyebrow>Comparatif</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl">
              Comparez <span className="text-gradient-dark">avant de choisir.</span>
            </h2>
            <p className="mt-5 text-lg text-ink-900/60">
              {rows.length} fonctionnalités, face à ChezvousBO, Logestimmo et WIMMO, d&apos;après ce que chaque éditeur annonce publiquement.
            </p>
          </Reveal>
          <SmartLink
            href={comparatifHref()}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-900/15 px-5 py-3 text-sm font-semibold transition hover:bg-ink-900 hover:text-white"
          >
            Tout le comparatif <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </SmartLink>
        </div>

        <Reveal delay={0.05} className="mt-10 flex flex-wrap gap-2">
          {products.map((p, i) => (
            <span key={p.id} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${i === 0 ? "bg-ink-900 text-white" : "bg-white text-ink-900/70 ring-1 ring-ink-900/10"}`}>
              <span className="size-2 rounded-full" style={{ background: p.color }} />
              {p.name}
              <strong className="tabular-nums">{total[i]}</strong>
              <span className={i === 0 ? "text-white/50" : "text-ink-900/40"}>/ {rows.length}</span>
            </span>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((d, k) => {
            const list = rowsOf(d.id);
            const s = scores(list);
            const best = Math.max(...s.slice(1));
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.03 * k, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <SmartLink
                  href={comparatifHref(d.id)}
                  onMouseMove={trackSpotlight}
                  className="spotlight group flex h-full flex-col rounded-2xl border border-ink-900/[0.07] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="relative flex items-start justify-between gap-2">
                    <span className="font-semibold">{d.label}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-ink-900/30 transition group-hover:text-brand-600" />
                  </span>
                  <span className="relative mt-1 text-xs text-ink-900/50">{d.pitch}</span>
                  <span className="relative mt-auto space-y-1.5 pt-4 text-[11px]">
                    <Bar label="ImmoTopia" value={s[0]} max={list.length} color={products[0].color} strong />
                    <Bar label="Meilleur concurrent" value={best} max={list.length} color="#94a3b8" />
                  </span>
                </SmartLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Bar({ label, value, max, color, strong }: { label: string; value: number; max: number; color: string; strong?: boolean }) {
  return (
    <span className="block">
      <span className="flex justify-between text-ink-900/55">
        <span className={strong ? "font-semibold text-ink-900/80" : ""}>{label}</span>
        <span className="tabular-nums">
          {value}/{max}
        </span>
      </span>
      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-ink-900/[0.06]">
        <span className="block h-full rounded-full" style={{ width: `${max ? (value / max) * 100 : 0}%`, background: color }} />
      </span>
    </span>
  );
}
