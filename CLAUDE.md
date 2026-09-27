# CLAUDE.md — site vitrine ImmoTopia

Point d'entrée des sessions Claude Code. La constitution du projet est
[AGENTS.md](AGENTS.md) : elle est importée ci-dessous et prime sur tout le reste.

@AGENTS.md

## Chargement progressif

Ne pas tout lire d'avance. Charger le document quand la tâche le demande :

| Tâche                                    | À lire                                                                       |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| Reprendre un travail en cours            | [docs/workflows/HANDOFF.md](docs/workflows/HANDOFF.md) — toujours en premier |
| Lancer, configurer, dépanner             | [docs/workflows/RUNBOOK.md](docs/workflows/RUNBOOK.md)                       |
| Conventions détaillées                   | [docs/governance/CODING_STANDARDS.md](docs/governance/CODING_STANDARDS.md)   |
| Assistant IA, formulaire, secrets        | [docs/governance/SECURITY.md](docs/governance/SECURITY.md)                   |
| Une décision d'architecture              | [docs/architecture/adr/](docs/architecture/adr/ADR-000-template.md)          |
| Piloter seul un objectif de bout en bout | [docs/workflows/LEAD_PROCESS.md](docs/workflows/LEAD_PROCESS.md)             |
| Une API ou convention Next.js            | `node_modules/next/dist/docs/` (Next 16.3, différent de tes connaissances)   |
| Un texte, un prix, un outil, une page thématique | `src/lib/content.ts`, `pricing.ts`, `tools.ts`, `landings.ts`        |
| Ce que sait l'assistant immotopIA        | `src/lib/assistant/prompt.ts` et `src/lib/assistant/knowledge.md`            |
| Déploiement (lecture seule pour un agent) | [README.md](README.md), `Dockerfile`, `deploy/nginx-immotopia.cloud.conf`   |

Les règles de `.claude/rules/` se chargent seules selon les fichiers touchés
(frontmatter `paths:`) : Next.js et i18n, routes API, relecture.

<!-- acc:begin claude-tooling -->
## Outillage du dépôt

- `/audit [chemin]` — audit du diff de la branche (ou d'un chemin) :
  vérifications mécaniques, puis revue par les sous-agents `code-reviewer` et
  `security-auditor` (`.claude/agents/`).
- `/lead [objectif]` — fait de la session courante le Pilote
  (`docs/workflows/LEAD_PROCESS.md`).
- `/acc-adapt` — adapte les parties propres au projet (`TODO(acc-adapt)`,
  fichiers seed, règles `.claude/rules/`) à partir du code réel.
- Hooks (`.claude/settings.json`) : `validate-bash.sh` refuse les commandes
  destructrices (stash, remise à zéro, poussée forcée ou vers une branche
  protégée, `--no-verify`…) ; `pre-commit.sh` lance les contrôles de
  `hooks.preCommit` d'`acc.config.json` avant un `git commit`. Un refus de
  hook se corrige, il ne se contourne pas.
- `CLAUDE.local.md` et `.claude/settings.local.json` : réglages propres à la
  machine, jamais commités.
- Les fichiers posés par `acc-standard` en mode géré (`.acc/manifest.json`) se
  modifient dans le standard, pas localement : une modification locale est
  signalée par `npx github:bkourouma/ACC-STANDARD-ARCHITECTURE doctor`.
<!-- acc:end claude-tooling -->

<!-- acc:begin claude-subagents -->
## Sous-agents

Le Pilote (session principale, voir
[docs/workflows/LEAD_PROCESS.md](docs/workflows/LEAD_PROCESS.md)) délègue
soit aux coordinateurs des deux processus, soit directement à des agents de
réalisation ou de relecture pour une tâche assez petite pour ne pas justifier
un coordinateur. Les coordinateurs délèguent à leur tour à leurs agents de
réalisation. Ces derniers ne lancent jamais d'autres sous-agents — profondeur
maximale de trois niveaux sous la session principale. Tout prompt de
réalisation interdit explicitement toute commande git qui modifie l'arbre ou
l'index (`stash`, `checkout`, `switch`, `reset`, `restore`, `add`, `commit`,
`clean`) et de refaire un travail qui semble « revenu en arrière » (s'arrêter
et signaler). Découper par territoire de fichiers, jamais deux agents sur le
même fichier. Ne pas commiter pendant qu'un agent écrit.
<!-- acc:end claude-subagents -->
