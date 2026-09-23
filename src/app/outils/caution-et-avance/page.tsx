import { CautionCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "caution-et-avance";
export const metadata = toolMetadata(SLUG);

export default function Page() {
  return (
    <ToolShell
      tool={getTool(SLUG)}
      about={
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
        </>
      }
    >
      <CautionCalculator />
    </ToolShell>
  );
}
