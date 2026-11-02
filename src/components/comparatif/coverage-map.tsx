"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { domains, products, rowsOf, scores } from "@/lib/comparatif";
import { useI18n } from "../locale-provider";
import { SmartLink } from "../smart-link";

/**
 * Carte de couverture : un domaine par ligne, un éditeur par colonne.
 * Chaque bulle se remplit selon la part des fonctions du domaine que l'éditeur annonce.
 * On lit en trois secondes où chacun est présent, puis on clique pour le détail.
 */
export function CoverageMap({ hrefFor }: { hrefFor: (domain: string) => string }) {
  const { locale, t } = useI18n();
  return (
    <div className="min-w-0 rounded-[28px] border border-white/10 bg-white/[0.035] p-3 backdrop-blur-sm sm:p-4 md:p-6">
      {/* Mobile : une carte par domaine, 4 bulles en grille 2 x 2 (pas de défilement horizontal) */}
      <ul className="grid gap-2 md:hidden">
        {domains.map((d, row) => {
          const list = rowsOf(d.id, locale);
          const s = scores(list);
          return (
            <li key={d.id} className="rounded-2xl bg-white/[0.04] p-3">
              <SmartLink href={hrefFor(d.id)} className="flex min-h-11 items-center justify-between gap-2 text-white/85 hover:text-white">
                <span className="min-w-0 text-sm font-semibold">{d.label[locale]}</span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-white/45">
                  {list.length} {t("fonctions", "features")}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </span>
              </SmartLink>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {s.map((n, i) => {
                  const ratio = list.length ? n / list.length : 0;
                  return (
                    <SmartLink
                      key={i}
                      href={hrefFor(d.id)}
                      aria-label={t(`${products[i].name} : ${n} sur ${list.length} en ${d.label.fr}`, `${products[i].name}: ${n} of ${list.length} in ${d.label.en}`)}
                      className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-xl px-2 py-1 hover:bg-white/[0.06]"
                    >
                      <span className="relative grid size-9 shrink-0 place-items-center">
                        <span className="absolute inset-0 rounded-full ring-1 ring-white/15" />
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: Math.max(ratio, 0.001) }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.03 * row + 0.05 * i, type: "spring", stiffness: 160, damping: 18 }}
                          className="absolute inset-0 rounded-full"
                          style={{ background: products[i].color, boxShadow: i === 0 ? `0 0 14px ${products[i].color}` : undefined, opacity: i === 0 ? 1 : 0.85 }}
                        />
                      </span>
                      <span className="min-w-0">
                        <span className={`block truncate text-[11px] ${i === 0 ? "font-semibold text-white" : "text-white/55"}`}>{products[i].name}</span>
                        <span className={`block text-xs tabular-nums ${i === 0 ? "font-bold text-white" : "text-white/60"}`}>
                          {n}/{list.length}
                        </span>
                      </span>
                    </SmartLink>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[520px] border-separate border-spacing-y-1.5 text-left">
        <caption className="sr-only">{t("Part des fonctions annoncées par domaine et par éditeur", "Share of advertised features by domain and by vendor")}</caption>
        <thead>
          <tr className="text-xs text-white/55">
            <th className="pb-2 font-medium">{t("Domaine", "Domain")}</th>
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
            const list = rowsOf(d.id, locale);
            const s = scores(list);
            return (
              <tr key={d.id} className="group">
                <th scope="row" className="rounded-l-xl py-1.5 pr-3 font-normal group-hover:bg-white/[0.04]">
                  <SmartLink href={hrefFor(d.id)} className="inline-flex items-center gap-1.5 pl-2 text-sm font-semibold text-white/85 hover:text-white">
                    {d.label[locale]}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </SmartLink>
                  <span className="block pl-2 text-[11px] text-white/40">{list.length} {t("fonctions", "features")}</span>
                </th>
                {s.map((n, i) => {
                  const ratio = list.length ? n / list.length : 0;
                  return (
                    <td key={i} className={`py-1.5 text-center group-hover:bg-white/[0.04] ${i === 3 ? "rounded-r-xl" : ""}`}>
                      <SmartLink href={hrefFor(d.id)} aria-label={t(`${products[i].name} : ${n} sur ${list.length} en ${d.label.fr}`, `${products[i].name}: ${n} of ${list.length} in ${d.label.en}`)} className="inline-flex flex-col items-center gap-1">
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
    </div>
  );
}
