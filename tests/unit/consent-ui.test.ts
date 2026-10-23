import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";

// Vérifications sur le source (pas de moteur de rendu dans ce dépôt, aucune dépendance de test ajoutée).
const read = (rel: string) => readFileSync(new URL(`../../${rel}`, import.meta.url), "utf8");
const unescape = (s: string) => s.replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”");

describe("bandeau de consentement", () => {
  const src = read("src/components/consent/cookie-consent.tsx");

  it("propose Accepter et Refuser avec exactement le même style", () => {
    assert.match(src, /onClick=\{\(\) => choose\("refused"\)\}/);
    assert.match(src, /onClick=\{\(\) => choose\("accepted"\)\}/);
    assert.equal([...src.matchAll(/className=\{BTN\}/g)].length, 3, "Fermer, Refuser et Accepter partagent BTN");
    assert.match(src, /focus-visible:outline-2/);
  });
  it("gère Échap, « Fermer » à la réouverture et le retour du focus", () => {
    assert.match(src, /e\.key === "Escape"/);
    assert.match(src, /reopened && consent !== "unset"/);
    assert.match(src, /target\.focus\(\)/);
  });
  it("suit la langue de la page (FR et EN) et renvoie vers la politique localisée", () => {
    assert.match(src, /useI18n/);
    for (const [fr, en] of [
      ["Vos choix sur les cookies", "Your cookie choices"],
      ["Accepter", "Accept"],
      ["Refuser", "Decline"],
      ["Fermer", "Close"],
      ["Politique de confidentialité", "Privacy policy"],
    ]) {
      assert.ok(src.includes(`t("${fr}", "${en}")`), fr);
    }
    assert.match(src, /<SmartLink[\s\S]*href="\/confidentialite#cookies"/);
    assert.match(src, /consent === "loading"/);
  });
  it("est monté dans le layout localisé (dans Providers), avec la balise GA à côté d'Umami", () => {
    const layout = read("src/app/[lang]/layout.tsx");
    assert.match(layout, /<Analytics \/>/);
    assert.match(layout, /<GoogleAnalytics \/>/);
    assert.match(layout, /<CookieConsent \/>\s*<\/Providers>/);
  });
  it("laisse Umami inchangé, sans cookie ni consentement", () => {
    const umami = read("src/components/analytics.tsx");
    assert.doesNotMatch(umami, /consent|googletagmanager/i);
  });
  it("la clé de stockage est propre à ImmoTopia", () => {
    assert.match(read("src/lib/consent.ts"), /CONSENT_KEY = "im_consent"/);
  });
});

describe("pied de page", () => {
  it("contient le bouton « Gérer mes cookies » / « Manage cookies »", () => {
    assert.match(read("src/components/final-cta.tsx"), /<ManageCookiesButton/);
    const btn = read("src/components/consent/manage-cookies-button.tsx");
    assert.ok(btn.includes('t("Gérer mes cookies", "Manage cookies")'));
    assert.match(btn, /onClick=\{openConsentPanel\}/);
    assert.match(btn, /type="button"/);
  });
});

describe("politique de confidentialité", () => {
  const full = unescape(read("src/app/[lang]/confidentialite/page.tsx"));
  const fr = full.slice(full.indexOf("function ConfidentialiteFr"), full.indexOf("function PrivacyPolicyEn"));
  const en = full.slice(full.indexOf("function PrivacyPolicyEn"));

  it("FR : décrit GA4 (éditeur, consentement, cookies, 13 mois, retrait) et Umami sans cookie", () => {
    assert.match(fr, /Google Analytics 4/);
    assert.match(fr, /Google Ireland Limited/);
    assert.match(fr, /qu'avec votre consentement/);
    assert.match(fr, /<strong>_ga<\/strong> et <strong>_ga_<identifiant><\/strong>/);
    assert.match(fr, /13 mois au plus/);
    assert.match(fr, /Gérer mes cookies/);
    assert.match(fr, /Umami/);
    assert.match(fr, /sans cookie/);
    assert.match(fr, /id="cookies"/);
    assert.match(fr, /calendrier de réservation Calendly/);
  });
  it("EN : describes GA4 (publisher, consent, cookies, 13 months, withdrawal) and cookieless Umami", () => {
    assert.match(en, /Google Analytics 4/);
    assert.match(en, /Google Ireland Limited/);
    assert.match(en, /only with your consent/);
    assert.match(en, /<strong>_ga<\/strong> and <strong>_ga_<identifier><\/strong>/);
    assert.match(en, /13 months at most/);
    assert.match(en, /Manage cookies/);
    assert.match(en, /Umami/);
    assert.match(en, /no cookies/);
    assert.match(en, /id="cookies"/);
    assert.match(en, /Calendly booking calendar/);
  });
  it("cite Google Analytics parmi les destinataires, avec consentement, dans les deux langues", () => {
    const d = fr.slice(fr.indexOf("Destinataires et sous-traitants"), fr.indexOf("Durée de conservation"));
    assert.match(d, /Si vous acceptez/);
    assert.match(d, /Google Ireland Limited \(Google Analytics 4\)/);
    const e = en.slice(en.indexOf("Recipients and processors"), en.indexOf("Retention period"));
    assert.match(e, /If you accept/);
    assert.match(e, /Google Ireland\s+Limited \(Google Analytics 4\)/);
  });
  it("ne dit plus, dans aucune langue, qu'aucun service de mesure tiers n'est utilisé", () => {
    assert.doesNotMatch(full, /sans envoyer de données à un service de mesure d'audience tiers/);
    assert.doesNotMatch(full, /no data sent to a third-party audience measurement service/);
  });
  it("reste dans le cadre ivoirien, sans RGPD ni durée de conservation Google", () => {
    assert.match(fr, /loi ivoirienne\s+n° 2013-450 du 19 juin 2013/);
    assert.match(en, /Ivorian Law\s+No\. 2013-450 of June 19, 2013/);
    assert.doesNotMatch(full, /RGPD|GDPR/);
    assert.doesNotMatch(full, /26 mois|14 mois|26 months|14 months/);
  });
  it("affiche la date de mise à jour du jour de la modification, dans les deux langues", () => {
    assert.match(fr, /updated="23 octobre 2026"/);
    assert.match(en, /updated="October 23, 2026"/);
  });
});
