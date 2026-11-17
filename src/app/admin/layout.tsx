import type { Metadata } from "next";
import "../[lang]/globals.css";

// Administration : jamais indexée, hors routage des langues (exclue du matcher de src/proxy.ts), sans analytique.
export const metadata: Metadata = { title: { absolute: "Administration ImmoTopia" }, robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-paper font-sans text-ink-900 antialiased">{children}</body>
    </html>
  );
}
