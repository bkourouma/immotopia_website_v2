import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "ImmoTopia — L'ERP immobilier le plus complet de Côte d'Ivoire",
  description:
    "Gestion locative, syndic de copropriété, promotion immobilière, Mobile Money (Wave, CinetPay), CRM et finance : ImmoTopia réunit tous les métiers de l'immobilier sur une plateforme, à Abidjan.",
  openGraph: {
    title: "ImmoTopia — L'ERP immobilier le plus complet",
    description:
      "Encaissements Mobile Money automatisés, relevés propriétaires, clôtures de caisse, CRM et syndic sur une seule plateforme.",
    locale: "fr_CI",
    type: "website",
    siteName: "ImmoTopia",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#05070f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${bricolage.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <OrganizationJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
