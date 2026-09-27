// Vérifie que la traduction anglaise (src/lib/comparatif-data.en.ts) suit bien comparatif-data.ts :
// même nombre de lignes et, ligne par ligne, mêmes domaine, statuts et sources ;
// pour les sources : mêmes ref, éditeur et URL. À lancer après chaque régénération : node scripts/check-comparatif-en.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const lib = (f) => readFileSync(fileURLToPath(new URL(`../src/lib/${f}`, import.meta.url)), "utf8");

const rowRe = /\{ domain: "([^"]+)", feature: .*?, statuses: (\[[^\]]*\]), note: .*?, sources: (\[[^\]]*\]) \}/g;
const srcRe = /\{ ref: "([^"]+)", editor: "([^"]+)", page: .*?, url: "([^"]*)", limit: .*? \}/g;
const parse = (text, re) => [...text.matchAll(re)].map((m) => m.slice(1).join(" | "));

const fr = lib("comparatif-data.ts");
const en = lib("comparatif-data.en.ts");
let errors = 0;
for (const [label, re] of [["lignes", rowRe], ["sources", srcRe]]) {
  const a = parse(fr, re);
  const b = parse(en, re);
  if (a.length !== b.length) {
    console.error(`✗ ${label} : ${a.length} en français, ${b.length} en anglais`);
    errors++;
  }
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) {
      console.error(`✗ ${label} n° ${i + 1} :\n  fr ${a[i]}\n  en ${b[i]}`);
      errors++;
    }
  }
  console.log(`${label} : ${a.length} (fr) / ${b.length} (en)`);
}
if (errors) {
  console.error(`${errors} écart(s).`);
  process.exit(1);
}
console.log("✓ Traduction alignée.");
