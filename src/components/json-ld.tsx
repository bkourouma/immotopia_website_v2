import { localizeHref, type Locale } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { getActivePacks } from "@/lib/pricing";
import { contact, legal, SITE_URL } from "@/lib/site";

// Données structurées schema.org : aident Google à comprendre qui édite le site et ce qui est vendu.

/** Adresse absolue dans la langue voulue (accueil français = racine du site) */
function absolute(locale: Locale, path: string) {
  const href = localizeHref(locale, path);
  return href === "/" ? SITE_URL : `${SITE_URL}${href}`;
}

/** Bloc JSON-LD quelconque (fil d'Ariane, FAQ…), avec le même échappement. */
export function JsonLd({ data }: { data: object }) {
  return <Script data={data} />;
}

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // « < » échappé pour éviter toute injection de balise
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export async function OrganizationJsonLd() {
  const { locale } = await getI18n();
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "ImmoTopia",
            url: SITE_URL,
            logo: `${SITE_URL}/apple-icon.png`,
            parentOrganization: {
              "@type": "Organization",
              name: legal.publisher,
              url: legal.publisherSite,
              identifier: [
                { "@type": "PropertyValue", propertyID: "RCCM", value: legal.rccm },
                { "@type": "PropertyValue", propertyID: "Compte contribuable", value: legal.taxId },
              ],
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: contact.phone.replace(/\s/g, ""),
              email: contact.email,
              contactType: "sales",
              areaServed: "CI",
              availableLanguage: ["French", "English"],
            },
            address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: absolute(locale, "/"),
            name: "ImmoTopia",
            inLanguage: ["fr-CI", "en"],
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      }}
    />
  );
}

export async function SoftwareJsonLd() {
  const { locale, t } = await getI18n();
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "ImmoTopia",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: absolute(locale, "/"),
        inLanguage: ["fr-CI", "en"],
        description: t(
          "ERP immobilier pour la Côte d'Ivoire : gestion locative, syndic de copropriété, CRM, portails propriétaire et locataire, maintenance et rappels e-mail / WhatsApp.",
          "Real estate ERP for Côte d'Ivoire: property management, condominium management, CRM, owner and tenant portals, maintenance, and email / WhatsApp reminders.",
        ),
        publisher: { "@id": `${SITE_URL}/#organization` },
        offers: getActivePacks(locale).map((p) => ({
          "@type": "Offer",
          name: t(`Pack ${p.name}`, `${p.name} pack`),
          description: t(
            `${p.audience}. Inclus : ${p.included}. Premier mois offert, sans engagement.`,
            `${p.audience}. Included: ${p.included}. First month free, no commitment.`,
          ),
          price: p.monthly,
          priceCurrency: "XOF",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: p.monthly,
            priceCurrency: "XOF",
            unitCode: "MON",
            valueAddedTaxIncluded: false,
          },
          url: absolute(locale, "/tarifs"),
        })),
      }}
    />
  );
}
