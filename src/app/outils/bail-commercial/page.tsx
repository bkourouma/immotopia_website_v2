import { CommercialLeaseGenerator } from "@/components/tools/client-tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "bail-commercial";
export const metadata = toolMetadata(SLUG);

export default function Page() {
  return (
    <ToolShell
      tool={getTool(SLUG)}
      about={
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
        </>
      }
    >
      <CommercialLeaseGenerator />
    </ToolShell>
  );
}
