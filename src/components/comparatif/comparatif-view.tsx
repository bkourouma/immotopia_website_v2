"use client";

import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { ChevronDown, ExternalLink, Search, Sparkles, Swords } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CONSULTED_ON,
  domains,
  isExclusive,
  products,
  rowsFor,
  scores,
  sourcesFor,
  statusMeta,
  type CompareRow,
  type DomainId,
} from "@/lib/comparatif";
import { useI18n } from "../locale-provider";
import { CoverageMap } from "./coverage-map";
import { Legend, StatusDot } from "./status";

const plain = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

export function ComparatifView() {
  const { locale, t } = useI18n();
  const rows = rowsFor(locale);
  const sources = sourcesFor(locale);
  const hasVerif = rows.some((r) => r.statuses.includes("verif"));
  const [rival, setRival] = useState(0); // 0 = les trois, sinon index du concurrent en duel
  const [onlyExclusive, setOnlyExclusive] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<DomainId>(domains[0].id);

  const cols = rival ? [0, rival] : [0, 1, 2, 3];
  const q = plain(query.trim());
  const visible = useMemo(
    () => rowsFor(locale).filter((r) => (!onlyExclusive || isExclusive(r)) && (!q || plain(`${r.feature} ${r.note}`).includes(q))),
    [locale, onlyExclusive, q],
  );

  // Domaine actif dans la barre : la dernière section dont le titre est passé sous la barre collante
  useEffect(() => {
    const onScroll = () => {
      let current: DomainId = domains[0].id;
      for (const d of domains) {
        const el = document.getElementById(d.id);
        if (el && el.getBoundingClientRect().top <= 240) current = d.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  const controlsBar = (
    <div className="flex flex-wrap items-center gap-2">
      <div role="radiogroup" aria-label={t("Mode de comparaison", "Comparison mode")} className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-ink-900/10 bg-white p-1 text-xs font-semibold whitespace-nowrap shadow-sm [scrollbar-width:none]">
        <Swords className="ms-2 me-1 size-3.5 text-ink-900/40" aria-hidden />
        {[t("Les trois", "All three"), ...products.slice(1).map((p) => t(`Duel ${p.name}`, `vs ${p.name}`))].map((label, i) => (
          <button
            key={label}
            role="radio"
            aria-checked={rival === i}
            onClick={() => setRival(i)}
            className={`cursor-pointer rounded-full px-3 py-1.5 transition-colors ${rival === i ? "bg-brand-500 text-white" : "text-ink-900/60 hover:text-ink-900"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        onClick={() => setOnlyExclusive((v) => !v)}
        aria-pressed={onlyExclusive}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
          onlyExclusive ? "border-sun-500 bg-sun-500 text-ink-950" : "border-ink-900/10 bg-white text-ink-900/70 hover:text-ink-900"
        }`}
      >
        <Sparkles className="size-3.5" /> {t("Ce que seul ImmoTopia annonce", "Only ImmoTopia advertises")}
      </button>
      <label className="relative ms-auto w-full sm:w-64">
        <span className="sr-only">{t("Chercher une fonctionnalité", "Search for a feature")}</span>
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-ink-900/35" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("Chercher : caisse, WhatsApp, bail…", "Search: cash desk, WhatsApp, lease…")}
          className="w-full rounded-full border border-ink-900/10 bg-white py-2 ps-9 pe-4 text-sm shadow-sm outline-none focus:border-brand-500"
        />
      </label>
    </div>
  );

  const total = scores(rows);

  return (
    <>
      {/* ——— En-tête : le score et la carte ——— */}
      <section className="relative isolate overflow-hidden bg-ink-950 pt-36 pb-20 text-white">
        <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_70%)]" />
        <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[800px] w-[1300px] -translate-x-1/2" style={{ background: "radial-gradient(closest-side, rgba(91,91,247,0.32), rgba(255,138,61,0.12) 55%, transparent)" }} />
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/80 uppercase backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-mint-400" /> {t("Comparatif", "Comparison")}
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.03] font-bold tracking-tight text-balance md:text-7xl">
              {t("ImmoTopia face à", "ImmoTopia versus")}{" "}
              <span className="text-gradient">{t("trois logiciels ivoiriens.", "three Ivorian software products.")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/65">
              {t(
                `${rows.length} fonctionnalités passées au crible, domaine par domaine, à partir des pages publiques de chaque éditeur, consultées le ${CONSULTED_ON.fr}. Chaque case renvoie à sa source.`,
                `${rows.length} features examined, domain by domain, based on each vendor's public pages, consulted on ${CONSULTED_ON.en}. Every cell links to its source.`,
              )}
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <ScoreCard key={p.id} name={p.name} color={p.color} value={total[i]} max={rows.length} lead={i === 0} />
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-white/45">
            {t(
              `Nombre de fonctions annoncées explicitement par l'éditeur, sur ${rows.length}.`,
              `Number of features explicitly advertised by the vendor, out of ${rows.length}.`,
            )}
          </p>

          <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <h2 className="font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl">{t("La carte, en un coup d'œil.", "The map, at a glance.")}</h2>
              <p className="mt-4 text-white/60">
                {t(
                  "Plus la bulle est pleine, plus l'éditeur couvre le domaine. Cliquez sur une ligne pour voir le détail, fonction par fonction.",
                  "The fuller the bubble, the more of the domain the vendor covers. Click a row to see the detail, feature by feature.",
                )}
              </p>
              <div className="mt-6">
                <Legend dark withVerif={hasVerif} />
              </div>
              <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/60">
                <strong className="text-white/85">{t("« Non documenté » ne veut pas dire « absent ».", "“Not documented” does not mean “missing”.")}</strong>{" "}
                {t(
                  "Cela signifie que nous n'avons rien trouvé dans les pages publiques de l'éditeur. Une démonstration chez lui peut montrer davantage.",
                  "It means we found nothing in the vendor's public pages. A demo from the vendor may show more.",
                )}
              </p>
            </div>
            <CoverageMap hrefFor={(d) => `#${d}`} />
          </div>
        </div>
      </section>

      {/* ——— Barre de navigation collante ——— */}
      <div className="sticky top-[76px] z-30 border-b border-ink-900/[0.07] bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3">
          <nav aria-label={t("Domaines du comparatif", "Comparison domains")} className="mask-fade-x relative -mx-5 flex gap-1.5 overflow-x-auto px-5 [scrollbar-width:none]">
            {domains.map((d) => (
              <a
                key={d.id}
                href={`#${d.id}`}
                ref={(el) => {
                  // Centre la pastille active dans la barre, sans faire défiler la page
                  const bar = el?.parentElement;
                  if (el && bar && active === d.id) bar.scrollTo({ left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
                }}
                aria-current={active === d.id ? "true" : undefined}
                className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                  active === d.id ? "text-white" : "text-ink-900/60 hover:text-ink-900"
                }`}
              >
                {active === d.id && <motion.span layoutId="cmp-domain" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">{d.label[locale]}</span>
              </a>
            ))}
          </nav>
          <div className="hidden md:block">{controlsBar}</div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-5 md:hidden">{controlsBar}</div>

      {/* ——— Détail par domaine ——— */}
      <div className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          {visible.length === 0 && (
            <p className="rounded-3xl border border-dashed border-ink-900/15 p-10 text-center text-ink-900/55">
              {t("Aucune fonctionnalité ne correspond. Essayez un autre mot, ou retirez le filtre.", "No feature matches. Try another word, or remove the filter.")}
            </p>
          )}
          {domains.map((d) => {
            const list = visible.filter((r) => r.domain === d.id);
            if (!list.length) return null;
            return <DomainBlock key={d.id} id={d.id} label={d.label[locale]} pitch={d.pitch[locale]} list={list} cols={cols} />;
          })}
        </div>
      </div>

      {/* ——— Méthode et sources ——— */}
      <section id="sources" className="bg-paper pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-[28px] border border-ink-900/[0.07] bg-white p-6 shadow-sm md:p-10">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{t("Méthode et sources", "Method and sources")}</h2>
            <p className="mt-3 max-w-3xl text-ink-900/60">
              {t(
                `Pour les trois concurrents, nous ne décrivons que ce qu'ils annoncent eux-mêmes publiquement, sans tester leurs logiciels. Pages consultées le ${CONSULTED_ON.fr}. Un éditeur cité peut nous écrire pour faire corriger une case : nous la mettrons à jour.`,
                `For the three competitors, we only describe what they publicly advertise themselves, without testing their software. Pages consulted on ${CONSULTED_ON.en}. Any vendor listed can write to us to have a cell corrected: we will update it.`,
              )}
            </p>
            <ul className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-2 md:grid-cols-2">
              {sources.map((s) => (
                <li key={s.ref} id={`src-${s.ref}`} className="flex min-w-0 gap-3 rounded-2xl bg-paper p-3 text-sm target:ring-2 target:ring-brand-500">
                  <span className="grid h-7 min-w-9 place-items-center rounded-lg bg-ink-900 px-1.5 font-mono text-xs font-bold text-white">{s.ref}</span>
                  <span className="min-w-0">
                    <span className="font-semibold">{s.editor}</span> · {s.page}
                    {s.url.startsWith("http") && (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-0.5 flex items-center gap-1 truncate text-xs text-brand-600 hover:underline">
                        <ExternalLink className="size-3 shrink-0" /> <span className="truncate">{s.url.replace(/^https?:\/\//, "")}</span>
                      </a>
                    )}
                    <span className="mt-0.5 block text-xs text-ink-900/45">{s.limit}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function ScoreCard({ name, color, value, max, lead }: { name: string; color: string; value: number; max: number; lead: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <div ref={ref} className={`rounded-3xl p-5 ${lead ? "glow-border" : "border border-white/10 bg-white/[0.035]"}`}>
      <p className="flex items-center gap-2 text-sm font-semibold text-white/80">
        <span className="size-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
        {name}
      </p>
      <p className="mt-3 font-display text-5xl font-bold tabular-nums">
        {n}
        <span className="text-lg font-semibold text-white/40"> / {max}</span>
      </p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${(value / max) * 100}%` } : undefined}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

function DomainBlock({ id, label, pitch, list, cols }: { id: DomainId; label: string; pitch: string; list: CompareRow[]; cols: number[] }) {
  const { t } = useI18n();
  const s = scores(list);
  return (
    <section id={id} className="scroll-mt-16 py-8 first:pt-0 md:scroll-mt-28">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{label}</h2>
          <p className="mt-1.5 text-ink-900/55">{pitch}</p>
        </div>
        <div className="flex gap-4" aria-label={t("Fonctions annoncées dans ce domaine", "Features advertised in this domain")}>
          {cols.map((i) => (
            <div key={i} className="w-20 text-xs">
              <p className="truncate font-semibold text-ink-900/70">{products[i].name}</p>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink-900/[0.07]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(s[i] / list.length) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{ background: products[i].color }}
                />
              </div>
              <p className="mt-0.5 tabular-nums text-ink-900/45">
                {s[i]}/{list.length}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white shadow-sm">
        <div className="hidden items-center gap-3 border-b border-ink-900/[0.06] px-5 py-3 text-xs font-semibold text-ink-900/45 md:flex">
          <span className="flex-1">{t("Fonctionnalité", "Feature")}</span>
          {cols.map((i) => (
            <span key={i} className={`text-center ${cols.length === 2 ? "w-32" : "w-24"}`} style={{ color: i === 0 ? products[0].color : undefined }}>
              {products[i].name}
            </span>
          ))}
          <span className="w-6" />
        </div>
        <ul>
          {list.map((r) => (
            <Row key={r.feature} row={r} cols={cols} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Row({ row, cols }: { row: CompareRow; cols: number[] }) {
  const [open, setOpen] = useState(false);
  const { locale, t } = useI18n();
  const exclusive = isExclusive(row);
  return (
    <li className="border-t border-ink-900/[0.05] first:border-t-0">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full cursor-pointer flex-col gap-3 px-5 py-3.5 text-start transition-colors hover:bg-brand-500/[0.03] md:flex-row md:items-center">
        <span className="flex flex-1 items-center gap-2 font-medium">
          {row.feature}
          {exclusive && (
            <span className="shrink-0 rounded-full bg-sun-500/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#b45309] uppercase">{t("Exclusif", "Exclusive")}</span>
          )}
        </span>
        <span className="flex items-start gap-3 md:items-center">
          {/* Mobile : grille 2 × 2 avec le nom de l'éditeur ; ordinateur : une colonne par éditeur */}
          <span className="grid flex-1 grid-cols-2 gap-x-3 gap-y-2 md:flex md:flex-none md:gap-3">
            {cols.map((i) => (
              <span key={i} className={`flex min-w-0 items-center gap-1.5 md:justify-center ${cols.length === 2 ? "md:w-32" : "md:w-24"}`}>
                <StatusDot status={row.statuses[i]} />
                <span className="truncate text-xs text-ink-900/55 md:hidden">{products[i].name}</span>
              </span>
            ))}
          </span>
          <ChevronDown className={`mt-2 size-4 shrink-0 text-ink-900/35 transition-transform md:mt-0 md:w-6 ${open ? "rotate-180" : ""}`} aria-hidden />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <div className="mx-5 mb-4 rounded-2xl bg-paper p-4 text-sm">
              <p className="text-ink-900/70">{row.note}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-900/50">
                {cols.map((i) => (
                  <span key={i}>
                    <strong className="text-ink-900/70">{products[i].name}</strong>
                    {t(" : ", ": ")}
                    {statusMeta[locale][row.statuses[i]].label.toLowerCase()}
                  </span>
                ))}
              </div>
              <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-ink-900/50">
                {t("Sources :", "Sources:")}
                {row.sources.map((s) => (
                  <a key={s} href={`#src-${s}`} className="rounded-md bg-white px-1.5 py-0.5 font-mono font-semibold text-brand-600 ring-1 ring-ink-900/10 hover:bg-brand-500 hover:text-white">
                    {s}
                  </a>
                ))}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

