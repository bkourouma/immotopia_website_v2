import { pathToFileURL } from "node:url";
import { setTimeout } from "node:timers/promises";

export async function checkDeployedSha(url, expectedSha) {
  if (expectedSha?.length !== 40 || !/^[a-f0-9]{40}$/.test(expectedSha)) {
    throw new Error("Le SHA attendu doit contenir exactement 40 caractères hexadécimaux minuscules.");
  }
  // Ne pas suivre une redirection vers un autre serveur qui pourrait masquer
  // une ancienne version. Le header doit venir de cette réponse précise.
  const response = await fetch(url, {
    redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(10_000),
  });
  await response.body?.cancel();
  if (response.status < 200 || response.status >= 400) {
    throw new Error(`État HTTP inattendu : ${response.status}`);
  }
  if (response.headers.get("x-commit-sha") !== expectedSha) {
    throw new Error("Le header x-commit-sha est absent, invalide ou différent du commit attendu.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [url, sha] = process.argv.slice(2);
  if (!url || sha?.length !== 40 || !/^[a-f0-9]{40}$/.test(sha)) {
    console.error("Usage : node scripts/check-deployed-sha.mjs URL SHA_COMPLET");
    process.exitCode = 1;
  } else {
    for (let attempt = 1; attempt <= 30; attempt++) {
      try {
        await checkDeployedSha(url, sha);
        console.log(`Version ${sha} vérifiée (tentative ${attempt}).`);
        break;
      } catch (error) {
        if (attempt === 30) {
          console.error(error instanceof Error ? error.message : "Contrôle de version en échec.");
          process.exitCode = 1;
        } else {
          await setTimeout(5_000);
        }
      }
    }
  }
}
