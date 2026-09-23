import { ChargesCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "repartition-charges-copropriete";
export const metadata = toolMetadata(SLUG);

export default function Page() {
  return (
    <ToolShell
      tool={getTool(SLUG)}
      about={
        <>
          <h2>Les tantièmes, clé de répartition des charges</h2>
          <p>
            Chaque lot d&apos;une copropriété possède un nombre de tantièmes, fixé dans le règlement de copropriété selon sa surface et
            sa situation. La quote-part d&apos;un lot est égale à ses tantièmes divisés par le total des tantièmes, appliquée au
            budget de la copropriété.
          </p>
          <p>
            Certaines charges, comme l&apos;ascenseur, peuvent suivre une clé spécifique : il suffit de faire un calcul par poste avec
            les tantièmes concernés.
          </p>
        </>
      }
    >
      <ChargesCalculator />
    </ToolShell>
  );
}
