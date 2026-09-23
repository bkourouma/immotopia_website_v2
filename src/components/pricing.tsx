"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BadgePercent, CalendarRange, Calculator, Check, ChevronDown, Gift, Minus, Sparkles, Users, Wallet } from "lucide-react";
import { useState, type ReactNode } from "react";
import { fcfa } from "@/lib/format";
import {
  agencePrice,
  ANNUAL_MONTHS,
  comboPrice,
  coverage,
  integrePrice,
  packs,
  promoteurPrice,
  syndicPrice,
  TRIAL_TEXT,
  type Pack,
} from "@/lib/pricing";
import { useDemo } from "./providers";
import { Eyebrow, MagneticButton, Reveal, trackSpotlight } from "./ui";

type Billing = "monthly" | "annual";

const perks = [
  { icon: Wallet, text: "Aucune commission sur vos loyers" },
  { icon: Users, text: "Propriétaires, locataires et collaborateurs non facturés" },
  { icon: Gift, text: "Premier mois offert, sans engagement" },
  { icon: CalendarRange, text: "Annuel : 12 mois pour le prix de 11" },
  { icon: BadgePercent, text: "Packs combinables : −10 %" },
];

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const { open } = useDemo();

  return (
    <section id="tarifs" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Tarifs</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl">
            Un pack par métier, <span className="text-gradient-dark">sans surprise.</span>
          </h2>
          <p className="mt-5 text-lg text-ink-900/60">
            Vous payez le processus de votre métier, pas une liste de menus. Et si votre activité s&apos;élargit, les packs se combinent.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-6">
          <BillingToggle value={billing} onChange={setBilling} />
          <ul className="flex flex-wrap justify-center gap-2">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm text-ink-900/70 ring-1 ring-ink-900/[0.07]">
                <Icon className="size-4 text-brand-600" /> {text}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
          {packs.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <PackCard pack={p} billing={billing} onCta={open} />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink-900/60">
          Prix hors taxes. Premier mois d&apos;abonnement offert sur tous les packs, résiliable à tout moment. Mise en route facultative si vous préparez et saisissez vos données vous-même. WhatsApp facturé à la
          consommation. Au-delà des capacités indiquées, devis sur mesure.
        </p>

        <Comparison />
        <Simulator billing={billing} />
      </div>
    </section>
  );
}

function BillingToggle({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  return (
    <div role="radiogroup" aria-label="Période de facturation" className="inline-flex rounded-full border border-ink-900/10 bg-white p-1.5 shadow-sm">
      {(
        [
          ["monthly", "Mensuel"],
          ["annual", "Annuel"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          role="radio"
          aria-checked={value === id}
          onClick={() => onChange(id)}
          className={`relative cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${value === id ? "text-white" : "text-ink-900/60 hover:text-ink-900"}`}
        >
          {value === id && <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
          <span className="relative flex items-center gap-2">
            {label}
            {id === "annual" && <span className="rounded-full bg-mint-400 px-2 py-0.5 text-[10px] font-bold text-ink-950">12 MOIS POUR 11</span>}
          </span>
        </button>
      ))}
    </div>
  );
}

function Price({ monthly, billing, dark }: { monthly: number; billing: Billing; dark?: boolean }) {
  const amount = billing === "monthly" ? monthly : monthly * ANNUAL_MONTHS;
  const muted = dark ? "text-white/50" : "text-ink-900/45";
  return (
    <div className="mt-6 min-h-[88px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={billing} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
          <p className="font-display text-[2rem] leading-none font-bold tracking-tight tabular-nums">{fcfa(amount).replace(" FCFA", "")}</p>
          <p className={`mt-1.5 text-sm ${muted}`}>FCFA HT / {billing === "monthly" ? "mois" : "an"}</p>
          {billing === "annual" && <p className={`mt-1 text-xs ${muted}`}>soit {fcfa(Math.round(amount / 12))} / mois</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PackCard({ pack, billing, onCta }: { pack: Pack; billing: Billing; onCta: () => void }) {
  const dark = !!pack.featured;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      onMouseMove={dark ? undefined : trackSpotlight}
      className={`relative flex h-full flex-col rounded-[28px] p-7 ${
        dark
          ? "glow-border text-white shadow-[0_40px_120px_-30px_rgba(91,91,247,0.8)]"
          : "spotlight border border-ink-900/[0.08] bg-white shadow-sm transition-shadow hover:shadow-xl"
      }`}
    >
      {dark && (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-sun-500 px-4 py-1.5 text-xs font-bold whitespace-nowrap">
          <Sparkles className="size-3.5" /> Tout inclus
        </span>
      )}
      <div className="relative flex flex-1 flex-col">
        {/* hauteur réservée : les prix restent alignés même si le nom passe sur deux lignes */}
        <div className="lg:min-h-[112px]">
          <h3 className="font-display text-2xl leading-tight font-bold">{pack.name}</h3>
          <p className={`mt-1.5 text-sm ${dark ? "text-white/60" : "text-ink-900/55"}`}>{pack.audience}</p>
        </div>
        <Price monthly={pack.monthly} billing={billing} dark={dark} />
        <p className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${dark ? "bg-mint-400/15 text-mint-400" : "bg-emerald-50 text-emerald-700"}`}>
          <Gift className="size-3.5" /> {TRIAL_TEXT}
        </p>
        <div className={`mt-4 rounded-xl p-3 text-xs ${dark ? "bg-white/[0.06] text-white/75" : "bg-brand-500/[0.06] text-ink-900/70"}`}>
          <p className="font-semibold">Inclus : {pack.included}</p>
          <p className="mt-1 opacity-80">{pack.extension}</p>
        </div>
        <ul className="mt-6 flex-1 space-y-2.5">
          {pack.highlights.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <span className={`mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full ${dark ? "bg-mint-400 text-ink-950" : "bg-brand-500/10 text-brand-600"}`}>
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span className={dark ? "text-white/85" : "text-ink-900/75"}>{f}</span>
            </li>
          ))}
        </ul>
        <MagneticButton
          onClick={onCta}
          strength={0.18}
          className={`mt-7 w-full py-3.5 text-sm ${dark ? "bg-white text-ink-950 hover:shadow-[0_0_40px_-6px_rgba(255,255,255,0.6)]" : "bg-ink-900 text-white hover:bg-ink-800"}`}
        >
          Demander une démonstration
        </MagneticButton>
        <p className={`mt-3 text-center text-[11px] ${dark ? "text-white/45" : "text-ink-900/40"}`}>
          Mise en route accompagnée : {fcfa(pack.setup)} HT
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ tableau comparatif */

function Comparison() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-14">
      <div className="flex justify-center">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink-900/15 bg-white px-5 py-3 text-sm font-semibold transition hover:border-ink-900/40"
        >
          Comparer les packs en détail
          <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 overflow-x-auto rounded-[24px] bg-white ring-1 ring-ink-900/[0.07]">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-ink-900/[0.07] text-left">
                    <th className="p-4 font-medium text-ink-900/50">Domaine fonctionnel</th>
                    {packs.map((p) => (
                      <th key={p.id} className={`p-4 text-center font-display font-bold ${p.featured ? "text-brand-600" : ""}`}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverage.map(([label, ...cells]) => (
                    <tr key={label} className="border-b border-ink-900/[0.05] last:border-0 hover:bg-brand-500/[0.03]">
                      <td className="p-4 text-ink-900/75">{label}</td>
                      {cells.map((ok, i) => (
                        <td key={i} className={`p-4 text-center ${i === 3 ? "bg-brand-500/[0.04]" : ""}`}>
                          {ok ? (
                            <Check className="mx-auto size-4.5 text-emerald-600" strokeWidth={3} aria-label="Inclus" />
                          ) : (
                            <Minus className="mx-auto size-4 text-ink-900/20" aria-label="Non inclus" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ simulateur */

type Trade = "agence" | "syndic" | "promoteur";

function Simulator({ billing }: { billing: Billing }) {
  const [trades, setTrades] = useState<Trade[]>(["agence"]);
  const [units, setUnits] = useState(180);
  const [copros, setCopros] = useState(2);
  const [coproLots, setCoproLots] = useState(140);
  const [sites, setSites] = useState(3);
  const [programLots, setProgramLots] = useState(120);

  const toggle = (t: Trade) => setTrades((ts) => (ts.includes(t) ? (ts.length > 1 ? ts.filter((x) => x !== t) : ts) : [...ts, t]));
  const has = (t: Trade) => trades.includes(t);

  const lines: [string, number][] = [];
  if (has("agence")) lines.push([`Agence · ${units} logements`, agencePrice(units)]);
  if (has("syndic")) lines.push([`Syndic · ${copros} copropriétés, ${coproLots} lots`, syndicPrice(copros, coproLots)]);
  if (has("promoteur")) lines.push([`Promoteur · ${sites} chantiers, ${programLots} lots`, promoteurPrice(sites, programLots)]);
  const combo = comboPrice(lines.map(([, p]) => p));

  // Avec les trois métiers, on compare au forfait intégré (lots comptés sans dédoublonnage : estimation haute)
  const integrated = trades.length === 3 ? integrePrice(sites, copros, units + coproLots + programLots) : null;
  const useIntegrated = integrated !== null && integrated < combo.total;
  const monthly = useIntegrated ? integrated! : combo.total;
  const shown = billing === "monthly" ? monthly : monthly * ANNUAL_MONTHS;

  return (
    <div className="mt-16 overflow-hidden rounded-[32px] bg-ink-950 text-white">
      <div className="grid lg:grid-cols-[1.2fr_1fr]">
        <div className="p-7 md:p-10">
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-mint-400 uppercase">
            <Calculator className="size-4" /> Simulateur
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold">Estimez votre abonnement</h3>
          <p className="mt-2 text-white/60">Choisissez vos métiers et vos volumes.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(
              [
                ["agence", "Gestion locative"],
                ["syndic", "Syndic"],
                ["promoteur", "Promotion"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => toggle(id)}
                aria-pressed={has(id)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 transition ${
                  has(id) ? "bg-white text-ink-950 ring-white" : "bg-white/5 text-white/70 ring-white/15 hover:bg-white/10"
                }`}
              >
                {has(id) && <Check className="mr-1 inline size-3.5" strokeWidth={3} />}
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <AnimatePresence initial={false}>
              {has("agence") && (
                <Field key="u" label="Logements sous mandat de gestion" value={units} onChange={setUnits} max={2000} />
              )}
              {has("syndic") && <Field key="c" label="Copropriétés actives" value={copros} onChange={setCopros} max={30} />}
              {has("syndic") && <Field key="cl" label="Lots de copropriété" value={coproLots} onChange={setCoproLots} max={3000} />}
              {has("promoteur") && <Field key="s" label="Chantiers actifs" value={sites} onChange={setSites} max={20} />}
              {has("promoteur") && <Field key="pl" label="Lots de programme" value={programLots} onChange={setProgramLots} max={2000} />}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-white/[0.03] p-7 md:p-10 lg:border-t-0 lg:border-l">
          <div aria-hidden className="absolute -top-20 -right-20 size-64 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="relative">
            <p className="text-sm text-white/55">{useIntegrated ? "Forfait Opérateur intégré" : "Votre estimation"}</p>
            <motion.p key={`${shown}-${billing}`} initial={{ opacity: 0.3, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-display text-5xl font-bold tracking-tight tabular-nums">
              {fcfa(shown).replace(" FCFA", "")}
            </motion.p>
            <p className="mt-1 text-sm text-white/55">FCFA HT / {billing === "monthly" ? "mois" : "an (12 mois pour 11)"}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-400"><Gift className="size-4" /> {TRIAL_TEXT}</p>

            <div className="mt-6 space-y-2 text-sm">
              {lines.map(([label, price]) => (
                <Row key={label} label={label} value={fcfa(price)} strike={useIntegrated} />
              ))}
              {combo.discount > 0 && <Row label="Remise combinaison (−10 % sur le moins cher)" value={`− ${fcfa(combo.discount)}`} accent strike={useIntegrated} />}
              {integrated !== null && (
                <div className={`mt-3 rounded-xl p-3 ring-1 ${useIntegrated ? "bg-mint-400/10 ring-mint-400/40" : "bg-white/5 ring-white/10"}`}>
                  <p className="font-semibold">
                    Opérateur intégré : {fcfa(integrated)} / mois {useIntegrated && <span className="text-mint-400">· le plus avantageux</span>}
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Estimation haute : un même lot passé du chantier à la gestion ne compte qu&apos;une fois dans le forfait.
                  </p>
                </div>
              )}
            </div>
            <p className="mt-6 text-xs text-white/60">Hors taxes, mise en route et messages WhatsApp consommés. Estimation indicative, devis sur demande.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent, strike }: { label: string; value: string; accent?: boolean; strike?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${accent ? "text-mint-400" : "text-white/75"} ${strike ? "line-through opacity-50" : ""}`}>
      <span>{label}</span>
      <span className="shrink-0 tabular-nums">{value}</span>
    </div>
  );
}

function Field({ label, value, onChange, max }: { label: string; value: number; onChange: (v: number) => void; max: number }): ReactNode {
  return (
    <motion.label
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="block"
    >
      <span className="flex items-baseline justify-between text-sm text-white/70">
        {label}
        <input
          type="number"
          min={0}
          max={max * 5}
          value={value}
          onChange={(e) => onChange(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
          className="w-20 rounded-lg bg-white/10 px-2 py-1 text-right font-semibold text-white tabular-nums outline-none focus:ring-2 focus:ring-brand-400"
        />
      </span>
      <input
        type="range"
        min={0}
        max={max}
        value={Math.min(value, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full cursor-pointer accent-[#8b8bff]"
        aria-label={label}
      />
    </motion.label>
  );
}
