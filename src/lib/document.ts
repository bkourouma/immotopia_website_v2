// Modèle de document commun : un même contenu sert à l'aperçu à l'écran et au PDF téléchargé.

export type Party = { label: string; lines: string[] };

export type Block =
  | { t: "title"; text: string; sub?: string }
  | { t: "h"; text: string }
  | { t: "p"; text: string }
  | { t: "parties"; left: Party; right: Party }
  | { t: "table"; rows: [string, string][]; total?: [string, string] }
  | { t: "note"; text: string }
  | { t: "sign"; place: string; left: string; right?: string };

export type Doc = { filename: string; blocks: Block[] };

const M = 20; // marge (mm)
const W = 210 - 2 * M; // largeur utile A4

/** Génère et télécharge le PDF. jsPDF est chargé à la demande pour alléger la page. */
export async function downloadPdf(doc: Doc) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  let y = M;

  const ensure = (h: number) => {
    if (y + h > 297 - M - 8) {
      pdf.addPage();
      y = M;
    }
  };
  const lines = (text: string, size: number, width = W) => {
    pdf.setFontSize(size);
    return pdf.splitTextToSize(text, width) as string[];
  };
  const lh = (size: number) => size * 0.42 + 1.4; // hauteur de ligne en mm

  for (const b of doc.blocks) {
    switch (b.t) {
      case "title": {
        pdf.setFont("helvetica", "bold");
        const ls = lines(b.text.toUpperCase(), 17);
        ensure(ls.length * lh(17) + 12);
        ls.forEach((l) => {
          pdf.text(l, 105, y + 6, { align: "center" });
          y += lh(17);
        });
        if (b.sub) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.setTextColor(90);
          pdf.text(b.sub, 105, y + 5, { align: "center" });
          pdf.setTextColor(0);
          y += 6;
        }
        pdf.setDrawColor(91, 91, 247);
        pdf.setLineWidth(0.6);
        pdf.line(105 - 15, y + 5, 105 + 15, y + 5);
        y += 12;
        break;
      }
      case "h": {
        pdf.setFont("helvetica", "bold");
        const ls = lines(b.text, 11.5);
        ensure(ls.length * lh(11.5) + 8);
        y += 3;
        ls.forEach((l) => {
          pdf.text(l, M, y + 4);
          y += lh(11.5);
        });
        y += 1.5;
        break;
      }
      case "p":
      case "note": {
        const size = b.t === "note" ? 8.5 : 10;
        pdf.setFont("helvetica", b.t === "note" ? "italic" : "normal");
        if (b.t === "note") pdf.setTextColor(110);
        for (const para of b.text.split("\n")) {
          for (const l of lines(para, size)) {
            ensure(lh(size));
            pdf.text(l, M, y + 4);
            y += lh(size);
          }
        }
        pdf.setTextColor(0);
        y += 2.5;
        break;
      }
      case "parties": {
        pdf.setFontSize(10);
        const colW = W / 2 - 4;
        const left = b.left.lines.flatMap((l) => lines(l, 10, colW - 8));
        const right = b.right.lines.flatMap((l) => lines(l, 10, colW - 8));
        const h = Math.max(left.length, right.length) * lh(10) + 14;
        ensure(h + 4);
        ([[b.left, left, M], [b.right, right, M + W / 2 + 4]] as const).forEach(([party, ls, x]) => {
          pdf.setFillColor(245, 245, 252);
          pdf.roundedRect(x, y, colW, h, 2.5, 2.5, "F");
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(8);
          pdf.setTextColor(91, 91, 247);
          pdf.text(party.label.toUpperCase(), x + 4, y + 6);
          pdf.setTextColor(0);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          ls.forEach((l, i) => pdf.text(l, x + 4, y + 11.5 + i * lh(10)));
        });
        y += h + 5;
        break;
      }
      case "table": {
        const rowH = 8;
        ensure((b.rows.length + (b.total ? 1 : 0)) * rowH + 4);
        pdf.setFontSize(10);
        b.rows.forEach(([k, v]) => {
          pdf.setFont("helvetica", "normal");
          pdf.text(k, M + 3, y + 5.5);
          pdf.text(v, M + W - 3, y + 5.5, { align: "right" });
          pdf.setDrawColor(225);
          pdf.setLineWidth(0.2);
          pdf.line(M, y + rowH, M + W, y + rowH);
          y += rowH;
        });
        if (b.total) {
          pdf.setFillColor(20, 23, 41);
          pdf.roundedRect(M, y + 1.5, W, rowH + 1, 2, 2, "F");
          pdf.setTextColor(255);
          pdf.setFont("helvetica", "bold");
          pdf.text(b.total[0], M + 3, y + 7.3);
          pdf.text(b.total[1], M + W - 3, y + 7.3, { align: "right" });
          pdf.setTextColor(0);
          y += rowH + 3;
        }
        y += 4;
        break;
      }
      case "sign": {
        ensure(42);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text(b.place, M, y + 5);
        y += 12;
        pdf.setFont("helvetica", "bold");
        const signers = b.right ? [b.left, b.right] : [b.left];
        signers.forEach((s, i) => {
          const x = M + i * (W / 2 + 4);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(10);
          pdf.text(s, x, y + 4);
          pdf.setFont("helvetica", "italic");
          pdf.setFontSize(8.5);
          pdf.setTextColor(110);
          pdf.text("Signature précédée de « Lu et approuvé »", x, y + 9);
          pdf.setTextColor(0);
        });
        pdf.setTextColor(0);
        y += 30;
        break;
      }
    }
  }

  // Pied de page numéroté
  const n = pdf.getNumberOfPages();
  for (let i = 1; i <= n; i++) {
    pdf.setPage(i);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    pdf.setTextColor(150);
    pdf.text("Document généré gratuitement avec ImmoTopia, logiciel immobilier pour agences et syndics.", M, 297 - 10);
    pdf.text(`Page ${i} / ${n}`, 210 - M, 297 - 10, { align: "right" });
  }

  pdf.save(doc.filename);
}
