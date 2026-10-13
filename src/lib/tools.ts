import type { Metadata } from "next";
import { alternates, localizeHref, ogLocale, type Locale } from "./i18n";
import { SITE_URL } from "./site";

// Catalogue des outils gratuits (page /outils, section d'accueil, liens « autres outils »).
// Chaque texte existe en français et en anglais ; les slugs restent en français dans les deux langues.
// Les questions fréquentes (`faq`) sont affichées sur la page par ToolShell ET reprises dans les données
// structurées FAQPage : un seul texte, donc jamais de balisage sans contenu visible.

export type FaqItem = { q: string; a: string };

export type ToolMeta = {
  slug: string;
  category: string;
  /** Nom de l'outil (cartes, liens, fil d'Ariane) */
  title: string;
  /** Titre H1 de la page (par défaut, le nom de l'outil) */
  h1: string;
  short: string;
  /** Texte du bandeau de la page */
  description: string;
  /** Balise <title> : 60 caractères au plus, marque comprise */
  seoTitle: string;
  /** Balise meta description : 155 caractères au plus */
  seoDescription: string;
  /** Questions fréquentes affichées sur la page ET balisées FAQPage : ne jamais en ajouter une sans la montrer */
  faq: FaqItem[];
  /** Catégorie schema.org de l'application web */
  appCategory: "BusinessApplication" | "FinanceApplication";
  icon: "receipt" | "home" | "store" | "shield" | "trending" | "percent" | "building" | "clipboard";
  accent: string;
};

type Bilingual = { fr: string; en: string };
type ToolSource = Omit<ToolMeta, "category" | "title" | "h1" | "short" | "description" | "seoTitle" | "seoDescription" | "faq"> & {
  category: Bilingual;
  title: Bilingual;
  h1?: Bilingual;
  short: Bilingual;
  description: Bilingual;
  seoTitle: Bilingual;
  seoDescription?: Bilingual;
  faq: { q: Bilingual; a: Bilingual }[];
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
    seoTitle: {
      fr: "Générateur de quittance de loyer — Outil gratuit | ImmoTopia",
      en: "Rent receipt generator — Free tool | ImmoTopia",
    },
    faq: [
      {
        q: {
          fr: "La quittance de loyer est-elle obligatoire ?",
          en: "Is a rent receipt compulsory?",
        },
        a: {
          fr: "Dans la pratique, le locataire a tout intérêt à la réclamer : c'est sa preuve de paiement. Le bailleur qui la remet garde lui aussi une trace claire de chaque encaissement. Pour la règle exacte qui s'applique à votre contrat, reportez-vous à votre bail ou demandez conseil à un professionnel du droit.",
          en: "In practice, the tenant should always ask for one: it is proof of payment. The landlord who issues it also keeps a clear record of every payment. For the exact rule that applies to your lease, check your agreement or ask a legal professional.",
        },
      },
      {
        q: {
          fr: "Le générateur est-il gratuit, et faut-il créer un compte ?",
          en: "Is the generator free, and do I need an account?",
        },
        a: {
          fr: "Il est gratuit et sans inscription. Tout est calculé dans votre navigateur : aucune donnée n'est envoyée ni conservée. Vous téléchargez directement le PDF.",
          en: "It is free and needs no sign-up. Everything is computed in your browser: no data is sent or stored. You download the PDF straight away.",
        },
      },
      {
        q: {
          fr: "Peut-on établir une quittance pour un paiement par Mobile Money ?",
          en: "Can I issue a receipt for a Mobile Money payment?",
        },
        a: {
          fr: "Oui. Le formulaire propose Wave, Orange Money, MTN MoMo et Moov Money, ainsi que le virement, le chèque et les espèces : le mode choisi figure sur la quittance avec la date du paiement. Conservez aussi le message de confirmation de l'opérateur.",
          en: "Yes. The form offers Wave, Orange Money, MTN MoMo and Moov Money, as well as bank transfer, cheque and cash: the chosen method appears on the receipt with the payment date. Also keep the operator's confirmation message.",
        },
      },
      {
        q: {
          fr: "Quelle différence entre une quittance et un reçu de paiement ?",
          en: "What is the difference between a rent receipt and a payment receipt?",
        },
        a: {
          fr: "La quittance atteste que le loyer (et les charges) d'une période a été payé et la solde. Le reçu constate seulement qu'une somme a été remise, par exemple un acompte ou un paiement partiel, sans dire que la dette est soldée.",
          en: "A rent receipt confirms that the rent (and charges) for a period has been paid and settled. A payment receipt only records that an amount was handed over, such as a deposit or part payment, without saying the debt is cleared.",
        },
      },
      {
        q: {
          fr: "La quittance doit-elle être signée ?",
          en: "Does the receipt need to be signed?",
        },
        a: {
          fr: "Le document prévoit la signature du bailleur : imprimez le PDF et signez-le, ou signez-le avant de l'envoyer au locataire. Gardez-en un exemplaire.",
          en: "The document includes space for the landlord's signature: print the PDF and sign it, or sign it before sending it to the tenant. Keep a copy.",
        },
      },
    ],
    appCategory: "BusinessApplication",
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
    seoTitle: {
      fr: "Modèle de bail d'habitation (Côte d'Ivoire) | ImmoTopia",
      en: "Residential lease template (Côte d'Ivoire) | ImmoTopia",
    },
    faq: [
      {
        q: {
          fr: "Quel est le plafond de la caution et de l'avance ?",
          en: "What is the cap on the deposit and advance rent?",
        },
        a: {
          fr: "Pour un logement d'habitation, la caution (dépôt de garantie) et l'avance sur loyer sont chacune plafonnées à deux mois de loyer, selon le Code de la construction et de l'habitat (loi n° 2019-576 du 26 juin 2019). Le modèle reprend ce plafond.",
          en: "For a residential property, the security deposit and the advance rent are each capped at two months' rent under the Construction and Housing Code (Law No. 2019-576 of 26 June 2019). The template reflects this cap.",
        },
      },
      {
        q: {
          fr: "Le bail d'habitation doit-il être enregistré ?",
          en: "Does a residential lease have to be registered?",
        },
        a: {
          fr: "Le bail doit être enregistré auprès des services des impôts, comme le rappelle le contrat généré. Renseignez-vous auprès de l'administration fiscale ou d'un professionnel du droit sur les droits et délais applicables.",
          en: "The lease must be registered with the tax authorities, as the generated agreement points out. Check the applicable fees and deadlines with the tax administration or a legal professional.",
        },
      },
      {
        q: {
          fr: "Le modèle de bail d'habitation est-il gratuit ?",
          en: "Is the residential lease template free?",
        },
        a: {
          fr: "Oui, il est gratuit et sans inscription. Rien n'est enregistré : le PDF est généré dans votre navigateur. Considérez-le comme un point de départ et faites-le relire par un professionnel du droit pour les situations particulières.",
          en: "Yes, it is free and needs no sign-up. Nothing is stored: the PDF is generated in your browser. Treat it as a starting point and have a legal professional review it for specific situations.",
        },
      },
    ],
    appCategory: "BusinessApplication",
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
    h1: {
      fr: "Modèle de contrat de bail commercial OHADA (PDF) – Côte d'Ivoire",
      en: "OHADA commercial lease agreement template (PDF) – Côte d'Ivoire",
    },
    short: {
      fr: "Bail à usage professionnel fondé sur l'Acte uniforme OHADA.",
      en: "A business lease based on the OHADA Uniform Act.",
    },
    description: {
      fr: "Générez un modèle de contrat de bail commercial (bail à usage professionnel) fondé sur l'Acte uniforme OHADA, puis téléchargez-le gratuitement en PDF.",
      en: "Generate a commercial lease agreement (business lease) based on the OHADA Uniform Act, then download it as a free PDF.",
    },
    seoTitle: {
      fr: "Modèle de bail commercial OHADA (PDF) – Côte d'Ivoire",
      en: "OHADA commercial lease template (PDF) – Côte d'Ivoire",
    },
    seoDescription: {
      fr: "Modèle de contrat de bail commercial OHADA gratuit (PDF) pour la Côte d'Ivoire : remplissez, téléchargez, puis faites-le valider par un avocat.",
      en: "Free OHADA commercial lease agreement template (PDF) for Côte d'Ivoire: fill in, check the preview, download. Have a lawyer or notary review it.",
    },
    faq: [
      {
        q: {
          fr: "Le bail commercial doit-il être écrit ?",
          en: "Does a commercial lease have to be in writing?",
        },
        a: {
          fr: "L'Acte uniforme OHADA reconnaît un bail à usage professionnel conclu par une convention « écrite ou non » (art. 103). Mais à défaut d'écrit ou de terme fixé, le bail est réputé conclu pour une durée indéterminée (art. 104). Un écrit signé par les deux parties reste donc fortement conseillé, pour prouver la durée, le loyer et la destination des locaux.",
          en: "The OHADA Uniform Act recognises a business lease concluded by an agreement that is \"written or not\" (art. 103). But where there is no written agreement or fixed term, the lease is deemed to be for an indefinite period (art. 104). A written lease signed by both parties is therefore strongly advisable, to prove the term, the rent and the permitted use of the premises.",
        },
      },
      {
        q: {
          fr: "Faut-il enregistrer le bail commercial ?",
          en: "Does a commercial lease have to be registered?",
        },
        a: {
          fr: "Les articles de l'Acte uniforme consacrés au bail à usage professionnel (art. 101 à 134) ne traitent pas de l'enregistrement fiscal. En pratique, en Côte d'Ivoire, le contrat de bail est généralement enregistré auprès des services des impôts, et le modèle généré le rappelle. Les droits et les délais sont à vérifier auprès de l'administration fiscale ou de votre avocat ou notaire.",
          en: "The articles of the Uniform Act on business leases (art. 101 to 134) do not deal with tax registration. In practice in Côte d'Ivoire, the lease is generally registered with the tax authorities, and the generated template says so. Check the fees and deadlines with the tax administration or your lawyer or notary.",
        },
      },
      {
        q: {
          fr: "Le modèle PDF est-il gratuit ?",
          en: "Is the PDF template free?",
        },
        a: {
          fr: "Oui. Le modèle est gratuit, sans inscription, et rien n'est enregistré : le PDF est généré dans votre navigateur. Il est fourni à titre indicatif et doit être validé par un avocat ou un notaire avant signature.",
          en: "Yes. The template is free, needs no sign-up, and nothing is stored: the PDF is generated in your browser. It is provided for guidance only and must be reviewed by a lawyer or notary before signing.",
        },
      },
      {
        q: {
          fr: "Quelle est la durée d'un bail commercial OHADA ?",
          en: "How long is an OHADA commercial lease?",
        },
        a: {
          fr: "Les parties fixent librement la durée, déterminée ou indéterminée (art. 104). Le preneur qui a exploité l'activité prévue pendant au moins deux ans a droit au renouvellement ; en cas de renouvellement, le bail est conclu pour trois ans au minimum (art. 123).",
          en: "The parties are free to set the term, fixed or open-ended (art. 104). A tenant who has run the agreed business for at least two years is entitled to renewal; on renewal, the lease is concluded for at least three years (art. 123).",
        },
      },
      {
        q: {
          fr: "Le preneur peut-il sous-louer ou céder le bail ?",
          en: "Can the tenant sublet or assign the lease?",
        },
        a: {
          fr: "Sauf stipulation contraire du bail, toute sous-location est interdite (art. 121). La cession du bail est possible : elle doit être signifiée ou notifiée au bailleur, et son accord est requis sauf si le preneur cède le bail avec la totalité des éléments qui permettent l'activité (art. 118 à 120).",
          en: "Unless the lease provides otherwise, any subletting is prohibited (art. 121). The lease can be assigned: the landlord must be formally notified, and their consent is required unless the tenant assigns the lease together with everything that makes the business operate (art. 118 to 120).",
        },
      },
    ],
    appCategory: "BusinessApplication",
    icon: "store",
    accent: "#38BDF8",
  },
  {
    slug: "etat-des-lieux",
    category: { fr: "États des lieux", en: "Inventories" },
    title: {
      fr: "Modèle d'état des lieux (entrée et sortie)",
      en: "Move-in and move-out inventory template",
    },
    h1: {
      fr: "Modèle d'état des lieux d'entrée et de sortie (PDF)",
      en: "Move-in and move-out inventory report template (PDF)",
    },
    short: {
      fr: "Un état des lieux pièce par pièce, à remplir sur place et à signer.",
      en: "A room-by-room inventory report to fill in on site and sign.",
    },
    description: {
      fr: "Choisissez les pièces, ajoutez les compteurs, les clés et vos observations, puis téléchargez un état des lieux au format PDF, prêt à remplir et à signer.",
      en: "Pick the rooms, add the meters, keys and your remarks, then download an inventory report as a PDF, ready to fill in and sign.",
    },
    seoTitle: {
      fr: "Modèle d'état des lieux (PDF) — Gratuit | ImmoTopia",
      en: "Move-in and move-out inventory template (PDF) | ImmoTopia",
    },
    seoDescription: {
      fr: "Modèle d'état des lieux d'entrée et de sortie gratuit en PDF : pièces, éléments et état, compteurs, clés, observations et signatures. Sans inscription.",
      en: "Free move-in and move-out inventory template (PDF): rooms, items and condition, meters, keys, remarks and signatures. No sign-up needed.",
    },
    faq: [
      {
        q: {
          fr: "Un état des lieux est-il obligatoire ?",
          en: "Is an inventory report compulsory?",
        },
        a: {
          fr: "C'est une pratique très recommandée : il fixe l'état du logement à l'entrée et sert de référence à la sortie. Votre contrat peut aussi le prévoir (le modèle de bail d'habitation de ce site prévoit un état des lieux contradictoire à l'entrée et à la sortie). Pour la règle exacte applicable à votre bail, demandez conseil à un professionnel du droit.",
          en: "It is highly recommended practice: it records the condition of the property at move-in and serves as the reference at move-out. Your lease may also require it (this site's residential lease template provides for a joint inventory at move-in and move-out). For the exact rule applying to your lease, ask a legal professional.",
        },
      },
      {
        q: {
          fr: "Quelle différence entre l'état des lieux d'entrée et celui de sortie ?",
          en: "What is the difference between a move-in and a move-out inventory?",
        },
        a: {
          fr: "L'état des lieux d'entrée décrit le logement remis au locataire. Celui de sortie décrit le logement rendu et se compare, pièce par pièce, à celui d'entrée : la différence, hors usure normale, éclaire les réparations à la charge du locataire.",
          en: "The move-in inventory describes the property handed over to the tenant. The move-out inventory describes the property handed back and is compared, room by room, with the move-in one: the difference, beyond normal wear and tear, points to repairs the tenant may be responsible for.",
        },
      },
      {
        q: {
          fr: "Quel lien entre l'état des lieux et le dépôt de garantie ?",
          en: "How does the inventory relate to the security deposit?",
        },
        a: {
          fr: "La caution est restituée à la fin du bail, déduction faite des sommes dues et des réparations locatives constatées à la sortie. Deux états des lieux précis et signés permettent de justifier chaque retenue, ou de la contester.",
          en: "The deposit is returned at the end of the lease, minus any amounts due and tenant repairs noted at move-out. Two precise, signed inventories make it possible to justify each deduction, or to dispute it.",
        },
      },
      {
        q: {
          fr: "Qui doit signer l'état des lieux ?",
          en: "Who has to sign the inventory?",
        },
        a: {
          fr: "Le bailleur (ou son représentant, par exemple l'agence) et le locataire, présents ensemble : c'est ce qui rend l'état des lieux contradictoire. Chacun garde un exemplaire. Sur le document imprimé, le nom et la signature se portent à la main.",
          en: "The landlord (or their representative, such as the agency) and the tenant, together on site: this is what makes the inventory joint. Each keeps a copy. On the printed document, the name and signature are added by hand.",
        },
      },
      {
        q: {
          fr: "Le modèle d'état des lieux est-il gratuit ?",
          en: "Is the inventory template free?",
        },
        a: {
          fr: "Oui, il est gratuit et sans inscription. Rien n'est enregistré : le PDF est généré dans votre navigateur, à imprimer et à remplir sur place.",
          en: "Yes, it is free and needs no sign-up. Nothing is stored: the PDF is generated in your browser, ready to print and fill in on site.",
        },
      },
    ],
    appCategory: "BusinessApplication",
    icon: "clipboard",
    accent: "#34D399",
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
    seoTitle: {
      fr: "Calculateur de caution et d'avance — Gratuit | ImmoTopia",
      en: "Deposit and advance rent calculator — Free | ImmoTopia",
    },
    faq: [
      {
        q: {
          fr: "Quelle différence entre la caution et l'avance ?",
          en: "What is the difference between the deposit and the advance rent?",
        },
        a: {
          fr: "La caution (dépôt de garantie) couvre d'éventuels impayés ou dégradations et est rendue au locataire en fin de bail. L'avance correspond à des loyers payés à l'avance, qui sont ensuite consommés mois après mois.",
          en: "The security deposit (\"caution\") covers any unpaid rent or damage and is returned to the tenant at the end of the lease. The advance rent (\"avance\") is rent paid upfront, which is then used up month by month.",
        },
      },
      {
        q: {
          fr: "Quel est le plafond légal de la caution et de l'avance ?",
          en: "What is the legal cap on the deposit and advance rent?",
        },
        a: {
          fr: "Depuis le Code de la construction et de l'habitat de 2019, la caution et l'avance ne peuvent chacune dépasser deux mois de loyer pour un logement d'habitation.",
          en: "Since the 2019 Construction and Housing Code, neither the deposit nor the advance rent may exceed two months' rent for a residential property.",
        },
      },
      {
        q: {
          fr: "Quand la caution est-elle rendue au locataire ?",
          en: "When is the deposit returned to the tenant?",
        },
        a: {
          fr: "À la fin du bail, déduction faite des sommes dues et du coût des réparations locatives constatées lors de l'état des lieux de sortie, comme le prévoit le modèle de bail d'habitation de ce site.",
          en: "At the end of the lease, minus any amounts due and the cost of tenant repairs noted in the move-out inventory, as provided in this site's residential lease template.",
        },
      },
    ],
    appCategory: "FinanceApplication",
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
    seoTitle: {
      fr: "Calculateur de rendement locatif — Outil gratuit | ImmoTopia",
      en: "Rental yield calculator — Free tool | ImmoTopia",
    },
    faq: [
      {
        q: {
          fr: "Quelle différence entre rendement brut et rendement net ?",
          en: "What is the difference between gross and net yield?",
        },
        a: {
          fr: "Le rendement brut rapporte les loyers annuels au prix d'achat : c'est un premier repère rapide. Le rendement net tient compte des frais d'acquisition, des travaux, des mois sans locataire, des charges non récupérables, de l'impôt foncier et des frais de gestion.",
          en: "Gross yield compares annual rent with the purchase price: a quick first benchmark. Net yield accounts for acquisition costs, renovation, months without a tenant, non-recoverable charges, property tax and management fees.",
        },
      },
      {
        q: {
          fr: "Le calcul tient-il compte d'un crédit immobilier ?",
          en: "Does the calculation include a mortgage?",
        },
        a: {
          fr: "Non, le calcul est présenté hors crédit. Ajoutez vos mensualités d'emprunt au cash-flow obtenu pour connaître votre effort d'épargne réel.",
          en: "No, the calculation excludes financing. Factor your loan repayments into the cash flow you get to see how much you actually need to put in each month.",
        },
      },
      {
        q: {
          fr: "Mes données sont-elles conservées ?",
          en: "Is my data stored?",
        },
        a: {
          fr: "Non. Tout est calculé dans votre navigateur : aucune donnée n'est envoyée ni conservée. Le résultat est indicatif et ne constitue pas un conseil en investissement.",
          en: "No. Everything is computed in your browser: no data is sent or stored. The result is indicative and is not investment advice.",
        },
      },
    ],
    appCategory: "FinanceApplication",
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
    seoTitle: {
      fr: "Calculateur de commission d'agence — Gratuit | ImmoTopia",
      en: "Agency commission calculator — Free | ImmoTopia",
    },
    faq: [
      {
        q: {
          fr: "Comment se calcule une commission de gestion locative ?",
          en: "How is a property management commission calculated?",
        },
        a: {
          fr: "L'agence applique son taux, fixé dans le mandat de gestion, soit sur le loyer seul, soit sur le loyer et les charges. Le propriétaire reçoit ensuite le montant encaissé diminué de la commission TTC.",
          en: "The agency applies the rate set in the management mandate, either to the rent alone or to the rent plus charges. The landlord then receives the amount collected, minus the commission including VAT.",
        },
      },
      {
        q: {
          fr: "La TVA s'ajoute-t-elle à la commission ?",
          en: "Is VAT added to the commission?",
        },
        a: {
          fr: "La TVA s'ajoute à la commission lorsque l'agence y est assujettie. Le calculateur affiche la commission hors taxes, la TVA et le net à reverser au bailleur.",
          en: "VAT is added to the commission when the agency is VAT-registered. The calculator shows the commission excluding VAT, the VAT and the net amount payable to the landlord.",
        },
      },
      {
        q: {
          fr: "Quel taux de commission faut-il saisir ?",
          en: "Which commission rate should I enter?",
        },
        a: {
          fr: "Celui qui est prévu dans votre mandat de gestion avec le propriétaire. Le calculateur ne fixe pas de taux : il applique celui que vous indiquez.",
          en: "The one set out in your management mandate with the landlord. The calculator does not set a rate: it applies the one you enter.",
        },
      },
    ],
    appCategory: "FinanceApplication",
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
    seoTitle: {
      fr: "Répartition des charges de copropriété — Gratuit | ImmoTopia",
      en: "Condominium service charge allocation — Free | ImmoTopia",
    },
    faq: [
      {
        q: {
          fr: "Qu'est-ce qu'un tantième ?",
          en: "What is an ownership share (\"tantième\")?",
        },
        a: {
          fr: "Chaque lot d'une copropriété possède un nombre de tantièmes, fixé dans le règlement de copropriété selon sa surface et sa situation. Il sert de clé pour répartir les charges communes.",
          en: "Each unit in a condominium has a number of ownership shares, set in the condominium regulations according to its size and location. It is the key used to allocate the common charges.",
        },
      },
      {
        q: {
          fr: "Comment calculer la quote-part d'un lot ?",
          en: "How do I calculate a unit's share?",
        },
        a: {
          fr: "La quote-part d'un lot est égale à ses tantièmes divisés par le total des tantièmes, appliquée au budget de la copropriété. Le calculateur donne le résultat par an, par trimestre et par mois.",
          en: "A unit's share equals its ownership shares divided by the total number of shares, applied to the condominium budget. The calculator gives the result per year, per quarter and per month.",
        },
      },
      {
        q: {
          fr: "Et pour les charges qui suivent une clé spécifique, comme l'ascenseur ?",
          en: "What about charges that follow a specific key, such as the lift?",
        },
        a: {
          fr: "Faites un calcul par poste avec les tantièmes concernés : par exemple, le budget de l'ascenseur réparti uniquement entre les lots qui l'utilisent.",
          en: "Run a separate calculation for each item using the relevant shares: for example, the lift budget allocated only between the units that use it.",
        },
      },
    ],
    appCategory: "FinanceApplication",
    icon: "building",
    accent: "#A78BFA",
  },
];

const localize = (s: ToolSource, locale: Locale): ToolMeta => ({
  ...s,
  category: s.category[locale],
  title: s.title[locale],
  h1: (s.h1 ?? s.title)[locale],
  short: s.short[locale],
  description: s.description[locale],
  seoTitle: s.seoTitle[locale],
  seoDescription: (s.seoDescription ?? s.description)[locale],
  faq: s.faq.map((f) => ({ q: f.q[locale], a: f.a[locale] })),
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
  return {
    title: t.seoTitle,
    description: t.seoDescription,
    alternates: alternates(locale, `/outils/${t.slug}`),
    openGraph: {
      title: t.seoTitle,
      description: t.seoDescription,
      locale: ogLocale[locale],
      type: "website",
    },
  };
}

/** Adresse absolue d'une page dans la langue voulue (accueil français = racine du site) */
const absolute = (locale: Locale, path: string) => {
  const href = localizeHref(locale, path);
  return href === "/" ? SITE_URL : `${SITE_URL}${href}`;
};

/**
 * Données structurées schema.org d'une page d'outil : WebApplication gratuite, fil d'Ariane et,
 * puisque les questions sont affichées sur la page par ToolShell, FAQPage.
 */
export function toolJsonLd(tool: ToolMeta, locale: Locale) {
  const en = locale === "en";
  const url = absolute(locale, `/outils/${tool.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#application`,
        name: tool.title,
        url,
        description: tool.seoDescription,
        applicationCategory: tool.appCategory,
        operatingSystem: "Web",
        inLanguage: en ? "en" : "fr-CI",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "XOF" },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: en ? "Home" : "Accueil", item: absolute(locale, "/") },
          { "@type": "ListItem", position: 2, name: en ? "Free tools" : "Outils gratuits", item: absolute(locale, "/outils") },
          { "@type": "ListItem", position: 3, name: tool.title, item: url },
        ],
      },
      ...(tool.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              inLanguage: en ? "en" : "fr-CI",
              mainEntity: tool.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };
}
