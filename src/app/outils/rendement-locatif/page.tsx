import { YieldCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "rendement-locatif";
export const metadata = toolMetadata(SLUG);

export default function Page() {
  return (
    <ToolShell
      tool={getTool(SLUG)}
      about={
        <>
          <h2>Rendement brut ou rendement net ?</h2>
          <p>
            Le <strong>rendement brut</strong> rapporte les loyers annuels au prix d&apos;achat : c&apos;est un premier repère rapide. Le{" "}
            <strong>rendement net</strong> est plus juste : il tient compte des frais d&apos;acquisition, des travaux, des mois sans
            locataire, des charges non récupérables, de l&apos;impôt foncier et des frais de gestion.
          </p>
          <p>Le calcul est présenté hors crédit : ajoutez vos mensualités d&apos;emprunt pour connaître votre effort d&apos;épargne réel.</p>
        </>
      }
    >
      <YieldCalculator />
    </ToolShell>
  );
}
