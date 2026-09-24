import type { Metadata } from "next";
import { YieldCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "rendement-locatif";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils/rendement-locatif">): Promise<Metadata> {
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
          <h2>Rendement brut ou rendement net ?</h2>
          <p>
            Le <strong>rendement brut</strong> rapporte les loyers annuels au prix d&apos;achat : c&apos;est un premier repère rapide. Le{" "}
            <strong>rendement net</strong> est plus juste : il tient compte des frais d&apos;acquisition, des travaux, des mois sans
            locataire, des charges non récupérables, de l&apos;impôt foncier et des frais de gestion.
          </p>
          <p>
            Le calcul est présenté hors crédit : ajoutez vos mensualités d&apos;emprunt pour connaître votre effort d&apos;épargne réel.
          </p>
        </>,
        <>
          <h2>Gross yield or net yield?</h2>
          <p>
            <strong>Gross yield</strong> compares annual rent with the purchase price: it is a quick first benchmark.{" "}
            <strong>Net yield</strong> is more accurate: it accounts for acquisition costs, renovation, months without a tenant,
            non-recoverable charges, property tax and management fees.
          </p>
          <p>The calculation excludes financing: factor in your loan repayments to see how much you actually need to put in each month.</p>
        </>,
      )}
    >
      <YieldCalculator />
    </ToolShell>
  );
}
