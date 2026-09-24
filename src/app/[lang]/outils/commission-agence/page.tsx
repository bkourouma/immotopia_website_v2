import type { Metadata } from "next";
import { CommissionCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "commission-agence";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils/commission-agence">): Promise<Metadata> {
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
          <h2>Comment se calcule une commission de gestion ?</h2>
          <p>
            L&apos;agence applique son taux, fixé dans le mandat de gestion, soit sur le loyer seul, soit sur le loyer et les charges. La
            TVA s&apos;ajoute à la commission lorsque l&apos;agence y est assujettie. Le propriétaire reçoit ensuite le montant encaissé
            diminué de la commission TTC.
          </p>
        </>,
        <>
          <h2>How is a management commission calculated?</h2>
          <p>
            The agency applies the rate set in the management mandate, either to the rent alone or to the rent plus charges. VAT is added to
            the commission when the agency is VAT-registered. The landlord then receives the amount collected, minus the commission
            including VAT.
          </p>
        </>,
      )}
    >
      <CommissionCalculator />
    </ToolShell>
  );
}
