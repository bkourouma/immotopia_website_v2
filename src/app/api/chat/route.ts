// Assistant immotopIA : relaie la conversation vers DeepSeek via OpenRouter et renvoie la réponse en flux texte.
// La clé OPENROUTER_API_KEY reste côté serveur ; le modèle est configurable par OPENROUTER_MODEL.

import { LOCALE_PROMPT, SYSTEM_PROMPT } from "@/lib/assistant/prompt";
import { translator, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const MODEL = process.env.OPENROUTER_MODEL || "deepseek/deepseek-v4.1-flash";
const MAX_TURNS = 20; // messages conservés dans l'historique envoyé
const MAX_CHARS = 1500; // longueur maximale d'un message visiteur

// Limitation simple par adresse IP (mémoire du processus) : protège le budget API contre les abus
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 25;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // garde-fou mémoire
  return recent.length > MAX_REQUESTS;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const msgs: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_TURNS)) {
    const role = (m as ChatMessage)?.role;
    const content = (m as ChatMessage)?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text) continue;
    if (role === "user" && text.length > MAX_CHARS) return null;
    msgs.push({ role, content: text.slice(0, 6000) });
  }
  if (msgs.length === 0 || msgs[msgs.length - 1].role !== "user") return null;
  return msgs;
}

const plain = (text: string, status = 200) =>
  new Response(text, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  // Le corps est lu d'abord pour connaître la langue du visiteur et lui répondre dans celle-ci
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  const locale: Locale = (body as { locale?: unknown })?.locale === "en" ? "en" : "fr";
  const t = translator(locale);
  const unavailable = t(
    "L'assistant est momentanément indisponible. Réessayez dans un instant.",
    "The assistant is temporarily unavailable. Please try again in a moment.",
  );
  const interrupted = t("\n\n(La réponse a été interrompue. Réessayez.)", "\n\n(The answer was interrupted. Please try again.)");

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return plain(
      t(
        "L'assistant n'est pas encore configuré. Écrivez-nous sur WhatsApp ou réservez une démonstration.\n[[DEMO]]",
        "The assistant isn't set up yet. Message us on WhatsApp or book a demo.\n[[DEMO]]",
      ),
      503,
    );
  }

  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";
  if (rateLimited(ip)) {
    return plain(
      t(
        "Vous avez envoyé beaucoup de messages en peu de temps. Réessayez dans quelques minutes, ou écrivez-nous sur WhatsApp.\n[[WHATSAPP]]",
        "You've sent a lot of messages in a short time. Please try again in a few minutes, or message us on WhatsApp.\n[[WHATSAPP]]",
      ),
      429,
    );
  }

  if (body === null) return plain(t("Requête invalide.", "Invalid request."), 400);
  const messages = parseMessages(body);
  if (!messages) return plain(t(`Message invalide (${MAX_CHARS} caractères maximum).`, `Invalid message (${MAX_CHARS} characters maximum).`), 400);

  const localePrompt = LOCALE_PROMPT[locale];

  let upstream: Response;
  try {
    upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": SITE_URL,
        "X-Title": "ImmoTopia - immotopIA",
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        max_tokens: 1200,
        temperature: 0.3,
        // Pas de raisonnement exposé : réponses plus rapides pour un assistant de site
        reasoning: { exclude: true },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...(localePrompt ? [{ role: "system", content: localePrompt }] : []),
          ...messages,
        ],
      }),
      signal: AbortSignal.timeout(60_000),
    });
  } catch (err) {
    console.error("[chat] OpenRouter injoignable :", err);
    return plain(unavailable, 502);
  }

  if (!upstream.ok || !upstream.body) {
    console.error("[chat] OpenRouter a répondu", upstream.status, await upstream.text().catch(() => ""));
    return plain(unavailable, 502);
  }

  // Flux SSE OpenRouter (« data: {...} ») → texte brut envoyé au navigateur au fil de l'eau
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf("\n")) >= 0) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line.startsWith("data:")) continue; // commentaires « : OPENROUTER PROCESSING »
            const data = line.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              if (json.error) {
                console.error("[chat] erreur en cours de flux :", json.error);
                controller.enqueue(encoder.encode(interrupted));
                continue;
              }
              const delta: string | undefined = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // ligne incomplète ou non JSON : ignorée
            }
          }
        }
      } catch (err) {
        console.error("[chat] flux interrompu :", err);
        controller.enqueue(encoder.encode(interrupted));
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
  });
}
