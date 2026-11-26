"use client";

import { useEffect, useState } from "react";

type Places = { remaining: number; capacity: number } | null;

const pad = (n: number) => String(n).padStart(2, "0");

/** Compte à rebours jusqu'au début de l'événement et places réellement restantes (lues côté serveur). */
export function EventLive({ startsAt }: { startsAt: string }) {
  const [now, setNow] = useState<number | null>(null);
  const [places, setPlaces] = useState<Places>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let alive = true;
    fetch("/api/events/places", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { remaining?: number | null; capacity?: number } | null) => {
        if (alive && d && typeof d.remaining === "number" && typeof d.capacity === "number") setPlaces({ remaining: d.remaining, capacity: d.capacity });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const left = now === null ? null : new Date(startsAt).getTime() - now;
  const started = left !== null && left <= 0;
  const parts = left === null || started
    ? null
    : [
        { label: "jours", value: Math.floor(left / 86_400_000) },
        { label: "heures", value: Math.floor(left / 3_600_000) % 24 },
        { label: "minutes", value: Math.floor(left / 60_000) % 60 },
        { label: "secondes", value: Math.floor(left / 1000) % 60 },
      ];

  return (
    <div className="mt-6 flex flex-wrap items-stretch gap-3">
      {parts && (
        <div role="timer" aria-label="Temps restant avant l'événement" className="flex gap-2">
          {parts.map((p) => (
            <div key={p.label} className="min-w-16 rounded-xl bg-white/10 px-3 py-2 text-center ring-1 ring-white/15">
              <p className="font-display text-2xl font-bold tabular-nums leading-none sm:text-3xl">{pad(p.value)}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-white/65">{p.label}</p>
            </div>
          ))}
        </div>
      )}
      {places && (
        <div className="flex min-w-28 flex-col justify-center rounded-xl bg-sun-500 px-4 py-2 text-center text-ink-950 shadow-lg shadow-sun-500/30">
          {places.remaining > 0 ? (
            <>
              <p className="font-display text-2xl font-bold tabular-nums leading-none sm:text-3xl">{places.remaining}<span className="text-base font-semibold">/{places.capacity}</span></p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wide">places restantes</p>
            </>
          ) : (
            <p className="text-sm font-bold uppercase tracking-wide">Complet<br />liste d&apos;attente</p>
          )}
        </div>
      )}
    </div>
  );
}
