"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, CalendarCheck, RotateCcw, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { useI18n } from "../locale-provider";
import { useDemo } from "../providers";
import { WhatsAppIcon } from "../whatsapp-button";
import { RichText } from "./rich-text";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "immotopia-chat-v1";
const MAX_CHARS = 1500;
const WELCOME: Record<Locale, string> = {
  fr: "Bonjour, je suis **immotopIA**, l'assistant d'ImmoTopia. Je peux vous renseigner sur les fonctionnalités, les tarifs, la mise en route ou sur Alliance Consultants. Que souhaitez-vous savoir ?",
  en: "Hello, I'm **immotopIA**, ImmoTopia's assistant. I can tell you about features, pricing, onboarding or Alliance Consultants. What would you like to know?",
};
const SUGGESTIONS: Record<Locale, string[]> = {
  fr: [
    "Combien coûte le pack Agence ?",
    "Gérez-vous les syndics de copropriété ?",
    "Comment fonctionnent les paiements Mobile Money ?",
    "Qui est Alliance Consultants ?",
  ],
  en: [
    "How much is the Agency plan?",
    "Do you handle condominium management?",
    "How do Mobile Money payments work?",
    "Who are Alliance Consultants?",
  ],
};

/** Sépare le texte affiché du marqueur d'action éventuel placé en dernière ligne par l'assistant */
function splitAction(text: string): { body: string; action: "demo" | "whatsapp" | null } {
  const match = text.match(/\[\[(DEMO|WHATSAPP)\]\]\s*$/);
  const body = text.replace(/\[\[(DEMO|WHATSAPP)\]\]/g, "").trimEnd();
  return { body, action: match ? (match[1] === "DEMO" ? "demo" : "whatsapp") : null };
}

function loadHistory(): Msg[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Msg[]) : [];
    return Array.isArray(parsed) ? parsed.slice(-30) : [];
  } catch {
    return [];
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { open: openDemo, isOpen: demoOpen } = useDemo();
  const { locale, t } = useI18n();

  // Reprise de la conversation dans l'onglet (navigation entre les pages)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(loadHistory());
      setHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      /* stockage indisponible : la conversation reste en mémoire */
    }
  }, [messages, hydrated]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_CHARS);
    if (!content || streaming) return;
    const history: Msg[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          messages: history.map(({ role, content }) => ({ role, content: splitAction(content).body || content })),
        }),
        signal: controller.signal,
      });
      if (!res.body) throw new Error("réponse vide");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const snapshot = acc;
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: snapshot }]);
      }
      if (!acc.trim()) {
        setMessages((m) => [
          ...m.slice(0, -1),
          { role: "assistant", content: t("Je n'ai pas pu répondre cette fois-ci. Pouvez-vous reformuler ?", "I couldn't answer this time. Could you rephrase?") },
        ]);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages((m) => [
          ...m.slice(0, -1),
          {
            role: "assistant",
            content: t(
              "La connexion a été interrompue. Réessayez, ou écrivez-nous sur WhatsApp.\n[[WHATSAPP]]",
              "The connection was interrupted. Please try again, or message us on WhatsApp.\n[[WHATSAPP]]",
            ),
          },
        ]);
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function reset() {
    abortRef.current?.abort();
    setMessages([]);
    setStreaming(false);
  }

  const lastIsEmptyAssistant = streaming && messages.at(-1)?.role === "assistant" && !messages.at(-1)?.content;

  return (
    <>
      {/* Bouton d'ouverture */}
      <AnimatePresence>
        {!open && !demoOpen && (
          <motion.button
            key="launcher"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label={t("Ouvrir l'assistant immotopIA", "Open the immotopIA assistant")}
            className="fixed right-4 bottom-4 z-40 flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-sun-500 py-3 pr-5 pl-3.5 text-white shadow-[0_14px_40px_-10px_rgba(91,91,247,0.9)] md:right-6 md:bottom-6"
          >
            <span className="grid size-8 place-items-center rounded-full bg-white/20">
              <Sparkles className="size-4.5" />
            </span>
            <span className="text-sm font-semibold">{t("Une question ?", "Got a question?")}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fenêtre de discussion */}
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-label={t("Assistant immotopIA", "immotopIA assistant")}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-ink-950 text-white sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(640px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-[28px] sm:border sm:border-white/10 sm:shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]"
          >
            <header className="relative flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(120% 140% at 0% 0%, rgba(91,91,247,0.35), transparent 60%)" }} />
              <span className="relative grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-sun-500">
                <Sparkles className="size-5" />
                <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-ink-950 bg-mint-400" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-bold">immotopIA</p>
                <p className="truncate text-xs text-white/55">{t("Assistant ImmoTopia · répond en quelques secondes", "ImmoTopia assistant · replies in seconds")}</p>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={reset}
                  aria-label={t("Nouvelle conversation", "New conversation")}
                  title={t("Nouvelle conversation", "New conversation")}
                  className="grid size-9 cursor-pointer place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white">
                  <RotateCcw className="size-4" />
                </button>
              )}
              <button onClick={() => setOpen(false)} aria-label={t("Fermer l'assistant", "Close the assistant")} className="grid size-9 cursor-pointer place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                <X className="size-4.5" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              <Bubble role="assistant" content={WELCOME[locale]} />
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS[locale].map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="cursor-pointer rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-left text-[13px] text-white/80 transition hover:border-brand-400 hover:bg-brand-500/20 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) =>
                m.role === "assistant" && !m.content ? null : (
                  <Bubble
                    key={i}
                    role={m.role}
                    content={m.content}
                    onDemo={() => {
                      setOpen(false);
                      openDemo();
                    }}
                    showAction={!(streaming && i === messages.length - 1)}
                  />
                ),
              )}
              {lastIsEmptyAssistant && <Typing />}
            </div>

            <form onSubmit={onSubmit} className="border-t border-white/10 p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.05] p-1.5 pl-3.5 focus-within:border-brand-400">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder={t("Posez votre question…", "Ask your question…")}
                  aria-label={t("Votre question", "Your question")}
                  className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent py-2 text-[15px] text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
                  aria-label={t("Envoyer", "Send")}
                  className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-xl bg-brand-500 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowUp className="size-4.5" />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-white/50">
                {t(
                  "Réponses générées par IA, à vérifier. Ne partagez pas d'informations sensibles.",
                  "AI-generated answers, please double-check. Don't share sensitive information.",
                )}
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, content, onDemo, showAction = true }: { role: Msg["role"]; content: string; onDemo?: () => void; showAction?: boolean }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-500 px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    );
  }
  return <AssistantBubble content={content} onDemo={onDemo} showAction={showAction} />;
}

function AssistantBubble({ content, onDemo, showAction }: { content: string; onDemo?: () => void; showAction: boolean }) {
  const { locale, t } = useI18n();
  const { body, action } = splitAction(content);
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="max-w-[92%]">
      <div className="rounded-2xl rounded-bl-md bg-white/[0.07] px-3.5 py-2.5 text-[14px] leading-relaxed text-white/90 ring-1 ring-white/[0.06]">
        <RichText text={body} />
      </div>
      {showAction && action === "demo" && onDemo && (
        <button onClick={onDemo} className="shine mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-950">
          <CalendarCheck className="size-4" /> {t("Réserver une démonstration", "Book a demo")}
        </button>
      )}
      {showAction && action === "whatsapp" && (
        <a href={whatsappLink(locale)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white">
          <WhatsAppIcon className="size-4" /> {t("Écrire sur WhatsApp", "Message us on WhatsApp")}
        </a>
      )}
    </motion.div>
  );
}

function Typing() {
  const { t } = useI18n();
  return (
    <div className="flex w-fit gap-1.5 rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-3.5" aria-label={t("immotopIA écrit", "immotopIA is typing")}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-white/60"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}
