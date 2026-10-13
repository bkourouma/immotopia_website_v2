import type { Metadata } from "next";
import Link from "next/link";
import { InventoryGenerator } from "@/components/tools/client-tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { hasLocale, localizeHref } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getTool, toolMetadata } from "@/lib/tools";

const SLUG = "etat-des-lieux";
// Le wiki est publié en français seulement : le lien est identique dans les deux langues.
const WIKI_ETATS_DES_LIEUX = "/wiki/gestion-locative/etats-des-lieux";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils/etat-des-lieux">): Promise<Metadata> {
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
          <h2>À quoi sert un état des lieux ?</h2>
          <p>
            L&apos;état des lieux décrit l&apos;état du logement, pièce par pièce, au moment où le locataire entre ou quitte les lieux.
            Signé par les deux parties, il devient la référence en cas de désaccord : le bailleur sait ce qu&apos;il a remis, le locataire
            sait ce qu&apos;il doit rendre. C&apos;est le document qui évite la plupart des litiges sur la caution.
          </p>

          <h2>État des lieux d&apos;entrée et état des lieux de sortie</h2>
          <p>
            L&apos;<strong>état des lieux d&apos;entrée</strong> est établi à la remise des clés. Il note l&apos;état des murs, des sols,
            des ouvertures et des équipements, les relevés de compteurs et le nombre de clés. L&apos;<strong>état des lieux de sortie</strong>{" "}
            est établi au départ du locataire, avec le même plan : on compare chaque élément à ce qui avait été noté à l&apos;entrée. Seule
            la différence au-delà de l&apos;usure normale peut donner lieu à réparation. Choisissez le type dans le modèle : le document de
            sortie ajoute un rappel de l&apos;état des lieux d&apos;entrée et un espace pour les retenues éventuelles.
          </p>

          <h2>État des lieux et dépôt de garantie</h2>
          <p>
            Dans le modèle de bail d&apos;habitation de ce site, la caution est restituée à la fin du bail, déduction faite des sommes dues
            et du coût des réparations locatives constatées lors de l&apos;état des lieux de sortie. Deux états des lieux précis, détaillés
            et signés permettent de justifier chaque retenue, ou de la contester. Pour calculer le montant de la caution, essayez le{" "}
            <Link href={localizeHref(locale, "/outils/caution-et-avance")}>calculateur de caution et d&apos;avance</Link>.
          </p>

          <h2>Que noter, pièce par pièce ?</h2>
          <ul>
            <li>pour chaque pièce : les murs et la peinture, le plafond, le sol, les portes et serrures, les fenêtres, les prises et interrupteurs ;</li>
            <li>pour la cuisine et la salle de bain : l&apos;évier, la robinetterie, les placards, la douche, le chauffe-eau, les évacuations ;</li>
            <li>les relevés des compteurs d&apos;eau et d&apos;électricité ;</li>
            <li>le nombre de clés, de badges ou de télécommandes remis ;</li>
            <li>les observations : traces, rayures, fissures, éléments qui ne fonctionnent pas, avec leur emplacement ;</li>
            <li>le nom et la signature des deux parties, sur chaque exemplaire.</li>
          </ul>
          <p>
            Le PDF généré est un modèle à imprimer et à remplir sur place : cochez l&apos;état de chaque élément (bon, moyen, mauvais),
            écrivez vos remarques, puis faites signer le bailleur ou son représentant et le locataire. Ce modèle est fourni à titre
            indicatif ; adaptez-le à votre logement et à votre bail.
          </p>
          <p>
            Pour aller plus loin, ImmoTopia permet de{" "}
            <Link href={WIKI_ETATS_DES_LIEUX}>réaliser les états des lieux d&apos;entrée et de sortie pièce par pièce</Link> et de les
            comparer pour repérer ce qui s&apos;est dégradé.
          </p>
        </>,
        <>
          <h2>What is an inventory report for?</h2>
          <p>
            An inventory report (&quot;état des lieux&quot;) describes the condition of the property, room by room, when the tenant moves
            in or out. Signed by both parties, it becomes the reference if there is a disagreement: the landlord knows what was handed over,
            and the tenant knows what has to be returned. It is the document that prevents most disputes over the deposit.
          </p>

          <h2>Move-in and move-out inventories</h2>
          <p>
            The <strong>move-in inventory</strong> is drawn up when the keys are handed over. It records the condition of walls, floors,
            openings and fittings, the meter readings and the number of keys. The <strong>move-out inventory</strong> is drawn up when the
            tenant leaves, using the same layout: each item is compared with what was noted at move-in. Only the difference beyond normal
            wear and tear can give rise to repairs. Choose the type in the template: the move-out document adds a reminder of the move-in
            inventory and a space for any deductions.
          </p>

          <h2>The inventory and the security deposit</h2>
          <p>
            In this site&apos;s residential lease template, the deposit is returned at the end of the lease, minus any amounts due and the
            cost of tenant repairs noted in the move-out inventory. Two precise, detailed, signed inventories make it possible to justify
            each deduction, or to dispute it. To work out the deposit amount, try the{" "}
            <Link href={localizeHref(locale, "/outils/caution-et-avance")}>deposit and advance rent calculator</Link>.
          </p>

          <h2>What to note, room by room</h2>
          <ul>
            <li>for every room: walls and paint, ceiling, floor, doors and locks, windows, sockets and switches;</li>
            <li>for the kitchen and bathroom: the sink, taps, cupboards, shower, water heater and drains;</li>
            <li>the water and electricity meter readings;</li>
            <li>the number of keys, badges or remote controls handed over;</li>
            <li>remarks: marks, scratches, cracks, items that do not work, with their location;</li>
            <li>the name and signature of both parties, on every copy.</li>
          </ul>
          <p>
            The generated PDF is a template to print and fill in on site: tick the condition of each item (good, fair, poor), write your
            remarks, then have the landlord or their representative and the tenant sign. This template is provided for guidance only; adapt
            it to your property and your lease. The document is generated in French, the legal language in Côte d&apos;Ivoire.
          </p>
          <p>
            To go further, ImmoTopia lets you{" "}
            <Link href={WIKI_ETATS_DES_LIEUX}>carry out move-in and move-out inventories room by room</Link> (page in French) and compare
            them to spot what has deteriorated.
          </p>
        </>,
      )}
    >
      <InventoryGenerator />
    </ToolShell>
  );
}
