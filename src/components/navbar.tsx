"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/lib/content";
import { APP_LOGIN_URL } from "@/lib/site";
import { useDemo } from "./providers";
import { SmartLink } from "./smart-link";
import { Logo, MagneticButton } from "./ui";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { open } = useDemo();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-500 md:px-5 ${
          scrolled
            ? "border-white/10 bg-ink-950/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <SmartLink href="#top" className="text-white" aria-label="ImmoTopia — accueil">
          <Logo />
        </SmartLink>

        <ul className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
          {navLinks.map((l) => (
            <li key={l.href} className="relative">
              <SmartLink
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                className="relative z-10 block px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                {l.label}
              </SmartLink>
              {hovered === l.href && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={APP_LOGIN_URL} className="hidden rounded-full px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white lg:block">
            Connexion
          </a>
          <div className="hidden sm:block">
            <MagneticButton
              onClick={open}
              className="bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm text-white shadow-[0_8px_30px_-8px_rgba(91,91,247,0.9)]"
            >
              Demander une démo
            </MagneticButton>
          </div>
          <button
            className="grid size-10 cursor-pointer place-items-center rounded-xl text-white hover:bg-white/10 md:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menu}
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="absolute inset-x-3 top-[76px] rounded-2xl border border-white/10 bg-ink-950/90 p-3 text-white backdrop-blur-xl md:hidden"
          >
            {navLinks.map((l) => (
              <SmartLink
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-white/10"
              >
                {l.label}
              </SmartLink>
            ))}
            <a href={APP_LOGIN_URL} className="block rounded-xl px-4 py-3 text-base font-medium text-white/70 hover:bg-white/10">
              Connexion clients
            </a>
            <button
              onClick={() => {
                setMenu(false);
                open();
              }}
              className="mt-2 w-full cursor-pointer rounded-xl bg-brand-500 py-3 font-semibold"
            >
              Demander une démo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
