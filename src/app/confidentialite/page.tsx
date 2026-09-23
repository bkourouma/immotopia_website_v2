import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { contact, legal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité | ImmoTopia",
  description: "Quelles données ImmoTopia collecte, pourquoi, combien de temps, et comment exercer vos droits.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
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
