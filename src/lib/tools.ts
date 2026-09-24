import type { Metadata } from "next";
import { alternates, ogLocale, type Locale } from "./i18n";

// Catalogue des outils gratuits (page /outils, section d'accueil, liens « autres outils »).
// Chaque texte existe en français et en anglais ; les slugs restent en français dans les deux langues.

export type ToolMeta = {
  slug: string;
  category: string;
  title: string;
  short: string;
  description: string;
  icon: "receipt" | "home" | "store" | "shield" | "trending" | "percent" | "building";
  accent: string;
};

type Bilingual = { fr: string; en: string };
type ToolSource = Omit<ToolMeta, "category" | "title" | "short" | "description"> & {
  category: Bilingual;
  title: Bilingual;
  short: Bilingual;
  description: Bilingual;
};

const sources: ToolSource[] = [
  {
    slug: "quittance-de-loyer",
    category: { fr: "Quittances", en: "Receipts" },
    title: {
      fr: "Générateur de quittance de loyer",
      en: "Rent receipt generator",
    },
    short: {
      fr: "Une quittance propre en PDF, montant en lettres inclus.",
      en: "A clean PDF rent receipt, amount in words included.",
    },
    description: {
      fr: "Remplissez le formulaire, vérifiez l'aperçu et téléchargez une quittance de loyer au format PDF. Gratuit, sans inscription, rien n'est enregistré.",
      en: "Fill in the form, check the preview and download a rent receipt as a PDF. Free, no sign-up, nothing is stored.",
    },
    icon: "receipt",
    accent: "#2EE6A8",
  },
  {
    slug: "bail-habitation",
    category: { fr: "Contrats", en: "Contracts" },
    title: {
      fr: "Modèle de bail d'habitation (Côte d'Ivoire)",
      en: "Residential lease template (Côte d'Ivoire)",
    },
    short: {
      fr: "Un contrat de location prêt à signer, adapté au droit ivoirien.",
      en: "A ready-to-sign rental agreement, tailored to Ivorian law.",
    },
    description: {
      fr: "Générez un contrat de bail à usage d'habitation inspiré du Code de la construction et de l'habitat ivoirien, puis téléchargez-le en PDF.",
      en: "Generate a residential lease agreement based on the Ivorian Construction and Housing Code, then download it as a PDF.",
    },
    icon: "home",
    accent: "#8B8BFF",
  },
  {
    slug: "bail-commercial",
    category: { fr: "Contrats", en: "Contracts" },
    title: {
      fr: "Modèle de bail commercial (OHADA)",
      en: "Commercial lease template (OHADA)",
    },
    short: {
      fr: "Bail à usage professionnel fondé sur l'Acte uniforme OHADA.",
      en: "A business lease based on the OHADA Uniform Act.",
    },
    description: {
      fr: "Générez un bail à usage professionnel fondé sur l'Acte uniforme OHADA relatif au droit commercial général et téléchargez-le en PDF.",
      en: "Generate a business lease based on the OHADA Uniform Act on General Commercial Law and download it as a PDF.",
    },
    icon: "store",
    accent: "#38BDF8",
  },
  {
    slug: "caution-et-avance",
    category: { fr: "Caution", en: "Deposit" },
    title: {
      fr: "Calculateur de caution et d'avance",
      en: "Deposit and advance rent calculator",
    },
    short: {
      fr: "Le budget d'entrée du locataire, en un coup d'œil.",
      en: "The tenant's move-in budget at a glance.",
    },
    description: {
      fr: "Calculez le dépôt de garantie, l'avance sur loyer et les frais d'agence à prévoir à l'entrée dans un logement, avec les plafonds légaux ivoiriens.",
      en: "Work out the security deposit, advance rent and agency fees due when moving in, with the Ivorian legal caps.",
    },
    icon: "shield",
    accent: "#FACC15",
  },
  {
    slug: "rendement-locatif",
    category: { fr: "Investissement", en: "Investment" },
    title: {
      fr: "Calculateur de rendement locatif",
      en: "Rental yield calculator",
    },
    short: {
      fr: "Rendement brut, net et cash-flow de votre investissement.",
      en: "Gross yield, net yield and cash flow of your investment.",
    },
    description: {
      fr: "Prix, frais, travaux, loyer, charges, impôt foncier et vacance locative : obtenez le rendement brut, le rendement net et le cash-flow mensuel.",
      en: "Price, fees, renovation, rent, charges, property tax and vacancy: get the gross yield, net yield and monthly cash flow.",
    },
    icon: "trending",
    accent: "#FF8A3D",
  },
  {
    slug: "commission-agence",
    category: { fr: "Agences", en: "Agencies" },
    title: {
      fr: "Calculateur de commission d'agence",
      en: "Agency commission calculator",
    },
    short: {
      fr: "Commission HT, TVA et net à reverser au propriétaire.",
      en: "Commission excl. VAT, VAT and net amount due to the landlord.",
    },
    description: {
      fr: "Calculez la commission de gestion d'une agence sur les loyers encaissés : taux, base de calcul, TVA et net reversé au bailleur.",
      en: "Calculate an agency's management commission on collected rents: rate, calculation base, VAT and net amount paid to the landlord.",
    },
    icon: "percent",
    accent: "#F472B6",
  },
  {
    slug: "repartition-charges-copropriete",
    category: { fr: "Syndic", en: "Condominium" },
    title: {
      fr: "Répartition des charges de copropriété",
      en: "Condominium service charge allocation",
    },
    short: {
      fr: "La quote-part de chaque lot selon ses tantièmes.",
      en: "Each unit's share based on its ownership shares.",
    },
    description: {
      fr: "Saisissez le budget de la copropriété et les tantièmes de chaque lot pour obtenir la quote-part annuelle, trimestrielle et mensuelle de chacun.",
      en: "Enter the condominium budget and each unit's ownership shares to get everyone's annual, quarterly and monthly contribution.",
    },
    icon: "building",
    accent: "#A78BFA",
  },
];

const localize = (s: ToolSource, locale: Locale): ToolMeta => ({
  ...s,
  category: s.category[locale],
  title: s.title[locale],
  short: s.short[locale],
  description: s.description[locale],
});

export const toolsByLocale: Record<Locale, ToolMeta[]> = {
  fr: sources.map((s) => localize(s, "fr")),
  en: sources.map((s) => localize(s, "en")),
};

/** Outils dans la langue voulue */
export const getTools = (locale: Locale) => toolsByLocale[locale];

/** Liste française (assistant, plan du site) */
export const tools: ToolMeta[] = toolsByLocale.fr;

export function getTool(slug: string, locale: Locale = "fr") {
  const t = toolsByLocale[locale].find((x) => x.slug === slug);
  if (!t) throw new Error(`Outil inconnu : ${slug}`);
  return t;
}

export function toolMetadata(slug: string, locale: Locale = "fr"): Metadata {
  const t = getTool(slug, locale);
  const en = locale === "en";
  return {
    title: `${t.title} — ${en ? "Free tool" : "Outil gratuit"} | ImmoTopia`,
    description: t.description,
    alternates: alternates(locale, `/outils/${t.slug}`),
    openGraph: {
      title: `${t.title} — ${en ? "free" : "gratuit"}`,
      description: t.description,
      locale: ogLocale[locale],
      type: "website",
    },
  };
}
