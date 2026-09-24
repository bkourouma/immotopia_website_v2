import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { alternates, hasLocale, translator } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { contact, legal } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/confidentialite">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = translator(lang);
  return {
    title: t("Politique de confidentialité | ImmoTopia", "Privacy policy | ImmoTopia"),
    description: t(
      "Quelles données ImmoTopia collecte, pourquoi, combien de temps, et comment exercer vos droits.",
      "What data ImmoTopia collects, why, for how long, and how to exercise your rights.",
    ),
    alternates: alternates(lang, "/confidentialite"),
  };
}

export default async function ConfidentialitePage() {
  const locale = await getLocale();
  return locale === "en" ? <PrivacyPolicyEn /> : <ConfidentialiteFr />;
}

function ConfidentialiteFr() {
  return (
    <LegalPage title="Politique de confidentialité" updated="23 septembre 2026">
      <p>
        {legal.publisher}, éditeur d&apos;ImmoTopia, s&apos;engage à protéger vos données personnelles conformément à la loi ivoirienne
        n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>
          <strong>Réservation d&apos;une démonstration</strong> (calendrier Calendly) : nom, adresse e-mail, réponses aux questions de
          préparation et créneau choisi.
        </li>
        <li>
          <strong>Formulaire de contact</strong>, s&apos;il est utilisé : type de structure, nombre de lots, fonction, nom, agence,
          e-mail et téléphone.
        </li>
        <li>
          <strong>Assistant immotopIA</strong> : les questions que vous posez à l&apos;assistant du site et l&apos;historique de la
          conversation en cours.
        </li>
        <li>
          <strong>Échanges par WhatsApp, téléphone ou e-mail</strong> : les informations que vous choisissez de nous transmettre.
        </li>
      </ul>
      <p>
        Les <strong>outils gratuits</strong> (quittances, baux, calculateurs) fonctionnent entièrement dans votre navigateur : les
        informations que vous y saisissez ne nous sont jamais transmises.
      </p>

      <h2>Assistant immotopIA</h2>
      <p>
        Les réponses de l&apos;assistant sont générées par un modèle d&apos;intelligence artificielle (DeepSeek), via le service
        OpenRouter. Vos messages leur sont transmis pour produire la réponse, et peuvent être traités hors de Côte d&apos;Ivoire. Nous
        ne conservons pas le contenu des conversations sur nos serveurs ; l&apos;historique reste dans votre navigateur le temps de la
        visite. N&apos;y saisissez pas d&apos;informations personnelles sensibles. Les réponses peuvent contenir des erreurs : seuls le
        devis et le contrat font foi.
      </p>

      <h2>Finalités</h2>
      <ul>
        <li>organiser et préparer la démonstration demandée ;</li>
        <li>répondre à vos questions et assurer le suivi commercial de votre demande ;</li>
        <li>vous envoyer une proposition ou un devis, si vous le demandez.</li>
      </ul>
      <p>Vos données ne sont ni vendues ni cédées à des tiers à des fins commerciales.</p>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Les données sont destinées à l&apos;équipe commerciale d&apos;ImmoTopia. Elles peuvent être traitées, pour notre compte, par
        des prestataires techniques : Calendly (prise de rendez-vous), OpenRouter et DeepSeek (assistant immotopIA), notre hébergeur {legal.host}, et nos outils internes de suivi
        des demandes. Certains de ces prestataires peuvent être situés hors de Côte d&apos;Ivoire.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données des prospects sont conservées au maximum 3 ans après le dernier contact, puis supprimées. Les données des
        clients sont conservées pendant la durée de la relation contractuelle et les délais légaux qui s&apos;y appliquent.
      </p>

      <h2>Cookies</h2>
      <p>
        Le site n&apos;utilise pas de cookies publicitaires ni d&apos;outil de mesure d&apos;audience tiers. Le calendrier de
        réservation Calendly, affiché dans la page, peut déposer ses propres cookies nécessaires à son fonctionnement.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et de suppression de vos données. Pour les
        exercer, écrivez-nous à <a href={`mailto:${contact.email}`}>{contact.email}</a> ou appelez le {contact.phone}. Vous pouvez
        également saisir l&apos;Autorité de Régulation des Télécommunications/TIC de Côte d&apos;Ivoire (ARTCI), autorité de
        protection des données personnelles.
      </p>
    </LegalPage>
  );
}

function PrivacyPolicyEn() {
  return (
    <LegalPage title="Privacy policy" updated="September 23, 2026">
      <p>
        {legal.publisher}, publisher of ImmoTopia, is committed to protecting your personal data in accordance with Ivorian Law
        No. 2013-450 of June 19, 2013 on the protection of personal data.
      </p>

      <h2>Data collected</h2>
      <ul>
        <li>
          <strong>Booking a demo</strong> (Calendly calendar): name, e-mail address, answers to the preparation questions and the
          selected time slot.
        </li>
        <li>
          <strong>Contact form</strong>, if used: type of organization, number of units, job title, name, agency, e-mail and phone.
        </li>
        <li>
          <strong>immotopIA assistant</strong>: the questions you ask the website assistant and the history of the current conversation.
        </li>
        <li>
          <strong>Exchanges by WhatsApp, phone or e-mail</strong>: the information you choose to send us.
        </li>
      </ul>
      <p>
        The <strong>free tools</strong> (rent receipts, leases, calculators) run entirely in your browser: the information you enter is
        never sent to us.
      </p>

      <h2>immotopIA assistant</h2>
      <p>
        The assistant&apos;s answers are generated by an artificial intelligence model (DeepSeek) through the OpenRouter service. Your
        messages are sent to them to produce the answer and may be processed outside Côte d&apos;Ivoire. We do not store the content of
        conversations on our servers; the history stays in your browser for the duration of your visit. Do not enter sensitive personal
        information. Answers may contain errors: only the quote and the contract are binding.
      </p>

      <h2>Purposes</h2>
      <ul>
        <li>organizing and preparing the demo you requested;</li>
        <li>answering your questions and following up on your request;</li>
        <li>sending you a proposal or a quote, if you ask for one.</li>
      </ul>
      <p>Your data is never sold or transferred to third parties for commercial purposes.</p>

      <h2>Recipients and processors</h2>
      <p>
        The data is intended for the ImmoTopia sales team. It may be processed on our behalf by technical providers: Calendly
        (scheduling), OpenRouter and DeepSeek (immotopIA assistant), our host {legal.host}, and our internal request-tracking tools. Some
        of these providers may be located outside Côte d&apos;Ivoire.
      </p>

      <h2>Retention period</h2>
      <p>
        Prospect data is kept for a maximum of 3 years after the last contact, then deleted. Customer data is kept for the duration of
        the contractual relationship and the applicable legal periods.
      </p>

      <h2>Cookies</h2>
      <p>
        The website uses no advertising cookies and no third-party audience measurement tool. The Calendly booking calendar embedded in
        the page may set its own cookies required for it to work.
      </p>

      <h2>Your rights</h2>
      <p>
        You have the right to access, rectify, object to and delete your data. To exercise these rights, write to us at{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> or call {contact.phone}. You may also contact the Autorité de Régulation
        des Télécommunications/TIC de Côte d&apos;Ivoire (ARTCI), the personal data protection authority.
      </p>
    </LegalPage>
  );
}
