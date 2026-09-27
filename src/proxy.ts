import { NextResponse, type NextRequest } from "next/server";

// Routage des langues : le français est servi sans préfixe (« /tarifs » → app/[lang] avec lang = « fr »),
// l'anglais sous « /en ». « /fr/... » redirige vers l'adresse sans préfixe pour éviter le contenu en double.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    // Les images générées (Open Graph) sont appelées sous /fr/ par les métadonnées : on les sert directement.
    if (pathname.includes("opengraph-image")) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Ni l'API, ni les fichiers internes de Next, ni les fichiers statiques (avec extension), ni les routes de métadonnées racine
  matcher: ["/((?!api|_next|robots.txt|sitemap.xml|icon.png|apple-icon.png|.*\\..*).*)"],
};
