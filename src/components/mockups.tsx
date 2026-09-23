"use client";

import { AnimatePresence, LayoutGroup, motion, animate } from "framer-motion";
import {
  ArrowDownLeft,
  Building2,
  Check,
  CircleDollarSign,
  FileText,
  Lock,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { MockupKind } from "@/lib/content";
import { formatFcfa, Logo } from "./ui";

/** Fait défiler des étapes en boucle, uniquement quand la carte est active. */
function useLoop(active: boolean, steps: number, ms: number) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps), ms);
    return () => {
      clearInterval(id);
      setStep(0);
    };
  }, [active, steps, ms]);
  return active ? step : 0;
}

function useCountUp(target: number, active: boolean, duration = 1.4) {
  const [v, setV] = useState(target);
  useEffect(() => {
    if (!active) return;
    const c = animate(target * 0.55, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setV,
    });
    return () => c.stop();
  }, [target, active, duration]);
  return active ? v : target;
}

function Window({ title, children, badge }: { title: string; children: ReactNode; badge?: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11px] font-medium text-white/50">{title}</span>
        <span className="ml-auto">{badge}</span>
      </div>
      <div className="relative min-h-0 flex-1 p-4">{children}</div>
    </div>
  );
}

function Pill({ tone, children }: { tone: "green" | "amber" | "blue" | "violet" | "slate"; children: ReactNode }) {
  const tones = {
    green: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30",
    amber: "bg-amber-400/15 text-amber-300 ring-amber-400/30",
    blue: "bg-sky-400/15 text-sky-300 ring-sky-400/30",
    violet: "bg-violet-400/15 text-violet-300 ring-violet-400/30",
    slate: "bg-white/10 text-white/60 ring-white/15",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- 1. Paiements */

const rentRows = [
  { name: "Aya Kouassi", unit: "Cocody Riviera 3 · Appt B12", amount: 250000 },
  { name: "Moussa Traoré", unit: "Marcory Zone 4 · Villa 7", amount: 450000 },
  { name: "Grâce N'Guessan", unit: "Angré 8e tranche · Studio 3", amount: 150000 },
  { name: "Ibrahim Bamba", unit: "Plateau · Bureau 4A", amount: 600000 },
];

function PaymentsMockup({ active }: { active: boolean }) {
  // 0: en attente, 1: notification Wave, 2: payé, 3: payé (pause)
  const step = useLoop(active, 4, 1500);
  const paid = step >= 2;
  const total = useCountUp(paid ? 1750000 : 1600000, active, 1);

  return (
    <Window title="Encaissements · Septembre" badge={<Pill tone="green">● Temps réel</Pill>}>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
          <p className="text-[10px] text-white/50">Encaissé ce mois</p>
          <p className="font-display text-lg font-bold text-white tabular-nums">{formatFcfa(total)}</p>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
          <p className="text-[10px] text-white/50">Taux de recouvrement</p>
          <p className="font-display text-lg font-bold text-emerald-300 tabular-nums">{paid ? "96 %" : "88 %"}</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {rentRows.map((r, i) => {
          const isTarget = i === 2;
          const rowPaid = !isTarget || paid;
          return (
            <motion.div
              key={r.name}
              animate={
                isTarget && step === 2
                  ? { backgroundColor: "rgba(46,230,168,0.14)" }
                  : { backgroundColor: "rgba(255,255,255,0.03)" }
              }
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 rounded-xl px-3 py-2 ring-1 ring-white/[0.05]"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-[10px] font-bold text-white/80">
                {r.name.split(" ").map((p) => p[0]).join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">{r.name}</p>
                <p className="truncate text-[10px] text-white/45">{r.unit}</p>
              </div>
              <span className="hidden text-xs font-semibold text-white/80 tabular-nums sm:block">{formatFcfa(r.amount)}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={rowPaid ? "p" : "w"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {rowPaid ? (
                    <Pill tone="green">
                      <Check className="size-3" /> Payé
                    </Pill>
                  ) : (
                    <Pill tone="amber">En attente</Pill>
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-6 top-3 z-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-700/95 p-3 shadow-xl backdrop-blur-md"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#1DC8FF] text-ink-950">
              <ArrowDownLeft className="size-5" />
            </span>
            <div className="text-xs">
              <p className="font-semibold text-white">Wave · 150 000 FCFA reçu</p>
              <p className="text-white/55">Rapproché automatiquement : Studio 3, Angré</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Window>
  );
}

/* ---------------------------------------------------------------- 2. Propriétaires */

const ownerSlices = [
  { label: "Net à reverser", value: 76, color: "#5B5BF7" },
  { label: "Commission agence", value: 10, color: "#FF8A3D" },
  { label: "Charges & travaux", value: 9, color: "#2EE6A8" },
  { label: "Impôts retenus", value: 5, color: "#F472B6" },
];

export function Donut({
  slices,
  active,
  size = 132,
  children,
}: {
  slices: { value: number; color: string }[];
  active: boolean;
  size?: number;
  children?: ReactNode;
}) {
  const r = 42;
  const c = 2 * Math.PI * r;
  // début de chaque part, en pourcentage cumulé
  const starts = slices.map((_, i) => slices.slice(0, i).reduce((a, s) => a + s.value, 0));
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
        {slices.map((s, i) => {
          const len = (s.value / 100) * c;
          const offset = (starts[i] / 100) * c;
          return (
            <motion.circle
              key={i}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="12"
              strokeDasharray={`${len} ${c}`}
              initial={false}
              animate={{ strokeDashoffset: active ? -offset : -offset + len, opacity: active ? 1 : 0.4 }}
              transition={{ duration: 1.1, delay: active ? 0.15 * i : 0, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

function OwnersMockup({ active }: { active: boolean }) {
  const net = useCountUp(1245000, active);
  return (
    <Window title="Relevé de gérance · M. Konan Yao" badge={<Pill tone="violet">Août 2026</Pill>}>
      <div className="flex items-center gap-4">
        <Donut slices={ownerSlices} active={active}>
          <div>
            <p className="text-[9px] text-white/50">Loyers perçus</p>
            <p className="font-display text-sm font-bold text-white">1,64 M</p>
          </div>
        </Donut>
        <ul className="min-w-0 flex-1 space-y-2">
          {ownerSlices.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-[11px]">
              <span className="size-2 rounded-full" style={{ background: s.color }} />
              <span className="truncate text-white/70">{s.label}</span>
              <span className="ml-auto font-semibold text-white tabular-nums">{s.value} %</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 space-y-1.5 text-[11px]">
        {[
          ["Villa Cocody Ambassades", "900 000"],
          ["Immeuble Marcory · 3 lots", "740 000"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between rounded-lg bg-white/[0.03] px-3 py-2 ring-1 ring-white/[0.05]">
            <span className="text-white/65">{k}</span>
            <span className="font-semibold text-white tabular-nums">{v} FCFA</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-brand-500/25 to-brand-500/5 px-3 py-2.5 ring-1 ring-brand-400/30">
        <div>
          <p className="text-[10px] text-brand-300">Net à reverser</p>
          <p className="font-display text-lg font-bold text-white tabular-nums">{formatFcfa(net)}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-ink-900">
          <FileText className="size-3" /> PDF envoyé
        </span>
      </div>
    </Window>
  );
}

/* ---------------------------------------------------------------- 3. Comptabilité */

const approvals = ["Caissière", "Comptable", "Directeur"];

function AccountingMockup({ active }: { active: boolean }) {
  // étapes 0..3 : nombre de validations, 4 : clôture certifiée
  const step = useLoop(active, 6, 1100);
  const done = Math.min(step, 3);
  return (
    <Window title="Clôture de caisse · Agence Plateau" badge={<Pill tone="blue">Session #0921</Pill>}>
      <div className="grid grid-cols-3 gap-2 text-[10px]">
        {[
          ["Espèces", "412 500"],
          ["Wave", "1 150 000"],
          ["Orange Money", "680 000"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.06]">
            <p className="text-white/50">{k}</p>
            <p className="mt-0.5 text-xs font-bold text-white tabular-nums">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5 rounded-xl bg-white/[0.03] p-3 text-[11px] ring-1 ring-white/[0.05]">
        <div className="flex justify-between text-white/65">
          <span>Solde théorique</span>
          <span className="tabular-nums">2 242 500 FCFA</span>
        </div>
        <div className="flex justify-between text-white/65">
          <span>Solde compté</span>
          <span className="tabular-nums">2 242 500 FCFA</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-1.5 font-semibold">
          <span className="text-white">Écart</span>
          <span className="text-emerald-300">0 FCFA ✓</span>
        </div>
        <div className="flex items-center gap-1.5 pt-1 text-[10px] text-sky-300">
          <Lock className="size-3" /> Fonds de tiers isolés : 1 830 000 FCFA (compte mandants)
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {approvals.map((a, i) => (
          <div key={a} className="flex flex-1 items-center gap-2">
            <motion.span
              animate={{
                backgroundColor: i < done ? "rgba(46,230,168,1)" : "rgba(255,255,255,0.08)",
                scale: i === done - 1 ? [1, 1.25, 1] : 1,
              }}
              transition={{ duration: 0.4 }}
              className="grid size-6 shrink-0 place-items-center rounded-full text-ink-950"
            >
              {i < done ? <Check className="size-3.5" strokeWidth={3} /> : <span className="text-[9px] text-white/50">{i + 1}</span>}
            </motion.span>
            <span className={`truncate text-[10px] ${i < done ? "text-white" : "text-white/45"}`}>{a}</span>
          </div>
        ))}
      </div>
      <motion.div
        animate={step >= 4 ? { backgroundColor: "#2EE6A8", color: "#05070f" } : { backgroundColor: "#5B5BF7", color: "#ffffff" }}
        className="mt-3 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold"
      >
        {step >= 4 ? (
          <>
            <ShieldCheck className="size-4" /> Clôture certifiée · écritures SYSCOHADA générées
          </>
        ) : (
          <>Valider la clôture ({done}/3)</>
        )}
      </motion.div>
    </Window>
  );
}

/* ---------------------------------------------------------------- 4. Écosystème */

const modules = [
  { icon: Wallet, label: "Paiements" },
  { icon: Building2, label: "Biens" },
  { icon: Users, label: "CRM" },
  { icon: FileText, label: "Baux" },
  { icon: CircleDollarSign, label: "Compta" },
  { icon: Wrench, label: "Syndic" },
];

function EcosystemMockup({ active }: { active: boolean }) {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(91,91,247,0.35),transparent_60%)]">
      <motion.div
        className="absolute size-[260px] rounded-full border border-dashed border-white/15"
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {modules.map((m, i) => {
          const a = (i / modules.length) * Math.PI * 2;
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              className="absolute grid size-11 place-items-center rounded-2xl border border-white/15 bg-ink-800/90 text-white shadow-lg"
              style={{ left: Math.round(108 + Math.cos(a) * 130), top: Math.round(108 + Math.sin(a) * 130) }}
              animate={active ? { rotate: -360 } : { rotate: 0 }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              title={m.label}
            >
              <Icon className="size-5" />
            </motion.div>
          );
        })}
      </motion.div>
      <div className="relative z-10 flex flex-col items-center text-center text-white">
        <motion.div
          animate={active ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-2xl border border-white/15 bg-ink-900/70 px-5 py-4 backdrop-blur-md"
        >
          <Logo className="text-white" />
          <p className="mt-2 max-w-[190px] font-display text-sm font-semibold leading-snug text-white/85">
            L&apos;ERP immobilier le plus <span className="text-sun-400">Complet</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 5. CRM */

const columns = ["Nouveau", "Visite", "Négociation", "Affaire gagnée"] as const;

function CrmMockup({ active }: { active: boolean }) {
  // la carte vedette glisse de colonne en colonne
  const step = useLoop(active, 5, 1300);
  const col = Math.min(step, 3);
  const others: Record<(typeof columns)[number], string[]> = {
    Nouveau: ["S. Coulibaly", "F. Diallo"],
    Visite: ["K. Assi"],
    Négociation: ["M. Ouattara"],
    "Affaire gagnée": ["R. Kacou"],
  };
  return (
    <Window title="Pipeline commercial" badge={<Pill tone="violet">12 opportunités</Pill>}>
      <LayoutGroup>
        <div className="grid h-full grid-cols-4 gap-2">
          {columns.map((c, ci) => (
            <div
              key={c}
              className={`flex flex-col gap-1.5 rounded-xl p-1.5 ring-1 ${
                ci === 3 ? "bg-emerald-400/[0.06] ring-emerald-400/20" : "bg-white/[0.03] ring-white/[0.05]"
              }`}
            >
              <p className={`truncate px-1 text-[9px] font-semibold uppercase tracking-wide ${ci === 3 ? "text-emerald-300" : "text-white/45"}`}>
                {c}
              </p>
              {ci === col && (
                <motion.div
                  layoutId="crm-star"
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className={`rounded-lg p-2 text-[10px] shadow-lg ${
                    col === 3 ? "bg-emerald-400 text-ink-950" : "bg-brand-500 text-white"
                  }`}
                >
                  <p className="font-bold">A. Yao</p>
                  <p className="opacity-80">Duplex Riviera</p>
                  <p className="mt-1 font-semibold">85 M FCFA</p>
                  {col === 3 && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 flex items-center gap-1 font-bold">
                      <Trophy className="size-3" /> Signé !
                    </motion.p>
                  )}
                </motion.div>
              )}
              {others[c].map((o) => (
                <motion.div layout key={o} className="rounded-lg bg-white/[0.06] p-2 text-[10px] ring-1 ring-white/[0.06]">
                  <p className="font-semibold text-white/85">{o}</p>
                  <div className="mt-1 h-1 w-3/4 rounded bg-white/10" />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </LayoutGroup>
    </Window>
  );
}

/* ---------------------------------------------------------------- 6. Syndic */

const charges = [
  { label: "Gardiennage", value: 34, color: "#FACC15" },
  { label: "Électricité communs", value: 24, color: "#5B5BF7" },
  { label: "Ascenseur", value: 18, color: "#2EE6A8" },
  { label: "Eau", value: 14, color: "#38BDF8" },
  { label: "Entretien", value: 10, color: "#F472B6" },
];

function SyndicMockup({ active }: { active: boolean }) {
  const step = useLoop(active, 3, 1600);
  const tickets = [
    { t: "Fuite colonne d'eau · Bât. B", s: step >= 1 ? "Résolu" : "En cours" },
    { t: "Ampoule hall · Bât. A", s: "Résolu" },
    { t: "Révision ascenseur", s: step >= 2 ? "Planifié" : "Nouveau" },
  ];
  return (
    <Window title="Résidence Les Cocotiers · 48 lots" badge={<Pill tone="amber">Exercice 2026</Pill>}>
      <div className="flex items-center gap-4">
        <Donut slices={charges} active={active} size={120}>
          <div>
            <p className="text-[9px] text-white/50">Budget</p>
            <p className="font-display text-sm font-bold text-white">38,4 M</p>
          </div>
        </Donut>
        <ul className="min-w-0 flex-1 space-y-1.5">
          {charges.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-[11px]">
              <span className="size-2 rounded-full" style={{ background: s.color }} />
              <span className="truncate text-white/70">{s.label}</span>
              <span className="ml-auto font-semibold text-white tabular-nums">{s.value} %</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/45">Tickets d&apos;intervention</p>
      <div className="space-y-1.5">
        {tickets.map((t) => (
          <div key={t.t} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-[11px] ring-1 ring-white/[0.05]">
            <Wrench className="size-3.5 text-white/40" />
            <span className="truncate text-white/80">{t.t}</span>
            <span className="ml-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={t.s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="block">
                  <Pill tone={t.s === "Résolu" ? "green" : t.s === "Planifié" ? "blue" : t.s === "En cours" ? "amber" : "slate"}>{t.s}</Pill>
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        ))}
      </div>
    </Window>
  );
}

/* ---------------------------------------------------------------- 7. Commissions */

function CommissionsMockup({ active }: { active: boolean }) {
  const pct = useCountUp(active ? 87 : 60, active, 1.6);
  const r = 40;
  const arc = Math.PI * r; // demi-cercle
  return (
    <Window title="Performance · Mariam Koné" badge={<Pill tone="green">Objectif T3</Pill>}>
      <div className="flex flex-col items-center">
        <div className="relative h-[92px] w-[184px]">
          <svg viewBox="0 0 100 52" className="size-full">
            <defs>
              <linearGradient id="gauge" x1="0" x2="1">
                <stop offset="0" stopColor="#5B5BF7" />
                <stop offset="1" stopColor="#2EE6A8" />
              </linearGradient>
            </defs>
            <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" strokeLinecap="round" />
            <path
              d="M10 50 A40 40 0 0 1 90 50"
              fill="none"
              stroke="url(#gauge)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${arc} ${arc}`}
              strokeDashoffset={arc * (1 - pct / 100)}
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center">
            <p className="font-display text-2xl font-bold text-white tabular-nums">{Math.round(pct)} %</p>
            <p className="text-[9px] text-white/50">de l&apos;objectif atteint</p>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/[0.05]">
        <div className="mb-2 flex justify-between text-[10px] text-white/55">
          <span>Commission · Vente Duplex Riviera</span>
          <span className="font-semibold text-white">4 250 000 FCFA</span>
        </div>
        <div className="flex h-7 overflow-hidden rounded-lg text-[10px] font-bold">
          <motion.div
            initial={false}
            animate={{ width: active ? "60%" : "50%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center bg-brand-500 text-white"
          >
            Agence 60 %
          </motion.div>
          <motion.div
            initial={false}
            animate={{ width: active ? "40%" : "50%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center bg-mint-400 text-ink-950"
          >
            Agent 40 %
          </motion.div>
        </div>
        <div className="mt-2 flex justify-between text-[11px]">
          <span className="text-white/70 tabular-nums">2 550 000 FCFA</span>
          <span className="font-semibold text-emerald-300 tabular-nums">1 700 000 FCFA</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-sun-500/10 px-3 py-2 text-[11px] text-sun-400 ring-1 ring-sun-500/25">
        <Sparkles className="size-3.5" /> Prime calculée en temps réel, versée à la clôture du mois
      </div>
    </Window>
  );
}

// Taille de conception des interfaces : elles sont ensuite mises à l'échelle pour remplir le volet.
const DESIGN_W = 460;
const DESIGN_H = 390;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Réduit (ou agrandit légèrement) son contenu pour tenir dans le conteneur, sans reflow interne. */
function FitScale({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setScale(Math.min(width / DESIGN_W, height / DESIGN_H, 1.2));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative size-full">
      <div
        className="absolute top-1/2 left-1/2"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

export function Mockup({ kind, active }: { kind: MockupKind; active: boolean }) {
  return (
    <FitScale>
      <MockupInner kind={kind} active={active} />
    </FitScale>
  );
}

function MockupInner({ kind, active }: { kind: MockupKind; active: boolean }) {
  switch (kind) {
    case "payments":
      return <PaymentsMockup active={active} />;
    case "owners":
      return <OwnersMockup active={active} />;
    case "accounting":
      return <AccountingMockup active={active} />;
    case "ecosystem":
      return <EcosystemMockup active={active} />;
    case "crm":
      return <CrmMockup active={active} />;
    case "syndic":
      return <SyndicMockup active={active} />;
    case "commissions":
      return <CommissionsMockup active={active} />;
  }
}
