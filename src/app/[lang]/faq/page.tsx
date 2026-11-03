import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqPage } from "@/components/faq-page";

export const metadata: Metadata = {
  title: { absolute: "FAQ ImmoTopia : vos questions sur le logiciel immobilier" },
  description:
    "Tarifs, période d'essai, gestion locative, Mobile Money, syndic, sécurité, reprise des données : les réponses aux questions fréquentes sur ImmoTopia.",
  alternates: { canonical: "/faq" },
};

export default async function Page({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  if (lang !== "fr") notFound();
  return <FaqPage />;
}
