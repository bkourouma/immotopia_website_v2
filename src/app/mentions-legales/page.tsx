import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { contact, legal, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales | ImmoTopia",
  description: "Éditeur, hébergeur et conditions d'utilisation du site ImmoTopia.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
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
        autorisation écrite préalable est interdite. Les noms Wave, CinetPay, Orange Money, MTN MoMo et WhatsApp sont des marques de
        leurs propriétaires respectifs, cités pour décrire les intégrations proposées.
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
