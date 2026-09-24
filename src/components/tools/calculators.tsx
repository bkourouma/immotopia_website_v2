"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { fcfa, pct } from "@/lib/format";
import { useI18n } from "../locale-provider";
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
  const { t } = useI18n();
  const mo = t("mois", "months");
  const [rent, setRent] = useState(150000);
  const [deposit, setDeposit] = useState(2);
  const [advance, setAdvance] = useState(2);
  const [agency, setAgency] = useState(1);

  const d = rent * deposit;
  const a = rent * advance;
  const f = rent * agency;
  const total = d + a + f;
  const months = deposit + advance + agency;

  return (
    <Layout
      inputs={
        <Card title={t("Le logement", "The property")}>
          <Num label={t("Loyer mensuel (hors charges)", "Monthly rent (excluding charges)")} value={rent} onChange={setRent} wide />
          <Num label={t("Caution (dépôt de garantie)", "Security deposit")} value={deposit} onChange={setDeposit} suffix={mo} />
          <Num label={t("Avance sur loyer", "Advance rent")} value={advance} onChange={setAdvance} suffix={mo} />
          <Num
            label={t("Frais d'agence", "Agency fees")}
            value={agency}
            onChange={setAgency}
            suffix={mo}
            wide
            hint={t("Mettez 0 si la location se fait sans agence.", "Enter 0 if the rental does not go through an agency.")}
          />
        </Card>
      }
      results={
        <>
          <Stat
            highlight
            label={t("Budget total à l'entrée", "Total move-in budget")}
            value={fcfa(total)}
            sub={t(`soit ${months} mois de loyer`, `i.e. ${months} months of rent`)}
          />
          <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07]">
            <StackBar
              parts={[
                { label: t("Caution", "Deposit"), value: d, color: "#5B5BF7" },
                {
                  label: t("Avance", "Advance rent"),
                  value: a,
                  color: "#2EE6A8",
                },
                {
                  label: t("Frais d'agence", "Agency fees"),
                  value: f,
                  color: "#FF8A3D",
                },
              ]}
            />
            <div className="mt-4 divide-y divide-ink-900/[0.06]">
              <Line label={`${t("Caution", "Deposit")} · ${deposit} ${mo}`} value={fcfa(d)} />
              <Line label={`${t("Avance", "Advance rent")} · ${advance} ${mo}`} value={fcfa(a)} />
              <Line label={`${t("Frais d'agence", "Agency fees")} · ${agency} ${mo}`} value={fcfa(f)} />
              <Line label={t("Restituable en fin de bail", "Refundable at the end of the lease")} value={fcfa(d)} strong />
            </div>
          </div>
          {(deposit > 2 || advance > 2) && (
            <Warning>
              {t(
                "Attention : le Code de la construction et de l'habitat ivoirien (loi n° 2019-576 du 26 juin 2019) limite la caution et l'avance à deux mois de loyer chacune.",
                "Note: the Ivorian Construction and Housing Code (Law No. 2019-576 of 26 June 2019) caps the deposit and the advance rent at two months' rent each.",
              )}
            </Warning>
          )}
          <UpsellCta
            text={t(
              "Dans ImmoTopia, chaque dépôt de garantie est tracé : constitution, retenues et restitution.",
              "In ImmoTopia, every security deposit is tracked: collection, deductions and refund.",
            )}
          />
        </>
      }
    />
  );
}

/* ================================================================ Rendement locatif */

export function YieldCalculator() {
  const { t } = useI18n();
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
  const years = payback.toFixed(1).replace(".", ",");

  return (
    <Layout
      inputs={
        <>
          <Card title={t("L'acquisition", "The purchase")}>
            <Num label={t("Prix d'achat du bien", "Property purchase price")} value={price} onChange={setPrice} wide />
            <Num
              label={t("Frais d'acquisition", "Acquisition costs")}
              value={fees}
              onChange={setFees}
              suffix="%"
              step={0.5}
              hint={t(
                "Notaire et enregistrement : à ajuster avec votre notaire.",
                "Notary and registration fees: confirm the exact figure with your notary.",
              )}
            />
            <Num label={t("Travaux et ameublement", "Renovation and furnishing")} value={works} onChange={setWorks} />
          </Card>
          <Card title={t("L'exploitation", "Running the property")}>
            <Num label={t("Loyer mensuel", "Monthly rent")} value={rent} onChange={setRent} />
            <Num label={t("Vacance locative", "Vacancy")} value={vacancy} onChange={setVacancy} suffix={t("mois/an", "mo/yr")} step={0.5} />
            <Num label={t("Charges annuelles non récupérables", "Annual non-recoverable charges")} value={charges} onChange={setCharges} />
            <Num label={t("Impôt foncier annuel", "Annual property tax")} value={tax} onChange={setTax} />
            <Num
              label={t("Frais de gestion d'agence", "Agency management fees")}
              value={mgmt}
              onChange={setMgmt}
              suffix={t("% loyers", "% of rent")}
              step={0.5}
              wide
            />
          </Card>
        </>
      }
      results={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Stat label={t("Rendement brut", "Gross yield")} value={pct(gross)} sub={t("loyers annuels / prix", "annual rent / price")} />
            <Stat
              highlight
              label={t("Rendement net", "Net yield")}
              value={pct(net)}
              sub={t("après frais et charges", "after costs and charges")}
            />
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07]">
            <div className="divide-y divide-ink-900/[0.06]">
              <Line label={t("Coût total de l'investissement", "Total investment cost")} value={fcfa(invest)} />
              <Line label={t("Loyers encaissés sur l'année", "Rent collected over the year")} value={fcfa(collected)} />
              <Line label={t("Charges, impôt et gestion", "Charges, tax and management")} value={`− ${fcfa(charges + tax + mgmtCost)}`} />
              <Line label={t("Revenu net annuel", "Annual net income")} value={fcfa(netIncome)} strong />
              <Line
                label={t("Cash-flow mensuel moyen (hors crédit)", "Average monthly cash flow (excluding loan)")}
                value={fcfa(netIncome / 12)}
                strong
              />
              <Line
                label={t("Retour sur investissement", "Payback period")}
                value={Number.isFinite(payback) ? t(`${years} ans`, `${payback.toFixed(1)} years`) : "—"}
              />
            </div>
          </div>
          <UpsellCta
            text={t(
              "Suivez valeur, loyers et rendement de chaque bien dans la vue patrimoine d'ImmoTopia.",
              "Track the value, rent and yield of every property in ImmoTopia's portfolio view.",
            )}
          />
        </>
      }
    />
  );
}

/* ================================================================ Commission d'agence */

type Base = "rent" | "rent+charges";

export function CommissionCalculator() {
  const { t } = useI18n();
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
  const htLabel = t("Commission HT", "Commission excl. VAT");

  return (
    <Layout
      inputs={
        <Card title={t("Les paramètres du mandat", "Management mandate settings")}>
          <Num label={t("Loyer mensuel", "Monthly rent")} value={rent} onChange={setRent} />
          <Num label={t("Charges mensuelles", "Monthly charges")} value={charges} onChange={setCharges} />
          <Num label={t("Taux de commission", "Commission rate")} value={rate} onChange={setRate} suffix="%" step={0.5} />
          <Num
            label={t("Nombre de mois", "Number of months")}
            value={months}
            onChange={(v) => setMonths(Math.max(1, v))}
            suffix={t("mois", "months")}
          />
          <Choice
            wide
            label={t("Base de calcul", "Calculation base")}
            value={base}
            onChange={setBase}
            options={[
              { value: "rent", label: t("Loyer seul", "Rent only") },
              {
                value: "rent+charges",
                label: t("Loyer + charges", "Rent + charges"),
              },
            ]}
          />
          <Choice
            wide
            label={t("TVA sur la commission (18 %)", "VAT on the commission (18%)")}
            value={vat}
            onChange={setVat}
            options={[
              { value: "yes", label: t("Appliquer", "Apply") },
              { value: "no", label: t("Ne pas appliquer", "Don't apply") },
            ]}
          />
        </Card>
      }
      results={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Stat
              label={t("Commission TTC", "Commission incl. VAT")}
              value={fcfa(ttc)}
              sub={t(`dont TVA ${fcfa(tva)}`, `of which VAT ${fcfa(tva)}`)}
            />
            <Stat highlight label={t("Net à reverser", "Net payable")} value={fcfa(net)} sub={t("au propriétaire", "to the landlord")} />
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-900/[0.07]">
            <StackBar
              parts={[
                {
                  label: t("Net propriétaire", "Landlord net"),
                  value: net,
                  color: "#5B5BF7",
                },
                { label: htLabel, value: ht, color: "#FF8A3D" },
                { label: t("TVA", "VAT"), value: tva, color: "#F472B6" },
              ]}
            />
            <div className="mt-4 divide-y divide-ink-900/[0.06]">
              <Line label={t("Montant encaissé", "Amount collected")} value={fcfa(collected)} />
              <Line label={t("Base de commission", "Commission base")} value={fcfa(baseAmount)} />
              <Line label={`${htLabel} · ${pct(rate, 1)}`} value={fcfa(ht)} />
              <Line label={t("TVA 18 %", "VAT 18%")} value={fcfa(tva)} />
              <Line label={t("Net reversé au bailleur", "Net paid to the landlord")} value={fcfa(net)} strong />
            </div>
          </div>
          <UpsellCta
            text={t(
              "ImmoTopia prépare les relevés de gérance de vos propriétaires, période par période.",
              "ImmoTopia prepares management statements for your landlords, period by period.",
            )}
          />
        </>
      }
    />
  );
}

/* ================================================================ Charges de copropriété */

type Lot = { id: number; name: string; shares: number };
const COLORS = ["#5B5BF7", "#2EE6A8", "#FF8A3D", "#F472B6", "#38BDF8", "#FACC15", "#A78BFA", "#20C997"];

export function ChargesCalculator() {
  const { t } = useI18n();
  const [budget, setBudget] = useState(4_800_000);
  const [lots, setLots] = useState<Lot[]>(() => [
    { id: 1, name: t("Appartement A1", "Apartment A1"), shares: 120 },
    { id: 2, name: t("Appartement A2", "Apartment A2"), shares: 95 },
    { id: 3, name: t("Appartement B1", "Apartment B1"), shares: 140 },
    { id: 4, name: t("Local commercial", "Retail unit"), shares: 180 },
  ]);
  const total = lots.reduce((a, l) => a + l.shares, 0);
  const update = (id: number, patch: Partial<Lot>) => setLots((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const lotLabel = t("Lot", "Unit");

  return (
    <Layout
      inputs={
        <>
          <Card title={t("Le budget", "The budget")}>
            <Num
              label={t("Budget annuel de la copropriété", "Annual condominium budget")}
              value={budget}
              onChange={setBudget}
              wide
              hint={t(
                "Gardiennage, électricité des communs, entretien, ascenseur, assurance…",
                "Security, common-area electricity, maintenance, lift, insurance…",
              )}
            />
          </Card>
          <div className="rounded-[24px] border border-ink-900/[0.07] bg-white p-5 shadow-sm md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">{t("Les lots", "Units")}</h2>
              <span className="text-sm text-ink-900/50">
                {total.toLocaleString("fr-FR")} {t("tantièmes au total", "shares in total")}
              </span>
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
                    <Text label={i === 0 ? lotLabel : ""} value={l.name} onChange={(v) => update(l.id, { name: v })} />
                    <Num
                      label={i === 0 ? t("Tantièmes", "Shares") : ""}
                      value={l.shares}
                      onChange={(v) => update(l.id, { shares: v })}
                      suffix=""
                    />
                    <button
                      onClick={() => setLots((ls) => ls.filter((x) => x.id !== l.id))}
                      disabled={lots.length <= 1}
                      aria-label={t(`Supprimer ${l.name}`, `Remove ${l.name}`)}
                      className="mb-1 grid size-10 cursor-pointer place-items-center rounded-xl text-ink-900/40 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <button
              onClick={() =>
                setLots((ls) => [
                  ...ls,
                  {
                    id: Date.now(),
                    name: `${lotLabel} ${ls.length + 1}`,
                    shares: 100,
                  },
                ])
              }
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-dashed border-ink-900/20 px-4 py-2 text-sm font-semibold text-ink-900/70 transition hover:border-brand-500 hover:text-brand-600"
            >
              <Plus className="size-4" /> {t("Ajouter un lot", "Add a unit")}
            </button>
          </div>
        </>
      }
      results={
        <>
          <Stat
            highlight
            label={t("Budget mensuel de la copropriété", "Monthly condominium budget")}
            value={fcfa(budget / 12)}
            sub={`${fcfa(budget)} ${t("par an", "per year")}`}
          />
          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-ink-900/[0.07]">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-ink-900/[0.06] px-4 py-2.5 text-xs font-medium text-ink-900/45">
              <span>{lotLabel}</span>
              <span className="text-right">{t("Quote-part", "Share")}</span>
              <span className="text-right">{t("Par mois", "Per month")}</span>
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
                  <span className="relative truncate font-medium">{l.name || t("Sans nom", "Unnamed")}</span>
                  <span className="relative text-right text-ink-900/60 tabular-nums">{pct(share * 100, 1)}</span>
                  <span className="relative text-right font-semibold tabular-nums">{fcfa((budget * share) / 12)}</span>
                </div>
              );
            })}
          </div>
          <p className="px-1 text-xs text-ink-900/45">
            {t(
              "Appel de fonds trimestriel = montant mensuel × 3. Quote-part annuelle = montant mensuel × 12.",
              "Quarterly call for funds = monthly amount × 3. Annual share = monthly amount × 12.",
            )}
          </p>
          <UpsellCta
            text={t(
              "Avec le module Syndic, les appels de charges sont générés par lot depuis le budget, selon les tantièmes.",
              "With the Property Management module, service charge calls are generated per unit from the budget, based on ownership shares.",
            )}
          />
        </>
      }
    />
  );
}
