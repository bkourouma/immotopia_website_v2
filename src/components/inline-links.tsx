import { Fragment } from "react";
import { SmartLink } from "./smart-link";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Texte brut d'une chaîne qui contient des liens « [texte](/chemin) » (pour les données structurées et les comptages). */
export const stripLinks = (text: string) => text.replace(LINK, "$1");

/**
 * Affiche une chaîne de contenu qui contient des liens internes au format « [texte](/chemin) ».
 * Les textes restent dans `src/lib/` (règle de contenus.md) : seul ce format les relie entre eux.
 */
export function InlineLinks({ text, linkClassName = "font-medium text-brand-600 underline-offset-2 hover:underline" }: { text: string; linkClassName?: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <SmartLink key={m.index} href={m[2]} className={linkClassName}>
        {m[1]}
      </SmartLink>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}
