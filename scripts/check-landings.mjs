// Vérifie les pages thématiques de src/lib/landings.ts : slugs et titres uniques, longueur des balises,
// pages déclarées en français seulement, pages liées existantes, liens internes valides (landings, wiki, guides),
// et absence de date ou de promesse datée dans les deux pages de gestion de patrimoine et de promotion.
// Aucun appel réseau. À lancer : node scripts/check-landings.mjs
import { mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const lib = (f) => fileURLToPath(new URL(`../src/lib/${f}`, import.meta.url));

// Transpile les modules TypeScript nécessaires vers un dossier temporaire (imports relatifs réécrits en .mjs)
const out = mkdtempSync(join(tmpdir(), "landings-"));
for (const f of ["landings", "french-only", "format", "pricing"]) {
  const js = ts.transpileModule(readFileSync(lib(`${f}.ts`), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText.replace(/from "\.\/([\w-]+)"/g, 'from "./$1.mjs"');
  writeFileSync(join(out, `${f}.mjs`), js);
}
const { landings } = await import(pathToFileURL(join(out, "landings.mjs")).href);
const { frenchOnlyPaths } = await import(pathToFileURL(join(out, "french-only.mjs")).href);

let errors = 0;
const fail = (msg) => {
  console.error(`✗ ${msg}`);
  errors++;
};

const slugs = landings.map((l) => l.slug);
const guideSlugs = [...readFileSync(lib("guides.ts"), "utf8").matchAll(/^\s+slug: "([\w-]+)"/gm)].map((m) => m[1]);
const staticRoutes = ["/", "/tarifs", "/contact", "/faq", "/comparatif", "/outils", "/versions", "/wiki", "/guides"];

const textsOf = (l) => [
  l.intro,
  ...l.sections.flatMap((s) => [
    s.intro,
    s.note,
    ...(s.paragraphs ?? []),
    ...(s.bullets ?? []),
    ...(s.items ?? []).map((i) => i.text),
    ...(s.table ? s.table.rows.flat() : []),
  ]),
  ...l.faq.map((f) => f.a),
];

const wikiLinkOk = (domain, feature) => {
  const file = lib(`wiki/${domain}.ts`);
  if (!existsSync(file)) return false;
  return !feature || readFileSync(file, "utf8").includes(`slug: "${feature}"`);
};

for (const l of landings) {
  const at = `/${l.slug}`;
  if (slugs.filter((s) => s === l.slug).length > 1) fail(`${at} : slug en double`);
  if (!frenchOnlyPaths.includes(at)) fail(`${at} : absent de src/lib/french-only.ts`);
  if (landings.filter((o) => o.metaTitle === l.metaTitle).length > 1) fail(`${at} : titre en double`);
  if (landings.filter((o) => o.h1 === l.h1).length > 1) fail(`${at} : h1 en double`);
  if (landings.filter((o) => o.metaDescription === l.metaDescription).length > 1) fail(`${at} : description en double`);
  if (l.metaTitle.length > 66) fail(`${at} : titre trop long (${l.metaTitle.length})`);
  if (l.metaDescription.length < 110 || l.metaDescription.length > 165) fail(`${at} : description de ${l.metaDescription.length} caractères (110 à 165 attendus)`);
  if (!l.h1.trim() || !l.intro.trim() || l.sections.length === 0) fail(`${at} : h1, intro ou sections vides`);
  for (const r of l.related) if (!slugs.includes(r)) fail(`${at} : page liée inconnue « ${r} »`);
  const texts = textsOf(l).filter(Boolean);
  for (const t of texts) {
    for (const m of t.matchAll(/\]\((\/[^)]*)\)/g)) {
      const path = m[1];
      const [, a, b, c] = path.split("/");
      if (a === "wiki") {
        if (b && !wikiLinkOk(b, c)) fail(`${at} : lien wiki cassé ${path}`);
      } else if (a === "guides") {
        if (b && !guideSlugs.includes(b)) fail(`${at} : lien guide cassé ${path}`);
      } else if (!staticRoutes.includes(path) && !slugs.includes(path.slice(1))) fail(`${at} : lien interne inconnu ${path}`);
    }
  }
}

// Pages ajoutées pour « gestion de patrimoine » et « promoteur » : règle éditoriale
const added = {
  "logiciel-gestion-patrimoine-immobilier-cote-divoire": "gestion de patrimoine immobilier",
  "logiciel-promoteur-immobilier-cote-divoire": "promoteur immobilier",
};
for (const [slug, kw] of Object.entries(added)) {
  const l = landings.find((x) => x.slug === slug);
  if (!l) {
    fail(`/${slug} : page absente`);
    continue;
  }
  if (!l.slug.includes(kw.replace(/ de /g, " ").replace(/ /g, "-"))) fail(`/${slug} : mot-clé absent du slug`);
  if (!l.h1.toLowerCase().includes(kw)) fail(`/${slug} : mot-clé absent du h1`);
  if (!l.metaTitle.toLowerCase().includes(kw)) fail(`/${slug} : mot-clé absent du titre`);
  if (l.faq.length < 5 || l.faq.length > 8) fail(`/${slug} : FAQ de ${l.faq.length} questions (5 à 8 attendues)`);
  const all = [l.metaTitle, l.metaDescription, l.h1, ...textsOf(l)].filter(Boolean).join("\n");
  if (/\b20[2-3]\d\b/.test(all)) fail(`/${slug} : une année figure dans le texte (pas de date de livraison)`);
  if (/prochainement|d'ici|bientôt disponible/i.test(all)) fail(`/${slug} : formule de livraison datée ou floue`);
  if (slug.includes("promoteur") && /portail acquéreur|réservation de lots|échéancier de l'acquéreur/i.test(all)) {
    // Ces trois fonctions n'existent pas pour un promoteur : seule leur négation est admise.
    for (const m of all.matchAll(/[^.]*?(portail acquéreur|réservation de lots|échéancier de l'acquéreur)[^.]*\./gi)) {
      if (!/ne propose ni|n'existe|existe seulement|ni /i.test(m[0])) fail(`/${slug} : fonction inexistante présentée : ${m[0].trim()}`);
    }
  }
  if (!/\/tarifs\)/.test(all)) fail(`/${slug} : pas de lien vers /tarifs`);
  if (!/\/contact\)/.test(all)) fail(`/${slug} : pas de lien vers /contact`);
}

rmSync(out, { recursive: true, force: true });
console.log(`${landings.length} pages thématiques contrôlées.`);
if (errors) {
  console.error(`${errors} écart(s).`);
  process.exit(1);
}
console.log("✓ Pages thématiques conformes.");
