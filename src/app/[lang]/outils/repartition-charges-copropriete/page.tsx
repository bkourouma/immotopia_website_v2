import type { Metadata } from "next";
import { ChargesCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "repartition-charges-copropriete";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils/repartition-charges-copropriete">): Promise<Metadata> {
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
          <h2>Les tantièmes, clé de répartition des charges</h2>
          <p>
            Chaque lot d&apos;une copropriété possède un nombre de tantièmes, fixé dans le règlement de copropriété selon sa surface et sa
            situation. La quote-part d&apos;un lot est égale à ses tantièmes divisés par le total des tantièmes, appliquée au budget de la
            copropriété.
          </p>
          <p>
            Certaines charges, comme l&apos;ascenseur, peuvent suivre une clé spécifique : il suffit de faire un calcul par poste avec les
            tantièmes concernés.
          </p>
        </>,
        <>
          <h2>Ownership shares: the key to allocating charges</h2>
          <p>
            Each unit in a condominium has a number of ownership shares (&quot;tantièmes&quot;), set in the condominium regulations
            according to its size and location. A unit&apos;s share of the budget equals its ownership shares divided by the total number of
            shares.
          </p>
          <p>
            Some charges, such as the lift, may follow a specific allocation key: simply run a separate calculation for that item using the
            relevant shares.
          </p>
        </>,
      )}
    >
      <ChargesCalculator />
    </ToolShell>
  );
}
