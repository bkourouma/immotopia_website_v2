"use client";

import { ArrowRight } from "lucide-react";
import { useDemo } from "./providers";

/** Bouton « Demander une démo » utilisable depuis une page serveur. */
export function DemoButton({ label = "Demander une démonstration" }: { label?: string }) {
  const { open } = useDemo();
  return (
    <button
      onClick={open}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-white/90"
    >
      {label} <ArrowRight className="size-4" />
    </button>
  );
}
