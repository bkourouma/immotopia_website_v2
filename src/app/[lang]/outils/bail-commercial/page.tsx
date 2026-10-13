import type { Metadata } from "next";
import Link from "next/link";
import { CommercialLeaseGenerator } from "@/components/tools/client-tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale, localizeHref } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "bail-commercial";

// Sources lues pour rédiger cette page (Acte uniforme du 15 décembre 2010, Livre 6, titre 1, art. 101 à 134).
const OHADA_PAGE = "https://www.ohada.org/droit-commercial-general/";
const OHADA_TEXT = "https://faolex.fao.org/docs/pdf/oha195620.pdf";
const REGISTRATION_PROCEDURE = "https://cotedivoire.eregulations.org/procedure/99/5/step/29?l=fr";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils/bail-commercial">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return toolMetadata(SLUG, lang);
}

export default async function Page() {
  const { locale, t } = await getI18n();
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <ToolShell
      tool={getTool(SLUG, locale)}
      about={t(
        <>
          <h2>Bail commercial ou bail à usage professionnel : quelle différence en Côte d&apos;Ivoire ?</h2>
          <p>
            Dans l&apos;Acte uniforme OHADA, il n&apos;existe qu&apos;un seul régime : le « bail à usage professionnel ». Il s&apos;applique
            aux baux de locaux ou d&apos;immeubles à usage commercial, industriel, artisanal ou à tout autre usage professionnel (art. 101).
            Ce que l&apos;on appelle couramment « bail commercial » en Côte d&apos;Ivoire est donc ce même contrat : selon les
            professionnels, l&apos;appellation varie (bail commercial, bail professionnel, bail à usage professionnel), mais le texte de
            référence est le même. Ce modèle convient ainsi pour une boutique, un atelier, des bureaux ou un cabinet.
          </p>
          <p>
            Il se distingue du bail d&apos;habitation, qui relève du Code de la construction et de l&apos;habitat : pour louer un logement,
            utilisez plutôt notre{" "}
            <Link href={localizeHref(locale, "/outils/bail-habitation")}>modèle de bail d&apos;habitation</Link>.
          </p>

          <h2>Les clauses indispensables d&apos;un bail commercial</h2>
          <p>Le modèle généré couvre les points suivants. Adaptez chacun à votre situation avant de signer.</p>
          <ul>
            <li>
              <strong>Durée.</strong> Les parties la fixent librement, pour une durée déterminée ou indéterminée. À défaut d&apos;écrit ou
              de terme fixé, le bail est réputé conclu pour une durée indéterminée.
            </li>
            <li>
              <strong>Loyer et révision.</strong> Le montant du loyer est libre. Le loyer est révisable dans les conditions fixées par les
              parties ou, à défaut, lors de chaque renouvellement : mieux vaut donc prévoir une clause de révision claire.
            </li>
            <li>
              <strong>Dépôt de garantie.</strong> Les articles de l&apos;Acte uniforme sur le bail n&apos;en fixent ni le montant ni le
              plafond : le contrat doit préciser la somme versée et les conditions de sa restitution.
            </li>
            <li>
              <strong>Destination des locaux.</strong> Le preneur exploite les lieux conformément à l&apos;activité prévue au bail. Il peut
              y ajouter des activités connexes ou complémentaires en prévenant expressément le bailleur ; un changement d&apos;activité
              exige l&apos;accord préalable et exprès du bailleur.
            </li>
            <li>
              <strong>Sous-location.</strong> Elle est interdite, sauf stipulation contraire du bail. Si elle est autorisée, elle doit être
              portée à la connaissance du bailleur par écrit, sinon elle ne lui est pas opposable.
            </li>
            <li>
              <strong>Cession du bail.</strong> Elle doit être signifiée ou notifiée au bailleur, avec l&apos;identité complète du
              cessionnaire. L&apos;accord du bailleur est requis, sauf si le preneur cède le bail avec la totalité des éléments qui
              permettent l&apos;activité.
            </li>
            <li>
              <strong>Renouvellement.</strong> Le preneur qui a exploité l&apos;activité prévue pendant au moins deux ans a droit au
              renouvellement, et le contrat ne peut pas l&apos;écarter. Prévoyez la façon de le demander et les délais.
            </li>
            <li>
              <strong>Résiliation.</strong> Le bail peut contenir une clause résolutoire de plein droit, mais toute demande en justice doit
              être précédée d&apos;une mise en demeure. Pour un bail à durée indéterminée, prévoyez aussi la durée du préavis de congé.
            </li>
          </ul>
          <p>
            Précisez enfin qui répare quoi : les grosses réparations incombent au bailleur et les réparations d&apos;entretien au preneur,
            mais le contrat peut détailler la répartition.
          </p>

          <h2>Ce que dit l&apos;Acte uniforme OHADA</h2>
          <p>
            Le texte de référence est l&apos;Acte uniforme portant sur le droit commercial général, révisé à Lomé le 15 décembre 2010. Son
            Livre 6 (titre 1) consacre aux baux à usage professionnel les articles 101 à 134. Les 17 États membres de l&apos;OHADA, dont la
            Côte d&apos;Ivoire, l&apos;appliquent. Voici l&apos;essentiel, d&apos;après le texte lui-même :
          </p>
          <ul>
            <li>
              <strong>Art. 103 et 104.</strong> Le bail est une convention « écrite ou non » ; la durée est libre, déterminée ou
              indéterminée, et sans écrit ni terme fixé, le bail est à durée indéterminée. Un écrit reste le meilleur moyen de prouver ce
              qui a été convenu.
            </li>
            <li>
              <strong>Art. 116 et 117.</strong> Le loyer est librement fixé. À défaut d&apos;accord écrit sur le nouveau montant, la
              juridiction compétente tranche en tenant compte notamment de la situation des locaux, de leur superficie, de leur vétusté et
              des loyers pratiqués dans le voisinage pour des locaux similaires.
            </li>
            <li>
              <strong>Art. 123 et 124.</strong> Le droit au renouvellement est acquis au preneur qui a exploité l&apos;activité prévue
              pendant au moins deux ans. Un bail renouvelé est conclu pour trois ans au minimum. Pour un bail à durée déterminée, le preneur
              demande le renouvellement au plus tard trois mois avant l&apos;expiration, par signification d&apos;huissier ou notification
              permettant d&apos;établir la réception ; passé ce délai, il perd ce droit.
            </li>
            <li>
              <strong>Art. 125.</strong> Pour un bail à durée indéterminée, la partie qui veut y mettre fin donne congé au moins six mois à
              l&apos;avance, par signification d&apos;huissier ou notification permettant d&apos;établir la réception.
            </li>
            <li>
              <strong>Art. 126 et 127.</strong> Le bailleur peut refuser le renouvellement en versant une indemnité d&apos;éviction ; il en
              est dispensé dans des cas limités, comme un motif grave et légitime ou un projet de démolition et de reconstruction.
            </li>
            <li>
              <strong>Art. 133.</strong> Une demande en justice en résiliation doit être précédée d&apos;une mise en demeure, qui doit
              indiquer les clauses non respectées et laisser un délai d&apos;un mois à compter de sa réception.
            </li>
            <li>
              <strong>Art. 134.</strong> Plusieurs dispositions sont d&apos;ordre public, notamment celles sur le renouvellement (art. 123 à
              127) et sur la résiliation (art. 133) : le contrat ne peut pas les écarter.
            </li>
          </ul>
          <p>
            Sources consultées :{" "}
            <a href={OHADA_PAGE} {...ext}>
              page de l&apos;Acte uniforme sur ohada.org
            </a>{" "}
            et{" "}
            <a href={OHADA_TEXT} {...ext}>
              texte intégral de l&apos;Acte uniforme du 15 décembre 2010
            </a>
            . Pour l&apos;enregistrement du contrat auprès des services des impôts, le portail{" "}
            <a href={REGISTRATION_PROCEDURE} {...ext}>
              eRegulations Côte d&apos;Ivoire
            </a>{" "}
            décrit la procédure.
          </p>
          <p>
            <strong>Ce modèle est fourni à titre indicatif : faites-le valider par un avocat ou un notaire avant signature.</strong>
          </p>
        </>,
        <>
          <h2>Commercial lease or business lease: what is the difference in Côte d&apos;Ivoire?</h2>
          <p>
            Under the OHADA Uniform Act there is only one regime: the &quot;business lease&quot; (&quot;bail à usage professionnel&quot;).
            It applies to leases of premises or buildings used for commercial, industrial, craft or any other professional purpose (art.
            101). What is commonly called a &quot;commercial lease&quot; in Côte d&apos;Ivoire is therefore the same contract: the name
            varies from one professional to another (commercial lease, professional lease, business lease), but the reference text is the
            same. This template therefore suits a shop, a workshop, offices or a practice.
          </p>
          <p>
            It is different from a residential lease, which falls under the Construction and Housing Code: to rent a home, use our{" "}
            <Link href={localizeHref(locale, "/outils/bail-habitation")}>residential lease template</Link> instead.
          </p>

          <h2>The essential clauses of a commercial lease</h2>
          <p>The generated template covers the following points. Adapt each one to your situation before signing.</p>
          <ul>
            <li>
              <strong>Term.</strong> The parties are free to set it, fixed or open-ended. Where there is no written agreement or fixed term,
              the lease is deemed to be for an indefinite period.
            </li>
            <li>
              <strong>Rent and rent review.</strong> The amount of rent is freely set. Rent can be reviewed on the terms agreed by the
              parties or, failing that, at each renewal: it is therefore best to include a clear review clause.
            </li>
            <li>
              <strong>Security deposit.</strong> The Uniform Act&apos;s articles on leases set neither its amount nor a cap: the contract
              must state the sum paid and the conditions for returning it.
            </li>
            <li>
              <strong>Permitted use of the premises.</strong> The tenant operates the premises in line with the business set out in the lease.
              It may add related or complementary activities by expressly notifying the landlord; changing the business requires the
              landlord&apos;s prior and express consent.
            </li>
            <li>
              <strong>Subletting.</strong> It is prohibited unless the lease provides otherwise. If allowed, the landlord must be told in
              writing, otherwise the sublease cannot be enforced against them.
            </li>
            <li>
              <strong>Assignment.</strong> It must be formally served or notified to the landlord, with the assignee&apos;s full identity.
              The landlord&apos;s consent is required, unless the tenant assigns the lease together with everything that makes the business
              operate.
            </li>
            <li>
              <strong>Renewal.</strong> A tenant who has operated the agreed business for at least two years is entitled to renewal, and the
              contract cannot rule it out. Set out how to request it and the deadlines.
            </li>
            <li>
              <strong>Termination.</strong> The lease may contain an automatic termination clause, but any court claim for termination must
              be preceded by a formal notice. For an open-ended lease, also set the notice period.
            </li>
          </ul>
          <p>
            Finally, say who repairs what: major repairs fall on the landlord and maintenance repairs on the tenant, but the contract can
            spell out the split.
          </p>

          <h2>What the OHADA Uniform Act says</h2>
          <p>
            The reference text is the Uniform Act on General Commercial Law, revised in Lomé on 15 December 2010. Its Book 6 (title 1)
            devotes articles 101 to 134 to business leases. The 17 OHADA member states, including Côte d&apos;Ivoire, apply it. The key
            points, taken from the text itself (in French):
          </p>
          <ul>
            <li>
              <strong>Art. 103 and 104.</strong> A lease is an agreement that is &quot;written or not&quot;; the term is free, fixed or
              open-ended, and without a written agreement or fixed term the lease is open-ended. A written lease remains the best way to
              prove what was agreed.
            </li>
            <li>
              <strong>Art. 116 and 117.</strong> The rent is freely set. Failing a written agreement on the new amount, the competent court
              decides, taking into account in particular the location of the premises, their size, their age and the rents charged nearby for
              similar premises.
            </li>
            <li>
              <strong>Art. 123 and 124.</strong> The right to renewal is acquired by a tenant who has operated the agreed business for at
              least two years. A renewed lease is concluded for at least three years. For a fixed-term lease, the tenant must request renewal
              at the latest three months before expiry, by bailiff&apos;s service or by notice that establishes receipt; after that, the
              right is lost.
            </li>
            <li>
              <strong>Art. 125.</strong> For an open-ended lease, a party wishing to end it gives at least six months&apos; notice, by
              bailiff&apos;s service or by notice that establishes receipt.
            </li>
            <li>
              <strong>Art. 126 and 127.</strong> The landlord may refuse renewal by paying an eviction indemnity; they are exempt in limited
              cases, such as a serious and legitimate reason or a plan to demolish and rebuild.
            </li>
            <li>
              <strong>Art. 133.</strong> A court claim for termination must be preceded by a formal notice, which must state the clauses
              breached and allow one month from receipt.
            </li>
            <li>
              <strong>Art. 134.</strong> Several provisions are public policy, including those on renewal (art. 123 to 127) and termination
              (art. 133): the contract cannot rule them out.
            </li>
          </ul>
          <p>
            Sources consulted (in French):{" "}
            <a href={OHADA_PAGE} {...ext}>
              the Uniform Act page on ohada.org
            </a>{" "}
            and the{" "}
            <a href={OHADA_TEXT} {...ext}>
              full text of the Uniform Act of 15 December 2010
            </a>
            . For registering the lease with the tax authorities, the{" "}
            <a href={REGISTRATION_PROCEDURE} {...ext}>
              eRegulations Côte d&apos;Ivoire
            </a>{" "}
            portal describes the procedure.
          </p>
          <p>
            <strong>
              This template is provided for guidance only: have it reviewed by a lawyer or notary before signing. The generated lease is in
              French, the legal language in Côte d&apos;Ivoire.
            </strong>
          </p>
        </>,
      )}
    >
      <CommercialLeaseGenerator />
    </ToolShell>
  );
}
