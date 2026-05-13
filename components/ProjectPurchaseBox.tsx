"use client";

import { useState } from "react";
import { Project } from "@/data/projects";

export function ProjectPurchaseBox({ project }: { project: Project }) {
  const [pdfAddon, setPdfAddon] = useState(false);
  const pdf = project.addons.find((addon) => addon.code === "PDF_EMAIL_PACKAGE");
  const total = project.price + (pdfAddon && pdf ? pdf.price : 0);

  return (
    <aside className="purchase-box">
      <span className="eyebrow">Cena projektu</span>
      <div className="price-line">
        <strong>{total.toLocaleString("pl-PL")} zł</strong>
        {pdfAddon && <small>w tym PDF +250 zł</small>}
      </div>

      <div className="variant-box">
        <span>Wariant</span>
        <strong>Standardowy projekt domu</strong>
        <small>Dane demo. W produkcji warianty będą zarządzane z panelu admina.</small>
      </div>

      {pdf && (
        <label className="addon-row">
          <input type="checkbox" checked={pdfAddon} onChange={(event) => setPdfAddon(event.target.checked)} />
          <span>
            <strong>{pdf.name} +{pdf.price} zł</strong>
            <small>{pdf.description}</small>
          </span>
        </label>
      )}

      <a className="primary-cta" href="/koszyk">Dodaj do koszyka</a>
      <a className="secondary-cta" href="#zapytaj">Zapytaj o projekt</a>

      <div className="trust-list">
        <span>Bezpieczne płatności</span>
        <span>Faktura VAT</span>
        <span>PDF/link po płatności</span>
        <span>Pomoc przy wyborze</span>
      </div>
    </aside>
  );
}
