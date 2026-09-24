"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTools } from "@/lib/tools";
import { useI18n } from "@/components/locale-provider";
import { trackSpotlight } from "../ui";
import { ToolIcon } from "./tool-ui";

/** Grille bento des outils gratuits (page /outils et section d'accueil) */
export function ToolsGrid({ dark = false }: { dark?: boolean }) {
  const { locale, href } = useI18n();
  return (
    <div className="grid gap-4 md:grid-cols-6">
      {getTools(locale).map((t, i) => (
        <motion.div
          key={t.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            delay: (i % 3) * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          // 2 grandes cartes en tête, puis des cartes d'un tiers
          className={i < 2 ? "md:col-span-3" : i === 6 ? "md:col-span-6 lg:col-span-2" : "md:col-span-3 lg:col-span-2"}
        >
          <Link
            href={href(`/outils/${t.slug}`)}
            onMouseMove={trackSpotlight}
            style={{ ["--spot" as string]: `${t.accent}33` }}
            className={`spotlight group flex h-full flex-col rounded-[24px] border p-6 transition duration-500 hover:-translate-y-1 ${
              dark ? "border-white/10 bg-white/[0.04] text-white hover:border-white/25" : "border-ink-900/[0.07] bg-white hover:shadow-xl"
            }`}
          >
            <div className="relative flex items-start justify-between">
              <span
                className="grid size-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                style={{ background: `${t.accent}22`, color: t.accent }}
              >
                <ToolIcon name={t.icon} className="size-6" />
              </span>
              <span
                className={`grid size-9 place-items-center rounded-full transition group-hover:rotate-45 ${
                  dark
                    ? "bg-white/10 group-hover:bg-white group-hover:text-ink-950"
                    : "bg-ink-900/5 group-hover:bg-ink-900 group-hover:text-white"
                }`}
              >
                <ArrowUpRight className="size-4" />
              </span>
            </div>
            <p className="relative mt-6 text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: t.accent }}>
              {t.category}
            </p>
            <h3 className="relative mt-1.5 font-display text-xl leading-snug font-bold">{t.title}</h3>
            <p className={`relative mt-2 text-sm ${dark ? "text-white/55" : "text-ink-900/55"}`}>{t.short}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
