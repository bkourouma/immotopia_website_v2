import { CommissionCalculator } from "@/components/tools/calculators";
import { ToolShell } from "@/components/tools/tool-shell";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "commission-agence";
export const metadata = toolMetadata(SLUG);

export default function Page() {
  return (
    <ToolShell
      tool={getTool(SLUG)}
      about={
        <>
          <h2>Comment se calcule une commission de gestion ?</h2>
          <p>
            L&apos;agence applique son taux, fixé dans le mandat de gestion, soit sur le loyer seul, soit sur le loyer et les charges. La
            TVA s&apos;ajoute à la commission lorsque l&apos;agence y est assujettie. Le propriétaire reçoit ensuite le montant encaissé
            diminué de la commission TTC.
          </p>
        </>
      }
    >
      <CommissionCalculator />
    </ToolShell>
  );
}
