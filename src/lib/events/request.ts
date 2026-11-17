// Aides pour les routes API publiques des événements.

/** Protection CSRF : un navigateur envoie toujours Origin sur un POST ; elle doit correspondre à l'hôte du site. */
export function sameOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  if (!origin) return false;
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

export const jsonNoStore = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** Lit un corps JSON borné (octets) ; null si invalide ou trop gros. */
export async function readJson(request: Request, maxBytes = 8000): Promise<unknown | null> {
  const text = await request.text().catch(() => "");
  if (!text || text.length > maxBytes) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
