import type { Metadata } from "next";
import { CommercialLeaseGenerator } from "@/components/tools/client-tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "bail-commercial";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils/bail-commercial">): Promise<Metadata> {
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
          <h2>Le bail à usage professionnel en droit OHADA</h2>
          <p>
            Dans les 17 États membres de l&apos;OHADA, dont la Côte d&apos;Ivoire, le bail des locaux commerciaux, industriels, artisanaux
            ou professionnels relève de l&apos;Acte uniforme relatif au droit commercial général. Ses règles s&apos;imposent aux parties
            pour protéger l&apos;activité du preneur.
          </p>
          <ul>
            <li>Le bail peut être à durée déterminée ou indéterminée.</li>
            <li>Après deux ans d&apos;exploitation, le preneur bénéficie d&apos;un droit au renouvellement.</li>
            <li>Le loyer peut être révisé à chaque période triennale, à défaut d&apos;accord entre les parties.</li>
          </ul>
          <p>Ce modèle est fourni à titre indicatif : faites-le valider par un avocat ou un notaire avant signature.</p>
        </>,
        <>
          <h2>Business leases under OHADA law</h2>
          <p>
            In the 17 OHADA member states, including Côte d&apos;Ivoire, leases of commercial, industrial, craft or professional premises
            are governed by the Uniform Act on General Commercial Law. Its rules are binding on both parties and are designed to protect the
            tenant&apos;s business.
          </p>
          <ul>
            <li>The lease can be for a fixed term or open-ended.</li>
            <li>After two years of operating in the premises, the tenant is entitled to renew the lease.</li>
            <li>Failing agreement between the parties, the rent can be reviewed every three years.</li>
          </ul>
          <p>
            This template is provided for guidance only: have it reviewed by a lawyer or notary before signing. The generated lease is in
            French, the legal language in Côte d&apos;Ivoire.
          </p>
        </>,
      )}
    >
      <CommercialLeaseGenerator />
    </ToolShell>
  );
}
