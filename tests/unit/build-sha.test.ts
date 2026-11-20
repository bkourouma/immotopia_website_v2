import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, it } from "node:test";
import { checkDeployedSha } from "../../scripts/check-deployed-sha.mjs";

const sha = "a".repeat(40);
const original = process.env.GIT_COMMIT_SHA;
after(() => {
  if (original === undefined) delete process.env.GIT_COMMIT_SHA;
  else process.env.GIT_COMMIT_SHA = original;
});

for (const value of [undefined, "", "unknown", "a".repeat(7), "A".repeat(40), `${sha}\n`, `${sha}, ${sha}`, sha]) {
  it(`publie seulement un SHA complet strict (${JSON.stringify(value)})`, async () => {
    if (value === undefined) delete process.env.GIT_COMMIT_SHA;
    else process.env.GIT_COMMIT_SHA = value;
    const config = (await import(new URL(`../../next.config.ts?sha=${encodeURIComponent(String(value))}`, import.meta.url).href)).default;
    const headers = await config.headers();
    assert.deepEqual(headers, value === sha
      ? [{ source: "/:path*", headers: [{ key: "x-commit-sha", value: sha }] }]
      : []);
    // Une modification runtime ne remplace pas la valeur capturée par le build.
    process.env.GIT_COMMIT_SHA = "b".repeat(40);
    assert.deepEqual(await config.headers(), headers);
    assert.equal(config.poweredByHeader, false);
    assert.equal(config.output, "standalone");
    assert.ok((await config.redirects()).length > 0);
  });
}

it("contrôle la réponse HTTP réelle, refuse version absente/différente/doublée et erreur HTTP", async () => {
  let header: string | string[] | undefined = sha;
  let status = 200;
  const server = createServer((_req, res) => {
    if (header !== undefined) res.setHeader("x-commit-sha", header);
    res.writeHead(status).end();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}/`;
  try {
    await checkDeployedSha(url, sha);
    for (header of [undefined, "b".repeat(40), [sha, sha]]) {
      await assert.rejects(checkDeployedSha(url, sha), /x-commit-sha/);
    }
    header = sha;
    status = 503;
    await assert.rejects(checkDeployedSha(url, sha), /503/);
    await assert.rejects(checkDeployedSha(url, "unknown"), /40/);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
