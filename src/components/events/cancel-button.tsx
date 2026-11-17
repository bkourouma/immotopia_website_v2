"use client";

import { useState } from "react";

export function CancelButton({ reference, token }: { reference: string; token: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function cancel() {
    setState("loading");
    try {
      const res = await fetch("/api/events/cancel", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref: reference, token }) });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }
  if (state === "done") return <p role="status" className="font-semibold text-emerald-700">Votre inscription est annulée. Un e-mail de confirmation vous est envoyé.</p>;
  return (
    <div>
      <button onClick={cancel} disabled={state === "loading"} className="min-h-12 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-500 disabled:opacity-60">
        {state === "loading" ? "Annulation…" : "Confirmer l'annulation"}
      </button>
      {state === "error" && <p role="alert" className="mt-3 text-sm text-red-700">Lien invalide ou expiré. Répondez à l&apos;e-mail de confirmation pour être aidé.</p>}
    </div>
  );
}
