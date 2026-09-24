import { ShieldCheck } from "lucide-react";
import { partners, type Partner } from "@/lib/content";
import { getI18n } from "@/lib/i18n-server";

function Item({ p }: { p: Partner }) {
  return (
    <li className="flex shrink-0 items-center gap-3 px-8">
      {p.badge ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-2 text-sm font-semibold text-ink-800 shadow-sm">
          <ShieldCheck className="size-4" style={{ color: p.color }} />
          {p.name}
        </span>
      ) : (
        <span className="inline-flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight text-ink-800/80 transition-colors hover:text-ink-900">
          <span className="size-3 rounded-full" style={{ background: p.color, boxShadow: `0 0 18px ${p.color}` }} />
          {p.name}
        </span>
      )}
    </li>
  );
}

/** Bandeau de réassurance défilant à l'infini (animation CSS pure, 60 FPS sur GPU) */
export async function Marquee() {
  const { locale, t } = await getI18n();
  const list = partners[locale];
  return (
    <section aria-label={t("Partenaires et conformité", "Partners and compliance")} className="border-y border-ink-900/5 bg-white py-10">
      <p className="mb-6 text-center text-xs font-semibold tracking-[0.18em] text-ink-900/60 uppercase">
        {t("Paiements, messagerie et conformité intégrés nativement", "Payments, messaging and compliance built in")}
      </p>
      <div className="mask-fade-x group flex overflow-hidden">
        <ul className="flex w-max animate-marquee items-center will-change-transform group-hover:[animation-play-state:paused]">
          {/* 4 copies : la translation de -50 % retombe exactement sur une copie identique */}
          {[...list, ...list, ...list, ...list].map((p, i) => (
            <Item key={i} p={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}
