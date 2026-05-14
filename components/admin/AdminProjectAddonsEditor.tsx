"use client";

import { X } from "lucide-react";

export type AddonRow = {
  code: string;
  name: string;
  priceGross: string;
  description: string;
  deliveryAction?: string;
};

function updateRow<T>(rows: T[], index: number, patch: Partial<T>) {
  return rows.map((row, currentIndex) => (currentIndex === index ? { ...row, ...patch } : row));
}

export function AdminProjectAddonsEditor({ addons, setAddons }: { addons: AddonRow[]; setAddons: (rows: AddonRow[]) => void }) {
  return (
    <>
      <div className="admin-edit-table addons">
        {addons.map((addon, index) => (
          <div className="admin-edit-row addon" key={index}>
            <input value={addon.code} onChange={(event) => setAddons(updateRow(addons, index, { code: event.target.value }))} placeholder="Kod" />
            <input value={addon.name} onChange={(event) => setAddons(updateRow(addons, index, { name: event.target.value }))} placeholder="Nazwa dodatku" />
            <input value={addon.priceGross} onChange={(event) => setAddons(updateRow(addons, index, { priceGross: event.target.value }))} placeholder="Cena" />
            <input value={addon.description} onChange={(event) => setAddons(updateRow(addons, index, { description: event.target.value }))} placeholder="Opis" />
            <button type="button" onClick={() => setAddons(addons.filter((_, currentIndex) => currentIndex !== index))}><X size={15} /></button>
          </div>
        ))}
      </div>
      <button type="button" className="admin-secondary-button" onClick={() => setAddons([...addons, { code: "", name: "", priceGross: "0", description: "" }])}>
        Dodaj dodatek
      </button>
    </>
  );
}

