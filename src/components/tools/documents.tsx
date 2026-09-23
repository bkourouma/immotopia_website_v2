"use client";

import { useState, type ReactNode } from "react";
import type { Block, Doc } from "@/lib/document";
import { fcfa, fcfaWords, longDate, monthBounds, monthLabel, todayISO } from "@/lib/format";
import { Card, Choice, DocPreview, DownloadButton, Num, Text, UpsellCta } from "./tool-ui";

// Ces composants sont chargés uniquement dans le navigateur (dates du jour par défaut).

function Layout({ form, doc, upsell }: { form: ReactNode; doc: Doc; upsell: string }) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.05fr]">
      <div className="space-y-6">{form}</div>
      <div className="space-y-4 lg:sticky lg:top-24">
        <DownloadButton doc={doc} />
        <div className="max-h-[70vh] overflow-y-auto rounded-[22px] bg-[#e9eaf3] p-3 md:p-5">
          <p className="mb-3 text-center text-xs font-semibold tracking-[0.14em] text-ink-900/40 uppercase">Aperçu en direct</p>
          <DocPreview blocks={doc.blocks} />
        </div>
        <UpsellCta text={upsell} />
      </div>
    </div>
  );
}

const or = (v: string, fallback: string) => (v.trim() ? v.trim() : fallback);
const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "document";

function currentMonth() {
  return todayISO().slice(0, 7);
}

/* ================================================================ Quittance */

const payModes = ["Wave", "Orange Money", "MTN MoMo", "Moov Money", "Virement", "Chèque", "Espèces"] as const;

export function ReceiptGenerator() {
  const [landlord, setLandlord] = useState("Konan Yao");
  const [landlordAddr, setLandlordAddr] = useState("Cocody Ambassades, Abidjan");
  const [tenant, setTenant] = useState("Aya Kouassi");
  const [property, setProperty] = useState("Appartement B12, Riviera 3, Cocody, Abidjan");
  const [period, setPeriod] = useState(currentMonth);
  const [rent, setRent] = useState(250_000);
  const [charges, setCharges] = useState(0);
  const [paidOn, setPaidOn] = useState(todayISO);
  const [mode, setMode] = useState<(typeof payModes)[number]>("Wave");
  const [place, setPlace] = useState("Abidjan");

  const total = rent + charges;
  const b = monthBounds(period);
  const periodText = b ? `du ${longDate(b.from)} au ${longDate(b.to)}` : "…";
  const rows: [string, string][] = [["Loyer (hors charges)", fcfa(rent)]];
  if (charges) rows.push(["Charges", fcfa(charges)]);

  const blocks: Block[] = [
    { t: "title", text: "Quittance de loyer", sub: `Période : ${monthLabel(period)}` },
    {
      t: "parties",
      left: { label: "Bailleur", lines: [or(landlord, "Nom du bailleur"), or(landlordAddr, "Adresse du bailleur")] },
      right: { label: "Locataire", lines: [or(tenant, "Nom du locataire"), or(property, "Adresse du logement")] },
    },
    { t: "table", rows, total: ["Total payé", fcfa(total)] },
    {
      t: "p",
      text: `Je soussigné(e) ${or(landlord, "…")}, propriétaire du logement désigné ci-dessus, déclare avoir reçu de ${or(tenant, "…")} la somme de ${fcfaWords(total)} (${fcfa(total)}), au titre du loyer${charges ? " et des charges" : ""} pour la période ${periodText}, et lui en donne quittance, sous réserve de tous mes droits.`,
    },
    { t: "p", text: `Paiement reçu le ${longDate(paidOn)} par ${mode}.` },
    { t: "sign", place: `Fait à ${or(place, "…")}, le ${longDate(paidOn)}`, left: "Le bailleur" },
    {
      t: "note",
      text: "La présente quittance vaut reçu pour la période indiquée. Elle ne libère pas le locataire des sommes éventuellement dues pour des périodes antérieures.",
    },
  ];

  return (
    <Layout
      doc={{ filename: `quittance-${slug(tenant)}-${period}.pdf`, blocks }}
      upsell="Avec ImmoTopia, quittances et reçus sont générés depuis vos propres modèles et numérotés automatiquement."
      form={
        <>
          <Card title="Les parties">
            <Text label="Nom du bailleur" value={landlord} onChange={setLandlord} />
            <Text label="Adresse du bailleur" value={landlordAddr} onChange={setLandlordAddr} />
            <Text label="Nom du locataire" value={tenant} onChange={setTenant} />
            <Text label="Ville de signature" value={place} onChange={setPlace} />
            <Text label="Adresse du logement loué" value={property} onChange={setProperty} wide />
          </Card>
          <Card title="Le paiement">
            <Text label="Mois concerné" type="month" value={period} onChange={setPeriod} />
            <Text label="Date du paiement" type="date" value={paidOn} onChange={setPaidOn} />
            <Num label="Loyer" value={rent} onChange={setRent} />
            <Num label="Charges" value={charges} onChange={setCharges} />
            <Choice wide label="Mode de paiement" value={mode} onChange={setMode} options={payModes.map((m) => ({ value: m, label: m }))} />
          </Card>
        </>
      }
    />
  );
}

/* ================================================================ Bail d'habitation (Côte d'Ivoire) */

export function ResidentialLeaseGenerator() {
  const [landlord, setLandlord] = useState("Konan Yao");
  const [landlordId, setLandlordId] = useState("");
  const [tenant, setTenant] = useState("Aya Kouassi");
  const [tenantId, setTenantId] = useState("");
  const [address, setAddress] = useState("Riviera 3, Cocody, Abidjan");
  const [kind, setKind] = useState("Appartement de 3 pièces");
  const [start, setStart] = useState(todayISO);
  const [duration, setDuration] = useState(1);
  const [rent, setRent] = useState(250_000);
  const [dueDay, setDueDay] = useState(5);
  const [deposit, setDeposit] = useState(2);
  const [advance, setAdvance] = useState(2);
  const [notice, setNotice] = useState(3);
  const [place, setPlace] = useState("Abidjan");

  const L = or(landlord, "…");
  const T = or(tenant, "…");
  const blocks: Block[] = [
    { t: "title", text: "Contrat de bail à usage d'habitation", sub: "République de Côte d'Ivoire" },
    { t: "p", text: "ENTRE LES SOUSSIGNÉS :" },
    {
      t: "parties",
      left: { label: "Le bailleur", lines: [L, landlordId ? `Pièce d'identité n° ${landlordId}` : "Pièce d'identité n° …"] },
      right: { label: "Le locataire", lines: [T, tenantId ? `Pièce d'identité n° ${tenantId}` : "Pièce d'identité n° …"] },
    },
    { t: "p", text: "Il a été convenu et arrêté ce qui suit :" },
    { t: "h", text: "Article 1 — Objet et désignation" },
    {
      t: "p",
      text: `Le bailleur donne en location au locataire, qui accepte, le logement suivant : ${or(kind, "…")}, situé ${or(address, "…")}. Les locaux sont loués à usage exclusif d'habitation principale du locataire et de sa famille.`,
    },
    { t: "h", text: "Article 2 — Durée" },
    {
      t: "p",
      text: `Le présent bail est consenti pour une durée de ${duration} an${duration > 1 ? "s" : ""} à compter du ${longDate(start)}. À son terme, il se renouvelle par tacite reconduction pour la même durée, sauf congé donné par l'une des parties par écrit, au moins ${notice} mois à l'avance.`,
    },
    { t: "h", text: "Article 3 — Loyer" },
    {
      t: "p",
      text: `Le loyer mensuel est fixé à ${fcfaWords(rent)} (${fcfa(rent)}), hors charges. Il est payable d'avance, au plus tard le ${dueDay} de chaque mois, par Mobile Money, virement ou en espèces. Chaque paiement donne lieu à la remise d'une quittance.`,
    },
    { t: "h", text: "Article 4 — Charges" },
    {
      t: "p",
      text: "Les consommations d'eau et d'électricité, ainsi que les abonnements souscrits par le locataire, sont à la charge exclusive de celui-ci. Il en justifie le paiement à première demande et en fin de bail.",
    },
    { t: "h", text: "Article 5 — Caution et avance" },
    {
      t: "p",
      text: `À la signature, le locataire verse une caution (dépôt de garantie) de ${deposit} mois de loyer, soit ${fcfa(rent * deposit)}, et une avance de ${advance} mois de loyer, soit ${fcfa(rent * advance)}. La caution ne produit pas d'intérêts ; elle est restituée à la fin du bail, déduction faite des sommes dues et du coût des réparations locatives constatées lors de l'état des lieux de sortie.`,
    },
    { t: "h", text: "Article 6 — État des lieux" },
    {
      t: "p",
      text: "Un état des lieux contradictoire, signé par les deux parties, est établi à l'entrée et à la sortie du locataire. Il est annexé au présent contrat.",
    },
    { t: "h", text: "Article 7 — Obligations du bailleur" },
    {
      t: "p",
      text: "Le bailleur délivre un logement décent et en bon état d'usage, assure au locataire la jouissance paisible des lieux et prend en charge les grosses réparations ainsi que celles qui ne relèvent pas de l'entretien courant.",
    },
    { t: "h", text: "Article 8 — Obligations du locataire" },
    {
      t: "p",
      text: "Le locataire paie le loyer aux échéances convenues, use des lieux en bon père de famille, assure l'entretien courant et les menues réparations, et ne peut transformer les lieux sans l'accord écrit du bailleur. Il ne peut ni sous-louer ni céder le bail sans accord écrit du bailleur.",
    },
    { t: "h", text: "Article 9 — Résiliation" },
    {
      t: "p",
      text: "À défaut de paiement d'un terme de loyer à son échéance, ou d'inexécution de l'une des clauses du bail, et après mise en demeure restée sans effet, le bail pourra être résilié dans les conditions prévues par la loi.",
    },
    { t: "h", text: "Article 10 — Droit applicable et litiges" },
    {
      t: "p",
      text: "Le présent bail est régi par la législation ivoirienne en vigueur, notamment la loi n° 2019-576 du 26 juin 2019 instituant le Code de la construction et de l'habitat. Tout litige relève de la juridiction compétente du lieu de situation du logement. Le bail est soumis à l'enregistrement auprès des services des impôts.",
    },
    { t: "sign", place: `Fait à ${or(place, "…")}, le ${longDate(todayISO())}, en deux exemplaires originaux.`, left: "Le bailleur", right: "Le locataire" },
    {
      t: "note",
      text: "Modèle fourni à titre indicatif par ImmoTopia. Il ne remplace pas le conseil d'un professionnel du droit ; adaptez-le à votre situation avant signature.",
    },
  ];

  return (
    <Layout
      doc={{ filename: `bail-habitation-${slug(tenant)}.pdf`, blocks }}
      upsell="Dans ImmoTopia, chaque bail génère son échéancier, ses rappels de loyer et ses documents."
      form={
        <>
          <Card title="Les parties">
            <Text label="Nom du bailleur" value={landlord} onChange={setLandlord} />
            <Text label="N° de pièce d'identité (bailleur)" value={landlordId} onChange={setLandlordId} placeholder="Facultatif" />
            <Text label="Nom du locataire" value={tenant} onChange={setTenant} />
            <Text label="N° de pièce d'identité (locataire)" value={tenantId} onChange={setTenantId} placeholder="Facultatif" />
          </Card>
          <Card title="Le logement">
            <Text label="Type de logement" value={kind} onChange={setKind} />
            <Text label="Ville de signature" value={place} onChange={setPlace} />
            <Text label="Adresse" value={address} onChange={setAddress} wide />
          </Card>
          <Card title="Les conditions">
            <Text label="Date de prise d'effet" type="date" value={start} onChange={setStart} />
            <Num label="Durée" value={duration} onChange={(v) => setDuration(Math.max(1, v))} suffix="an(s)" />
            <Num label="Loyer mensuel" value={rent} onChange={setRent} />
            <Num label="Échéance (jour du mois)" value={dueDay} onChange={(v) => setDueDay(Math.min(28, Math.max(1, v)))} suffix="" />
            <Num label="Caution" value={deposit} onChange={setDeposit} suffix="mois" hint="Plafond légal : 2 mois." />
            <Num label="Avance" value={advance} onChange={setAdvance} suffix="mois" hint="Plafond légal : 2 mois." />
            <Num label="Préavis de congé" value={notice} onChange={setNotice} suffix="mois" wide />
          </Card>
        </>
      }
    />
  );
}

/* ================================================================ Bail commercial (OHADA) */

export function CommercialLeaseGenerator() {
  const [landlord, setLandlord] = useState("SCI Les Cocotiers");
  const [tenant, setTenant] = useState("SARL Akwaba Services");
  const [rccm, setRccm] = useState("");
  const [address, setAddress] = useState("Immeuble Alpha, Plateau, Abidjan");
  const [activity, setActivity] = useState("bureaux et prestations de services");
  const [start, setStart] = useState(todayISO);
  const [term, setTerm] = useState<"fixed" | "open">("fixed");
  const [duration, setDuration] = useState(3);
  const [rent, setRent] = useState(600_000);
  const [deposit, setDeposit] = useState(3);
  const [place, setPlace] = useState("Abidjan");

  const L = or(landlord, "…");
  const T = or(tenant, "…");
  const blocks: Block[] = [
    { t: "title", text: "Bail à usage professionnel", sub: "Acte uniforme OHADA relatif au droit commercial général" },
    { t: "p", text: "ENTRE LES SOUSSIGNÉS :" },
    {
      t: "parties",
      left: { label: "Le bailleur", lines: [L] },
      right: { label: "Le preneur", lines: [T, rccm ? `RCCM : ${rccm}` : "RCCM : …"] },
    },
    { t: "p", text: "Il a été convenu et arrêté ce qui suit :" },
    { t: "h", text: "Article 1 — Objet" },
    {
      t: "p",
      text: `Le bailleur donne à bail au preneur, qui accepte, les locaux situés ${or(address, "…")}, pour l'exercice de l'activité suivante : ${or(activity, "…")}. Le preneur ne peut changer d'activité sans l'accord écrit du bailleur.`,
    },
    { t: "h", text: "Article 2 — Durée" },
    {
      t: "p",
      text:
        term === "fixed"
          ? `Le bail est conclu pour une durée déterminée de ${duration} an${duration > 1 ? "s" : ""} à compter du ${longDate(start)}. Conformément à l'Acte uniforme, le preneur qui a exploité son activité pendant au moins deux ans dans les lieux bénéficie d'un droit au renouvellement, qu'il doit demander avant l'expiration du bail dans les formes prévues par ce texte.`
          : `Le bail est conclu pour une durée indéterminée à compter du ${longDate(start)}. Chaque partie peut y mettre fin en donnant congé par acte extrajudiciaire au moins six mois à l'avance, dans les conditions prévues par l'Acte uniforme.`,
    },
    { t: "h", text: "Article 3 — Loyer et révision" },
    {
      t: "p",
      text: `Le loyer mensuel est fixé à ${fcfaWords(rent)} (${fcfa(rent)}) hors taxes et hors charges, payable d'avance le 5 de chaque mois. À défaut d'accord entre les parties, le loyer peut être révisé à l'expiration de chaque période triennale, dans les conditions prévues par l'Acte uniforme.`,
    },
    { t: "h", text: "Article 4 — Dépôt de garantie" },
    {
      t: "p",
      text: `Le preneur verse à la signature un dépôt de garantie de ${deposit} mois de loyer, soit ${fcfa(rent * deposit)}, restitué en fin de bail déduction faite des sommes dues.`,
    },
    { t: "h", text: "Article 5 — Charges, impôts et entretien" },
    {
      t: "p",
      text: "Le preneur supporte les consommations, abonnements et charges liées à son activité, ainsi que l'entretien courant des locaux. Le bailleur conserve à sa charge les grosses réparations.",
    },
    { t: "h", text: "Article 6 — Cession et sous-location" },
    {
      t: "p",
      text: "La sous-location, totale ou partielle, est interdite sauf accord écrit du bailleur. La cession du bail s'effectue dans les conditions prévues par l'Acte uniforme, après signification au bailleur.",
    },
    { t: "h", text: "Article 7 — Clause résolutoire" },
    {
      t: "p",
      text: "En cas de non-paiement du loyer ou d'inexécution d'une clause du bail, le bailleur pourra, après mise en demeure restée sans effet pendant le délai légal, demander à la juridiction compétente la résiliation du bail.",
    },
    { t: "h", text: "Article 8 — Droit applicable" },
    {
      t: "p",
      text: "Le présent bail est régi par les dispositions de l'Acte uniforme OHADA relatif au droit commercial général relatives au bail à usage professionnel, et par la loi ivoirienne pour tout ce qui n'y est pas contraire. Il est soumis à l'enregistrement.",
    },
    { t: "sign", place: `Fait à ${or(place, "…")}, le ${longDate(todayISO())}, en deux exemplaires originaux.`, left: "Le bailleur", right: "Le preneur" },
    {
      t: "note",
      text: "Modèle fourni à titre indicatif par ImmoTopia. Il ne remplace pas le conseil d'un avocat ou d'un notaire ; adaptez-le avant signature.",
    },
  ];

  return (
    <Layout
      doc={{ filename: `bail-commercial-${slug(tenant)}.pdf`, blocks }}
      upsell="Suivez vos baux et leurs échéances dans ImmoTopia, avec un rappel automatique avant leur terme."
      form={
        <>
          <Card title="Les parties">
            <Text label="Bailleur (nom ou société)" value={landlord} onChange={setLandlord} />
            <Text label="Preneur (société)" value={tenant} onChange={setTenant} />
            <Text label="N° RCCM du preneur" value={rccm} onChange={setRccm} placeholder="CI-ABJ-…" />
            <Text label="Ville de signature" value={place} onChange={setPlace} />
          </Card>
          <Card title="Les locaux">
            <Text label="Adresse des locaux" value={address} onChange={setAddress} wide />
            <Text label="Activité autorisée" value={activity} onChange={setActivity} wide />
          </Card>
          <Card title="Les conditions">
            <Choice
              wide
              label="Type de bail"
              value={term}
              onChange={setTerm}
              options={[
                { value: "fixed", label: "Durée déterminée" },
                { value: "open", label: "Durée indéterminée" },
              ]}
            />
            <Text label="Date de prise d'effet" type="date" value={start} onChange={setStart} />
            {term === "fixed" ? <Num label="Durée" value={duration} onChange={(v) => setDuration(Math.max(1, v))} suffix="an(s)" /> : <div />}
            <Num label="Loyer mensuel HT" value={rent} onChange={setRent} />
            <Num label="Dépôt de garantie" value={deposit} onChange={setDeposit} suffix="mois" />
          </Card>
        </>
      }
    />
  );
}
