"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BellRing, Globe, KeyRound, MessageSquareText, Smartphone, Webhook } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { comparatifHref } from "@/lib/comparatif-domains";
import { SmartLink } from "./smart-link";
import { Eyebrow, Logo, trackSpotlight } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Nœuds du circuit, en coordonnées du viewBox 600 × 340
const inputs = [
  { label: "Locataires", color: "#2EE6A8", x: 70, y: 60 },
  { label: "Propriétaires", color: "#8B8BFF", x: 70, y: 170 },
  { label: "Prestataires", color: "#FACC15", x: 70, y: 280 },
];
const outputs = [
  { label: "WhatsApp", color: "#25D366", x: 530, y: 60 },
  { label: "E-mail", color: "#FF8A3D", x: 530, y: 170 },
  { label: "Site vitrine", color: "#38BDF8", x: 530, y: 280 },
];
const C = { x: 300, y: 170 };

// Tracés « circuit imprimé » à angles droits
const inPaths = inputs.map((n, i) => `M${n.x + 52},${n.y} H${190 + i * 8} V${C.y - 16 + i * 16} H${C.x - 62}`);
const outPaths = outputs.map((n, i) => `M${C.x + 62},${C.y - 16 + i * 16} H${410 - i * 8} V${n.y} H${n.x - 52}`);

export function Ecosystem() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Impulsions lumineuses qui parcourent les pistes
      gsap.utils.toArray<SVGPathElement>("[data-pulse]").forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: `36 ${len}`, strokeDashoffset: 36 });
        gsap.to(p, {
          strokeDashoffset: -len,
          duration: 2.2,
          ease: "none",
          repeat: -1,
          delay: i * 0.37,
          repeatDelay: 0.6,
        });
      });

      // Tracé progressif des pistes à l'entrée dans l'écran
      gsap.utils.toArray<SVGPathElement>("[data-track]").forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: "[data-circuit]", start: "top 80%", once: true },
          },
        );
      });

      // Apparition en cascade des cartes du bento
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.batch("[data-bento]", {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { y: 50, opacity: 0, scale: 0.97 },
              { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: "expo.out" },
            ),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="ecosysteme" className="relative overflow-hidden bg-ink-950 py-24 text-white md:py-32">
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_65%)]" />
      <div aria-hidden className="absolute -top-60 left-1/2 h-[800px] w-[1300px] -translate-x-1/2" style={{ background: "radial-gradient(closest-side, rgba(91,91,247,0.22), transparent)" }} />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow dark>Écosystème connecté</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl">
            Vos outils parlent enfin <span className="text-gradient">le même langage.</span>
          </h2>
          <p className="mt-5 text-lg text-white/60">
            Portails, e-mail, WhatsApp et API d&apos;annonces : chaque échange passe par la même plateforme, sans ressaisie.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm font-semibold">
            {(
              [
                ["communication", "Comparer la communication"],
                ["portails-service", "Comparer les portails"],
                ["integrations", "Comparer les intégrations"],
              ] as const
            ).map(([d, label]) => (
              <SmartLink
                key={d}
                href={comparatifHref(d)}
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-white/80 transition hover:border-white/30 hover:text-white"
              >
                {label} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </SmartLink>
            ))}
          </div>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-6">
          {/* Grande carte : le circuit */}
          <Bento className="md:col-span-6 lg:col-span-4 lg:row-span-2" spot="rgba(91,91,247,0.25)">
            <CardHead icon={<Webhook className="size-5" />} title="Toutes les parties connectées" text="Locataires, propriétaires et prestataires échangent avec l'agence via leurs portails ; chacun est prévenu par e-mail ou WhatsApp." />
            <div data-circuit className="relative mt-6 aspect-[600/340] w-full">
              <svg viewBox="0 0 600 340" className="absolute inset-0 size-full" fill="none" aria-hidden>
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {[...inPaths, ...outPaths].map((d, i) => (
                  <path key={`t${i}`} data-track d={d} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                ))}
                {inPaths.map((d, i) => (
                  <path key={`pi${i}`} data-pulse d={d} stroke={inputs[i].color} strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)" />
                ))}
                {outPaths.map((d, i) => (
                  <path key={`po${i}`} data-pulse d={d} stroke={outputs[i].color} strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)" />
                ))}
              </svg>
              {[...inputs, ...outputs].map((n) => (
                <Node key={n.label} x={n.x} y={n.y} color={n.color}>
                  {n.label}
                </Node>
              ))}
              <div
                className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/20 bg-ink-900/90 px-3 py-3 shadow-[0_0_60px_-10px_rgba(91,91,247,0.9)] backdrop-blur-md sm:px-5 sm:py-4"
                style={{ left: `${(C.x / 600) * 100}%`, top: `${(C.y / 340) * 100}%` }}
              >
                <Logo className="scale-75 text-white sm:scale-100" />
                <span className="absolute inset-0 -z-10 animate-ping rounded-2xl bg-brand-500/20 [animation-duration:2.5s]" />
              </div>
            </div>
          </Bento>

          <Bento className="md:col-span-3 lg:col-span-2" spot="rgba(46,230,168,0.2)">
            <CardHead icon={<KeyRound className="size-5" />} title="API d'annonces" text="Alimentez le site vitrine de votre agence avec vos biens publiés." />
            <pre className="mt-5 overflow-hidden rounded-xl bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-white/70 ring-1 ring-white/10">
              <span className="text-mint-400">GET</span> /annonces{"\n"}
              {"{"}{"\n"}
              {"  "}<span className="text-brand-300">&quot;titre&quot;</span>: <span className="text-sun-400">&quot;Villa 5 pièces, Cocody&quot;</span>,{"\n"}
              {"  "}<span className="text-brand-300">&quot;mode&quot;</span>: <span className="text-sun-400">&quot;location&quot;</span>,{"\n"}
              {"  "}<span className="text-brand-300">&quot;loyer&quot;</span>: 450000{"\n"}
              {"}"}
            </pre>
          </Bento>

          <Bento className="md:col-span-3 lg:col-span-2" spot="rgba(37,211,102,0.2)">
            <CardHead icon={<MessageSquareText className="size-5" />} title="Rappels e-mail & WhatsApp" text="Rappels d'échéance planifiés, confirmations de paiement et alertes de fin de bail." />
            <div className="mt-5 flex items-center justify-between">
              {["J-5", "J-1", "J0", "Retard"].map((j, i) => (
                <div key={j} className="flex flex-1 items-center">
                  <span className={`grid size-10 place-items-center rounded-full text-xs font-bold ${i < 2 ? "bg-[#25D366] text-ink-950" : "bg-white/10 text-white/70"}`}>
                    {j}
                  </span>
                  {i < 3 && <span className="h-px flex-1 bg-gradient-to-r from-white/30 to-white/5" />}
                </div>
              ))}
            </div>
          </Bento>

          <Bento className="md:col-span-2" spot="rgba(255,138,61,0.2)">
            <CardHead icon={<Globe className="size-5" />} title="Newsletter" text="Listes de diffusion, campagnes programmées, double confirmation et désinscription en un clic." />
            <div className="mt-5 flex flex-wrap gap-2">
              {["Listes", "Modèles", "Campagnes", "Statistiques"].map((t, i) => (
                <span key={t} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${i === 3 ? "bg-sun-500 text-ink-950" : "bg-white/10 text-white/80"}`}>
                  {t}
                </span>
              ))}
            </div>
          </Bento>

          <Bento className="md:col-span-2" spot="rgba(29,200,255,0.2)">
            <CardHead icon={<Smartphone className="size-5" />} title="Mobile Money suivi" text="Paiements enregistrés par opérateur (Wave, Orange Money, MTN, Moov), déclarations des locataires validées par l'agence." />
            <div className="mt-5 flex -space-x-2">
              {["#1DC8FF", "#FF7900", "#FFCB05", "#0066B3"].map((c) => (
                <span key={c} className="size-9 rounded-full border-2 border-ink-900" style={{ background: c }} />
              ))}
            </div>
          </Bento>

          <Bento className="md:col-span-2" spot="rgba(167,139,250,0.22)">
            <CardHead icon={<BellRing className="size-5" />} title="Rôles & journal d'audit" text="Permissions fines par rôle et trace des actions sensibles : qui, quoi, quand." />
            <div className="mt-5 flex gap-2 text-xs">
              {["Admin", "Manager", "Agent", "Comptable"].map((s) => (
                <span key={s} className="flex-1 rounded-lg bg-white/[0.06] py-2 text-center font-semibold text-white/80 ring-1 ring-white/10">
                  ✓ {s}
                </span>
              ))}
            </div>
          </Bento>
        </div>
      </div>
    </section>
  );
}

function Bento({ children, className = "", spot }: { children: ReactNode; className?: string; spot: string }) {
  return (
    <div
      data-bento
      onMouseMove={trackSpotlight}
      style={{ ["--spot" as string]: spot }}
      className={`spotlight group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20 ${className}`}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

function CardHead({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div>
      <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </span>
      <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
      <p className="mt-1.5 text-sm text-white/55">{text}</p>
    </div>
  );
}

function Node({ x, y, color, children }: { x: number; y: number; color: string; children: ReactNode }) {
  return (
    <span
      className="absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-ink-800/90 px-2 py-1 text-[9px] font-semibold whitespace-nowrap text-white shadow-lg sm:px-3 sm:py-1.5 sm:text-xs"
      style={{ left: `${(x / 600) * 100}%`, top: `${(y / 340) * 100}%` }}
    >
      <span className="size-2 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
      {children}
    </span>
  );
}
