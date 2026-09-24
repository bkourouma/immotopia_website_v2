import Link from "next/link";
import { ArrowRight, ChevronRight, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { getTools, type ToolMeta } from "@/lib/tools";
import { localizeHref } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { FinalCta } from "../final-cta";
import { Navbar } from "../navbar";
import { ToolIcon } from "./tool-ui";

/** Gabarit commun des pages outils : bandeau sombre, outil, autres outils, appel à l'action. */
export async function ToolShell({ tool, children, about }: { tool: ToolMeta; children: ReactNode; about?: ReactNode }) {
  const { locale, t: tr } = await getI18n();
  const others = getTools(locale)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 3);
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-16 text-white">
          <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]" />
          <div
            aria-hidden
            className="absolute -top-60 left-1/2 -z-10 h-[720px] w-[1200px] -translate-x-1/2"
            style={{
              background: `radial-gradient(closest-side, ${tool.accent}59, transparent)`,
            }}
          />
          <div className="mx-auto max-w-6xl px-5">
            <nav aria-label={tr("Fil d'Ariane", "Breadcrumb")} className="flex items-center gap-1.5 text-sm text-white/50">
              <Link href={localizeHref(locale, "/")} className="hover:text-white">
                {tr("Accueil", "Home")}
              </Link>
              <ChevronRight className="size-3.5" />
              <Link href={localizeHref(locale, "/outils")} className="hover:text-white">
                {tr("Outils gratuits", "Free tools")}
              </Link>
            </nav>
            <div className="mt-6 flex items-start gap-4">
              <span
                className="hidden size-14 shrink-0 place-items-center rounded-2xl ring-1 ring-white/15 sm:grid"
                style={{ background: `${tool.accent}22`, color: tool.accent }}
              >
                <ToolIcon name={tool.icon} className="size-7" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: tool.accent }}>
                  {tool.category} · {tr("Gratuit, sans inscription", "Free, no sign-up")}
                </p>
                <h1 className="mt-2 font-display text-3xl leading-tight font-bold tracking-tight text-balance md:text-5xl">{tool.title}</h1>
                <p className="mt-4 max-w-2xl text-white/65 md:text-lg">{tool.description}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-xs text-white/45">
                  <Lock className="size-3.5" />{" "}
                  {tr(
                    "Tout est calculé dans votre navigateur : aucune donnée n'est envoyée ni conservée.",
                    "Everything is computed in your browser: no data is sent or stored.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">{children}</section>

        {about && (
          <section className="mx-auto max-w-3xl px-5 pb-8 text-ink-900/75 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink-900 [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:space-y-1">
            {about}
          </section>
        )}

        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-2xl font-bold">{tr("Autres outils gratuits", "Other free tools")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((t) => (
              <Link
                key={t.slug}
                href={localizeHref(locale, `/outils/${t.slug}`)}
                className="group rounded-[22px] border border-ink-900/[0.07] bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="grid size-10 place-items-center rounded-xl" style={{ background: `${t.accent}22`, color: t.accent }}>
                  <ToolIcon name={t.icon} />
                </span>
                <p className="mt-4 font-semibold">{t.title}</p>
                <p className="mt-1 text-sm text-ink-900/55">{t.short}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  {tr("Ouvrir l'outil", "Open tool")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <FinalCta />
    </>
  );
}
