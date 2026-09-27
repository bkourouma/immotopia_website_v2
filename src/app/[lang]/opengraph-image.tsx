import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale, translator } from "@/lib/i18n";

// Icône et nom ImmoTopia (public/images/logo/), lus une fois et intégrés à l'image
const png = async (file: string) => `data:image/png;base64,${await readFile(join(process.cwd(), "public/images/logo", file), "base64")}`;
const iconSrc = await png("icone.png");
const nameSrc = await png("logo-immotopia-nom-inverse.png"); // 953 × 189

// Image d'aperçu affichée lors du partage d'un lien (WhatsApp, Facebook, LinkedIn…)
export const alt = "ImmoTopia — L'ERP immobilier le plus complet de Côte d'Ivoire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = translator(hasLocale(lang) ? lang : "fr");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 20% 10%, #2a2a8a 0%, #05070f 55%), #05070f",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse n'accepte que <img> */}
          <img src={iconSrc} width={72} height={72} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse n'accepte que <img> */}
          <img src={nameSrc} width={222} height={44} alt="ImmoTopia" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>{t("L'ERP immobilier", "The most complete")}</div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#b3b3ff" }}>
            {t("le plus complet de Côte d'Ivoire.", "real estate ERP in Côte d'Ivoire.")}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.65)" }}>
            {t("Gestion locative · Syndic · CRM · Portails clients", "Property management · Condominiums · CRM · Client portals")}
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {t(["Loyers & échéances", "Syndic", "CRM", "WhatsApp", "1er mois offert"], ["Rents & due dates", "Condominiums", "CRM", "WhatsApp", "1st month free"]).map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1.5px solid rgba(255,255,255,0.18)",
                fontSize: 22,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
