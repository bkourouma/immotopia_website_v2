"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { domains, products, rowsOf, scores } from "@/lib/comparatif";
import { SmartLink } from "../smart-link";

/**
 * Carte de couverture : un domaine par ligne, un éditeur par colonne.
 * Chaque bulle se remplit selon la part des fonctions du domaine que l'éditeur annonce.
 * On lit en trois secondes où chacun est présent, puis on clique pour le détail.
 */
export function CoverageMap({ hrefFor }: { hrefFor: (domain: string) => string }) {
  return (
    <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm md:p-6">
      <table className="w-full min-w-[520px] border-separate border-spacing-y-1.5 text-left">
        <caption className="sr-only">Part des fonctions annoncées par domaine et par éditeur</caption>
        <thead>
          <tr className="text-xs text-white/55">
            <th className="pb-2 font-medium">Domaine</th>
            {products.map((p) => (
              <th key={p.id} className="pb-2 text-center font-semibold" style={{ color: p.id === "immotopia" ? "#fff" : undefined }}>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full" style={{ background: p.color }} />
                  {p.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {domains.map((d, row) => {
            const list = rowsOf(d.id);
            const s = scores(list);
            return (
              <tr key={d.id} className="group">
                <th scope="row" className="rounded-l-xl py-1.5 pr-3 font-normal group-hover:bg-white/[0.04]">
                  <SmartLink href={hrefFor(d.id)} className="inline-flex items-center gap-1.5 pl-2 text-sm font-semibold text-white/85 hover:text-white">
                    {d.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </SmartLink>
                  <span className="block pl-2 text-[11px] text-white/40">{list.length} fonctions</span>
                </th>
                {s.map((n, i) => {
                  const ratio = list.length ? n / list.length : 0;
                  return (
                    <td key={i} className={`py-1.5 text-center group-hover:bg-white/[0.04] ${i === 3 ? "rounded-r-xl" : ""}`}>
                      <SmartLink href={hrefFor(d.id)} aria-label={`${products[i].name} : ${n} sur ${list.length} en ${d.label}`} className="inline-flex flex-col items-center gap-1">
                        <span className="relative grid size-10 place-items-center">
                          <span className="absolute inset-0 rounded-full ring-1 ring-white/15" />
                          <motion.span
                            initial={{ scale: 0 }}
                            whileInView={{ scale: Math.max(ratio, 0.001) }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.03 * row + 0.05 * i, type: "spring", stiffness: 160, damping: 18 }}
                            className="absolute inset-0 rounded-full"
                            style={{ background: products[i].color, boxShadow: i === 0 ? `0 0 18px ${products[i].color}` : undefined, opacity: i === 0 ? 1 : 0.85 }}
                          />
                        </span>
                        <span className={`text-[11px] tabular-nums ${i === 0 ? "font-bold text-white" : "text-white/50"}`}>
                          {n}/{list.length}
                        </span>
                      </SmartLink>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
