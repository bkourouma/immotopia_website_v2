import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { alternates, hasLocale, translator } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { contact, legal, SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/mentions-legales">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = translator(lang);
  return {
    title: t("Mentions légales | ImmoTopia", "Legal notice | ImmoTopia"),
    description: t("Éditeur, hébergeur et conditions d'utilisation du site ImmoTopia.", "Publisher, host and terms of use of the ImmoTopia website."),
    alternates: alternates(lang, "/mentions-legales"),
  };
}

export default async function MentionsLegalesPage() {
  const locale = await getLocale();
  return locale === "en" ? <LegalNoticeEn /> : <MentionsLegalesFr />;
}

function MentionsLegalesFr() {
  return (
    <LegalPage title="Mentions légales" updated="23 septembre 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>{SITE_URL.replace("https://", "")}</strong> est édité par <strong>{legal.publisher}</strong>,{" "}
        {contact.city}.
      </p>
      <ul>
        <li>RCCM : {legal.rccm}</li>
        <li>Compte contribuable (CC) : {legal.taxId}</li>
        <li>Directeur de la publication : {legal.publicationDirector}</li>
        <li>Téléphone : {contact.phone}</li>
        <li>
          E-mail : <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          Site : <a href={legal.publisherSite}>{legal.publisherSite.replace("https://", "")}</a>
        </li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>{legal.host}</strong>, {legal.hostAddress} (
        <a href={legal.hostSite}>{legal.hostSite.replace("https://", "")}</a>).
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus du site (textes, visuels, logo, interfaces, code) est la propriété de {legal.publisher} ou fait
        l&apos;objet d&apos;une autorisation d&apos;utilisation. Toute reproduction ou représentation, totale ou partielle, sans
        autorisation écrite préalable est interdite. Les noms Wave, Orange Money, MTN MoMo, Moov Money et WhatsApp sont des marques de
        leurs propriétaires respectifs, cités pour décrire les moyens de paiement suivis et les canaux de communication.
      </p>

      <h2>Outils gratuits et modèles de documents</h2>
      <p>
        Les calculateurs et modèles proposés dans la rubrique <Link href="/outils">Outils gratuits</Link> sont fournis à titre
        indicatif. Ils ne constituent pas un conseil juridique, fiscal ou financier et ne remplacent pas l&apos;avis d&apos;un
        professionnel. Les calculs sont effectués dans votre navigateur ; aucune donnée saisie n&apos;est transmise ni conservée.
      </p>

      <h2>Tarifs</h2>
      <p>
        Les prix affichés sont exprimés en francs CFA hors taxes. Seul le devis ou le contrat signé fait foi. Le simulateur donne une
        estimation indicative.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données collectées sur ce site est décrit dans notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    </LegalPage>
  );
}

function LegalNoticeEn() {
  return (
    <LegalPage title="Legal notice" updated="September 23, 2026">
      <h2>Website publisher</h2>
      <p>
        The website <strong>{SITE_URL.replace("https://", "")}</strong> is published by <strong>{legal.publisher}</strong>,{" "}
        {contact.city}.
      </p>
      <ul>
        <li>Trade and Personal Property Credit Register (RCCM): {legal.rccm}</li>
        <li>Taxpayer account number (CC): {legal.taxId}</li>
        <li>Publication director: {legal.publicationDirector}</li>
        <li>Phone: {contact.phone}</li>
        <li>
          E-mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          Website: <a href={legal.publisherSite}>{legal.publisherSite.replace("https://", "")}</a>
        </li>
      </ul>

      <h2>Hosting</h2>
      <p>
        The website is hosted by <strong>{legal.host}</strong>, 61 Lordou Vironos Street, 6023 Larnaca, Cyprus (
        <a href={legal.hostSite}>{legal.hostSite.replace("https://", "")}</a>).
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this website (text, visuals, logo, interfaces, code) is the property of {legal.publisher} or is used with
        permission. Any full or partial reproduction or representation without prior written consent is prohibited. Wave, Orange Money,
        MTN MoMo, Moov Money and WhatsApp are trademarks of their respective owners, mentioned to describe the payment methods tracked and
        the communication channels used.
      </p>

      <h2>Free tools and document templates</h2>
      <p>
        The calculators and templates offered in the <Link href="/en/outils">Free tools</Link> section are provided for information
        only. They do not constitute legal, tax or financial advice and do not replace the opinion of a professional. Calculations run in
        your browser; no data you enter is sent or stored.
      </p>

      <h2>Pricing</h2>
      <p>
        Prices are shown in CFA francs, excluding taxes. Only the signed quote or contract is binding. The simulator gives an indicative
        estimate.
      </p>

      <h2>Personal data</h2>
      <p>
        How data collected on this website is processed is described in our <Link href="/en/confidentialite">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
