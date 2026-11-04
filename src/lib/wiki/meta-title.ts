const SUFFIX = " | ImmoTopia";
const MAX_LENGTH = 60;

/** Titre de page wiki : la marque n'est ajoutée que si le titre reste sous 60 caractères (au-delà, Google tronque). */
export function wikiMetaTitle(metaTitle: string): string {
  const withBrand = `${metaTitle}${SUFFIX}`;
  return withBrand.length <= MAX_LENGTH ? withBrand : metaTitle;
}
