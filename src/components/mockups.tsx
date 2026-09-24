"use client";

import { AnimatePresence, LayoutGroup, motion, animate } from "framer-motion";
import {
  ArrowDownLeft,
  Building2,
  Check,
  CircleDollarSign,
  FileText,
  Sparkles,
  Trophy,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { MockupKind } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { useI18n } from "./locale-provider";
import { formatFcfa, Logo } from "./ui";

/** Montant en FCFA : espaces en français, virgules en anglais */
function money(n: number, locale: Locale) {
  return locale === "en" ? `${Math.round(n).toLocaleString("en-US")} FCFA` : formatFcfa(n);
}

/** Nombre seul (sans devise) dans la langue voulue */
function num(n: number, locale: Locale) {
  return locale === "en" ? n.toLocaleString("en-US") : n.toLocaleString("fr-FR").replace(/[\u202f\u00a0]/g, " ");
}

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
  { name: "Aya Kouassi", unit: { fr: "Cocody Riviera 3 · Appt B12", en: "Cocody Riviera 3 · Apt B12" }, amount: 250000 },
  { name: "Moussa Traoré", unit: { fr: "Marcory Zone 4 · Villa 7", en: "Marcory Zone 4 · Villa 7" }, amount: 450000 },
  { name: "Grâce N'Guessan", unit: { fr: "Angré 8e tranche · Studio 3", en: "Angré 8th phase · Studio 3" }, amount: 150000 },
  { name: "Ibrahim Bamba", unit: { fr: "Plateau · Bureau 4A", en: "Plateau · Office 4A" }, amount: 600000 },
];

function PaymentsMockup({ active }: { active: boolean }) {
  const { locale, t } = useI18n();
  // 0: en attente, 1: notification Wave, 2: payé, 3: payé (pause)
  const step = useLoop(active, 4, 1500);
  const paid = step >= 2;
  const total = useCountUp(paid ? 1750000 : 1600000, active, 1);

  return (
    <Window title={t("Encaissements · Septembre", "Collections · September")} badge={<Pill tone="green">{t("Portail locataire", "Tenant portal")}</Pill>}>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
          <p className="text-[10px] text-white/50">{t("Encaissé ce mois", "Collected this month")}</p>
          <p className="font-display text-lg font-bold text-white tabular-nums">{money(total, locale)}</p>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
          <p className="text-[10px] text-white/50">{t("Taux de recouvrement", "Collection rate")}</p>
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
                <p className="truncate text-[10px] text-white/45">{r.unit[locale]}</p>
              </div>
              <span className="hidden text-xs font-semibold text-white/80 tabular-nums sm:block">{money(r.amount, locale)}</span>
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
                      <Check className="size-3" /> {t("Payé", "Paid")}
                    </Pill>
                  ) : (
                    <Pill tone="amber">{t("En attente", "Pending")}</Pill>
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
              <p className="font-semibold text-white">{t("Déclaration de paiement · Wave", "Payment notice · Wave")}</p>
              <p className="text-white/55">
                {t("Grâce N'Guessan · 150 000 FCFA · à valider par l'agence", "Grâce N'Guessan · 150,000 FCFA · awaiting agency approval")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Window>
  );
}

/* ---------------------------------------------------------------- 2. Propriétaires */

const ownerSlices = [
  { label: { fr: "Encaissé", en: "Collected" }, value: 86, color: "#5B5BF7" },
  { label: { fr: "À échoir", en: "Upcoming" }, value: 9, color: "#2EE6A8" },
  { label: { fr: "En retard", en: "Overdue" }, value: 5, color: "#F472B6" },
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
  const net = useCountUp(1640000, active);
  const { locale, t } = useI18n();
  return (
    <Window title={t("Portail propriétaire · M. Konan Yao", "Landlord portal · Mr. Konan Yao")} badge={<Pill tone="violet">{t("Août 2026", "August 2026")}</Pill>}>
      <div className="flex items-center gap-4">
        <Donut slices={ownerSlices} active={active}>
          <div>
            <p className="text-[9px] text-white/50">{t("Loyers perçus", "Rent received")}</p>
            <p className="font-display text-sm font-bold text-white">{t("1,64 M", "1.64M")}</p>
          </div>
        </Donut>
        <ul className="min-w-0 flex-1 space-y-2">
          {ownerSlices.map((s) => (
            <li key={s.label.fr} className="flex items-center gap-2 text-[11px]">
              <span className="size-2 rounded-full" style={{ background: s.color }} />
              <span className="truncate text-white/70">{s.label[locale]}</span>
              <span className="ml-auto font-semibold text-white tabular-nums">{s.value} %</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 space-y-1.5 text-[11px]">
        {[
          [t("Villa Cocody Ambassades", "Villa · Cocody Ambassades"), num(900000, locale)],
          [t("Immeuble Marcory · 3 lots", "Marcory building · 3 units"), num(740000, locale)],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between rounded-lg bg-white/[0.03] px-3 py-2 ring-1 ring-white/[0.05]">
            <span className="text-white/65">{k}</span>
            <span className="font-semibold text-white tabular-nums">{v} FCFA</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-brand-500/25 to-brand-500/5 px-3 py-2.5 ring-1 ring-brand-400/30">
        <div>
          <p className="text-[10px] text-brand-300">{t("Relevé de gérance · loyers encaissés", "Management statement · rent collected")}</p>
          <p className="font-display text-lg font-bold text-white tabular-nums">{money(net, locale)}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-ink-900">
          <FileText className="size-3" /> {t("Relevé envoyé", "Statement sent")}
        </span>
      </div>
    </Window>
  );
}

/* ---------------------------------------------------------------- 3. Tableau de bord */

const todo = [
  {
    icon: "late",
    label: { fr: "Échéance en retard · Villa 7, Marcory", en: "Overdue payment · Villa 7, Marcory" },
    tag: { fr: "Impayé", en: "Unpaid" },
  },
  {
    icon: "ticket",
    label: { fr: "Ticket urgent · Fuite colonne d'eau, Bât. B", en: "Urgent ticket · Water pipe leak, Bldg. B" },
    tag: { fr: "Maintenance", en: "Maintenance" },
  },
  {
    icon: "decl",
    label: { fr: "Déclaration de paiement · Studio 3, Angré", en: "Payment notice · Studio 3, Angré" },
    tag: { fr: "À valider", en: "To approve" },
  },
] as const;

function AccountingMockup({ active }: { active: boolean }) {
  // les tâches du jour sont traitées une à une, puis la boucle recommence
  const step = useLoop(active, 5, 1200);
  const done = Math.min(step, 3);
  const cashed = useCountUp(48_200_000, active, 1.6);
  const { locale, t } = useI18n();
  return (
    <Window title={t("Tableau de bord · Agence Plateau", "Dashboard · Plateau branch")} badge={<Pill tone="blue">{t("Septembre 2026", "September 2026")}</Pill>}>
      <div className="grid grid-cols-3 gap-2 text-[10px]">
        <div className="rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.06]">
          <p className="text-white/50">{t("Impayés", "Arrears")}</p>
          <p className="mt-0.5 text-xs font-bold text-rose-300 tabular-nums">{num(1240000, locale)}</p>
          <p className="text-white/40">{t("8 échéances", "8 installments")}</p>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.06]">
          <p className="text-white/50">{t("À encaisser sous 7 j", "Due within 7 days")}</p>
          <p className="mt-0.5 text-xs font-bold text-white tabular-nums">{num(3450000, locale)}</p>
          <p className="text-white/40">{t("21 échéances", "21 installments")}</p>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.06]">
          <p className="text-white/50">{t("Occupation", "Occupancy")}</p>
          <p className="mt-0.5 text-xs font-bold text-emerald-300 tabular-nums">94 %</p>
          <p className="text-white/40">{t("112 biens", "112 properties")}</p>
        </div>
      </div>
      <div className="mt-3 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/[0.05]">
        <div className="flex justify-between text-[11px]">
          <span className="text-white/65">{t("Encaissé du mois", "Collected this month")}</span>
          <span className="font-semibold text-white tabular-nums">{money(cashed, locale)}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-mint-400"
            initial={false}
            animate={{ width: active ? "88%" : "40%" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <p className="mt-1.5 text-[10px] text-white/45">{t("Objectif mensuel : 55 000 000 FCFA", "Monthly target: 55,000,000 FCFA")}</p>
      </div>
      <p className="mt-3 mb-1.5 text-[10px] font-semibold tracking-wide text-white/45 uppercase">{t("À traiter aujourd'hui", "To do today")}</p>
      <div className="space-y-1.5">
        {todo.map((t, i) => (
          <motion.div
            key={t.label.fr}
            animate={{ opacity: i < done ? 0.45 : 1 }}
            className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-[11px] ring-1 ring-white/[0.05]"
          >
            <motion.span
              animate={{ backgroundColor: i < done ? "rgba(46,230,168,1)" : "rgba(255,255,255,0.08)" }}
              className="grid size-4 shrink-0 place-items-center rounded-full text-ink-950"
            >
              {i < done && <Check className="size-3" strokeWidth={3} />}
            </motion.span>
            <span className={`truncate ${i < done ? "text-white/50 line-through" : "text-white/85"}`}>{t.label[locale]}</span>
            <span className="ml-auto">
              <Pill tone={t.icon === "late" ? "amber" : t.icon === "ticket" ? "violet" : "blue"}>{t.tag[locale]}</Pill>
            </span>
          </motion.div>
        ))}
      </div>
    </Window>
  );
}

/* ---------------------------------------------------------------- 4. Écosystème */

const modules = [
  { icon: Wallet, label: { fr: "Paiements", en: "Payments" } },
  { icon: Building2, label: { fr: "Biens", en: "Properties" } },
  { icon: Users, label: { fr: "CRM", en: "CRM" } },
  { icon: FileText, label: { fr: "Baux", en: "Leases" } },
  { icon: CircleDollarSign, label: { fr: "Relevés", en: "Statements" } },
  { icon: Wrench, label: { fr: "Syndic", en: "Condo" } },
];

function EcosystemMockup({ active }: { active: boolean }) {
  const { locale, t } = useI18n();
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
              key={m.label.fr}
              className="absolute grid size-11 place-items-center rounded-2xl border border-white/15 bg-ink-800/90 text-white shadow-lg"
              style={{ left: Math.round(108 + Math.cos(a) * 130), top: Math.round(108 + Math.sin(a) * 130) }}
              animate={active ? { rotate: -360 } : { rotate: 0 }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              title={m.label[locale]}
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
            {t(
              <>
                L&apos;ERP immobilier le plus <span className="text-sun-400">Complet</span>
              </>,
              <>
                The most <span className="text-sun-400">Complete</span> real estate ERP
              </>,
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 5. CRM */

const columns = ["new", "visit", "negotiation", "won"] as const;
type Column = (typeof columns)[number];

const columnLabel: Record<Column, { fr: string; en: string }> = {
  new: { fr: "Nouveau", en: "New" },
  visit: { fr: "Visite", en: "Viewing" },
  negotiation: { fr: "Négociation", en: "Negotiation" },
  won: { fr: "Affaire gagnée", en: "Won" },
};

function CrmMockup({ active }: { active: boolean }) {
  // la carte vedette glisse de colonne en colonne
  const step = useLoop(active, 5, 1300);
  const col = Math.min(step, 3);
  const { locale, t } = useI18n();
  const others: Record<Column, string[]> = {
    new: ["S. Coulibaly", "F. Diallo"],
    visit: ["K. Assi"],
    negotiation: ["M. Ouattara"],
    won: ["R. Kacou"],
  };
  return (
    <Window title={t("Pipeline commercial", "Sales pipeline")} badge={<Pill tone="violet">{t("12 opportunités", "12 opportunities")}</Pill>}>
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
                {columnLabel[c][locale]}
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
                  <p className="mt-1 font-semibold">{t("85 M FCFA", "85M FCFA")}</p>
                  {col === 3 && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 flex items-center gap-1 font-bold">
                      <Trophy className="size-3" /> {t("Signé !", "Signed!")}
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
  { label: { fr: "Gardiennage", en: "Security" }, value: 34, color: "#FACC15" },
  { label: { fr: "Électricité communs", en: "Common-area power" }, value: 24, color: "#5B5BF7" },
  { label: { fr: "Ascenseur", en: "Elevator" }, value: 18, color: "#2EE6A8" },
  { label: { fr: "Eau", en: "Water" }, value: 14, color: "#38BDF8" },
  { label: { fr: "Entretien", en: "Upkeep" }, value: 10, color: "#F472B6" },
];

function SyndicMockup({ active }: { active: boolean }) {
  const step = useLoop(active, 3, 1600);
  const { locale, t } = useI18n();
  type TicketStatus = "resolved" | "inProgress" | "planned" | "new";
  const statusLabel: Record<TicketStatus, string> = {
    resolved: t("Résolu", "Resolved"),
    inProgress: t("En cours", "In progress"),
    planned: t("Planifié", "Scheduled"),
    new: t("Nouveau", "New"),
  };
  const statusTone = { resolved: "green", planned: "blue", inProgress: "amber", new: "slate" } as const;
  const tickets: { t: string; s: TicketStatus }[] = [
    { t: t("Fuite colonne d'eau · Bât. B", "Water pipe leak · Bldg. B"), s: step >= 1 ? "resolved" : "inProgress" },
    { t: t("Ampoule hall · Bât. A", "Lobby light bulb · Bldg. A"), s: "resolved" },
    { t: t("Révision ascenseur", "Elevator servicing"), s: step >= 2 ? "planned" : "new" },
  ];
  return (
    <Window title={t("Résidence Les Cocotiers · 48 lots", "Les Cocotiers Residence · 48 units")} badge={<Pill tone="amber">{t("Exercice 2026", "FY 2026")}</Pill>}>
      <div className="flex items-center gap-4">
        <Donut slices={charges} active={active} size={120}>
          <div>
            <p className="text-[9px] text-white/50">Budget</p>
            <p className="font-display text-sm font-bold text-white">{t("38,4 M", "38.4M")}</p>
          </div>
        </Donut>
        <ul className="min-w-0 flex-1 space-y-1.5">
          {charges.map((s) => (
            <li key={s.label.fr} className="flex items-center gap-2 text-[11px]">
              <span className="size-2 rounded-full" style={{ background: s.color }} />
              <span className="truncate text-white/70">{s.label[locale]}</span>
              <span className="ml-auto font-semibold text-white tabular-nums">{s.value} %</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/45">{t("Tickets d'intervention", "Work orders")}</p>
      <div className="space-y-1.5">
        {tickets.map((tk) => (
          <div key={tk.t} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-[11px] ring-1 ring-white/[0.05]">
            <Wrench className="size-3.5 text-white/40" />
            <span className="truncate text-white/80">{tk.t}</span>
            <span className="ml-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={tk.s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="block">
                  <Pill tone={statusTone[tk.s]}>{statusLabel[tk.s]}</Pill>
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        ))}
      </div>
    </Window>
  );
}

/* ---------------------------------------------------------------- 7. Rappels e-mail & WhatsApp */

const reminders: Record<Locale, { channel: "WhatsApp" | "E-mail"; color: string; title: string; text: string }[]> = {
  fr: [
    { channel: "WhatsApp", color: "#25D366", title: "Rappel d'échéance · J-5", text: "Aya Kouassi · loyer de 250 000 FCFA dû le 05/10" },
    { channel: "E-mail", color: "#FF8A3D", title: "Paiement reçu", text: "Moussa Traoré · confirmation envoyée, agence en copie" },
    { channel: "WhatsApp", color: "#25D366", title: "Ticket mis à jour", text: "Fuite Bât. B · prestataire affecté, locataire prévenu" },
    { channel: "E-mail", color: "#FF8A3D", title: "Bail arrivant à terme", text: "Bureau 4A, Plateau · fin du bail dans 30 jours" },
  ],
  en: [
    { channel: "WhatsApp", color: "#25D366", title: "Due-date reminder · D-5", text: "Aya Kouassi · 250,000 FCFA rent due on Oct 5" },
    { channel: "E-mail", color: "#FF8A3D", title: "Payment received", text: "Moussa Traoré · confirmation sent, agency in copy" },
    { channel: "WhatsApp", color: "#25D366", title: "Ticket updated", text: "Leak, Bldg. B · contractor assigned, tenant notified" },
    { channel: "E-mail", color: "#FF8A3D", title: "Lease nearing expiry", text: "Office 4A, Plateau · lease ends in 30 days" },
  ],
};

function CommissionsMockup({ active }: { active: boolean }) {
  // les notifications apparaissent une à une, comme dans l'historique des communications
  const { locale, t } = useI18n();
  const list = reminders[locale];
  const step = useLoop(active, list.length + 2, 1100);
  const shown = active ? Math.min(step + 1, list.length) : list.length;
  return (
    <Window title={t("Communications · Historique", "Communications · History")} badge={<Pill tone="green">{t("Automatique", "Automated")}</Pill>}>
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {list.slice(0, shown).map((r) => (
            <motion.div
              key={r.title}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="flex items-start gap-3 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]"
            >
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg text-[10px] font-bold text-ink-950" style={{ background: r.color }}>
                {r.channel === "WhatsApp" ? "WA" : "@"}
              </span>
              <div className="min-w-0 flex-1 text-[11px]">
                <p className="flex items-center gap-2 font-semibold text-white">
                  {r.title}
                  <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-emerald-300">
                    <Check className="size-3" /> {t("Envoyé", "Sent")}
                  </span>
                </p>
                <p className="truncate text-white/55">{r.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-sun-500/10 px-3 py-2 text-[11px] text-sun-400 ring-1 ring-sun-500/25">
        <Sparkles className="size-3.5" /> {t("Selon les préférences et le consentement de chaque destinataire", "Based on each recipient's preferences and consent")}
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
