import type { Metadata } from "next";
import { ReceiptGenerator } from "@/components/tools/client-tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "quittance-de-loyer";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils/quittance-de-loyer">): Promise<Metadata> {
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
          <h2>À quoi sert une quittance de loyer ?</h2>
          <p>
            La quittance est le reçu que le bailleur remet au locataire pour attester qu&apos;un loyer a bien été payé. Elle protège les
            deux parties : le locataire prouve qu&apos;il est à jour, le bailleur garde une trace claire de chaque encaissement.
          </p>
          <h2>Que doit contenir une quittance ?</h2>
          <ul>
            <li>l&apos;identité du bailleur et du locataire, et l&apos;adresse du logement ;</li>
            <li>la période concernée ;</li>
            <li>le détail du loyer et des charges, et le total en chiffres et en lettres ;</li>
            <li>la date et le mode de paiement, puis la signature du bailleur.</li>
          </ul>
        </>,
        <>
          <h2>What is a rent receipt for?</h2>
          <p>
            A rent receipt (&quot;quittance de loyer&quot;) is the document a landlord gives the tenant to confirm that rent has been paid.
            It protects both parties: the tenant can prove they are up to date, and the landlord keeps a clear record of every payment.
          </p>
          <h2>What should a rent receipt include?</h2>
          <ul>
            <li>the names of the landlord and tenant, and the address of the property;</li>
            <li>the period covered;</li>
            <li>a breakdown of rent and charges, with the total in figures and in words;</li>
            <li>the payment date and method, followed by the landlord&apos;s signature.</li>
          </ul>
          <p>The receipt is generated in French, the legal language in Côte d&apos;Ivoire.</p>
        </>,
      )}
    >
      <ReceiptGenerator />
    </ToolShell>
  );
}
