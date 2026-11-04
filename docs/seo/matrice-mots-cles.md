# Matrice « un mot-clé = une page »

Chaque mot-clé principal a **une seule page cible**. C'est cette page que le
suivi des positions doit mesurer, et c'est vers elle que pointent les liens
internes ayant ce mot-clé pour ancre.

| Mot-clé principal                              | Page cible (français)                                        | Source du texte           |
| ---------------------------------------------- | ------------------------------------------------------------ | ------------------------- |
| logiciel de gestion immobilière côte d'ivoire  | `/logiciel-immobilier-cote-divoire`                          | `src/lib/landings.ts`     |
| logiciel de gestion locative côte d'ivoire     | `/gestion-locative-cote-divoire`                             | `src/lib/landings.ts`     |
| logiciel syndic de copropriété côte d'ivoire   | `/logiciel-syndic-copropriete-cote-divoire`                  | `src/lib/landings.ts`     |
| logiciel gestion de patrimoine immobilier      | `/logiciel-gestion-patrimoine-immobilier-cote-divoire`       | `src/lib/landings.ts`     |
| logiciel promoteur immobilier                  | `/logiciel-promoteur-immobilier-cote-divoire`                | `src/lib/landings.ts`     |

## Suivi des positions

- « logiciel gestion de patrimoine immobilier » : la page suivie était
  `/wiki/patrimoine-multi-actifs`. Elle doit devenir
  `/logiciel-gestion-patrimoine-immobilier-cote-divoire`.
- « logiciel promoteur immobilier » : la page suivie était
  `/wiki/promotion-et-chantiers`. Elle doit devenir
  `/logiciel-promoteur-immobilier-cote-divoire`.
- Les pages du wiki restent des pages de détail ; elles ne visent pas ces
  mots-clés.

## Règles pour les ancres de liens internes

- Une même ancre ne pointe jamais vers deux pages.
- Une ancre qui reprend un mot-clé de la matrice pointe vers sa page cible.
- Les liens vers le wiki prennent une ancre descriptive qui ne reprend pas le
  mot-clé (par exemple « wiki du patrimoine multi-actifs »).

## État des liens au moment de la rédaction

Les ancres actuelles respectent déjà ces règles : `landings.ts` (pages
« logiciel immobilier », « gestion de patrimoine ») et les introductions des
wikis `patrimoine-multi-actifs` et `promotion-et-chantiers` pointent vers les
pages cibles ci-dessus ; aucune modification de lien n'a été nécessaire.
