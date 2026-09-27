"use client";

import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SmartLink } from "@/components/smart-link";
import type { WikiSearchEntry } from "@/lib/wiki";

const plain = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

const MAX = 12;

/** Recherche instantanée dans les titres des fonctionnalités et des actions du wiki. */
export function WikiSearch({ entries }: { entries: WikiSearchEntry[] }) {
  const [query, setQuery] = useState("");
  const searching = query.trim().length > 0;
  const results = useMemo(() => {
    const words = plain(query).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    const hits = entries.filter((e) => {
      const text = plain(`${e.title} ${e.context}`);
      return words.every((w) => text.includes(w));
    });
    // Les pages de fonctionnalité d'abord, puis les actions
    return hits.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "fonctionnalite" ? -1 : 1));
  }, [entries, query]);

  return (
    <div className="mx-auto mt-8 max-w-2xl text-left">
      <label className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 backdrop-blur-md focus-within:border-white/40">
        <Search className="size-5 shrink-0 text-white/50" aria-hidden />
        <span className="sr-only">Rechercher une fonctionnalité</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher : quittance, état des lieux, appel de charges…"
          className="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
        />
      </label>
      {searching && (
        <div className="mt-2 overflow-hidden rounded-2xl bg-white text-ink-900 shadow-[0_24px_60px_-20px_rgba(5,7,15,0.6)] ring-1 ring-ink-900/10">
          {results.length === 0 ? (
            <p className="px-5 py-4 text-sm text-ink-900/60">
              {`Aucun résultat pour « ${query.trim()} ». Essayez un autre mot, ou posez la question à l'équipe en démonstration.`}
            </p>
          ) : (
            <ul className="max-h-[360px] divide-y divide-ink-900/[0.06] overflow-y-auto">
              {results.slice(0, MAX).map((r) => (
                <li key={r.href}>
                  <SmartLink href={r.href} className="group flex items-center justify-between gap-4 px-5 py-3 hover:bg-paper">
                    <span>
                      <span className="block text-sm font-semibold">{r.title}</span>
                      <span className="block text-xs text-ink-900/50">
                        {r.kind === "fonctionnalite" ? "Fonctionnalité · " : ""}
                        {r.context}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-ink-900/30 transition group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden />
                  </SmartLink>
                </li>
              ))}
            </ul>
          )}
          {results.length > MAX && (
            <p className="border-t border-ink-900/[0.06] px-5 py-2.5 text-xs text-ink-900/50">
              {results.length - MAX} autres résultats : précisez votre recherche.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
