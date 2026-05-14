"use client";

import { X } from "lucide-react";

export type VariantRow = { name: string; priceGross: string };

function updateRow<T>(rows: T[], index: number, patch: Partial<T>) {
  return rows.map((row, currentIndex) => (currentIndex === index ? { ...row, ...patch } : row));
}

export function AdminProjectVariantsEditor({ variants, setVariants }: { variants: VariantRow[]; setVariants: (rows: VariantRow[]) => void }) {
  return (
    <>
      <div className="admin-edit-table compact">
        {variants.map((variant, index) => (
          <div className="admin-edit-row variant" key={index}>
            <input value={variant.name} onChange={(event) => setVariants(updateRow(variants, index, { name: event.target.value }))} placeholder="Nazwa wariantu" />
            <input value={variant.priceGross} onChange={(event) => setVariants(updateRow(variants, index, { priceGross: event.target.value }))} placeholder="Cena" />
            <button type="button" onClick={() => setVariants(variants.filter((_, currentIndex) => currentIndex !== index))}><X size={15} /></button>
          </div>
        ))}
      </div>
      <button type="button" className="admin-secondary-button" onClick={() => setVariants([...variants, { name: "", priceGross: "0" }])}>
        Dodaj wariant
      </button>
    </>
  );
}

