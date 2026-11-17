import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CancelButton } from "@/components/events/cancel-button";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: { absolute: "Annuler mon inscription | ImmoTopia" }, robots: { index: false, follow: false } };

export default async function AnnulationPage({ params, searchParams }: PageProps<"/[lang]/evenements/annulation">) {
  const { lang } = await params;
  if (lang !== "fr") notFound();
  const sp = await searchParams;
  const ref = typeof sp.ref === "string" ? sp.ref : "";
  const token = typeof sp.token === "string" ? sp.token : "";
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <PageHero eyebrow="Événements" title="Annuler mon inscription" />
        <div className="mx-auto max-w-xl px-4 py-14 text-center sm:px-5">
          {ref && token ? (
            <>
              <p className="mb-6 text-ink-900/75">
                Référence <strong className="font-mono">{ref}</strong>. L&apos;annulation libère votre place pour une autre personne.
              </p>
              <CancelButton reference={ref} token={token} />
            </>
          ) : (
            <p className="text-ink-900/75">Lien d&apos;annulation incomplet. Utilisez le lien reçu dans votre e-mail de confirmation.</p>
          )}
        </div>
      </main>
    </>
  );
}
