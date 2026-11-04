import assert from "node:assert/strict";
import { it } from "node:test";

const config = (await import(new URL("../../next.config.ts", import.meta.url).href)).default;

it("l'ancienne page gestion locative a une redirection 301 precise avant le repli generique", async () => {
  const redirects = await config.redirects();
  const source = "/fonctionnalites/gestion-locative";
  const index = redirects.findIndex((rule: { source: string }) => rule.source === source);
  const fallback = redirects.findIndex((rule: { source: string }) => rule.source === "/fonctionnalites/:slug");
  assert.ok(index >= 0 && index < fallback);
  assert.deepEqual(redirects[index], { source, destination: "/gestion-locative-cote-divoire", statusCode: 301 });
});
