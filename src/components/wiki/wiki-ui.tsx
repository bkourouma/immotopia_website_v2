import { ChevronRight } from "lucide-react";
import { DemoButton } from "@/components/demo-button";
import { SmartLink } from "@/components/smart-link";
import { SITE_URL } from "@/lib/site";
import { packLabel, packOrder, statusMeta, type WikiPackId, type WikiStatus } from "@/lib/wiki";

export type Crumb = { label: string; href: string };

/** Fil d'Ariane visible ; le dernier élément est la page courante. */
export function WikiBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-ink-900/55">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 text-ink-900/30" aria-hidden />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="font-medium text-ink-900/80">
                {c.label}
              </span>
            ) : (
              <SmartLink href={c.href} className="hover:text-brand-600 hover:underline">
                {c.label}
              </SmartLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Données structurées du fil d'Ariane (accueil compris). */
export function breadcrumbLd(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Accueil", href: "/" }, ...items].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href === "/" ? SITE_URL : `${SITE_URL}${c.href}`,
    })),
  };
}

export function StatusBadge({ status, className = "" }: { status: WikiStatus; className?: string }) {
  const ready = status === "disponible";
  const dev = status === "developpement";
  return (
    <span
      title={statusMeta[status].hint}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ring-1 ${
        ready ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20" : dev ? "bg-ink-900/[0.06] text-ink-900/70 ring-ink-900/15" : "bg-sun-500/10 text-[#b45309] ring-sun-500/30"
      } ${className}`}
    >
      <span className={`size-1.5 rounded-full ${ready ? "bg-emerald-500" : dev ? "bg-ink-900/40" : "bg-sun-500"}`} aria-hidden />
      {statusMeta[status].label}
    </span>
  );
}

/** Packs qui donnent accès, dans l'ordre de la grille tarifaire. */
export function PackChips({ packs, link = false }: { packs: WikiPackId[]; link?: boolean }) {
  const list = packOrder.filter((p) => packs.includes(p));
  const cls = "rounded-full bg-brand-500/[0.08] px-2.5 py-1 text-xs font-semibold text-brand-600 ring-1 ring-brand-500/15";
  return (
    <span className="flex flex-wrap gap-1.5">
      {list.map((p) =>
        link ? (
          <SmartLink key={p} href="/tarifs" className={`${cls} transition hover:bg-brand-500/15`}>
            {packLabel[p]}
          </SmartLink>
        ) : (
          <span key={p} className={cls}>
            {packLabel[p]}
          </span>
        ),
      )}
    </span>
  );
}

/** Encadré sombre de fin de page : démonstration et tarifs. */
export function WikiCta({ title }: { title: string }) {
  return (
    <section className="relative isolate overflow-hidden rounded-[28px] bg-ink-950 px-6 py-10 text-center text-white md:px-12">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -z-10 h-72 w-[640px] -translate-x-1/2"
        style={{ background: "radial-gradient(closest-side, rgba(91,91,247,0.35), transparent)" }}
      />
      <h2 className="font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-white/65">
        {"Un membre de l'équipe vous montre ces écrans avec vos propres cas, et confirme ce qui est disponible pour votre agence."}
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <DemoButton />
        <SmartLink
          href="/tarifs"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50"
        >
          Voir les tarifs
        </SmartLink>
      </div>
    </section>
  );
}
