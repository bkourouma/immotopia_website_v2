"use client";

import { useI18n } from "@/components/locale-provider";
import { openConsentPanel } from "./consent-store";

/** Rouvre le choix des cookies (pied de page). */
export function ManageCookiesButton({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <button type="button" onClick={openConsentPanel} className={`cursor-pointer ${className ?? ""}`.trim()} data-manage-cookies>
      {t("Gérer mes cookies", "Manage cookies")}
    </button>
  );
}
