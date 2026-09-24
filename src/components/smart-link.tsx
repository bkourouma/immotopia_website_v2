"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { localizeHref, splitPath } from "@/lib/i18n";
import { goTo } from "@/lib/nav";
import { useLocale } from "./locale-provider";

/**
 * Lien de navigation : les ancres (« #roles ») défilent en douceur sur l'accueil,
 * et ramènent à l'accueil depuis les autres pages. Les autres liens passent par le routeur (sans rechargement).
 * Les adresses internes (« /tarifs ») sont préfixées par la langue courante (« /en/tarifs »).
 */
export function SmartLink({ href, onClick, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const isAnchor = href.startsWith("#");
  const onHome = splitPath(pathname).path === "/";
  return (
    <Link
      {...props}
      href={localizeHref(locale, isAnchor && !onHome ? `/${href}` : href)}
      onClick={(e) => {
        onClick?.(e);
        if (isAnchor && onHome) {
          e.preventDefault();
          goTo(href);
        }
      }}
    />
  );
}
