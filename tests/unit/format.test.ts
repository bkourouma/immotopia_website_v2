import assert from "node:assert/strict";
import { describe, it } from "node:test";

// Import dynamique : node exécute le .ts tel quel et tsc reste satisfait (pas d'extension .ts dans le code du site).
const format = await import(new URL("../../src/lib/format.ts", import.meta.url).href);

describe("eur", () => {
  it("convertit à la parité fixe 1 € = 655,957 FCFA", () => {
    assert.equal(format.eur(655_957), "1 000 €");
    assert.equal(format.eur(655.957), "1,00 €");
  });

  it("garde les centimes sous 100 € et arrondit à l'euro au-delà", () => {
    assert.equal(format.eur(29_900), "45,58 €");
    assert.equal(format.eur(1_500), "2,29 €");
    assert.equal(format.eur(249_900), "381 €");
  });

  it("suit l'écriture anglaise sous /en", () => {
    assert.equal(format.eur(29_900, "en"), "€45.58");
    assert.equal(format.eur(149_900, "en"), "€229");
  });

  it("rend un tiret pour un montant non fini", () => {
    assert.equal(format.eur(Number.NaN), "—");
  });
});
