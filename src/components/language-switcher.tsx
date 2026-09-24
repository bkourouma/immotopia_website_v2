"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localeLabel, locales, switchLocalePath } from "@/lib/i18n";
import { useLocale } from "./locale-provider";

/** Bascule FR / EN : ouvre la même page dans l'autre langue (ancre comprise). */
export function LanguageSwitcher({ className = "", onLight = false }: { className?: string; onLight?: boolean }) {
  const pathname = usePathname();
  const current = useLocale();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [pathname]);

  return (
    <div
      role="group"
      aria-label={current === "en" ? "Language" : "Langue"}
      className={`inline-flex items-center rounded-full p-0.5 text-xs font-semibold ${onLight ? "bg-ink-900/[0.06]" : "bg-white/[0.08] ring-1 ring-white/10"} ${className}`}
    >
      {locales.map((l) => {
        const active = l === current;
        return (
          <Link
            key={l}
            href={`${switchLocalePath(pathname, l)}${hash}`}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            title={localeLabel[l].name}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              active
                ? onLight
                  ? "bg-white text-ink-900 shadow-sm"
                  : "bg-white text-ink-950"
                : onLight
                  ? "text-ink-900/55 hover:text-ink-900"
                  : "text-white/65 hover:text-white"
            }`}
          >
            {localeLabel[l].short}
          </Link>
        );
      })}
    </div>
  );
}
