// Mise en forme des montants, dates et nombres en lettres (français).

export function fcfa(n: number) {
  if (!Number.isFinite(n)) return "—";
  return `${Math.round(n).toLocaleString("fr-FR").replace(/[\u202f\u00a0]/g, " ")} FCFA`;
}

export function pct(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return `${n.toLocaleString("fr-FR", { minimumFractionDigits: digits, maximumFractionDigits: digits })} %`.replace(/[\u202f\u00a0]/g, " ");
}

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** « 2026-09-05 » → « 5 septembre 2026 » (sans passer par Date pour éviter les décalages de fuseau) */
export function longDate(iso: string) {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return "…";
  const day = Number(m[3]);
  return `${day === 1 ? "1er" : day} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

/** « 2026-09 » → « septembre 2026 » */
export function monthLabel(ym: string) {
  const m = ym.match(/^(\d{4})-(\d{2})$/);
  return m ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : "…";
}

/** Premier et dernier jour d'un mois « AAAA-MM » */
export function monthBounds(ym: string) {
  const m = ym.match(/^(\d{4})-(\d{2})$/);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const last = new Date(Date.UTC(y, mo, 0)).getUTCDate();
  return { from: `${m[1]}-${m[2]}-01`, to: `${m[1]}-${m[2]}-${String(last).padStart(2, "0")}` };
}

export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ------------------------------------------------------------ nombres en lettres */

const UNITS = [
  "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
  "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf",
];
const TENS = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante"];

function below100(n: number, final: boolean): string {
  if (n < 20) return UNITS[n];
  if (n < 70) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    if (u === 0) return TENS[t];
    if (u === 1) return `${TENS[t]} et un`;
    return `${TENS[t]}-${UNITS[u]}`;
  }
  if (n < 80) return n === 71 ? "soixante et onze" : `soixante-${UNITS[n - 60]}`;
  if (n === 80) return final ? "quatre-vingts" : "quatre-vingt";
  return `quatre-vingt-${UNITS[n - 80]}`;
}

function below1000(n: number, final: boolean): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  const parts: string[] = [];
  if (h === 1) parts.push("cent");
  else if (h > 1) parts.push(`${UNITS[h]} cent${r === 0 && final ? "s" : ""}`);
  if (r > 0) parts.push(below100(r, final));
  return parts.join(" ");
}

/** 150000 → « cent cinquante mille » (orthographe traditionnelle) */
export function toWords(value: number): string {
  let n = Math.floor(Math.abs(value));
  if (n === 0) return "zéro";
  const parts: string[] = [];
  const scales: [number, string][] = [
    [1_000_000_000, "milliard"],
    [1_000_000, "million"],
  ];
  for (const [size, word] of scales) {
    const c = Math.floor(n / size);
    if (c > 0) {
      parts.push(`${below1000(c, true)} ${word}${c > 1 ? "s" : ""}`);
      n %= size;
    }
  }
  const th = Math.floor(n / 1000);
  if (th > 0) {
    parts.push(th === 1 ? "mille" : `${below1000(th, false)} mille`);
    n %= 1000;
  }
  if (n > 0) parts.push(below1000(n, true));
  return parts.join(" ");
}

export function fcfaWords(n: number) {
  const w = toWords(n);
  return `${w.charAt(0).toUpperCase()}${w.slice(1)} francs CFA`;
}
