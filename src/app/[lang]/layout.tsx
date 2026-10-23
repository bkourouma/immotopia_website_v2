import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { GoogleAnalytics } from "@/components/consent/google-analytics";
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
    // Titre ≤ 60 caractères et description ≤ 155 : au-delà, Google tronque l'extrait dans les résultats
    title: t("ImmoTopia, logiciel immobilier pour agences en Côte d'Ivoire", "ImmoTopia, real estate software for Côte d'Ivoire agencies"),
    description: t(
      "Gestion locative, syndic, CRM et portails propriétaire/locataire sur une seule plateforme, à Abidjan. Rappels e-mail et WhatsApp inclus.",
      "Property management, condo management, CRM and owner/tenant portals on one platform, in Abidjan. E-mail and WhatsApp reminders included.",
    ),
    openGraph: {
      title: t("ImmoTopia — Logiciel immobilier pour agences et syndics", "ImmoTopia — Real estate software for agencies and condominium managers"),
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
        <Providers locale={lang}>
          {children}
          <CookieConsent />
        </Providers>
        <Analytics />
        {/* Google Analytics 4 : seulement en production, sur le vrai site et après « Accepter » (Umami reste ci-dessus, sans cookie) */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
