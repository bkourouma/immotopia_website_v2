"use client";

import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { navLinks } from "@/lib/content";
import { contact, legal, whatsappLink } from "@/lib/site";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "./locale-provider";
import { useDemo } from "./providers";
import { SmartLink } from "./smart-link";
import { Logo, MagneticButton, Reveal } from "./ui";

export function FinalCta() {
  const { open } = useDemo();
  const { locale, t } = useI18n();
  return (
    <section className="bg-paper px-3 pb-3">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[36px] bg-ink-950 px-6 py-20 text-center text-white md:py-28">
          <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_70%)]" />
          <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 h-[720px] w-[1200px] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(closest-side, rgba(91,91,247,0.45), rgba(255,138,61,0.22) 55%, transparent)" }} />
          <h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl">
            {t(
              <>
                Prêt à faire entrer votre agence <span className="text-gradient">dans une autre ère ?</span>
              </>,
              <>
                Ready to take your agency <span className="text-gradient">into a new era?</span>
              </>,
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
            {t(
              "30 minutes pour voir ImmoTopia appliqué à votre portefeuille. Sans engagement.",
              "30 minutes to see ImmoTopia applied to your own portfolio. No commitment.",
            )}
          </p>
          <MagneticButton
            onClick={open}
            className="mt-9 bg-white px-8 py-4 text-base text-ink-950 shadow-[0_0_50px_-8px_rgba(255,255,255,0.6)]"
          >
            {t("Demander une démonstration", "Request a demo")} <ArrowRight className="size-5" />
          </MagneticButton>
        </div>
      </Reveal>

      <footer className="mx-auto max-w-6xl px-5 pt-14 pb-10 text-sm text-ink-900/60">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo onLight full />
            <p className="mt-4 max-w-xs">
              {t(
                "L'ERP immobilier le plus complet de Côte d'Ivoire : gestion locative, syndic, CRM et portails clients.",
                "The most complete real estate ERP in Côte d'Ivoire: property management, condominium management, CRM and client portals.",
              )}
            </p>
          </div>
          <FooterCol title={t("Produit", "Product")}>
            {navLinks[locale].map((l) => (
              <SmartLink key={l.href} href={l.href} className="transition-colors hover:text-ink-900">
                {l.label}
              </SmartLink>
            ))}
          </FooterCol>
          <FooterCol title={t("Entreprise", "Company")}>
            <SmartLink href="/contact" className="transition-colors hover:text-ink-900">
              Contact
            </SmartLink>
            <SmartLink href="/mentions-legales" className="transition-colors hover:text-ink-900">
              {t("Mentions légales", "Legal notice")}
            </SmartLink>
            <SmartLink href="/confidentialite" className="transition-colors hover:text-ink-900">
              {t("Confidentialité", "Privacy")}
            </SmartLink>
          </FooterCol>
          <FooterCol title={t("Nous joindre", "Get in touch")}>
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-ink-900">
              <Phone className="size-4" /> {contact.phone}
            </a>
            <a href={whatsappLink(locale)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-ink-900">
              <MessageCircle className="size-4" /> WhatsApp
            </a>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 break-all transition-colors hover:text-ink-900">
              <Mail className="size-4 shrink-0" /> {contact.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" /> {contact.city}
            </span>
          </FooterCol>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink-900/[0.07] pt-6 text-xs text-ink-900/60">
          <p>
            © {new Date().getFullYear()} ImmoTopia · {t("Une solution", "A solution by")} {legal.publisher}
          </p>
          <LanguageSwitcher onLight />
        </div>
      </footer>
    </section>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-ink-900/60 uppercase">{title}</p>
      <div className="flex flex-col items-start gap-2.5">{children}</div>
    </div>
  );
}
