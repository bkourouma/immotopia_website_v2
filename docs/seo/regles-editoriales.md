# Règles éditoriales et SEO · immotopia.cloud

Ces règles s'appliquent à toute modification du contenu du site : textes des pages, balises `title`, H1, meta descriptions, FAQ et liens internes. Elles s'ajoutent aux consignes de l'autopilote SEO de Mission Control : l'agent qui rédige les respecte, l'agent qui vérifie les contrôle.

**Une pull request qui enfreint l'une de ces règles est refusée.** Le vérificateur emploie le code de motif le plus précis (`UNSOURCED_CLAIM`, `INVENTED_PRICE`, `SCOPE_CREEP`…) ou, à défaut, `OTHER`, en citant le numéro de la règle (par exemple « R5 : « Côte d'Ivoire » retiré du title »).

Ce fichier ne se modifie qu'à la main, après accord de l'équipe ImmoTopia.

## 1. Ce que le site a le droit d'affirmer

- **R1. Source de vérité.** Une fonctionnalité, un prix, un chiffre ou une condition commerciale n'est affirmé que s'il figure déjà dans `src/lib/assistant/knowledge.md`, `src/lib/pricing.ts` ou une page publiée du site, sur la branche `main`. Dans `knowledge.md`, la section « Disponibilité » prime sur tout le reste.
- **R2. Limites.** Rien de ce que liste la section « Limites connues et points à ne pas promettre » de `knowledge.md` n'est présenté comme disponible, en particulier :
  - pour les loyers, aucun paiement en ligne Mobile Money avec rapprochement automatique : seuls l'enregistrement du paiement et la déclaration par le locataire, validée par l'agence, sont établis (le paiement en ligne existe seulement pour les charges de copropriété) ;
  - aucune application mobile native (App Store, Google Play) : ImmoTopia s'utilise dans le navigateur et s'installe sur l'écran d'accueil ;
  - aucun « WhatsApp illimité » : WhatsApp est facturé à la consommation ;
  - pour un promoteur, ni portail acquéreur, ni réservation de lots, ni échéancier de l'acquéreur (l'échéancier existe seulement pour la vente sous mandat d'agence).
- **R3. Fonctions en cours de développement.** Les fonctions de la section « Fonctions en cours de développement » de `knowledge.md` sont toujours présentées comme telles, sans date ni formule floue (« prochainement », « bientôt disponible », « d'ici… »).
- **R4. Prix et offres.** Aucun prix, aucune remise, aucune offre ni durée d'essai qui ne figure pas dans `src/lib/pricing.ts` ou `knowledge.md`. Les prix s'écrivent en FCFA, hors taxes.
- **R5. Preuves.** Aucun nom de client, aucun témoignage, aucun nombre d'utilisateurs, aucune certification ni aucune récompense qui ne figure pas déjà sur le site. Aucun superlatif présenté comme un fait (« le meilleur », « n°1 », « leader », « le seul ») : l'expression « meilleur logiciel immobilier » peut figurer comme sujet traité (« comment choisir le meilleur logiciel immobilier »), jamais comme une affirmation sur ImmoTopia.
- **R6. Modèles juridiques.** Dans les outils gratuits (`/outils`), les clauses des modèles de bail, d'état des lieux ou de quittance, et les articles de loi qu'ils citent, ne sont jamais modifiés par une pull request SEO. Quand une page de modèle conseille de faire valider le document par un avocat ou un notaire, ce conseil reste, dans le texte comme dans la meta description.

## 2. Mots-clés et ancrage local

Le site s'adresse aux professionnels de l'immobilier en Côte d'Ivoire (Abidjan en premier). C'est son principal avantage dans les recherches.

- **R7. « Côte d'Ivoire » reste.** Quand le title, le H1 ou la meta description d'une page contient « Côte d'Ivoire » ou « Abidjan », une pull request ne retire jamais cette mention. Si une limite de longueur oblige à choisir, raccourcissez autre chose (« (PDF) », « modèle de contrat de » devient « modèle de », un adjectif) plutôt que le pays.
- **R8. Mots-clés suivis.** Les mots-clés suivis par Mission Control (liste et positions dans le dernier état des lieux, `docs/seo/rapports/`) ne disparaissent jamais du title ni du H1 de la page qui se positionne dessus. Le mot-clé principal se place de préférence au début du title.
- **R9. Outils gratuits.** Les outils de `/outils` sont gratuits : quand la meta description française d'un outil contient « gratuit » ou « gratuitement » (« free » en anglais), le mot reste.
- **R10. Une page, une intention.** Le title, le H1 et la meta description de chaque page sont uniques sur le site. Une pull request ne reprend pas le mot-clé principal d'une autre page dans son title (pas de cannibalisation).

## 3. Longueurs

Certaines limites sont vérifiées par la CI : une pull request qui les dépasse ne passe pas.

| Type de page | Fichier | Title | Meta description | Contrôle |
| --- | --- | --- | --- | --- |
| Pages thématiques | `src/lib/landings.ts` | 66 caractères au plus | 110 à 165 caractères | `scripts/check-landings.mjs`, dans la CI |
| Guides | `src/lib/guides.ts` | 60 caractères au plus | 160 caractères au plus | à la construction |
| Outils gratuits | `src/lib/tools.ts` (`seoTitle`, `seoDescription`) | 60 caractères au plus | 160 caractères au plus | aucun : à respecter quand même |

- **R11.** Les titles sont posés tels quels (pas de suffixe « | ImmoTopia » ajouté automatiquement) : la longueur affichée est celle du texte écrit.
- **R12.** Une limite ne justifie jamais d'enfreindre R7, R8 ou R9 : reformulez.

## 4. Style

- **R13. Langue.** Français soigné, au vouvoiement, avec les accents et la typographie du site : « Côte d'Ivoire » avec majuscules et apostrophe dans le texte visible (les slugs gardent leur forme sans accent). Les noms s'écrivent « ImmoTopia » (l'application), « immotopIA » (l'assistant du site), « Alliance Consultants » (l'éditeur).
- **R14. Pas de redite.** Une phrase n'ajoute rien qui soit déjà dit dans la phrase ou la parenthèse qui précède (exemple à éviter : « bail commercial (bail à usage professionnel) […]. Ce modèle sert aussi de contrat de bail à usage professionnel. »).
- **R15. Lisibilité.** Des phrases courtes, un vocabulaire de professionnel de l'immobilier, pas de remplissage pour placer un mot-clé : un mot-clé apparaît là où il se lit naturellement.
- **R16. Deux langues.** Les textes bilingues (champs `fr` et `en`, par exemple les outils de `src/lib/tools.ts`) changent ensemble : quand le français change, l'anglais est mis à jour pour dire la même chose (R7 et R9 s'y appliquent avec « Côte d'Ivoire » et « free »). Les pages et rubriques en français seulement (`src/lib/french-only.ts` : pages thématiques, FAQ, wiki, guides) ne reçoivent pas de version anglaise.

## 5. Liens et adresses

- **R17.** Les liens internes pointent vers des pages qui existent (pages thématiques, wiki, guides, outils, `/tarifs`, `/contact`). Les pages thématiques gardent leur lien vers `/tarifs` et `/contact`.
- **R18.** Une pull request ne change jamais le slug (l'adresse) d'une page existante : la page perdrait ses positions, et les redirections relèvent de la configuration, qui est un chemin protégé.
