import type { Metadata } from "next";
import Link from "next/link";
import { ResidentialLeaseGenerator } from "@/components/tools/client-tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale, localizeHref } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "bail-habitation";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils/bail-habitation">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return toolMetadata(SLUG, lang);
}

export default async function Page() {
  const { locale, t } = await getI18n();
  return (
    <ToolShell
      tool={getTool(SLUG, locale)}
      about={t(
        <>
          <p>
            Ce modèle de contrat de bail ivoirien sert à louer un logement : renseignez les parties et les conditions, vérifiez
            l&apos;aperçu, puis téléchargez le contrat en PDF. Pour un local professionnel, voir plutôt le{" "}
            <Link href={localizeHref(locale, "/outils/bail-commercial")}>modèle de bail commercial</Link>.
          </p>
          <h2>Clauses obligatoires d&apos;un bail d&apos;habitation en Côte d&apos;Ivoire</h2>
          <p>Le contrat doit préciser au minimum les points suivants. Adaptez chacun à votre situation avant de signer.</p>
          <ul>
            <li>
              <strong>Identification.</strong> Les parties (bailleur et locataire) et la désignation du logement loué.
            </li>
            <li>
              <strong>Loyer.</strong> Son montant et son échéance.
            </li>
            <li>
              <strong>Durée.</strong> La durée du bail.
            </li>
            <li>
              <strong>Caution et avance.</strong> Les sommes versées à l&apos;entrée, dans la limite des plafonds ci-dessous.
            </li>
            <li>
              <strong>État des lieux.</strong> Un état des lieux contradictoire à l&apos;entrée et à la sortie.
            </li>
            <li>
              <strong>Charges.</strong> Ce qui incombe à chaque partie : le contrat énonce les obligations du bailleur et du locataire.
            </li>
            <li>
              <strong>Résiliation.</strong> Les conditions dans lesquelles chaque partie peut mettre fin au bail.
            </li>
          </ul>
          <h2>Enregistrement du bail : démarches, délais et coût</h2>
          <p>
            Le bail d&apos;habitation doit être enregistré auprès des services des impôts, comme le rappelle le contrat généré. Nous ne
            publions pas ici les délais ni les droits à payer : renseignez-vous auprès de l&apos;administration fiscale ou d&apos;un
            professionnel du droit pour les connaître avant de signer.
          </p>
          <h2>Caution et avance : plafonds</h2>
          <p>
            Pour un logement d&apos;habitation, la caution et l&apos;avance sur loyer sont chacune plafonnées à deux mois de loyer. Pour
            chiffrer ce que le locataire doit verser à l&apos;entrée, utilisez notre{" "}
            <Link href={localizeHref(locale, "/outils/caution-et-avance")}>calculateur de caution et d&apos;avance</Link>.
          </p>
          <h2>Modèle de bail PDF et Word</h2>
          <p>
            Le modèle se télécharge en PDF, généré dans votre navigateur ; il n&apos;existe pas de version Word sur cette page. Une fois
            le bail signé, éditez chaque mois une <Link href={localizeHref(locale, "/outils/quittance-de-loyer")}>quittance de loyer</Link>.
          </p>
          <h2>Bail verbal ou écrit ?</h2>
          <p>
            Un contrat écrit reste le meilleur moyen de prouver le loyer, la durée, la caution et l&apos;avance convenus. Joignez-y un{" "}
            <Link href={localizeHref(locale, "/outils/etat-des-lieux")}>état des lieux</Link> d&apos;entrée, puis de sortie.
          </p>
          <h2>Les points clés d&apos;un bail d&apos;habitation en Côte d&apos;Ivoire</h2>
          <p>
            Le bail d&apos;habitation est encadré par la loi n° 2019-576 du 26 juin 2019 instituant le Code de la construction et de
            l&apos;habitat. Un bon contrat précise au minimum la désignation du logement, la durée, le loyer et son échéance, la caution et
            l&apos;avance, ainsi que les obligations de chaque partie.
          </p>
          <ul>
            <li>La caution et l&apos;avance sont chacune plafonnées à deux mois de loyer.</li>
            <li>Un état des lieux contradictoire à l&apos;entrée et à la sortie évite la plupart des litiges sur la caution.</li>
            <li>Le bail doit être enregistré auprès des services des impôts.</li>
          </ul>
          <p>Ce modèle est un point de départ : faites-le relire par un professionnel du droit pour les situations particulières.</p>
        </>,
        <>
          <p>
            This Ivorian lease template is for renting a home: enter the parties and the terms, check the preview, then download the
            agreement as a PDF. For business premises, see the{" "}
            <Link href={localizeHref(locale, "/outils/bail-commercial")}>commercial lease template</Link> instead.
          </p>
          <h2>Required clauses of a residential lease in Côte d&apos;Ivoire</h2>
          <p>The agreement must set out at least the following points. Adapt each one to your situation before signing.</p>
          <ul>
            <li>
              <strong>Identification.</strong> The parties (landlord and tenant) and the description of the property let.
            </li>
            <li>
              <strong>Rent.</strong> Its amount and due date.
            </li>
            <li>
              <strong>Term.</strong> The length of the lease.
            </li>
            <li>
              <strong>Deposit and advance rent.</strong> The sums paid on entry, within the caps below.
            </li>
            <li>
              <strong>Inventory.</strong> A joint check-in and check-out inventory.
            </li>
            <li>
              <strong>Charges.</strong> What falls on each party: the agreement sets out the landlord&apos;s and the tenant&apos;s
              obligations.
            </li>
            <li>
              <strong>Termination.</strong> The conditions under which each party can end the lease.
            </li>
          </ul>
          <h2>Registering the lease: steps, deadlines and cost</h2>
          <p>
            A residential lease must be registered with the tax authorities, as the generated agreement points out. We do not publish the
            deadlines or fees here: check them with the tax administration or a legal professional before signing.
          </p>
          <h2>Deposit and advance rent: caps</h2>
          <p>
            For a residential property, the security deposit and the advance rent are each capped at two months&apos; rent. To work out
            what the tenant must pay on entry, use our{" "}
            <Link href={localizeHref(locale, "/outils/caution-et-avance")}>deposit and advance rent calculator</Link>.
          </p>
          <h2>Lease template in PDF and Word</h2>
          <p>
            The template downloads as a PDF, generated in your browser; there is no Word version on this page. Once the lease is signed,
            issue a monthly <Link href={localizeHref(locale, "/outils/quittance-de-loyer")}>rent receipt</Link>.
          </p>
          <h2>Verbal or written lease?</h2>
          <p>
            A written contract remains the best way to prove the agreed rent, term, deposit and advance rent. Attach a check-in, then
            check-out, <Link href={localizeHref(locale, "/outils/etat-des-lieux")}>inventory</Link>.
          </p>
          <h2>Key points of a residential lease in Côte d&apos;Ivoire</h2>
          <p>
            Residential leases are governed by Law No. 2019-576 of 26 June 2019 establishing the Construction and Housing Code. A sound
            agreement sets out at least a description of the property, the term, the rent and its due date, the deposit and advance rent,
            and each party&apos;s obligations.
          </p>
          <ul>
            <li>The security deposit and the advance rent are each capped at two months&apos; rent.</li>
            <li>A joint check-in and check-out inventory prevents most disputes over the deposit.</li>
            <li>The lease must be registered with the tax authorities.</li>
          </ul>
          <p>
            This template is a starting point: have it reviewed by a legal professional for specific situations. The generated lease is in
            French, the legal language in Côte d&apos;Ivoire.
          </p>
        </>,
      )}
    >
      <ResidentialLeaseGenerator />
    </ToolShell>
  );
}
