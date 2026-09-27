import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { alternates, hasLocale, htmlLang, locales, ogLocale, translator } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = translator(lang);
  return {
    metadataBase: new URL(SITE_URL),
    alternates: alternates(lang, "/"),
    title: t("ImmoTopia — L'ERP immobilier le plus complet de Côte d'Ivoire", "ImmoTopia — The most complete real estate ERP in Côte d'Ivoire"),
    description: t(
      "Gestion locative, syndic de copropriété, CRM, portails propriétaire et locataire, rappels e-mail et WhatsApp : ImmoTopia réunit votre agence sur une seule plateforme, à Abidjan.",
      "Property management, condominium management, CRM, owner and tenant portals, e-mail and WhatsApp reminders: ImmoTopia brings your whole agency together on one platform, in Abidjan.",
    ),
    openGraph: {
      title: t("ImmoTopia — L'ERP immobilier le plus complet", "ImmoTopia — The most complete real estate ERP"),
      description: t(
        "Loyers et échéances, relevés de gérance, portails clients, CRM et syndic sur une seule plateforme. Premier mois offert.",
        "Rents and due dates, owner statements, client portals, CRM and condominium management on one platform. First month free.",
      ),
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      type: "website",
      siteName: "ImmoTopia",
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#05070f",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    // data-scroll-behavior : Next 16 coupe le défilement fluide (globals.css) pendant un changement de page ;
    // sans lui, la remontée en haut de la nouvelle page est interrompue et on arrive en bas.
    <html lang={htmlLang[lang]} data-scroll-behavior="smooth" className={`${inter.variable} ${bricolage.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <OrganizationJsonLd />
        <Providers locale={lang}>{children}</Providers>
      </body>
    </html>
  );
}
