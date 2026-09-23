"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { fcfa, pct } from "@/lib/format";
import { Card, Choice, Line, Num, Stat, Text, UpsellCta, Warning } from "./tool-ui";

function Layout({ inputs, results }: { inputs: ReactNode; results: ReactNode }) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_1fr]">
      <div className="space-y-6">{inputs}</div>
      <div className="space-y-4 lg:sticky lg:top-24">{results}</div>
    </div>
  );
}

/** Barre empilée animée */
function StackBar({ parts }: { parts: { label: string; value: number; color: string }[] }) {
  const total = parts.reduce((a, p) => a + p.value, 0) || 1;
  return (
    <div>
      <div className="flex h-4 overflow-hidden rounded-full bg-ink-900/5">
        {parts.map((p) => (
          <motion.div
            key={p.label}
            className="h-full"
            style={{ background: p.color }}
            initial={false}
            animate={{ width: `${(p.value / total) * 100}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-900/60">
        {parts.map((p) => (
          <span key={p.label} className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: p.color }} />
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================ Caution & avance */

export function CautionCalculator() {
  const [rent, setRent] = useState(150000);
  const [deposit, setDeposit] = useState(2);
  const [advance, setAdvance] = useState(2);
  const [agency, setAgency] = useState(1);

  const d = rent * deposit;
  const a = rent * advance;
  const f = rent * agency;
  const total = d + a + f;

  return (
    <Layout
      inputs={
        <Card title="Le logement">
          <Num label="Loyer mensuel (hors charges)" value={rent} onChange={setRent} wide />
          <Num label="Caution (dépôt de garantie)" value={deposit} onChange={setDeposit} suffix="mois" />
          <Num label="Avance sur loyer" value={advance} onChange={setAdvance} suffix="mois" />
          <Num label="Frais d'agence" value={agency} onChange={setAgency} suffix="mois" wide hint="Mettez 0 si la location se fait sans agence." />
        </Card>
      }
      results={
        <>
          <Stat highlight label="Budget total à l'entrée" value={fcfa(total)} sub={`soit ${deposit + advance + agency} mois de loyer`} />
          <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07]">
            <StackBar
              parts={[
                { label: "Caution", value: d, color: "#5B5BF7" },
                { label: "Avance", value: a, color: "#2EE6A8" },
                { label: "Frais d'agence", value: f, color: "#FF8A3D" },
              ]}
            />
            <div className="mt-4 divide-y divide-ink-900/[0.06]">
              <Line label={`Caution · ${deposit} mois`} value={fcfa(d)} />
              <Line label={`Avance · ${advance} mois`} value={fcfa(a)} />
              <Line label={`Frais d'agence · ${agency} mois`} value={fcfa(f)} />
              <Line label="Restituable en fin de bail" value={fcfa(d)} strong />
            </div>
          </div>
          {(deposit > 2 || advance > 2) && (
            <Warning>
              Attention : le Code de la construction et de l&apos;habitat ivoirien (loi n° 2019-576 du 26 juin 2019) limite la caution et
              l&apos;avance à deux mois de loyer chacune.
            </Warning>
          )}
          <UpsellCta text="ImmoTopia suit chaque caution encaissée, la place en fonds de tiers et prépare sa restitution." />
        </>
      }
    />
  );
}

/* ================================================================ Rendement locatif */

export function YieldCalculator() {
  const [price, setPrice] = useState(45_000_000);
  const [fees, setFees] = useState(10);
  const [works, setWorks] = useState(2_000_000);
  const [rent, setRent] = useState(450_000);
  const [charges, setCharges] = useState(300_000);
  const [tax, setTax] = useState(250_000);
  const [vacancy, setVacancy] = useState(1);
  const [mgmt, setMgmt] = useState(10);

  const invest = price * (1 + fees / 100) + works;
  const grossRent = rent * 12;
  const collected = rent * Math.max(0, 12 - vacancy);
  const mgmtCost = (collected * mgmt) / 100;
  const netIncome = collected - charges - tax - mgmtCost;
  const gross = price ? (grossRent / price) * 100 : NaN;
  const net = invest ? (netIncome / invest) * 100 : NaN;
  const payback = netIncome > 0 ? invest / netIncome : NaN;

  return (
    <Layout
      inputs={
        <>
          <Card title="L'acquisition">
            <Num label="Prix d'achat du bien" value={price} onChange={setPrice} wide />
            <Num label="Frais d'acquisition" value={fees} onChange={setFees} suffix="%" step={0.5} hint="Notaire et enregistrement : à ajuster avec votre notaire." />
            <Num label="Travaux et ameublement" value={works} onChange={setWorks} />
          </Card>
          <Card title="L'exploitation">
            <Num label="Loyer mensuel" value={rent} onChange={setRent} />
            <Num label="Vacance locative" value={vacancy} onChange={setVacancy} suffix="mois/an" step={0.5} />
            <Num label="Charges annuelles non récupérables" value={charges} onChange={setCharges} />
            <Num label="Impôt foncier annuel" value={tax} onChange={setTax} />
            <Num label="Frais de gestion d'agence" value={mgmt} onChange={setMgmt} suffix="% loyers" step={0.5} wide />
          </Card>
        </>
      }
      results={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Rendement brut" value={pct(gross)} sub="loyers annuels / prix" />
            <Stat highlight label="Rendement net" value={pct(net)} sub="après frais et charges" />
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07]">
            <div className="divide-y divide-ink-900/[0.06]">
              <Line label="Coût total de l'investissement" value={fcfa(invest)} />
              <Line label="Loyers encaissés sur l'année" value={fcfa(collected)} />
              <Line label="Charges, impôt et gestion" value={`− ${fcfa(charges + tax + mgmtCost)}`} />
              <Line label="Revenu net annuel" value={fcfa(netIncome)} strong />
              <Line label="Cash-flow mensuel moyen (hors crédit)" value={fcfa(netIncome / 12)} strong />
              <Line label="Retour sur investissement" value={Number.isFinite(payback) ? `${payback.toFixed(1).replace(".", ",")} ans` : "—"} />
            </div>
          </div>
          <UpsellCta text="Suivez le rendement réel de chaque bien, mois après mois, directement depuis ImmoTopia." />
        </>
      }
    />
  );
}

/* ================================================================ Commission d'agence */

type Base = "rent" | "rent+charges";

export function CommissionCalculator() {
  const [rent, setRent] = useState(250_000);
  const [charges, setCharges] = useState(25_000);
  const [rate, setRate] = useState(10);
  const [base, setBase] = useState<Base>("rent");
  const [vat, setVat] = useState<"yes" | "no">("yes");
  const [months, setMonths] = useState(1);

  const collected = (rent + charges) * months;
  const baseAmount = (base === "rent" ? rent : rent + charges) * months;
  const ht = (baseAmount * rate) / 100;
  const tva = vat === "yes" ? ht * 0.18 : 0;
  const ttc = ht + tva;
  const net = collected - ttc;

  return (
    <Layout
      inputs={
        <Card title="Les paramètres du mandat">
          <Num label="Loyer mensuel" value={rent} onChange={setRent} />
          <Num label="Charges mensuelles" value={charges} onChange={setCharges} />
          <Num label="Taux de commission" value={rate} onChange={setRate} suffix="%" step={0.5} />
          <Num label="Nombre de mois" value={months} onChange={(v) => setMonths(Math.max(1, v))} suffix="mois" />
          <Choice
            wide
            label="Base de calcul"
            value={base}
            onChange={setBase}
            options={[
              { value: "rent", label: "Loyer seul" },
              { value: "rent+charges", label: "Loyer + charges" },
            ]}
          />
          <Choice
            wide
            label="TVA sur la commission (18 %)"
            value={vat}
            onChange={setVat}
            options={[
              { value: "yes", label: "Appliquer" },
              { value: "no", label: "Ne pas appliquer" },
            ]}
          />
        </Card>
      }
      results={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Commission TTC" value={fcfa(ttc)} sub={`dont TVA ${fcfa(tva)}`} />
            <Stat highlight label="Net à reverser" value={fcfa(net)} sub="au propriétaire" />
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07]">
            <StackBar
              parts={[
                { label: "Net propriétaire", value: net, color: "#5B5BF7" },
                { label: "Commission HT", value: ht, color: "#FF8A3D" },
                { label: "TVA", value: tva, color: "#F472B6" },
              ]}
            />
            <div className="mt-4 divide-y divide-ink-900/[0.06]">
              <Line label="Montant encaissé" value={fcfa(collected)} />
              <Line label="Base de commission" value={fcfa(baseAmount)} />
              <Line label={`Commission HT · ${pct(rate, 1)}`} value={fcfa(ht)} />
              <Line label="TVA 18 %" value={fcfa(tva)} />
              <Line label="Net reversé au bailleur" value={fcfa(net)} strong />
            </div>
          </div>
          <UpsellCta text="ImmoTopia calcule ces commissions automatiquement et génère les relevés de gérance de tous vos propriétaires." />
        </>
      }
    />
  );
}

/* ================================================================ Charges de copropriété */

type Lot = { id: number; name: string; shares: number };
const COLORS = ["#5B5BF7", "#2EE6A8", "#FF8A3D", "#F472B6", "#38BDF8", "#FACC15", "#A78BFA", "#20C997"];

export function ChargesCalculator() {
  const [budget, setBudget] = useState(4_800_000);
  const [lots, setLots] = useState<Lot[]>([
    { id: 1, name: "Appartement A1", shares: 120 },
    { id: 2, name: "Appartement A2", shares: 95 },
    { id: 3, name: "Appartement B1", shares: 140 },
    { id: 4, name: "Local commercial", shares: 180 },
  ]);
  const total = lots.reduce((a, l) => a + l.shares, 0);
  const update = (id: number, patch: Partial<Lot>) => setLots((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  return (
    <Layout
      inputs={
        <>
          <Card title="Le budget">
            <Num label="Budget annuel de la copropriété" value={budget} onChange={setBudget} wide hint="Gardiennage, électricité des communs, entretien, ascenseur, assurance…" />
          </Card>
          <div className="rounded-[24px] border border-ink-900/[0.07] bg-white p-5 shadow-sm md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Les lots</h2>
              <span className="text-sm text-ink-900/50">{total.toLocaleString("fr-FR")} tantièmes au total</span>
            </div>
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {lots.map((l, i) => (
                  <motion.div
                    key={l.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-[auto_1fr_8.5rem_auto] items-end gap-2"
                  >
                    <span className="mb-3.5 size-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    <Text label={i === 0 ? "Lot" : ""} value={l.name} onChange={(v) => update(l.id, { name: v })} />
                    <Num label={i === 0 ? "Tantièmes" : ""} value={l.shares} onChange={(v) => update(l.id, { shares: v })} suffix="" />
                    <button
                      onClick={() => setLots((ls) => ls.filter((x) => x.id !== l.id))}
                      disabled={lots.length <= 1}
                      aria-label={`Supprimer ${l.name}`}
                      className="mb-1 grid size-10 cursor-pointer place-items-center rounded-xl text-ink-900/40 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setLots((ls) => [...ls, { id: Date.now(), name: `Lot ${ls.length + 1}`, shares: 100 }])}
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-dashed border-ink-900/20 px-4 py-2 text-sm font-semibold text-ink-900/70 transition hover:border-brand-500 hover:text-brand-600"
            >
              <Plus className="size-4" /> Ajouter un lot
            </button>
          </div>
        </>
      }
      results={
        <>
          <Stat highlight label="Budget mensuel de la copropriété" value={fcfa(budget / 12)} sub={`${fcfa(budget)} par an`} />
          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-ink-900/[0.07]">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-ink-900/[0.06] px-4 py-2.5 text-xs font-medium text-ink-900/45">
              <span>Lot</span>
              <span className="text-right">Quote-part</span>
              <span className="text-right">Par mois</span>
            </div>
            {lots.map((l, i) => {
              const share = total ? l.shares / total : 0;
              return (
                <div key={l.id} className="relative grid grid-cols-[1fr_auto_auto] gap-x-4 px-4 py-3 text-sm">
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 left-0 opacity-10"
                    style={{ background: COLORS[i % COLORS.length] }}
                    initial={false}
                    animate={{ width: `${share * 100}%` }}
                  />
                  <span className="relative truncate font-medium">{l.name || "Sans nom"}</span>
                  <span className="relative text-right text-ink-900/60 tabular-nums">{pct(share * 100, 1)}</span>
                  <span className="relative text-right font-semibold tabular-nums">{fcfa((budget * share) / 12)}</span>
                </div>
              );
            })}
          </div>
          <p className="px-1 text-xs text-ink-900/45">Appel de fonds trimestriel = montant mensuel × 3. Quote-part annuelle = montant mensuel × 12.</p>
          <UpsellCta text="Avec le module Syndic, les appels de fonds partent automatiquement et chaque paiement est rapproché du bon lot." />
        </>
      }
    />
  );
}
