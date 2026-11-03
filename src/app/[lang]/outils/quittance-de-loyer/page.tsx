import type { Metadata } from "next";
import Link from "next/link";
import { ReceiptGenerator } from "@/components/tools/client-tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "quittance-de-loyer";
// Le wiki est publié en français seulement : le lien est identique dans les deux langues.
const WIKI_QUITTANCES = "/wiki/gestion-locative/quittances-et-documents-locatifs";

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
            deux parties : le locataire prouve qu&apos;il est à jour, le bailleur garde une trace claire de chaque encaissement. En cas de
            désaccord sur un paiement, c&apos;est la première pièce que l&apos;on demande.
          </p>

          <h2>Mentions obligatoires d&apos;une quittance de loyer</h2>
          <p>
            Nous n&apos;avons pas relevé de formulaire officiel unique pour la Côte d&apos;Ivoire : votre bail peut d&apos;ailleurs
            prévoir ses propres exigences. Voici les mentions que l&apos;on retrouve habituellement et que ce générateur remplit pour vous :
          </p>
          <ul>
            <li>l&apos;identité du bailleur et du locataire, et l&apos;adresse du logement ;</li>
            <li>la période concernée (le mois, avec ses dates de début et de fin) ;</li>
            <li>le détail du loyer et des charges, et le total en chiffres et en lettres ;</li>
            <li>la date et le mode de paiement ;</li>
            <li>le lieu, la date d&apos;émission et la signature du bailleur.</li>
          </ul>

          <h2>Quittance de loyer et reçu de paiement : quelle différence ?</h2>
          <p>
            La <strong>quittance</strong> atteste que le loyer et les charges d&apos;une période ont été payés en totalité : elle solde la
            période et libère le locataire pour ce mois. Le <strong>reçu</strong> se contente de constater qu&apos;une somme a été remise,
            par exemple un acompte, un paiement partiel ou une caution, sans dire que la dette est éteinte. Si le locataire ne paie qu&apos;une
            partie du loyer, remettez-lui un reçu du montant réellement encaissé, et gardez la quittance pour le solde.
          </p>

          <h2>Quittance de loyer en Côte d&apos;Ivoire (Mobile Money, espèces)</h2>
          <p>
            En Côte d&apos;Ivoire, le loyer se règle souvent par Mobile Money (Wave, Orange Money, MTN MoMo, Moov Money) ou en espèces.
            Dans les deux cas, la quittance garde tout son intérêt :
          </p>
          <ul>
            <li>
              <strong>Mobile Money :</strong> indiquez l&apos;opérateur et la date du paiement, et conservez le message de confirmation
              avec la quittance ;
            </li>
            <li>
              <strong>espèces :</strong> remettez la quittance au moment du paiement, car il n&apos;existe aucune autre trace ; gardez-en
              toujours un exemplaire signé ;
            </li>
            <li>
              <strong>virement ou chèque :</strong> indiquez la date à laquelle les fonds ont réellement été reçus, pas celle de l&apos;ordre de paiement.
            </li>
          </ul>

          <h2>Aller plus loin</h2>
          <p>
            Ce générateur sert pour une quittance ponctuelle. Si vous gérez plusieurs logements, vous pouvez{" "}
            <Link href={WIKI_QUITTANCES}>générer les quittances depuis la fiche du bail, numérotées à la suite et classées avec chaque bail</Link>{" "}
            avec ImmoTopia, sans ressaisir les informations à chaque mois.
          </p>
        </>,
        <>
          <h2>What is a rent receipt for?</h2>
          <p>
            A rent receipt (&quot;quittance de loyer&quot;) is the document a landlord gives the tenant to confirm that rent has been paid.
            It protects both parties: the tenant can prove they are up to date, and the landlord keeps a clear record of every payment. If a
            payment is ever disputed, it is the first document anyone will ask for.
          </p>

          <h2>Mandatory details on a rent receipt</h2>
          <p>
            We have not found a single official form for Côte d&apos;Ivoire, and your lease may set its own requirements. These are the
            details usually found on a receipt, which this generator fills in for you:
          </p>
          <ul>
            <li>the names of the landlord and tenant, and the address of the property;</li>
            <li>the period covered (the month, with its start and end dates);</li>
            <li>a breakdown of rent and charges, with the total in figures and in words;</li>
            <li>the payment date and method;</li>
            <li>the place, the date of issue and the landlord&apos;s signature.</li>
          </ul>

          <h2>Rent receipt or payment receipt: what is the difference?</h2>
          <p>
            A <strong>rent receipt</strong> (&quot;quittance&quot;) confirms that the rent and charges for a period have been paid in full:
            it settles that period and clears the tenant for that month. A <strong>payment receipt</strong> (&quot;reçu&quot;) simply
            records that an amount was handed over, such as an instalment, a part payment or a deposit, without saying the debt is cleared.
            If the tenant pays only part of the rent, give them a payment receipt for the amount actually received, and keep the rent
            receipt for the balance.
          </p>

          <h2>Rent receipts in Côte d&apos;Ivoire (Mobile Money, cash)</h2>
          <p>
            In Côte d&apos;Ivoire, rent is often paid by Mobile Money (Wave, Orange Money, MTN MoMo, Moov Money) or in cash. In both
            cases the receipt is just as useful:
          </p>
          <ul>
            <li>
              <strong>Mobile Money:</strong> state the operator and the payment date, and keep the confirmation message with the receipt;
            </li>
            <li>
              <strong>cash:</strong> hand over the receipt at the time of payment, as there is no other record; always keep a signed copy;
            </li>
            <li>
              <strong>bank transfer or cheque:</strong> state the date the funds were actually received, not the date of the payment order.
            </li>
          </ul>

          <h2>Going further</h2>
          <p>
            This generator is for a one-off receipt. If you manage several properties, ImmoTopia lets you{" "}
            <Link href={WIKI_QUITTANCES}>generate receipts from the lease record, numbered in sequence and filed with each lease</Link> (page
            in French), with no need to re-enter the details every month.
          </p>
          <p>The receipt is generated in French, the legal language in Côte d&apos;Ivoire.</p>
        </>,
      )}
    >
      <ReceiptGenerator />
    </ToolShell>
  );
}
