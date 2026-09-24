"use client";

import { Check, Clock3, Minus, X } from "lucide-react";
import { statusMeta, type Status } from "@/lib/comparatif";
import { useLocale } from "../locale-provider";

const tone: Record<Status, string> = {
  oui: "bg-emerald-500 text-white ring-emerald-500",
  partiel: "bg-amber-100 text-amber-700 ring-amber-300",
  nd: "bg-transparent text-ink-900/40",
  absent: "bg-rose-50 text-rose-600 ring-rose-200",
  verif: "bg-slate-50 text-slate-500 ring-slate-200",
};

/** Pastille de statut : la forme dit autant que la couleur (lisible sans distinguer les couleurs). */
export function StatusDot({ status, size = "md" }: { status: Status; size?: "sm" | "md" }) {
  const s = size === "sm" ? "size-6" : "size-8";
  const i = size === "sm" ? "size-3.5" : "size-4";
  const meta = statusMeta[useLocale()][status];
  return (
    <span
      title={`${meta.label} — ${meta.hint}`}
      className={`relative inline-grid shrink-0 place-items-center rounded-full ring-1 ${s} ${tone[status]} ${status === "nd" ? "border border-dashed border-ink-900/25 ring-0" : ""}`}
    >
      {status === "oui" && <Check className={i} strokeWidth={3} />}
      {status === "partiel" && <span className={`${size === "sm" ? "size-2.5" : "size-3"} rounded-full bg-[conic-gradient(currentColor_0_50%,transparent_50%)] ring-1 ring-current`} />}
      {status === "nd" && <Minus className={i} />}
      {status === "absent" && <X className={i} strokeWidth={3} />}
      {status === "verif" && <Clock3 className={i} />}
      <span className="sr-only">{meta.label}</span>
    </span>
  );
}

export function Legend({ dark = false, withVerif = false }: { dark?: boolean; withVerif?: boolean }) {
  const meta = statusMeta[useLocale()];
  const list: Status[] = withVerif ? ["oui", "partiel", "nd", "absent", "verif"] : ["oui", "partiel", "nd", "absent"];
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-xs ${dark ? "text-white/70" : "text-ink-900/60"}`}>
      {list.map((s) => (
        <li key={s} className="inline-flex items-center gap-2" title={meta[s].hint}>
          <StatusDot status={s} size="sm" />
          {meta[s].label}
        </li>
      ))}
    </ul>
  );
}
