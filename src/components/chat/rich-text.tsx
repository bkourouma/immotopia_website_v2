"use client";

import { Fragment, type ReactNode } from "react";
import { useI18n } from "../locale-provider";

// Rendu Markdown minimal et sûr pour les réponses de l'assistant (aucun HTML injecté) :
// paragraphes, listes « - » / « 1. », **gras**, *italique*, [liens](https://…) et adresses web nues.

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\((https?:\/\/[^)\s]+)\)|https?:\/\/[^\s)]+)/g;

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(INLINE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;
    if (tok.startsWith("**")) out.push(<strong key={key} className="font-semibold text-white">{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith("[")) {
      const label = tok.slice(1, tok.indexOf("]"));
      out.push(<Link key={key} href={m[2]} label={label} />);
    } else if (tok.startsWith("http")) {
      const clean = tok.replace(/[.,;:!?]+$/, "");
      out.push(<Link key={key} href={clean} label={clean.replace(/^https?:\/\//, "")} />);
      if (clean.length < tok.length) out.push(tok.slice(clean.length));
    } else out.push(<em key={key}>{tok.slice(1, -1)}</em>);
    last = idx + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Link({ href, label }: { href: string; label: string }) {
  const { href: localize } = useI18n();
  const internal = href.startsWith("https://immotopia.cloud");
  const path = internal ? href.replace("https://immotopia.cloud", "") || "/" : href;
  // Lien interne : ouvert dans la langue courante, sauf s'il en précise déjà une
  const localized = internal && !/^\/(en|fr)(\/|$|#|\?)/.test(path) ? localize(path) : path;
  return (
    <a
      href={localized}
      {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="font-medium text-brand-300 underline underline-offset-2 hover:text-white"
    >
      {label}
    </a>
  );
}

export function RichText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const Tag = list.ordered ? "ol" : "ul";
    const k = `l${blocks.length}`;
    blocks.push(
      <Tag key={k} className={`my-1.5 space-y-1 pl-5 ${list.ordered ? "list-decimal" : "list-disc"}`}>
        {list.items.map((it, j) => (
          <li key={j}>{inline(it, `${k}-${j}`)}</li>
        ))}
      </Tag>,
    );
    list = null;
  };

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      const ordered = !!numbered;
      if (list && list.ordered !== ordered) flush();
      list ??= { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    flush();
    if (!line) continue;
    const clean = line.replace(/^#{1,6}\s+/, ""); // titres éventuels rendus comme du texte
    blocks.push(
      <p key={`p${blocks.length}`} className="my-1 first:mt-0 last:mb-0">
        {inline(clean, `p${blocks.length}`)}
      </p>,
    );
  }
  flush();
  return <Fragment>{blocks}</Fragment>;
}
