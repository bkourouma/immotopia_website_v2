"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "../locale-provider";
import { useDemo } from "../providers";
import { SmartLink } from "../smart-link";

// Les deux pages produit sont publiées en français seulement : leur lien reste sans préfixe /en (qui mènerait à une 404).
/** Bloc « Aller plus loin » inséré dans le texte d'une page outil : trois liens vers les pages produit et un appel à la démo. */
export function GoFurther() {
  const { t } = useI18n();
  const { open } = useDemo();
  return (
    <aside className="my-6 rounded-2xl border border-ink-900/[0.08] bg-white p-5">
      <p className="mb-2 font-display text-lg font-bold text-ink-900">{t("Aller plus loin", "Go further")}</p>
      <ul className="mb-3 space-y-1.5">
        <li>
          <Link href="/gestion-locative-cote-divoire">
            {t("Logiciel de gestion locative en Côte d'Ivoire", "Property management software for Côte d'Ivoire (page in French)")}
          </Link>
        </li>
        <li>
          <Link href="/crm-immobilier-cote-divoire">
            {t("CRM immobilier pour agences en Côte d'Ivoire", "Real estate CRM for agencies in Côte d'Ivoire (page in French)")}
          </Link>
        </li>
        <li>
          <SmartLink href="/tarifs">{t("Tarifs d'ImmoTopia", "ImmoTopia pricing")}</SmartLink>
        </li>
      </ul>
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-900"
      >
        {t("Demander une démo", "Request a demo")} <ArrowRight className="size-4" />
      </button>
    </aside>
  );
}
