"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroCards, type HeroCard } from "@/lib/content";
import { goTo } from "@/lib/nav";
import { Mockup } from "./mockups";
import { useDemo } from "./providers";
import { MagneticButton } from "./ui";

const N = heroCards.length;
const AUTOPLAY_MS = 8000;

/** Décalage circulaire d'une carte par rapport à la carte active, dans [-3, 3] */
function offsetOf(i: number, active: number) {
  const half = Math.floor(N / 2);
  return ((i - active + N + half) % N) - half;
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragging = useRef(false);
  const root = useRef<HTMLElement>(null);
  const { open } = useDemo();

  const go = useCallback((dir: number) => setActive((a) => (a + dir + N) % N), []);

  // Lecture automatique, en pause au survol ou quand l'onglet est caché
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, go]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Apparition d'entrée orchestrée avec GSAP
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from("[data-hero-word]", { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.06 })
          .from("[data-hero-fade]", { y: 20, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.8")
          .from("[data-hero-stage]", { y: 80, opacity: 0, scale: 0.94, duration: 1.4 }, "-=0.9");
      });
    },
    { scope: root },
  );

  function onDragEnd(_: unknown, info: PanInfo) {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -70) go(1);
    else if (swipe > 70) go(-1);
    setTimeout(() => (dragging.current = false), 0);
  }

  const title = "L'ERP immobilier le plus complet de Côte d'Ivoire.";
  const accent = heroCards[active].accent;

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate overflow-hidden bg-ink-950 pt-28 pb-16 text-white md:pt-32 md:pb-20"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* Fond : grille + halos qui prennent la couleur de la carte active */}
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_70%)]" />
      <motion.div
        aria-hidden
        className="absolute top-[30%] left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        animate={{ backgroundColor: accent }}
        transition={{ duration: 1.2 }}
      />
      <div aria-hidden className="absolute -top-40 -left-40 -z-10 size-[520px] rounded-full bg-brand-500/30 blur-[140px]" />
      <div aria-hidden className="absolute -top-20 right-[-10%] -z-10 size-[420px] rounded-full bg-sun-500/15 blur-[140px]" />

      <div className="mx-auto max-w-5xl px-5 text-center">
        <div data-hero-fade className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 backdrop-blur-md">
          <span className="rounded-full bg-mint-400 px-2 py-0.5 text-[10px] font-bold text-ink-950">NOUVEAU</span>
          Module Syndic de copropriété disponible
        </div>
        <h1 className="mt-6 font-display text-[2.35rem] leading-[1.02] font-bold tracking-tight text-balance sm:text-6xl md:text-7xl">
          {title.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <span data-hero-word className={`inline-block ${i >= 4 ? "text-gradient" : ""}`}>
                {w}&nbsp;
              </span>
            </span>
          ))}
        </h1>
        <p data-hero-fade className="mx-auto mt-5 max-w-2xl text-base text-white/65 md:text-lg">
          Gestion locative, syndic, promotion immobilière, Mobile Money et CRM réunis dans une plateforme pensée pour les
          professionnels de l&apos;immobilier à Abidjan.
        </p>
      </div>

      {/* Scène Coverflow 3D */}
      <div
        data-hero-stage
        className="relative mx-auto mt-12 h-[680px] w-full [perspective:1800px] sm:h-[600px] md:mt-14 md:h-[540px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="region"
        aria-roledescription="carrousel"
        aria-label="Fonctionnalités ImmoTopia"
      >
        <motion.div
          className="absolute inset-0 cursor-grab touch-pan-y [transform-style:preserve-3d] active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragStart={() => (dragging.current = true)}
          onDragEnd={onDragEnd}
        >
          {heroCards.map((card, i) => {
            const d = offsetOf(i, active);
            const abs = Math.abs(d);
            return (
              <motion.div
                key={card.id}
                className="absolute top-0 left-1/2 h-full w-[88vw] max-w-[1080px] will-change-transform md:w-[76vw]"
                initial={false}
                animate={{
                  x: `${-50 + d * 64}%`,
                  scale: 1 - abs * 0.14,
                  rotateY: d * -9,
                  opacity: abs >= 3 ? 0 : 1,
                  zIndex: 10 - abs,
                }}
                transition={{ type: "spring", stiffness: 170, damping: 26, mass: 0.9 }}
                style={{ pointerEvents: abs >= 3 ? "none" : "auto" }}
                onClick={() => {
                  if (!dragging.current && d !== 0) setActive(i);
                }}
                aria-hidden={d !== 0}
              >
                <Card card={card} active={d === 0} />
                {/* Calque d'assombrissement des cartes latérales */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-[28px] bg-ink-950"
                  initial={false}
                  animate={{ opacity: abs === 0 ? 0 : abs === 1 ? 0.55 : 0.78 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Contrôles */}
      <div data-hero-fade className="mx-auto mt-8 flex max-w-5xl flex-col items-center gap-5 px-5">
        <div className="flex items-center gap-3">
          <NavButton label="Carte précédente" onClick={() => go(-1)}>
            <ChevronLeft className="size-5" />
          </NavButton>
          <div className="flex items-center gap-1.5">
            {heroCards.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                aria-label={c.eyebrow}
                aria-current={i === active}
                className="group relative h-2 cursor-pointer overflow-hidden rounded-full bg-white/15 transition-all duration-500"
                style={{ width: i === active ? 56 : 8 }}
              >
                {i === active && (
                  <motion.span
                    key={`${active}-${paused}`}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: c.accent }}
                    initial={{ width: paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <NavButton label="Carte suivante" onClick={() => go(1)}>
            <ChevronRight className="size-5" />
          </NavButton>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase"
          >
            {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")} · {heroCards[active].eyebrow}
          </motion.p>
        </AnimatePresence>
        <MagneticButton
          onClick={open}
          className="mt-2 bg-white px-7 py-3.5 text-sm text-ink-950 shadow-[0_0_40px_-8px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-6px_rgba(255,255,255,0.7)]"
        >
          <Play className="size-4 fill-current" /> Demander une démonstration
        </MagneticButton>
      </div>
    </section>
  );
}

function NavButton({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={label}
      className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/15"
    >
      {children}
    </motion.button>
  );
}

function Card({ card, active }: { card: HeroCard; active: boolean }) {
  return (
    <article
      className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-ink-900 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] md:flex-row"
      style={{ boxShadow: active ? `0 40px 140px -40px ${card.accent}66, 0 0 0 1px rgba(255,255,255,0.08)` : undefined }}
    >
      {/* Volet gauche : photo + texte */}
      <div className="relative min-h-0 flex-[1.15] overflow-hidden md:flex-[0.46]">
        {card.image ? (
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            sizes="(max-width: 768px) 88vw, 40vw"
            className={`object-cover ${card.imageClass ?? "object-[center_22%]"} transition-transform duration-[1.6s] ease-out ${active ? "scale-100" : "scale-110"}`}
            draggable={false}
            priority={card.id === "payments"}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at 30% 20%, ${card.accent}55, transparent 60%), linear-gradient(160deg, #1b2238, #05070f)` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: card.accent }}>
            {card.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-2xl leading-tight font-bold text-balance md:text-[2.1rem]">{card.title}</h2>
          <p className="mt-3 line-clamp-2 text-sm text-white/70 sm:line-clamp-3 md:line-clamp-none md:text-[15px]">{card.description}</p>
          <button
            tabIndex={active ? 0 : -1}
            onClick={(e) => {
              if (!active) return;
              e.stopPropagation();
              goTo(card.href);
            }}
            className="shine group mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
          >
            {card.cta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Volet droit : interface de l'application */}
      <div className="relative h-[300px] shrink-0 overflow-hidden bg-[linear-gradient(160deg,#111729,#05070f)] p-4 sm:h-[280px] md:h-auto md:flex-[0.54] md:p-8">
        <div
          aria-hidden
          className="absolute -right-20 -bottom-20 size-72 rounded-full opacity-30 blur-3xl"
          style={{ background: card.accent }}
        />
        <div className="relative flex h-full items-center justify-center">
          <Mockup kind={card.id} active={active} />
        </div>
      </div>
    </article>
  );
}
