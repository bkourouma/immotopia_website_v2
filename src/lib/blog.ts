/**
 * Blog d'ImmoTopia (rubrique /blog, menu « Ressources »), en français et en anglais : chaque article existe dans les
 * deux langues (/blog/slug et /en/blog/slug), reliés par hreflang.
 *
 * Contrairement aux guides (référence durable), le blog accueille des articles datés : conseils, méthodes, repères.
 * Règle éditoriale (contenus.md) : on ne présente que ce qui est en production ; jamais de date de livraison,
 * jamais de chiffre, de client ou de prix inventé. Les prix ne s'écrivent pas ici : renvoyer vers /tarifs.
 * Les liens vers des pages françaises seulement (/wiki, /guides, pages thématiques) ne vont que dans le texte français.
 *
 * Ajouter un article : ajouter un objet `BlogPost` à `posts` (le plus récent en premier) ; le sitemap, l'index,
 * les données structurées et les pages sont générés. Dans les textes, « [texte](/chemin) » devient un lien interne.
 */

import type { Locale } from "./i18n";
import type { GuideBlock, GuideSection } from "./guides";

export type BlogContent = {
  /** Balise <title> complète (60 caractères au plus) */
  metaTitle: string;
  /** Meta description (160 caractères au plus) */
  metaDescription: string;
  /** Titre H1 de l'article */
  h1: string;
  /** Rubrique affichée au-dessus du titre */
  category: string;
  /** Résumé court pour les cartes de l'index */
  summary: string;
  intro: string;
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  /** Pages produit à consulter */
  productLinks: { label: string; href: string; text: string }[];
  cta: { title: string; text: string };
};

export type BlogPost = {
  slug: string;
  /** Dates ISO (AAAA-MM-JJ) : publication et dernière mise à jour réelle du contenu */
  published: string;
  updated: string;
  /** Slugs d'autres articles à lire ensuite */
  related: string[];
  fr: BlogContent;
  en: BlogContent;
};

/* ------------------------------------------------------------------ Article 1 : rendement locatif */

const rendementLocatif: BlogPost = {
  slug: "rendement-locatif-brut-net-calcul",
  published: "2026-11-04",
  updated: "2026-11-04",
  related: ["loyers-impayes-methode-relance"],
  fr: {
    metaTitle: "Rendement locatif brut et net : formules et exemple",
    metaDescription:
      "Rendement locatif brut ou net ? Les formules, ce qu'il faut inclure dans le calcul, un exemple chiffré et les erreurs à éviter avant d'acheter un bien.",
    h1: "Rendement locatif brut et net : comment le calculer",
    category: "Investissement",
    summary: "Les formules du rendement brut et net, les frais à ne pas oublier, un exemple chiffré et les erreurs fréquentes.",
    intro:
      "Avant d'acheter un bien pour le louer, une question revient toujours : combien va-t-il rapporter ? Le rendement locatif répond à cette question, à condition de savoir de quel rendement on parle. Cet article explique la différence entre rendement brut et rendement net, donne les formules, un exemple chiffré à reproduire et les erreurs qui faussent le plus souvent la comparaison entre deux biens.",
    sections: [
      {
        id: "rendement-brut",
        title: "Le rendement brut : un premier repère rapide",
        blocks: [
          { type: "p", text: "Le rendement brut rapporte les loyers annuels au prix d'achat du bien. Il se calcule en quelques secondes et sert à écarter les offres manifestement trop chères avant d'aller plus loin." },
          { type: "note", text: "Rendement brut (%) = loyers annuels ÷ prix d'achat × 100, avec loyers annuels = loyer mensuel × 12." },
          { type: "p", text: "Son défaut : il ignore tout ce qui coûte de l'argent entre l'achat et le loyer encaissé. Deux biens au même rendement brut peuvent rapporter très différemment une fois les frais déduits." },
        ],
      },
      {
        id: "rendement-net",
        title: "Le rendement net : ce que le bien rapporte vraiment",
        blocks: [
          { type: "p", text: "Le rendement net compare le revenu réellement conservé à l'investissement total, frais d'acquisition et travaux compris. C'est le chiffre à utiliser pour comparer deux biens ou un bien et un autre placement." },
          { type: "note", text: "Rendement net (%) = (loyers encaissés − charges non récupérables − impôt foncier − frais de gestion) ÷ investissement total × 100." },
          { type: "h3", text: "Ce qu'il faut inclure" },
          {
            type: "ul",
            items: [
              { title: "À l'entrée", text: "le prix d'achat, les frais d'acquisition et les éventuels travaux de remise en état." },
              { title: "Les mois sans locataire", text: "un bien n'est jamais loué douze mois sur douze : retirez la vacance prévisible des loyers annuels." },
              { title: "Les charges non récupérables", text: "entretien, assurance et charges que le locataire ne rembourse pas." },
              { title: "L'impôt foncier et les frais de gestion", text: "qu'ils soient payés à une agence ou valorisés au temps que vous y passez." },
            ],
          },
        ],
      },
      {
        id: "exemple",
        title: "Un exemple pas à pas",
        blocks: [
          { type: "p", text: "Les montants ci-dessous sont des valeurs rondes choisies pour la démonstration, pas des chiffres de marché. Un appartement acheté 30 000 000 FCFA, frais et travaux compris 33 000 000 FCFA, loué 250 000 FCFA par mois." },
          {
            type: "table",
            caption: "Exemple de calcul du rendement brut et net",
            head: ["Étape", "Calcul", "Résultat"],
            rows: [
              ["Loyers annuels", "250 000 × 12", "3 000 000 FCFA"],
              ["Rendement brut", "3 000 000 ÷ 30 000 000", "10 %"],
              ["Loyers encaissés (1 mois de vacance)", "250 000 × 11", "2 750 000 FCFA"],
              ["Charges, impôt et gestion", "valeur supposée", "450 000 FCFA"],
              ["Revenu net annuel", "2 750 000 − 450 000", "2 300 000 FCFA"],
              ["Rendement net", "2 300 000 ÷ 33 000 000", "environ 7 %"],
            ],
            highlightLast: true,
          },
          { type: "p", text: "Le même bien passe de 10 % à environ 7 % : c'est l'écart que le rendement brut cache. Le [calculateur de rendement locatif](/outils/rendement-locatif) d'ImmoTopia fait ce calcul avec vos propres chiffres, gratuitement et sans inscription." },
        ],
      },
      {
        id: "erreurs",
        title: "Cinq erreurs qui faussent le calcul",
        blocks: [
          {
            type: "ol",
            items: [
              "Comparer un rendement brut à un rendement net.",
              "Oublier les frais d'acquisition et les travaux dans l'investissement.",
              "Supposer un bien loué toute l'année, sans vacance.",
              "Compter le loyer demandé plutôt que le loyer effectivement encaissé.",
              "Ne pas relancer les retards : un loyer en retard est un rendement en moins. La [méthode de relance des loyers impayés](/blog/loyers-impayes-methode-relance) détaille comment s'y prendre.",
            ],
          },
        ],
      },
    ],
    faq: [
      { q: "Quelle est la différence entre rendement brut et rendement net ?", a: "Le rendement brut rapporte les loyers annuels au prix d'achat. Le rendement net déduit les charges, l'impôt et les frais de gestion, et rapporte le revenu restant à l'investissement total, frais d'acquisition et travaux compris." },
      { q: "Faut-il intégrer les frais d'acquisition dans le calcul ?", a: "Oui pour le rendement net : ils font partie de ce que vous avez réellement investi. Les ignorer donne un rendement flatteur mais faux." },
      { q: "Le calcul tient-il compte du crédit ?", a: "Non, le rendement se calcule hors financement. Pour mesurer votre effort d'épargne réel, ajoutez ensuite les mensualités de l'emprunt au revenu net." },
    ],
    productLinks: [
      { label: "Calculateur de rendement locatif", href: "/outils/rendement-locatif", text: "Rendement brut, net et cash-flow, gratuit et sans inscription." },
      { label: "Gestion locative avec ImmoTopia", href: "/gestion-locative-cote-divoire", text: "Suivre loyers, quittances et relances pour chaque bien." },
    ],
    cta: { title: "Suivez le rendement réel de vos biens", text: "Une démonstration de 30 minutes, sans engagement, pour voir comment ImmoTopia suit loyers, charges et encaissements bien par bien." },
  },
  en: {
    metaTitle: "Gross and net rental yield: formulas and example",
    metaDescription:
      "Gross or net rental yield? The formulas, what to include in the calculation, a worked example and the mistakes to avoid before buying a rental property.",
    h1: "Gross and net rental yield: how to calculate it",
    category: "Investment",
    summary: "The gross and net yield formulas, the costs not to forget, a worked example and the usual mistakes.",
    intro:
      "Before buying a property to rent out, one question always comes up: how much will it earn? Rental yield answers it, as long as you know which yield you are talking about. This article explains the difference between gross and net yield, gives the formulas, a worked example you can reproduce and the mistakes that most often skew the comparison between two properties.",
    sections: [
      {
        id: "gross-yield",
        title: "Gross yield: a quick first benchmark",
        blocks: [
          { type: "p", text: "Gross yield relates the annual rent to the purchase price. It takes seconds to compute and helps rule out clearly overpriced offers before going further." },
          { type: "note", text: "Gross yield (%) = annual rent ÷ purchase price × 100, where annual rent = monthly rent × 12." },
          { type: "p", text: "Its weakness: it ignores everything that costs money between the purchase and the rent collected. Two properties with the same gross yield can earn very differently once costs are deducted." },
        ],
      },
      {
        id: "net-yield",
        title: "Net yield: what the property really earns",
        blocks: [
          { type: "p", text: "Net yield compares the income you actually keep with the total investment, acquisition costs and works included. It is the figure to use to compare two properties, or a property and another investment." },
          { type: "note", text: "Net yield (%) = (rent collected − non-recoverable charges − property tax − management fees) ÷ total investment × 100." },
          { type: "h3", text: "What to include" },
          {
            type: "ul",
            items: [
              { title: "Upfront", text: "the purchase price, acquisition costs and any refurbishment works." },
              { title: "Vacant months", text: "a property is never let twelve months out of twelve: deduct the likely vacancy from annual rent." },
              { title: "Non-recoverable charges", text: "maintenance, insurance and charges the tenant does not reimburse." },
              { title: "Property tax and management fees", text: "whether paid to an agency or valued at the time you spend on it." },
            ],
          },
        ],
      },
      {
        id: "example",
        title: "A step-by-step example",
        blocks: [
          { type: "p", text: "The amounts below are round figures chosen for the demonstration, not market data. An apartment bought for FCFA 30,000,000, FCFA 33,000,000 including costs and works, let at FCFA 250,000 per month." },
          {
            type: "table",
            caption: "Worked example of gross and net yield",
            head: ["Step", "Calculation", "Result"],
            rows: [
              ["Annual rent", "250,000 × 12", "FCFA 3,000,000"],
              ["Gross yield", "3,000,000 ÷ 30,000,000", "10%"],
              ["Rent collected (1 vacant month)", "250,000 × 11", "FCFA 2,750,000"],
              ["Charges, tax and management", "assumed value", "FCFA 450,000"],
              ["Annual net income", "2,750,000 − 450,000", "FCFA 2,300,000"],
              ["Net yield", "2,300,000 ÷ 33,000,000", "about 7%"],
            ],
            highlightLast: true,
          },
          { type: "p", text: "The same property drops from 10% to about 7%: that is the gap gross yield hides. ImmoTopia's [rental yield calculator](/outils/rendement-locatif) runs this calculation with your own figures, free and with no sign-up." },
        ],
      },
      {
        id: "mistakes",
        title: "Five mistakes that skew the calculation",
        blocks: [
          {
            type: "ol",
            items: [
              "Comparing a gross yield with a net yield.",
              "Leaving acquisition costs and works out of the investment.",
              "Assuming the property is let all year, with no vacancy.",
              "Counting the asking rent rather than the rent actually collected.",
              "Not chasing late payments: late rent is yield lost. The [method for chasing unpaid rent](/blog/loyers-impayes-methode-relance) explains how.",
            ],
          },
        ],
      },
    ],
    faq: [
      { q: "What is the difference between gross and net yield?", a: "Gross yield relates annual rent to the purchase price. Net yield deducts charges, tax and management fees, and relates the remaining income to the total investment, acquisition costs and works included." },
      { q: "Should acquisition costs be included?", a: "Yes for net yield: they are part of what you actually invested. Ignoring them gives a flattering but wrong yield." },
      { q: "Does the calculation account for a loan?", a: "No, yield is calculated before financing. To measure your real monthly effort, subtract the loan repayments from the net income afterwards." },
    ],
    productLinks: [
      { label: "Rental yield calculator", href: "/outils/rendement-locatif", text: "Gross yield, net yield and cash flow, free and with no sign-up." },
      { label: "Free tools", href: "/outils", text: "Rent receipt, lease, commission and more." },
    ],
    cta: { title: "Track the real yield of your properties", text: "A 30-minute demo, no commitment, to see how ImmoTopia tracks rent, charges and collections property by property." },
  },
};

/* ------------------------------------------------------------------ Article 2 : loyers impayés */

const loyersImpayes: BlogPost = {
  slug: "loyers-impayes-methode-relance",
  published: "2026-11-04",
  updated: "2026-11-04",
  related: ["rendement-locatif-brut-net-calcul"],
  fr: {
    metaTitle: "Loyers impayés : une méthode de relance en 4 étapes",
    metaDescription:
      "Un loyer en retard se traite vite et calmement : repérer, relancer, convenir d'un échéancier, formaliser. Une méthode simple pour agences et propriétaires.",
    h1: "Loyers impayés : une méthode de relance en 4 étapes",
    category: "Gestion locative",
    summary: "Repérer, relancer, convenir d'un échéancier, formaliser : une méthode simple pour traiter un loyer en retard.",
    intro:
      "Un loyer en retard ne devient un impayé durable que lorsqu'on le laisse traîner. Dans la plupart des cas, une relance rapide, polie et tracée suffit. Cet article propose une méthode en quatre étapes que chaque agence ou propriétaire peut appliquer, du premier jour de retard jusqu'à l'accord écrit, sans jamais perdre l'historique des échanges.",
    sections: [
      {
        id: "reperer",
        title: "Étape 1 : repérer le retard dès le premier jour",
        blocks: [
          { type: "p", text: "Le premier ennemi est le retard qu'on ne voit pas. Pointez les encaissements à date fixe, chaque mois, et listez les baux dont le loyer n'est pas arrivé. Plus l'écart est détecté tôt, plus il est simple à régler." },
          { type: "p", text: "Un suivi par tableur demande une discipline que le quotidien érode vite. Dans un logiciel de gestion locative, les loyers attendus et les encaissements se comparent bail par bail ; voir la [gestion locative d'ImmoTopia](/gestion-locative-cote-divoire)." },
        ],
      },
      {
        id: "relancer",
        title: "Étape 2 : relancer simplement",
        blocks: [
          { type: "p", text: "Le premier contact est un rappel courtois : un message court, qui nomme le mois concerné, le montant attendu et les moyens de paiement disponibles. Beaucoup de retards sont des oublis ou des difficultés passagères." },
          {
            type: "ul",
            items: [
              { title: "Un canal habituel", text: "appel, WhatsApp ou e-mail, celui que le locataire lit réellement." },
              { title: "Un ton neutre", text: "on rappelle un fait, on ne juge pas." },
              { title: "Une trace écrite", text: "notez la date, le canal et la réponse reçue." },
            ],
          },
        ],
      },
      {
        id: "echeancier",
        title: "Étape 3 : convenir d'un échéancier réaliste",
        blocks: [
          { type: "p", text: "Si le locataire ne peut pas payer en une fois, mieux vaut un échéancier court, tenable et daté qu'une promesse floue. Proposez des dates précises et un montant par échéance, puis demandez une confirmation par écrit." },
        ],
      },
      {
        id: "formaliser",
        title: "Étape 4 : formaliser et garder les preuves",
        blocks: [
          { type: "p", text: "Si le retard persiste malgré l'accord, passez à un courrier formel qui rappelle les sommes dues et les échanges précédents. Un dossier propre (quittances émises, relances datées, échéancier accepté) facilite la suite, quelle qu'elle soit." },
          { type: "note", text: "Les démarches légales dépendent du bail et de la réglementation applicable : en cas de litige, rapprochez-vous d'un professionnel du droit avant d'agir." },
        ],
      },
    ],
    faq: [
      { q: "Quand faut-il relancer un locataire en retard ?", a: "Dès les premiers jours de retard. Une relance rapide et courtoise règle la plupart des cas avant qu'ils ne s'installent." },
      { q: "Faut-il toujours accepter un échéancier ?", a: "Pas systématiquement : c'est un choix du bailleur. Quand il est accepté, il doit être court, daté, chiffré et confirmé par écrit." },
      { q: "Quelles preuves conserver ?", a: "Les quittances émises, les dates et canaux de chaque relance, les réponses du locataire et l'échéancier accepté. Un [guide sur les relances en CRM immobilier](/guides/crm-immobilier-relances) détaille la méthode côté suivi commercial." },
    ],
    productLinks: [
      { label: "Quittance de loyer gratuite", href: "/outils/quittance-de-loyer", text: "Générez une quittance en quelques secondes, sans inscription." },
      { label: "Gestion locative avec ImmoTopia", href: "/gestion-locative-cote-divoire", text: "Loyers attendus, encaissements et relances au même endroit." },
    ],
    cta: { title: "Ne laissez plus un retard devenir un impayé", text: "Une démonstration de 30 minutes, sans engagement, pour voir le suivi des loyers et des relances dans ImmoTopia." },
  },
  en: {
    metaTitle: "Unpaid rent: a 4-step method to chase late payments",
    metaDescription:
      "Late rent is best handled quickly and calmly: spot it, chase it, agree a payment plan, document it. A simple method for agencies and landlords.",
    h1: "Unpaid rent: a 4-step method to chase late payments",
    category: "Property management",
    summary: "Spot it, chase it, agree a payment plan, document it: a simple method for dealing with late rent.",
    intro:
      "Late rent only turns into lasting arrears when it is left to drift. Most of the time, a prompt, polite and recorded reminder is enough. This article offers a four-step method any agency or landlord can apply, from the first day of delay to the written agreement, without ever losing the history of exchanges.",
    sections: [
      {
        id: "spot",
        title: "Step 1: spot the delay on day one",
        blocks: [
          { type: "p", text: "The first enemy is the delay nobody notices. Check collections on a fixed date every month and list the leases whose rent has not arrived. The earlier the gap is detected, the simpler it is to settle." },
          { type: "p", text: "Spreadsheet tracking demands a discipline that daily work quickly erodes. In property management software, expected rent and collections are compared lease by lease: see [ImmoTopia](/tarifs) for the plans." },
        ],
      },
      {
        id: "chase",
        title: "Step 2: chase simply",
        blocks: [
          { type: "p", text: "The first contact is a courteous reminder: a short message naming the month concerned, the amount due and the payment methods available. Many delays are oversights or temporary difficulties." },
          {
            type: "ul",
            items: [
              { title: "The usual channel", text: "call, WhatsApp or email, whichever the tenant actually reads." },
              { title: "A neutral tone", text: "state a fact, do not judge." },
              { title: "A written record", text: "note the date, the channel and the reply received." },
            ],
          },
        ],
      },
      {
        id: "plan",
        title: "Step 3: agree a realistic payment plan",
        blocks: [
          { type: "p", text: "If the tenant cannot pay in one go, a short, achievable and dated plan beats a vague promise. Propose precise dates and an amount per instalment, then ask for written confirmation." },
        ],
      },
      {
        id: "document",
        title: "Step 4: document and keep the evidence",
        blocks: [
          { type: "p", text: "If the delay continues despite the agreement, move to a formal letter recalling the sums due and previous exchanges. A clean file (receipts issued, dated reminders, accepted plan) makes any next step easier." },
          { type: "note", text: "Legal steps depend on the lease and the applicable regulations: in case of a dispute, consult a legal professional before acting." },
        ],
      },
    ],
    faq: [
      { q: "When should a late tenant be chased?", a: "Within the first days of delay. A prompt, courteous reminder settles most cases before they settle in." },
      { q: "Should a payment plan always be accepted?", a: "Not necessarily: it is the landlord's choice. When accepted, it should be short, dated, itemised and confirmed in writing." },
      { q: "What evidence should be kept?", a: "Receipts issued, the date and channel of each reminder, the tenant's replies and the accepted payment plan. You can generate a receipt with the free [rent receipt tool](/outils/quittance-de-loyer)." },
    ],
    productLinks: [
      { label: "Free rent receipt", href: "/outils/quittance-de-loyer", text: "Generate a receipt in seconds, no sign-up." },
      { label: "Pricing", href: "/tarifs", text: "See the ImmoTopia plans." },
    ],
    cta: { title: "Stop late rent turning into arrears", text: "A 30-minute demo, no commitment, to see rent and reminder tracking in ImmoTopia." },
  },
};

/* ------------------------------------------------------------------ Article 3 : contrat de bail d'habitation */

const contratBailHabitation: BlogPost = {
  slug: "guide-contrat-de-bail-habitation-loi-ivoirienne",
  published: "2026-11-24",
  updated: "2026-11-24",
  related: ["loyers-impayes-methode-relance", "rendement-locatif-brut-net-calcul"],
  fr: {
    metaTitle: "Contrat de bail habitation et loi ivoirienne : le guide",
    metaDescription:
      "Conseils d'experts et méthodes éprouvées sur : contrat de bail habitation loi ivoirienne. Solutions concrètes et accompagnement par ImmoTopia.",
    h1: "Guide pratique : comment optimiser votre contrat de bail habitation (loi ivoirienne)",
    category: "Gestion locative",
    summary: "Les erreurs fréquentes, une méthode en 4 étapes et les bénéfices d'un contrat de bail d'habitation bien tenu en Côte d'Ivoire.",
    intro:
      "Le contrat de bail est le document sur lequel repose toute la relation entre un bailleur et son locataire. Pour les propriétaires bailleurs, les agences immobilières, les gestionnaires de patrimoine et les syndics d'Abidjan et de Côte d'Ivoire, un contrat de bail d'habitation clair et bien suivi évite la plupart des litiges. Ce guide présente les difficultés courantes, une méthode en quatre étapes et les bénéfices à long terme. Il ne remplace pas un conseil juridique : les règles applicables en droit ivoirien se vérifient auprès d'un professionnel du droit.",
    sections: [
      {
        id: "defis",
        title: "1. Les défis majeurs rencontrés sur le terrain",
        blocks: [
          { type: "p", text: "Les difficultés autour du bail d'habitation viennent rarement d'un seul point : elles s'accumulent quand le contrat est rédigé vite et rarement relu." },
          {
            type: "ul",
            items: [
              { title: "Un contrat incomplet", text: "parties, logement, loyer, charges, durée et dépôt de garantie mal précisés ouvrent la porte aux désaccords." },
              { title: "Des modèles recopiés", text: "un modèle ancien ou copié d'un autre bail ne correspond pas toujours au logement ni à la réglementation en vigueur." },
              { title: "Un état des lieux négligé", text: "sans état des lieux d'entrée et de sortie, la restitution du dépôt de garantie devient difficile à justifier." },
              { title: "Un suivi dispersé", text: "baux, avenants, quittances et paiements éparpillés entre classeurs, tableurs et messages font perdre l'historique." },
              { title: "Des échéances oubliées", text: "fin de bail, révision du loyer ou renouvellement non anticipés." },
            ],
          },
          { type: "note", text: "Les démarches légales dépendent du bail et de la réglementation applicable : en cas de doute, rapprochez-vous d'un avocat, d'un notaire ou d'un professionnel du droit avant de signer." },
        ],
      },
      {
        id: "methode",
        title: "2. La méthode en 4 étapes clés",
        blocks: [
          {
            type: "ol",
            items: [
              { title: "Audit et état des lieux des besoins", text: "relisez vos baux en cours, listez les clauses manquantes ou floues et repérez les échéances à venir (fins de bail, révisions)." },
              { title: "Choix de la solution ou des outils adaptés", text: "retenez un modèle de contrat validé par un professionnel du droit et un outil de suivi des baux. Le [modèle de bail d'habitation](/outils/bail-habitation) d'ImmoTopia est gratuit ; faites-le valider avant usage." },
              { title: "Mise en place pratique et formation des équipes", text: "rédigez chaque contrat à partir du même modèle, joignez l'état des lieux, enregistrez le bail avec son échéancier et expliquez la marche à suivre à chacun." },
              { title: "Mesure du retour sur investissement et optimisation continue", text: "contrôlez régulièrement les loyers encaissés, les retards et les litiges, puis ajustez votre modèle et vos pratiques." },
            ],
          },
          { type: "p", text: "Un logiciel de gestion locative aide à tenir ces étapes : chaque bail génère son échéancier, et son renouvellement, son avenant ou sa résiliation se font depuis l'application, avec l'historique conservé. Voir la [gestion locative d'ImmoTopia](/gestion-locative-cote-divoire)." },
        ],
      },
      {
        id: "avantages",
        title: "3. Les avantages compétitifs à long terme",
        blocks: [
          { type: "p", text: "Une bonne maîtrise du contrat de bail d'habitation transforme l'efficacité de l'organisation :" },
          {
            type: "ul",
            items: [
              { title: "Moins de litiges", text: "des engagements clairs et des preuves conservées réduisent les contestations." },
              { title: "Un suivi plus rapide", text: "les loyers attendus et les paiements se comparent bail par bail." },
              { title: "Une image plus professionnelle", text: "propriétaires et locataires retrouvent leurs documents et leur historique." },
              { title: "Du temps pour se développer", text: "moins de ressaisies et de recherches, plus de temps pour de nouveaux mandats." },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        blocks: [
          { type: "p", text: "Optimiser son contrat de bail d'habitation, c'est d'abord un modèle clair et validé, ensuite un suivi rigoureux dans la durée. Pour voir comment ImmoTopia organise vos baux, vos échéances et vos quittances, contactez l'équipe ou demandez une démonstration." },
        ],
      },
    ],
    faq: [
      { q: "Combien de temps faut-il pour optimiser sa démarche ?", a: "Avec une approche structurée et les outils d'ImmoTopia, les premiers résultats concrets sont généralement visibles dès les premières semaines." },
      { q: "Quelle est la première étape recommandée ?", a: "Réaliser un diagnostic initial de vos processus actuels afin d'identifier les priorités à fort impact : relisez vos baux en cours et listez les clauses ou échéances à reprendre." },
    ],
    productLinks: [
      { label: "Modèle de bail d'habitation", href: "/outils/bail-habitation", text: "Générez un modèle de contrat, gratuitement et sans inscription." },
      { label: "Gestion locative avec ImmoTopia", href: "/gestion-locative-cote-divoire", text: "Baux, échéancier, quittances et historique au même endroit." },
    ],
    cta: { title: "Mettez vos baux sous contrôle", text: "Une démonstration de 30 minutes, sans engagement, pour voir le suivi des baux dans ImmoTopia." },
  },
  en: {
    metaTitle: "Residential lease agreement in Côte d'Ivoire: a guide",
    metaDescription:
      "Practical advice on your residential lease agreement under Ivorian law: common pitfalls, a 4-step method and long-term benefits, with ImmoTopia.",
    h1: "Practical guide: how to optimise your residential lease agreement (Ivorian law)",
    category: "Property management",
    summary: "Common pitfalls, a 4-step method and the benefits of a well-kept residential lease in Côte d'Ivoire.",
    intro:
      "The lease agreement is the document on which the whole relationship between a landlord and a tenant rests. For landlords, estate agencies, asset managers and property managers in Abidjan and across Côte d'Ivoire, a clear and well-tracked residential lease prevents most disputes. This guide covers common difficulties, a four-step method and the long-term benefits. It does not replace legal advice: the rules that apply under Ivorian law should be checked with a legal professional.",
    sections: [
      {
        id: "challenges",
        title: "1. The main challenges on the ground",
        blocks: [
          { type: "p", text: "Lease problems rarely come from a single point: they pile up when the contract is drafted quickly and seldom reviewed." },
          {
            type: "ul",
            items: [
              { title: "An incomplete contract", text: "parties, property, rent, charges, term and deposit left vague open the door to disagreements." },
              { title: "Copied templates", text: "an old template, or one copied from another lease, may not fit the property or the regulations in force." },
              { title: "A neglected inventory", text: "without entry and exit inventories, returning the deposit is hard to justify." },
              { title: "Scattered tracking", text: "leases, amendments, receipts and payments spread across folders, spreadsheets and messages lose the history." },
              { title: "Forgotten deadlines", text: "lease end, rent review or renewal not anticipated." },
            ],
          },
          { type: "note", text: "Legal steps depend on the lease and the applicable regulations: if in doubt, consult a lawyer, notary or legal professional before signing." },
        ],
      },
      {
        id: "method",
        title: "2. The 4-step method",
        blocks: [
          {
            type: "ol",
            items: [
              { title: "Audit and needs assessment", text: "review your current leases, list missing or vague clauses and spot upcoming deadlines (lease ends, rent reviews)." },
              { title: "Choose the right solution or tools", text: "pick a contract template validated by a legal professional and a tool to track leases. ImmoTopia's [residential lease template](/outils/bail-habitation) is free; have it validated before use." },
              { title: "Practical setup and team training", text: "draft each contract from the same template, attach the inventory, record the lease with its schedule and explain the process to everyone." },
              { title: "Measure the return and keep improving", text: "regularly check rent collected, delays and disputes, then adjust your template and practices." },
            ],
          },
          { type: "p", text: "Property management software helps keep to these steps: each lease generates its schedule, and renewal, amendment or termination are handled from the application with the history kept. See the [pricing](/tarifs) for the plans." },
        ],
      },
      {
        id: "benefits",
        title: "3. The long-term competitive advantages",
        blocks: [
          { type: "p", text: "Mastering the residential lease agreement transforms the organisation's efficiency:" },
          {
            type: "ul",
            items: [
              { title: "Fewer disputes", text: "clear commitments and kept evidence reduce challenges." },
              { title: "Faster tracking", text: "expected rent and payments are compared lease by lease." },
              { title: "A more professional image", text: "owners and tenants find their documents and history." },
              { title: "Time to grow", text: "less re-entry and searching, more time for new mandates." },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        blocks: [
          { type: "p", text: "Optimising a residential lease starts with a clear, validated template, then rigorous tracking over time. To see how ImmoTopia organises your leases, schedules and receipts, contact the team or request a demo." },
        ],
      },
    ],
    faq: [
      { q: "How long does it take to optimise your approach?", a: "With a structured approach and ImmoTopia's tools, the first concrete results are generally visible within the first weeks." },
      { q: "What is the recommended first step?", a: "Run an initial review of your current processes to identify high-impact priorities: review your current leases and list the clauses or deadlines to revisit." },
    ],
    productLinks: [
      { label: "Residential lease template", href: "/outils/bail-habitation", text: "Generate a lease template, free and with no sign-up." },
      { label: "Pricing", href: "/tarifs", text: "See the ImmoTopia plans." },
    ],
    cta: { title: "Get your leases under control", text: "A 30-minute demo, no commitment, to see lease tracking in ImmoTopia." },
  },
};

/** Le plus récent en premier */
export const posts: BlogPost[] = [contratBailHabitation, loyersImpayes, rendementLocatif];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const blogHref = (slug?: string) => (slug ? `/blog/${slug}` : "/blog");
export const postContent = (p: BlogPost, locale: Locale): BlogContent => p[locale];

const plain = (text: string) => text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1");
const itemText = (item: string | { title: string; text: string }) => plain(typeof item === "string" ? item : `${item.title} ${item.text}`);
const blockText = (b: GuideBlock): string[] => {
  switch (b.type) {
    case "ul":
    case "ol":
      return b.items.map(itemText);
    case "table":
      return [...b.head, ...b.rows.flat()].map(plain);
    default:
      return [plain(b.text)];
  }
};

/** Temps de lecture en minutes (environ 200 mots par minute), 1 minute au minimum */
export function postReadingMinutes(c: BlogContent) {
  const words = [c.h1, c.intro, ...c.sections.flatMap((s) => [s.title, ...s.blocks.flatMap(blockText)]), ...c.faq.flatMap((f) => [f.q, f.a])]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Les titres de page doivent tenir dans l'affichage de Google : le build échoue sinon.
for (const p of posts) {
  for (const l of ["fr", "en"] as const) {
    if (p[l].metaTitle.length > 60) throw new Error(`Titre trop long (${p[l].metaTitle.length}) : ${p.slug} (${l})`);
    if (p[l].metaDescription.length > 160) throw new Error(`Description trop longue (${p[l].metaDescription.length}) : ${p.slug} (${l})`);
  }
}
