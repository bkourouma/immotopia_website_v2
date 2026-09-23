import { ResidentialLeaseGenerator } from "@/components/tools/client-tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "bail-habitation";
export const metadata = toolMetadata(SLUG);

export default function Page() {
  return (
    <ToolShell
      tool={getTool(SLUG)}
      about={
        <>
          <h2>Les points clés d&apos;un bail d&apos;habitation en Côte d&apos;Ivoire</h2>
          <p>
            Le bail d&apos;habitation est encadré par la loi n° 2019-576 du 26 juin 2019 instituant le Code de la construction et de
            l&apos;habitat. Un bon contrat précise au minimum la désignation du logement, la durée, le loyer et son échéance, la caution
            et l&apos;avance, ainsi que les obligations de chaque partie.
          </p>
          <ul>
            <li>La caution et l&apos;avance sont chacune plafonnées à deux mois de loyer.</li>
            <li>Un état des lieux contradictoire à l&apos;entrée et à la sortie évite la plupart des litiges sur la caution.</li>
            <li>Le bail doit être enregistré auprès des services des impôts.</li>
          </ul>
          <p>Ce modèle est un point de départ : faites-le relire par un professionnel du droit pour les situations particulières.</p>
        </>
      }
    >
      <ResidentialLeaseGenerator />
    </ToolShell>
  );
}
