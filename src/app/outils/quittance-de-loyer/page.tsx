import { ReceiptGenerator } from "@/components/tools/client-tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "quittance-de-loyer";
export const metadata = toolMetadata(SLUG);

export default function Page() {
  return (
    <ToolShell
      tool={getTool(SLUG)}
      about={
        <>
          <h2>À quoi sert une quittance de loyer ?</h2>
          <p>
            La quittance est le reçu que le bailleur remet au locataire pour attester qu&apos;un loyer a bien été payé. Elle protège les deux
            parties : le locataire prouve qu&apos;il est à jour, le bailleur garde une trace claire de chaque encaissement.
          </p>
          <h2>Que doit contenir une quittance ?</h2>
          <ul>
            <li>l&apos;identité du bailleur et du locataire, et l&apos;adresse du logement ;</li>
            <li>la période concernée ;</li>
            <li>le détail du loyer et des charges, et le total en chiffres et en lettres ;</li>
            <li>la date et le mode de paiement, puis la signature du bailleur.</li>
          </ul>
        </>
      }
    >
      <ReceiptGenerator />
    </ToolShell>
  );
}
