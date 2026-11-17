// Export CSV compatible Excel (séparateur « ; » des paramètres régionaux français, BOM UTF-8, CRLF).

/** Neutralise l'injection de formule : une cellule qui commencerait par = + - @ serait exécutée par Excel. */
export function csvCell(value: unknown): string {
  let s = value == null ? "" : String(value);
  // Un numéro de téléphone (+225 01 02…) ne contient aucune fonction : on le laisse tel quel, sinon l'apostrophe s'afficherait dans Excel
  if (/^[=+\-@\t\r]/.test(s) && !/^[+-]?[\d\s().-]+$/.test(s)) s = "'" + s;
  if (/[";\r\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
  return s;
}

export function toCsv(header: string[], rows: unknown[][]): string {
  return "﻿" + [header, ...rows].map((r) => r.map(csvCell).join(";")).join("\r\n") + "\r\n";
}
