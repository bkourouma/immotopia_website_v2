"use client";

import { motion } from "framer-motion";
import { Building2, Download, Home, Loader2, Percent, Receipt, ShieldCheck, Store, TrendingUp } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { downloadPdf, type Block, type Doc } from "@/lib/document";
import type { ToolMeta } from "@/lib/tools";
import { useI18n } from "../locale-provider";
import { useDemo } from "../providers";
import { MagneticButton } from "../ui";

export function ToolIcon({ name, className = "size-5" }: { name: ToolMeta["icon"]; className?: string }) {
  const I = {
    receipt: Receipt,
    home: Home,
    store: Store,
    shield: ShieldCheck,
    trending: TrendingUp,
    percent: Percent,
    building: Building2,
  }[name];
  return <I className={className} />;
}

/* ------------------------------------------------------------------ champs */

const inputCls =
  "w-full rounded-xl border border-ink-900/10 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 outline-none transition placeholder:text-ink-900/30 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15";

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[24px] border border-ink-900/[0.07] bg-white p-5 shadow-sm md:p-6 ${className}`}>
      {title && <h2 className="mb-4 font-display text-lg font-bold">{title}</h2>}
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function Text({
  label,
  value,
  onChange,
  placeholder,
  wide,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  wide?: boolean;
  type?: "text" | "date" | "month";
}) {
  const id = useId();
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-900/70">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        maxLength={160}
        className={inputCls}
      />
    </div>
  );
}

/** Champ numérique avec séparateur de milliers et unité (FCFA, %, mois…) */
export function Num({
  label,
  value,
  onChange,
  suffix = "FCFA",
  wide,
  hint,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  wide?: boolean;
  hint?: string;
  step?: number;
}) {
  const id = useId();
  const decimals = step !== undefined && step < 1;
  const shown = decimals ? String(value) : value ? value.toLocaleString("fr-FR").replace(/[\u202f\u00a0]/g, " ") : "";
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-900/70">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          inputMode={decimals ? "decimal" : "numeric"}
          value={shown}
          placeholder="0"
          onChange={(e) => {
            const raw = e.target.value.replace(/\s/g, "").replace(",", ".");
            const n = decimals ? parseFloat(raw) : parseInt(raw.replace(/\D/g, ""), 10);
            onChange(Number.isFinite(n) ? Math.max(0, n) : 0);
          }}
          className={`${inputCls} pr-16 tabular-nums`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm font-medium text-ink-900/40">
          {suffix}
        </span>
      </div>
      {hint && <p className="mt-1 text-xs text-ink-900/45">{hint}</p>}
    </div>
  );
}

export function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
  wide,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  wide?: boolean;
}) {
  return (
    <fieldset className={wide ? "sm:col-span-2" : ""}>
      <legend className="mb-1.5 text-sm font-medium text-ink-900/70">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            type="button"
            key={o.value}
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium transition ${
              value === o.value
                ? "border-ink-900 bg-ink-900 text-white"
                : "border-ink-900/10 bg-white text-ink-900/70 hover:border-ink-900/30"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/* ------------------------------------------------------------------ résultats */

export function Stat({ label, value, highlight, sub }: { label: string; value: string; highlight?: boolean; sub?: string }) {
  return (
    <motion.div
      layout
      className={`rounded-2xl p-4 ${highlight ? "bg-ink-900 text-white shadow-[0_20px_50px_-20px_rgba(91,91,247,0.8)]" : "bg-white ring-1 ring-ink-900/[0.07]"}`}
    >
      <p className={`text-xs font-medium ${highlight ? "text-white/60" : "text-ink-900/50"}`}>{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0.4, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1 font-display text-2xl font-bold tabular-nums"
      >
        {value}
      </motion.p>
      {sub && <p className={`mt-0.5 text-xs ${highlight ? "text-white/50" : "text-ink-900/45"}`}>{sub}</p>}
    </motion.div>
  );
}

export function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-2.5 text-sm ${strong ? "font-semibold" : "text-ink-900/70"}`}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

export function Warning({ children }: { children: ReactNode }) {
  return <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">{children}</p>;
}

/* ------------------------------------------------------------------ documents */

export function DocPreview({ blocks }: { blocks: Block[] }) {
  return (
    <div className="rounded-[20px] bg-white p-6 text-[13px] leading-relaxed text-ink-900 shadow-[0_30px_80px_-30px_rgba(20,23,41,0.45)] ring-1 ring-ink-900/[0.06] md:p-9">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "title":
            return (
              <div key={i} className="mb-6 text-center">
                <p className="font-display text-xl font-bold tracking-wide uppercase">{b.text}</p>
                {b.sub && <p className="mt-1 text-xs text-ink-900/55">{b.sub}</p>}
                <span className="mx-auto mt-3 block h-0.5 w-14 rounded bg-brand-500" />
              </div>
            );
          case "h":
            return (
              <p key={i} className="mt-5 mb-1.5 font-semibold">
                {b.text}
              </p>
            );
          case "p":
            return (
              <p key={i} className="mb-2 whitespace-pre-line text-ink-900/80">
                {b.text}
              </p>
            );
          case "note":
            return (
              <p key={i} className="mt-3 text-[11px] text-ink-900/50 italic">
                {b.text}
              </p>
            );
          case "parties":
            return (
              <div key={i} className="mb-4 grid gap-3 sm:grid-cols-2">
                {[b.left, b.right].map((p) => (
                  <div key={p.label} className="rounded-xl bg-[#f5f5fc] p-3.5">
                    <p className="text-[10px] font-bold tracking-wider text-brand-600 uppercase">{p.label}</p>
                    {p.lines.map((l, j) => (
                      <p key={j} className={j === 0 ? "font-semibold" : "text-ink-900/65"}>
                        {l}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            );
          case "table":
            return (
              <div key={i} className="mb-4">
                {b.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-ink-900/[0.07] px-2 py-2">
                    <span>{k}</span>
                    <span className="tabular-nums">{v}</span>
                  </div>
                ))}
                {b.total && (
                  <div className="mt-1.5 flex justify-between rounded-lg bg-ink-900 px-3 py-2.5 font-semibold text-white">
                    <span>{b.total[0]}</span>
                    <span className="tabular-nums">{b.total[1]}</span>
                  </div>
                )}
              </div>
            );
          case "sign":
            return (
              <div key={i} className="mt-6">
                <p>{b.place}</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[b.left, b.right]
                    .filter((s): s is string => !!s)
                    .map((s) => (
                      <div key={s}>
                        <p className="font-semibold">{s}</p>
                        <p className="text-[11px] text-ink-900/45 italic">Signature précédée de « Lu et approuvé »</p>
                        <div className="mt-3 h-14 rounded-lg border border-dashed border-ink-900/15" />
                      </div>
                    ))}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}

export function DownloadButton({ doc, label }: { doc: Doc; label?: string }) {
  const { t } = useI18n();
  const [busy, setBusy] = useState(false);
  return (
    <MagneticButton
      strength={0.15}
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await downloadPdf(doc);
        } finally {
          setBusy(false);
        }
      }}
      className="w-full bg-gradient-to-r from-brand-500 to-brand-600 py-4 text-white shadow-[0_14px_40px_-12px_rgba(91,91,247,0.9)] disabled:opacity-70"
    >
      {busy ? <Loader2 className="size-5 animate-spin" /> : <Download className="size-5" />}
      {label ?? t("Télécharger le PDF", "Download PDF")}
    </MagneticButton>
  );
}

/** En anglais uniquement : rappelle que le document généré reste en français (langue juridique ivoirienne). */
export function DocLanguageNote() {
  const { locale } = useI18n();
  if (locale !== "en") return null;
  return (
    <p className="rounded-xl bg-brand-500/[0.07] px-4 py-3 text-sm text-ink-900/70 ring-1 ring-brand-500/15">
      The document is generated in French, the legal language in Côte d&apos;Ivoire.
    </p>
  );
}

/** Encart de conversion affiché sous chaque outil */
export function UpsellCta({ text }: { text: string }) {
  const { open } = useDemo();
  const { t } = useI18n();
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-ink-950 p-6 text-white">
      <div aria-hidden className="absolute -top-16 -right-10 size-48 rounded-full bg-brand-500/40 blur-3xl" />
      <p className="relative font-display text-lg leading-snug font-bold">{text}</p>
      <button
        onClick={open}
        className="shine relative mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950"
      >
        {t("Demander une démonstration", "Request a demo")}
      </button>
    </div>
  );
}
