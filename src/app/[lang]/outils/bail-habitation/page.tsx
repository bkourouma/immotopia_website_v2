import type { Metadata } from "next";
import { ResidentialLeaseGenerator } from "@/components/tools/client-tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale } from "@/lib/i18n";
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
