// Convertit la base de connaissances Markdown de l'assistant en module TypeScript,
// pour qu'elle soit embarquée dans le build (aucune lecture de fichier à l'exécution).
// Lancé automatiquement avant chaque « npm run build » (script prebuild).
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const src = "src/lib/assistant/knowledge.md";
const out = "src/lib/assistant/knowledge.generated.ts";
const md = existsSync(src) ? readFileSync(src, "utf8") : "";
writeFileSync(
  out,
  `// Fichier généré par scripts/build-knowledge.mjs à partir de knowledge.md — ne pas modifier à la main.\nexport const KNOWLEDGE = ${JSON.stringify(md)};\n`,
);
console.log(`[assistant] base de connaissances : ${md.length} caractères`);
