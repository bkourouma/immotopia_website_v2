// Limiteur de débit en mémoire (fenêtre glissante). Suffisant pour un seul conteneur ; à remplacer par un magasin partagé
// (Redis…) si le site passe à plusieurs instances.

const hits = new Map<string, number[]>();

/** Renvoie true si l'appel est autorisé, false s'il dépasse `limit` appels sur `windowMs`. */
export function allow(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  return true;
}

export function resetRateLimits() {
  hits.clear();
}

/** Adresse du client derrière nginx (X-Forwarded-For) ; « inconnue » si absente. */
export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "inconnue";
}
