"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bell, Calendar, CheckCheck, Download, FileSpreadsheet, MessageCircle, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { roles, type RoleId } from "@/lib/content";
import { comparatifHref, type DomainId } from "@/lib/comparatif-domains";
import { ROLE_EVENT } from "@/lib/nav";
import { useI18n } from "./locale-provider";
import { SmartLink } from "./smart-link";
import { Eyebrow, Reveal, trackSpotlight } from "./ui";

// Domaine du comparatif qui prolonge chaque onglet
const compareFor: Record<RoleId, { domain: DomainId; label: { fr: string; en: string } }> = {
  directeur: {
    domain: "pilotage",
    label: { fr: "Comparer le pilotage face aux autres logiciels", en: "Compare oversight features with other software" },
  },
  comptable: {
    domain: "gestion-locative",
    label: { fr: "Comparer la gestion locative face aux autres logiciels", en: "Compare rental management with other software" },
  },
  agent: {
    domain: "biens-commercial",
    label: { fr: "Comparer le CRM et les biens face aux autres logiciels", en: "Compare CRM and listings with other software" },
  },
};

export function Roles() {
  const [tab, setTab] = useState<RoleId>("directeur");
  const { locale, t } = useI18n();
  const list = roles[locale];

  useEffect(() => {
    const onSelect = (e: Event) => setTab((e as CustomEvent<RoleId>).detail);
    window.addEventListener(ROLE_EVENT, onSelect);
    return () => window.removeEventListener(ROLE_EVENT, onSelect);
  }, []);

  const role = list.find((r) => r.id === tab)!;

  return (
    <section id="roles" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>{t("Une interface par métier", "One interface per job")}</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl">
            {t(
              <>
                À chaque rôle, <span className="text-gradient-dark">son interface.</span>
              </>,
              <>
                Every role, <span className="text-gradient-dark">its own interface.</span>
              </>,
            )}
          </h2>
          <p className="mt-5 text-lg text-ink-900/60">
            {t(
              "Directeur, comptable ou agent : chacun voit exactement ce dont il a besoin, rien de plus.",
              "Director, accountant or agent: everyone sees exactly what they need, nothing more.",
            )}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <div role="tablist" aria-label={t("Rôles", "Roles")} className="inline-flex max-w-full overflow-x-auto rounded-full border border-ink-900/10 bg-white p-1.5 shadow-sm">
            {list.map((r) => (
              <button
                key={r.id}
                role="tab"
                aria-selected={tab === r.id}
                onClick={() => setTab(r.id)}
                className={`relative cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors md:px-6 ${
                  tab === r.id ? "text-white" : "text-ink-900/60 hover:text-ink-900"
                }`}
              >
                {tab === r.id && (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 rounded-full bg-ink-900"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{r.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 min-h-[560px] md:min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              role="tabpanel"
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]"
            >
              <div>
                <h3 className="font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl">{role.headline}</h3>
                <p className="mt-4 text-ink-900/65 md:text-lg">{role.pitch}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                  {role.features.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      onMouseMove={trackSpotlight}
                      whileHover={{ y: -4 }}
                      className="spotlight rounded-2xl border border-ink-900/[0.07] bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
                    >
                      <p className="relative font-semibold">{f.title}</p>
                      <p className="relative mt-1 text-sm text-ink-900/55">{f.text}</p>
                    </motion.div>
                  ))}
                </div>
                <SmartLink
                  href={comparatifHref(compareFor[tab].domain)}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-500"
                >
                  {compareFor[tab].label[locale]}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </SmartLink>
              </div>
              <RoleVisual id={tab} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[28px] border border-ink-900/[0.07] bg-gradient-to-br from-white to-[#eef0ff] p-4 shadow-[0_30px_80px_-30px_rgba(40,40,120,0.35)] md:p-6">
      {children}
    </div>
  );
}

function RoleVisual({ id }: { id: RoleId }) {
  const { t } = useI18n();
  if (id === "directeur") {
    const bars = [42, 55, 48, 66, 72, 61, 84, 90];
    return (
      <Panel>
        <div className="grid grid-cols-3 gap-3">
          {[
            [t("Loyers encaissés", "Rent collected"), t("48,2 M", "48.2M"), "+12 %"],
            [t("Taux d'occupation", "Occupancy rate"), "94 %", "+3 pts"],
            [t("Encaissé du mois", "Collected this month"), t("48,2 M", "48.2M"), t("88 % obj.", "88 % of target")],
          ].map(([k, v, t]) => (
            <div key={k} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-ink-900/5">
              <p className="text-[11px] text-ink-900/65">{k}</p>
              <p className="mt-1 font-display text-xl font-bold">{v}</p>
              <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <TrendingUp className="size-3" /> {t}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-36 items-end gap-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-900/5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex-1 rounded-t-lg ${i === bars.length - 1 ? "bg-gradient-to-t from-brand-600 to-brand-400" : "bg-brand-500/15"}`}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          className="mt-3 flex items-center gap-3 rounded-2xl bg-ink-900 p-3 text-white shadow-xl"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sun-500">
            <Bell className="size-5" />
          </span>
          <div className="min-w-0 flex-1 text-sm">
            <p className="font-semibold">{t("Déclaration de paiement · Wave", "Payment notice · Wave")}</p>
            <p className="truncate text-xs text-white/60">{t("Studio 3, Angré · 150 000 FCFA · à valider", "Studio 3, Angré · 150,000 FCFA · to approve")}</p>
          </div>
          <button className="shine cursor-pointer rounded-full bg-mint-400 px-4 py-2 text-xs font-bold text-ink-950">{t("Valider", "Approve")}</button>
        </motion.div>
      </Panel>
    );
  }

  if (id === "comptable") {
    type Status = "paid" | "partial" | "computed" | "upcoming";
    const rows: [string, string, string, Status][] = [
      [t("05/09", "09/05"), t("Loyer sept. · Studio 3, Angré", "Sept. rent · Studio 3, Angré"), t("150 000", "150,000"), "paid"],
      [t("05/09", "09/05"), t("Loyer sept. · Villa 7, Marcory", "Sept. rent · Villa 7, Marcory"), t("450 000", "450,000"), "partial"],
      [t("15/09", "09/15"), t("Pénalité de retard · Villa 7", "Late fee · Villa 7"), t("22 500", "22,500"), "computed"],
      [t("05/10", "10/05"), t("Loyer oct. · Studio 3, Angré", "Oct. rent · Studio 3, Angré"), t("150 000", "150,000"), "upcoming"],
    ];
    const status: Record<Status, { label: string; tone: string }> = {
      paid: { label: t("Payé", "Paid"), tone: "bg-emerald-50 text-emerald-700" },
      partial: { label: t("Partiel", "Partial"), tone: "bg-amber-50 text-amber-700" },
      computed: { label: t("Calculée", "Calculated"), tone: "bg-rose-50 text-rose-700" },
      upcoming: { label: t("À échoir", "Upcoming"), tone: "bg-slate-100 text-slate-600" },
    };
    return (
      <Panel>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-900/5">
          <div className="flex items-center justify-between border-b border-ink-900/5 px-4 py-3">
            <p className="text-sm font-semibold">{t("Échéancier · septembre", "Payment schedule · September")}</p>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">{t("Reste à encaisser : 247 500", "Outstanding: 247,500")}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] text-left text-xs">
              <thead className="text-ink-900/45">
                <tr>
                  <th className="px-4 py-2 font-medium">{t("Échéance", "Due date")}</th>
                  <th className="px-2 py-2 font-medium">{t("Libellé", "Description")}</th>
                  <th className="px-2 py-2 text-right font-medium">{t("Montant", "Amount")}</th>
                  <th className="px-4 py-2 text-right font-medium">{t("Statut", "Status")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="border-t border-ink-900/5"
                  >
                    <td className="px-4 py-2.5 font-mono font-semibold text-brand-600">{r[0]}</td>
                    <td className="px-2 py-2.5 text-ink-900/70">{r[1]}</td>
                    <td className="px-2 py-2.5 text-right tabular-nums">{r[2]}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${status[r[3]].tone}`}>{status[r[3]].label}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            [FileSpreadsheet, t("Quittance", "Rent receipt"), t("Générée depuis votre modèle Word", "Generated from your Word template")],
            [Download, t("Relevé de compte", "Account statement"), t("Historique du locataire", "Tenant history")],
          ].map(([Icon, t, s]) => {
            const I = Icon as typeof Download;
            return (
              <motion.button
                key={t as string}
                whileHover={{ y: -3 }}
                className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-ink-900/5"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                  <I className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t as string}</span>
                  <span className="block text-xs text-ink-900/50">{s as string}</span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </Panel>
    );
  }

  return (
    <Panel>
      <div className="flex justify-center gap-4">
        <div className="w-[260px] shrink-0 rounded-[34px] border-[6px] border-ink-900 bg-[#0b141a] p-3 shadow-2xl">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-white">
            <span className="grid size-8 place-items-center rounded-full bg-[#25D366]">
              <MessageCircle className="size-4" />
            </span>
            <div className="text-xs">
              <p className="font-semibold">Aya Kouassi</p>
              <p className="text-white/50">{t("Locataire · Riviera 3", "Tenant · Riviera 3")}</p>
            </div>
          </div>
          <div className="space-y-2 py-3 text-[11px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-[88%] rounded-xl rounded-tl-sm bg-[#202c33] p-2.5 text-white/90"
            >
              {t(
                "Bonjour Mme Kouassi 👋 Votre loyer de septembre (250 000 FCFA) arrive à échéance le 05/10.",
                "Hello Mrs. Kouassi 👋 Your September rent (250,000 FCFA) is due on October 5.",
              )}
              <span className="mt-1.5 block rounded-lg bg-[#1DC8FF]/15 px-2 py-1.5 font-semibold text-[#6fdcff]">
                {t("Déclarer mon paiement sur mon portail →", "Report my payment on my portal →")}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="ml-auto max-w-[70%] rounded-xl rounded-tr-sm bg-[#005c4b] p-2.5 text-white"
            >
              {t("C'est fait, merci !", "Done, thank you!")}
              <span className="mt-1 flex items-center justify-end gap-1 text-[9px] text-white/60">
                10:42 <CheckCheck className="size-3 text-sky-300" />
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 }}
              className="mx-auto w-fit rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold text-emerald-300"
            >
              {t("✓ Déclaration reçue · validation par l'agence", "✓ Notice received · pending agency approval")}
            </motion.div>
          </div>
        </div>
        <div className="hidden flex-1 flex-col gap-2 sm:flex">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Calendar className="size-4 text-brand-600" /> {t("Visites du jour", "Today's viewings")}
          </p>
          {[
            ["09:30", t("Villa 5 pièces · Cocody", "5-room villa · Cocody"), t("M. Ouattara", "Mr. Ouattara")],
            ["11:00", t("Appt F3 · Deux Plateaux", "2-bed apartment · Deux Plateaux"), t("Mme Diallo", "Mrs. Diallo")],
            ["15:30", t("Bureau · Plateau", "Office · Plateau"), "SARL Akwaba"],
          ].map(([h, b, c], i) => (
            <motion.div
              key={h}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-ink-900/5"
            >
              <p className="text-xs font-bold text-brand-600">{h}</p>
              <p className="text-sm font-semibold">{b}</p>
              <p className="text-xs text-ink-900/50">{c}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
