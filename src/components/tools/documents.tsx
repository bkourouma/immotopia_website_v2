"use client";

import { useState, type ReactNode } from "react";
import type { Block, Doc } from "@/lib/document";
import { fcfa, fcfaWords, longDate, monthBounds, monthLabel, todayISO } from "@/lib/format";
import { useI18n } from "../locale-provider";
import { Card, Choice, DocLanguageNote, DocPreview, DownloadButton, MultiChoice, Num, SoftwareBanner, Text, UpsellCta } from "./tool-ui";

// Ces composants sont chargés uniquement dans le navigateur (dates du jour par défaut).
// L'interface est traduite, mais le document généré reste en français (langue juridique en Côte d'Ivoire).

function Layout({ form, doc, upsell, banner }: { form: ReactNode; doc: Doc; upsell: string; banner?: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      {banner}
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.05fr]">
      <div className="space-y-6">{form}</div>
      <div className="space-y-4 lg:sticky lg:top-24">
        <DownloadButton doc={doc} />
        <DocLanguageNote />
        <div className="max-h-[70vh] overflow-y-auto rounded-[22px] bg-[#e9eaf3] p-3 md:p-5">
          <p className="mb-3 text-center text-xs font-semibold tracking-[0.14em] text-ink-900/40 uppercase">
            {t("Aperçu en direct", "Live preview")}
          </p>
          <DocPreview blocks={doc.blocks} />
        </div>
        <UpsellCta text={upsell} />
      </div>
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

// Les valeurs restent en français (elles figurent dans la quittance) ; seuls les libellés sont traduits.
const payModes = ["Wave", "Orange Money", "MTN MoMo", "Moov Money", "Virement", "Chèque", "Espèces"] as const;
const payModeEn: Partial<Record<(typeof payModes)[number], string>> = {
  Virement: "Bank transfer",
  Chèque: "Cheque",
  Espèces: "Cash",
};

export function ReceiptGenerator() {
  const { t } = useI18n();
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
    {
      t: "title",
      text: "Quittance de loyer",
      sub: `Période : ${monthLabel(period)}`,
    },
    {
      t: "parties",
      left: {
        label: "Bailleur",
        lines: [or(landlord, "Nom du bailleur"), or(landlordAddr, "Adresse du bailleur")],
      },
      right: {
        label: "Locataire",
        lines: [or(tenant, "Nom du locataire"), or(property, "Adresse du logement")],
      },
    },
    { t: "table", rows, total: ["Total payé", fcfa(total)] },
    {
      t: "p",
      text: `Je soussigné(e) ${or(landlord, "…")}, propriétaire du logement désigné ci-dessus, déclare avoir reçu de ${or(tenant, "…")} la somme de ${fcfaWords(total)} (${fcfa(total)}), au titre du loyer${charges ? " et des charges" : ""} pour la période ${periodText}, et lui en donne quittance, sous réserve de tous mes droits.`,
    },
    { t: "p", text: `Paiement reçu le ${longDate(paidOn)} par ${mode}.` },
    {
      t: "sign",
      place: `Fait à ${or(place, "…")}, le ${longDate(paidOn)}`,
      left: "Le bailleur",
    },
    {
      t: "note",
      text: "La présente quittance vaut reçu pour la période indiquée. Elle ne libère pas le locataire des sommes éventuellement dues pour des périodes antérieures.",
    },
  ];

  return (
    <Layout
      doc={{ filename: `quittance-${slug(tenant)}-${period}.pdf`, blocks }}
      upsell={t(
        "Avec ImmoTopia, quittances et reçus sont générés depuis vos propres modèles et numérotés automatiquement.",
        "With ImmoTopia, rent receipts and payment receipts are generated from your own templates and numbered automatically.",
      )}
      form={
        <>
          <Card title={t("Les parties", "The parties")}>
            <Text label={t("Nom du bailleur", "Landlord's name")} value={landlord} onChange={setLandlord} />
            <Text label={t("Adresse du bailleur", "Landlord's address")} value={landlordAddr} onChange={setLandlordAddr} />
            <Text label={t("Nom du locataire", "Tenant's name")} value={tenant} onChange={setTenant} />
            <Text label={t("Ville de signature", "City of signing")} value={place} onChange={setPlace} />
            <Text label={t("Adresse du logement loué", "Address of the rented property")} value={property} onChange={setProperty} wide />
          </Card>
          <Card title={t("Le paiement", "Payment")}>
            <Text label={t("Mois concerné", "Month covered")} type="month" value={period} onChange={setPeriod} />
            <Text label={t("Date du paiement", "Payment date")} type="date" value={paidOn} onChange={setPaidOn} />
            <Num label={t("Loyer", "Rent")} value={rent} onChange={setRent} />
            <Num label={t("Charges", "Charges")} value={charges} onChange={setCharges} />
            <Choice
              wide
              label={t("Mode de paiement", "Payment method")}
              value={mode}
              onChange={setMode}
              options={payModes.map((m) => ({
                value: m,
                label: t(m, payModeEn[m] ?? m),
              }))}
            />
          </Card>
        </>
      }
    />
  );
}

/* ================================================================ Bail d'habitation (Côte d'Ivoire) */

export function ResidentialLeaseGenerator() {
  const { t } = useI18n();
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
    {
      t: "title",
      text: "Contrat de bail à usage d'habitation",
      sub: "République de Côte d'Ivoire",
    },
    { t: "p", text: "ENTRE LES SOUSSIGNÉS :" },
    {
      t: "parties",
      left: {
        label: "Le bailleur",
        lines: [L, landlordId ? `Pièce d'identité n° ${landlordId}` : "Pièce d'identité n° …"],
      },
      right: {
        label: "Le locataire",
        lines: [T, tenantId ? `Pièce d'identité n° ${tenantId}` : "Pièce d'identité n° …"],
      },
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
    {
      t: "sign",
      place: `Fait à ${or(place, "…")}, le ${longDate(todayISO())}, en deux exemplaires originaux.`,
      left: "Le bailleur",
      right: "Le locataire",
    },
    {
      t: "note",
      text: "Modèle fourni à titre indicatif par ImmoTopia. Il ne remplace pas le conseil d'un professionnel du droit ; adaptez-le à votre situation avant signature.",
    },
  ];

  return (
    <Layout
      doc={{ filename: `bail-habitation-${slug(tenant)}.pdf`, blocks }}
      upsell={t(
        "Dans ImmoTopia, chaque bail génère son échéancier, ses rappels de loyer et ses documents.",
        "In ImmoTopia, every lease generates its payment schedule, rent reminders and documents.",
      )}
      form={
        <>
          <Card title={t("Les parties", "The parties")}>
            <Text label={t("Nom du bailleur", "Landlord's name")} value={landlord} onChange={setLandlord} />
            <Text
              label={t("N° de pièce d'identité (bailleur)", "ID number (landlord)")}
              value={landlordId}
              onChange={setLandlordId}
              placeholder={t("Facultatif", "Optional")}
            />
            <Text label={t("Nom du locataire", "Tenant's name")} value={tenant} onChange={setTenant} />
            <Text
              label={t("N° de pièce d'identité (locataire)", "ID number (tenant)")}
              value={tenantId}
              onChange={setTenantId}
              placeholder={t("Facultatif", "Optional")}
            />
          </Card>
          <Card title={t("Le logement", "The property")}>
            <Text label={t("Type de logement", "Type of property")} value={kind} onChange={setKind} />
            <Text label={t("Ville de signature", "City of signing")} value={place} onChange={setPlace} />
            <Text label={t("Adresse", "Address")} value={address} onChange={setAddress} wide />
          </Card>
          <Card title={t("Les conditions", "The terms")}>
            <Text label={t("Date de prise d'effet", "Start date")} type="date" value={start} onChange={setStart} />
            <Num label={t("Durée", "Term")} value={duration} onChange={(v) => setDuration(Math.max(1, v))} suffix={t("an(s)", "year(s)")} />
            <Num label={t("Loyer mensuel", "Monthly rent")} value={rent} onChange={setRent} />
            <Num
              label={t("Échéance (jour du mois)", "Due date (day of the month)")}
              value={dueDay}
              onChange={(v) => setDueDay(Math.min(28, Math.max(1, v)))}
              suffix=""
            />
            <Num
              label={t("Caution", "Security deposit")}
              value={deposit}
              onChange={setDeposit}
              suffix={t("mois", "months")}
              hint={t("Plafond légal : 2 mois.", "Legal cap: 2 months.")}
            />
            <Num
              label={t("Avance", "Advance rent")}
              value={advance}
              onChange={setAdvance}
              suffix={t("mois", "months")}
              hint={t("Plafond légal : 2 mois.", "Legal cap: 2 months.")}
            />
            <Num label={t("Préavis de congé", "Notice period")} value={notice} onChange={setNotice} suffix={t("mois", "months")} wide />
          </Card>
        </>
      }
    />
  );
}

/* ================================================================ Bail commercial (OHADA) */

export function CommercialLeaseGenerator() {
  const { t } = useI18n();
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
    {
      t: "title",
      text: "Bail à usage professionnel",
      sub: "Acte uniforme OHADA relatif au droit commercial général",
    },
    { t: "p", text: "ENTRE LES SOUSSIGNÉS :" },
    {
      t: "parties",
      left: { label: "Le bailleur", lines: [L] },
      right: {
        label: "Le preneur",
        lines: [T, rccm ? `RCCM : ${rccm}` : "RCCM : …"],
      },
    },
    { t: "p", text: "Il a été convenu et arrêté ce qui suit :" },
    { t: "h", text: "Article 1 — Objet" },
    {
      t: "p",
      text: `Le bailleur donne à bail au preneur, qui accepte, les locaux situés ${or(address, "…")}, pour l'exercice de l'activité suivante : ${or(activity, "…")}. Le preneur ne peut changer d'activité sans l'accord préalable et exprès du bailleur.`,
    },
    { t: "h", text: "Article 2 — Durée" },
    {
      t: "p",
      text:
        term === "fixed"
          ? `Le bail est conclu pour une durée déterminée de ${duration} an${duration > 1 ? "s" : ""} à compter du ${longDate(start)}. Conformément à l'Acte uniforme, le preneur qui a exploité l'activité prévue au bail pendant au moins deux ans dans les lieux bénéficie d'un droit au renouvellement. Il le demande au plus tard trois mois avant l'expiration du bail, par signification d'huissier de justice ou par notification permettant d'établir la réception effective ; un bail renouvelé est conclu pour trois ans au moins.`
          : `Le bail est conclu pour une durée indéterminée à compter du ${longDate(start)}. Chaque partie peut y mettre fin en donnant congé, par signification d'huissier de justice ou par notification permettant d'établir la réception effective, au moins six mois à l'avance, dans les conditions prévues par l'Acte uniforme.`,
    },
    { t: "h", text: "Article 3 — Loyer et révision" },
    {
      t: "p",
      text: `Le loyer mensuel est fixé à ${fcfaWords(rent)} (${fcfa(rent)}) hors taxes et hors charges, payable d'avance le 5 de chaque mois. Le loyer est révisable dans les conditions fixées par les parties ou, à défaut, lors de chaque renouvellement du bail, conformément à l'Acte uniforme.`,
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
      text: "La sous-location, totale ou partielle, est interdite sauf accord écrit du bailleur ; si elle est autorisée, elle est portée à sa connaissance par écrit. La cession du bail s'effectue dans les conditions prévues par l'Acte uniforme, après signification ou notification au bailleur.",
    },
    { t: "h", text: "Article 7 — Clause résolutoire" },
    {
      t: "p",
      text: "En cas de non-paiement du loyer ou d'inexécution d'une clause du bail, le bailleur pourra, après une mise en demeure indiquant les clauses violées et restée sans effet pendant un mois à compter de sa réception, demander à la juridiction compétente la résiliation du bail.",
    },
    { t: "h", text: "Article 8 — Droit applicable" },
    {
      t: "p",
      text: "Le présent bail est régi par les dispositions de l'Acte uniforme OHADA relatif au droit commercial général relatives au bail à usage professionnel, et par la loi ivoirienne pour tout ce qui n'y est pas contraire. Il est soumis à l'enregistrement.",
    },
    {
      t: "sign",
      place: `Fait à ${or(place, "…")}, le ${longDate(todayISO())}, en deux exemplaires originaux.`,
      left: "Le bailleur",
      right: "Le preneur",
    },
    {
      t: "note",
      text: "Modèle fourni à titre indicatif par ImmoTopia. Il ne remplace pas le conseil d'un avocat ou d'un notaire ; adaptez-le avant signature.",
    },
  ];

  return (
    <Layout
      doc={{ filename: `bail-commercial-${slug(tenant)}.pdf`, blocks }}
      upsell={t(
        "Suivez vos baux et leurs échéances dans ImmoTopia, avec un rappel automatique avant leur terme.",
        "Track your leases and their key dates in ImmoTopia, with an automatic reminder before they expire.",
      )}
      form={
        <>
          <Card title={t("Les parties", "The parties")}>
            <Text label={t("Bailleur (nom ou société)", "Landlord (name or company)")} value={landlord} onChange={setLandlord} />
            <Text label={t("Preneur (société)", "Tenant (company)")} value={tenant} onChange={setTenant} />
            <Text label={t("N° RCCM du preneur", "Tenant's RCCM number")} value={rccm} onChange={setRccm} placeholder="CI-ABJ-…" />
            <Text label={t("Ville de signature", "City of signing")} value={place} onChange={setPlace} />
          </Card>
          <Card title={t("Les locaux", "The premises")}>
            <Text label={t("Adresse des locaux", "Address of the premises")} value={address} onChange={setAddress} wide />
            <Text label={t("Activité autorisée", "Permitted business activity")} value={activity} onChange={setActivity} wide />
          </Card>
          <Card title={t("Les conditions", "The terms")}>
            <Choice
              wide
              label={t("Type de bail", "Lease type")}
              value={term}
              onChange={setTerm}
              options={[
                { value: "fixed", label: t("Durée déterminée", "Fixed term") },
                { value: "open", label: t("Durée indéterminée", "Open-ended") },
              ]}
            />
            <Text label={t("Date de prise d'effet", "Start date")} type="date" value={start} onChange={setStart} />
            {term === "fixed" ? (
              <Num
                label={t("Durée", "Term")}
                value={duration}
                onChange={(v) => setDuration(Math.max(1, v))}
                suffix={t("an(s)", "year(s)")}
              />
            ) : (
              <div />
            )}
            <Num label={t("Loyer mensuel HT", "Monthly rent excl. tax")} value={rent} onChange={setRent} />
            <Num label={t("Dépôt de garantie", "Security deposit")} value={deposit} onChange={setDeposit} suffix={t("mois", "months")} />
          </Card>
        </>
      }
    />
  );
}

/* ================================================================ État des lieux */

// Les valeurs restent en français (elles figurent dans le document) ; seuls les libellés de l'interface sont traduits.
const inventoryRooms = [
  "Entrée / couloir",
  "Salon / séjour",
  "Cuisine",
  "Chambre 1",
  "Chambre 2",
  "Chambre 3",
  "Salle de bain / douche",
  "WC",
  "Véranda / balcon",
  "Cour / jardin",
  "Garage / parking",
] as const;
type InventoryRoom = (typeof inventoryRooms)[number];

const inventoryRoomEn: Record<InventoryRoom, string> = {
  "Entrée / couloir": "Entrance / hallway",
  "Salon / séjour": "Living room",
  Cuisine: "Kitchen",
  "Chambre 1": "Bedroom 1",
  "Chambre 2": "Bedroom 2",
  "Chambre 3": "Bedroom 3",
  "Salle de bain / douche": "Bathroom / shower",
  WC: "Toilet",
  "Véranda / balcon": "Veranda / balcony",
  "Cour / jardin": "Yard / garden",
  "Garage / parking": "Garage / parking",
};

const baseItems = ["Murs et peinture", "Plafond", "Sol / carrelage", "Portes et serrures", "Fenêtres et vitres", "Prises et interrupteurs"];
const roomItems: Partial<Record<InventoryRoom, string[]>> = {
  "Salon / séjour": [...baseItems, "Climatiseur / ventilateur", "Éclairage"],
  Cuisine: [...baseItems, "Évier et robinetterie", "Placards et plan de travail", "Hotte / évacuation"],
  "Chambre 1": [...baseItems, "Placards", "Climatiseur / ventilateur"],
  "Chambre 2": [...baseItems, "Placards", "Climatiseur / ventilateur"],
  "Chambre 3": [...baseItems, "Placards", "Climatiseur / ventilateur"],
  "Salle de bain / douche": [...baseItems, "Lavabo et robinetterie", "Douche / baignoire", "Chauffe-eau", "Évacuation (siphons)"],
  WC: [...baseItems, "Cuvette et chasse d'eau", "Évacuation"],
  "Véranda / balcon": ["Sol / revêtement", "Garde-corps / grilles", "Portes et serrures", "Éclairage"],
  "Cour / jardin": ["Clôture / portail", "Sol / revêtement", "Éclairage extérieur", "Végétation / entretien"],
  "Garage / parking": ["Portail / porte", "Sol", "Éclairage"],
};

const STATE_CHOICES = "[   ] Bon   [   ] Moyen   [   ] Mauvais";
const DOTS = "...........................................................................";

export function InventoryGenerator() {
  const { t } = useI18n();
  const [kind, setKind] = useState<"entree" | "sortie">("entree");
  const [date, setDate] = useState(todayISO);
  const [entryDate, setEntryDate] = useState("");
  const [landlord, setLandlord] = useState("");
  const [tenant, setTenant] = useState("");
  const [propertyType, setPropertyType] = useState("Appartement de 3 pièces");
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState("Abidjan");
  const [rooms, setRooms] = useState<InventoryRoom[]>([
    "Entrée / couloir",
    "Salon / séjour",
    "Cuisine",
    "Chambre 1",
    "Salle de bain / douche",
    "WC",
  ]);
  const [water, setWater] = useState("");
  const [electricity, setElectricity] = useState("");
  const [keys, setKeys] = useState(2);
  const [remarks, setRemarks] = useState("");

  const exit = kind === "sortie";
  const blocks: Block[] = [
    {
      t: "title",
      text: exit ? "État des lieux de sortie" : "État des lieux d'entrée",
      sub: `Établi le ${longDate(date)}`,
    },
    {
      t: "parties",
      left: { label: "Le bailleur ou son représentant", lines: [or(landlord, "Nom du bailleur")] },
      right: { label: "Le locataire", lines: [or(tenant, "Nom du locataire")] },
    },
    {
      t: "p",
      text: `Logement concerné : ${or(propertyType, "…")}, situé ${or(address, "…")}.`,
    },
  ];
  if (exit) {
    blocks.push({
      t: "p",
      text: `Cet état des lieux de sortie se compare à l'état des lieux d'entrée${entryDate ? ` établi le ${longDate(entryDate)}` : ""}. Les écarts constatés, hors usure normale, sont notés dans les observations.`,
    });
  }
  blocks.push(
    { t: "h", text: "Compteurs" },
    {
      t: "table",
      rows: [
        ["Compteur d'eau (index)", or(water, DOTS.slice(0, 24))],
        ["Compteur d'électricité (index)", or(electricity, DOTS.slice(0, 24))],
      ],
    },
    { t: "h", text: "Clés et accès" },
    {
      t: "table",
      rows: [
        ["Nombre de clés remises", keys ? String(keys) : DOTS.slice(0, 24)],
        ["Badges, télécommandes, cartes", DOTS.slice(0, 24)],
      ],
    },
  );
  for (const room of inventoryRooms.filter((r) => rooms.includes(r))) {
    blocks.push(
      { t: "h", text: room },
      { t: "table", rows: (roomItems[room] ?? baseItems).map((item): [string, string] => [item, STATE_CHOICES]) },
      { t: "p", text: `Observations : ${DOTS}` },
    );
  }
  blocks.push({ t: "h", text: "Observations générales" }, { t: "p", text: remarks.trim() ? remarks.trim() : `${DOTS}\n${DOTS}\n${DOTS}` });
  if (exit) {
    blocks.push({ t: "h", text: "Retenues éventuelles sur le dépôt de garantie" }, { t: "p", text: `${DOTS}\n${DOTS}` });
  }
  blocks.push(
    {
      t: "p",
      text: `Nom et prénom du bailleur ou de son représentant : ${or(landlord, DOTS.slice(0, 40))}\nNom et prénom du locataire : ${or(tenant, DOTS.slice(0, 40))}`,
    },
    {
      t: "sign",
      place: `Fait à ${or(place, "…")}, le ${longDate(date)}, en deux exemplaires originaux.`,
      left: "Le bailleur ou son représentant",
      right: "Le locataire",
    },
    {
      t: "note",
      text: "Document à remplir sur place, en présence des deux parties : cochez l'état de chaque élément, notez vos observations, puis signez. Chaque partie conserve un exemplaire. Modèle fourni à titre indicatif par ImmoTopia.",
    },
  );

  return (
    <Layout
      doc={{ filename: `etat-des-lieux-${kind}-${slug(tenant)}.pdf`, blocks }}
      banner={
        <SoftwareBanner
          text={t(
            "Avec ImmoTopia : état des lieux sur téléphone, photos par pièce, signature électronique et PDF",
            "With ImmoTopia: inventories on your phone, photos for each room, e-signature and PDF",
          )}
          linkLabel={t("Découvrir la fonction", "See the feature (in French)")}
          href="/wiki/gestion-locative/etats-des-lieux"
        />
      }
      upsell={t(
        "Dans ImmoTopia, l'état des lieux de sortie se compare à celui d'entrée, pièce par pièce, pour repérer ce qui s'est dégradé.",
        "In ImmoTopia, the move-out inventory is compared with the move-in one, room by room, to spot what has deteriorated.",
      )}
      form={
        <>
          <Card title={t("Le type d'état des lieux", "Type of inventory")}>
            <Choice
              wide
              label={t("Type", "Type")}
              value={kind}
              onChange={setKind}
              options={[
                { value: "entree", label: t("Entrée", "Move-in") },
                { value: "sortie", label: t("Sortie", "Move-out") },
              ]}
            />
            <Text label={t("Date de l'état des lieux", "Inventory date")} type="date" value={date} onChange={setDate} />
            <Text label={t("Ville de signature", "City of signing")} value={place} onChange={setPlace} />
            {exit && (
              <Text
                wide
                label={t("Date de l'état des lieux d'entrée", "Date of the move-in inventory")}
                type="date"
                value={entryDate}
                onChange={setEntryDate}
              />
            )}
          </Card>
          <Card title={t("Les parties et le logement", "The parties and the property")}>
            <Text
              label={t("Bailleur ou représentant", "Landlord or representative")}
              value={landlord}
              onChange={setLandlord}
              placeholder={t("Nom ou agence", "Name or agency")}
            />
            <Text label={t("Locataire", "Tenant")} value={tenant} onChange={setTenant} placeholder={t("Nom du locataire", "Tenant's name")} />
            <Text label={t("Type de logement", "Type of property")} value={propertyType} onChange={setPropertyType} />
            <Text
              label={t("Adresse du logement", "Address of the property")}
              value={address}
              onChange={setAddress}
              placeholder="Riviera 3, Cocody, Abidjan"
            />
          </Card>
          <Card title={t("Les pièces à décrire", "Rooms to describe")}>
            <MultiChoice
              wide
              label={t("Pièces et espaces", "Rooms and areas")}
              values={rooms}
              onChange={setRooms}
              options={inventoryRooms.map((r) => ({ value: r, label: t(r, inventoryRoomEn[r]) }))}
            />
          </Card>
          <Card title={t("Compteurs, clés et observations", "Meters, keys and remarks")}>
            <Text
              label={t("Compteur d'eau (index)", "Water meter (reading)")}
              value={water}
              onChange={setWater}
              placeholder={t("À relever sur place", "To read on site")}
            />
            <Text
              label={t("Compteur d'électricité (index)", "Electricity meter (reading)")}
              value={electricity}
              onChange={setElectricity}
              placeholder={t("À relever sur place", "To read on site")}
            />
            <Num label={t("Clés remises", "Keys handed over")} value={keys} onChange={setKeys} suffix={t("clé(s)", "key(s)")} wide />
            <Text
              wide
              label={t("Observations générales", "General remarks")}
              value={remarks}
              onChange={setRemarks}
              placeholder={t("Laissez vide pour des lignes à remplir à la main", "Leave blank for lines to fill in by hand")}
            />
          </Card>
        </>
      }
    />
  );
}
