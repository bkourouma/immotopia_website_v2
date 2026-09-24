import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { BookingEmbed } from "@/components/booking-embed";
import { FinalCta } from "@/components/final-cta";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/page-hero";
import { WhatsAppIcon } from "@/components/whatsapp-button";
import { alternates, hasLocale, translator } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { contact, whatsappLink } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = translator(lang);
  return {
    title: t("Contact et démonstration | ImmoTopia", "Contact and demo | ImmoTopia"),
    description: t(
      "Réservez une démonstration d'ImmoTopia ou contactez-nous par téléphone, WhatsApp ou e-mail. Équipe basée à Abidjan, Côte d'Ivoire.",
      "Book an ImmoTopia demo or contact us by phone, WhatsApp or e-mail. Team based in Abidjan, Côte d'Ivoire.",
    ),
    alternates: alternates(lang, "/contact"),
  };
}

export default async function ContactPage() {
  const { locale, t } = await getI18n();
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <PageHero eyebrow="Contact" title={t("Parlons de votre agence.", "Let's talk about your agency.")}>
          {t(
            "Réservez directement un créneau de démonstration, ou écrivez-nous : nous répondons rapidement.",
            "Book a demo slot directly, or write to us: we reply quickly.",
          )}
        </PageHero>
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-3">
            <Channel
              href={whatsappLink(locale)}
              external
              icon={<WhatsAppIcon className="size-6" />}
              color="#25D366"
              title="WhatsApp"
              text={t("Le plus rapide pour une question", "The fastest way to ask a question")}
            />
            <Channel href={contact.phoneHref} icon={<Phone className="size-6" />} color="#5B5BF7" title={contact.phone} text={t("Appelez-nous du lundi au vendredi", "Call us Monday to Friday")} />
            <Channel href={`mailto:${contact.email}`} icon={<Mail className="size-6" />} color="#FF8A3D" title={contact.email} text={t("Réponse sous 24 h ouvrées", "Reply within 24 business hours")} />
            <Channel icon={<MapPin className="size-6" />} color="#2EE6A8" title={contact.city} text={t("Démonstrations en visio ou dans vos locaux", "Demos by video call or at your office")} />
          </div>
          <div className="overflow-hidden rounded-[28px] bg-ink-900 shadow-[0_30px_80px_-30px_rgba(20,23,41,0.5)]">
            <div className="border-b border-white/10 p-6 text-white">
              <p className="text-xs font-bold tracking-[0.16em] text-mint-400 uppercase">{t("Démonstration personnalisée · 30 min", "Personalized demo · 30 min")}</p>
              <h2 className="mt-1 font-display text-2xl font-bold">{t("Choisissez votre créneau", "Pick your slot")}</h2>
            </div>
            <BookingEmbed />
          </div>
        </section>
      </main>
      <FinalCta />
    </>
  );
}

function Channel({
  href,
  external,
  icon,
  color,
  title,
  text,
}: {
  href?: string;
  external?: boolean;
  icon: ReactNode;
  color: string;
  title: string;
  text: string;
}) {
  const body = (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl" style={{ background: `${color}1f`, color }}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-semibold break-all text-ink-900">{title}</span>
        <span className="block text-sm text-ink-900/55">{text}</span>
      </span>
    </>
  );
  const cls = "flex items-center gap-4 rounded-[22px] border border-ink-900/[0.07] bg-white p-5 transition";
  return href ? (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${cls} hover:-translate-y-0.5 hover:shadow-lg`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
