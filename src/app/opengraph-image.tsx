import { ImageResponse } from "next/og";

// Image d'aperçu affichée lors du partage d'un lien (WhatsApp, Facebook, LinkedIn…)
export const alt = "ImmoTopia — L'ERP immobilier le plus complet de Côte d'Ivoire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          <svg width="72" height="72" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#5B5BF7" />
                <stop offset="1" stopColor="#FF8A3D" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="9" fill="url(#g)" />
            <path d="M7.5 15.5 16 8.5l8.5 7" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="14.2" y="15" width="3.6" height="9" rx="1.8" fill="#fff" />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
            Immo<span style={{ color: "#FF8A3D" }}>Topia</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>L&apos;ERP immobilier</div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#b3b3ff" }}>
            le plus complet de Côte d&apos;Ivoire.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.65)" }}>
            Gestion locative · Syndic · Promotion · Mobile Money · CRM
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Wave", "CinetPay", "Orange Money", "MTN MoMo", "SYSCOHADA"].map((t) => (
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
