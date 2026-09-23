import type { Metadata } from "next";

// Catalogue des outils gratuits (page /outils, section d'accueil, liens « autres outils »).

export type ToolMeta = {
  slug: string;
  category: string;
  title: string;
  short: string;
  description: string;
  icon: "receipt" | "home" | "store" | "shield" | "trending" | "percent" | "building";
  accent: string;
};

export const tools: ToolMeta[] = [
  {
    slug: "quittance-de-loyer",
    category: "Quittances",
    title: "Générateur de quittance de loyer",
    short: "Une quittance propre en PDF, montant en lettres inclus.",
    description:
      "Remplissez le formulaire, vérifiez l'aperçu et téléchargez une quittance de loyer au format PDF. Gratuit, sans inscription, rien n'est enregistré.",
    icon: "receipt",
    accent: "#2EE6A8",
  },
  {
    slug: "bail-habitation",
    category: "Contrats",
    title: "Modèle de bail d'habitation (Côte d'Ivoire)",
    short: "Un contrat de location prêt à signer, adapté au droit ivoirien.",
    description:
      "Générez un contrat de bail à usage d'habitation inspiré du Code de la construction et de l'habitat ivoirien, puis téléchargez-le en PDF.",
    icon: "home",
    accent: "#8B8BFF",
  },
  {
    slug: "bail-commercial",
    category: "Contrats",
    title: "Modèle de bail commercial (OHADA)",
    short: "Bail à usage professionnel fondé sur l'Acte uniforme OHADA.",
    description:
      "Générez un bail à usage professionnel fondé sur l'Acte uniforme OHADA relatif au droit commercial général et téléchargez-le en PDF.",
    icon: "store",
    accent: "#38BDF8",
  },
  {
    slug: "caution-et-avance",
    category: "Caution",
    title: "Calculateur de caution et d'avance",
    short: "Le budget d'entrée du locataire, en un coup d'œil.",
    description:
      "Calculez le dépôt de garantie, l'avance sur loyer et les frais d'agence à prévoir à l'entrée dans un logement, avec les plafonds légaux ivoiriens.",
    icon: "shield",
    accent: "#FACC15",
  },
  {
    slug: "rendement-locatif",
    category: "Investissement",
    title: "Calculateur de rendement locatif",
    short: "Rendement brut, net et cash-flow de votre investissement.",
    description:
      "Prix, frais, travaux, loyer, charges, impôt foncier et vacance locative : obtenez le rendement brut, le rendement net et le cash-flow mensuel.",
    icon: "trending",
    accent: "#FF8A3D",
  },
  {
    slug: "commission-agence",
    category: "Agences",
    title: "Calculateur de commission d'agence",
    short: "Commission HT, TVA et net à reverser au propriétaire.",
    description:
      "Calculez la commission de gestion d'une agence sur les loyers encaissés : taux, base de calcul, TVA et net reversé au bailleur.",
    icon: "percent",
    accent: "#F472B6",
  },
  {
    slug: "repartition-charges-copropriete",
    category: "Syndic",
    title: "Répartition des charges de copropriété",
    short: "La quote-part de chaque lot selon ses tantièmes.",
    description:
      "Saisissez le budget de la copropriété et les tantièmes de chaque lot pour obtenir la quote-part annuelle, trimestrielle et mensuelle de chacun.",
    icon: "building",
    accent: "#A78BFA",
  },
];

export function getTool(slug: string) {
  const t = tools.find((x) => x.slug === slug);
  if (!t) throw new Error(`Outil inconnu : ${slug}`);
  return t;
}

export function toolMetadata(slug: string): Metadata {
  const t = getTool(slug);
  return {
    title: `${t.title} — Outil gratuit | ImmoTopia`,
    description: t.description,
    alternates: { canonical: `/outils/${t.slug}` },
    openGraph: { title: `${t.title} — gratuit`, description: t.description, locale: "fr_CI", type: "website" },
  };
}
