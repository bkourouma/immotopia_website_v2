import { packs } from "@/lib/pricing";
import { contact, legal, SITE_URL } from "@/lib/site";

// Données structurées schema.org : aident Google à comprendre qui édite le site et ce qui est vendu.

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // « < » échappé pour éviter toute injection de balise
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function OrganizationJsonLd() {
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
            parentOrganization: { "@type": "Organization", name: legal.publisher, url: legal.publisherSite },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: contact.phone.replace(/\s/g, ""),
              email: contact.email,
              contactType: "sales",
              areaServed: "CI",
              availableLanguage: "French",
            },
            address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "ImmoTopia",
            inLanguage: "fr-CI",
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      }}
    />
  );
}

export function SoftwareJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "ImmoTopia",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: SITE_URL,
        description:
          "ERP immobilier pour la Côte d'Ivoire : gestion locative, syndic de copropriété, promotion immobilière, paiements Mobile Money, CRM et comptabilité.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        offers: packs.map((p) => ({
          "@type": "Offer",
          name: `Pack ${p.name}`,
          description: `${p.audience}. Inclus : ${p.included}.`,
          price: p.monthly,
          priceCurrency: "XOF",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: p.monthly,
            priceCurrency: "XOF",
            unitCode: "MON",
            valueAddedTaxIncluded: false,
          },
          url: `${SITE_URL}/tarifs`,
        })),
      }}
    />
  );
}
