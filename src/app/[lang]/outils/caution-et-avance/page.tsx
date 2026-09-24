import type { Metadata } from "next";
import { CautionCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "caution-et-avance";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils/caution-et-avance">): Promise<Metadata> {
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
          <h2>Caution, avance : quelle différence ?</h2>
          <p>
            La <strong>caution</strong> (ou dépôt de garantie) couvre d&apos;éventuels impayés ou dégradations : elle est rendue au
            locataire en fin de bail. L&apos;<strong>avance</strong> correspond à des loyers payés à l&apos;avance, qui sont ensuite
            consommés mois après mois.
          </p>
          <p>
            Depuis le Code de la construction et de l&apos;habitat de 2019, la caution et l&apos;avance ne peuvent chacune dépasser deux
            mois de loyer pour un logement d&apos;habitation.
          </p>
        </>,
        <>
          <h2>Deposit or advance rent: what&apos;s the difference?</h2>
          <p>
            The <strong>security deposit</strong> (&quot;caution&quot;) covers any unpaid rent or damage: it is returned to the tenant at
            the end of the lease. The <strong>advance rent</strong> (&quot;avance&quot;) is rent paid upfront, which is then used up month
            by month.
          </p>
          <p>
            Since the 2019 Construction and Housing Code, neither the deposit nor the advance rent may exceed two months&apos; rent for a
            residential property.
          </p>
        </>,
      )}
    >
      <CautionCalculator />
    </ToolShell>
  );
}
