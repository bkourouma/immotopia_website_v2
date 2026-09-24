"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { DemoModal } from "./demo-modal";
import { ChatWidget } from "./chat/chat-widget";
import { LocaleProvider } from "./locale-provider";
import { WhatsAppButton } from "./whatsapp-button";

type DemoCtx = { open: () => void; close: () => void; isOpen: boolean };

const DemoContext = createContext<DemoCtx | null>(null);

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo doit être utilisé dans <Providers>");
  return ctx;
}

export function Providers({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <LocaleProvider locale={locale}>
    <MotionConfig reducedMotion="user">
      <DemoContext.Provider value={{ open, close, isOpen }}>
        {children}
        <DemoModal open={isOpen} onClose={close} />
        <WhatsAppButton />
        <ChatWidget />
      </DemoContext.Provider>
    </MotionConfig>
    </LocaleProvider>
  );
}
