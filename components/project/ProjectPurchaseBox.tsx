"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, ChevronRight, Info, Mail, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import type { Project } from "@/types/project";
import { money } from "@/lib/format";

export function ProjectPurchaseBox({ project }: { project: Project }) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addonsTotal = useMemo(() => {
    return project.addons
      .filter((addon) => selectedAddons.includes(addon.code))
      .reduce((sum, addon) => sum + addon.priceGross, 0);
  }, [project.addons, selectedAddons]);

  const total = project.priceGross + addonsTotal;

  function toggleAddon(code: string) {
    setSelectedAddons((current) =>
      current.includes(code) ? current.filter((item) => item !== code) : [...current, code]
    );
  }

  return (
    <aside className="purchase-card">
      <div className="code-line">KOD PROJEKTU: <strong>{project.shortCode}</strong></div>

      <div className="price-line">
        <strong>{money(total)}</strong>
        <span>z VAT</span>
      </div>

      <div className="available-line"><BadgeCheck size={16} /> Dostępny</div>

      <div className="purchase-block">
        <div className="block-header">
          <h4>WERSJA PROJEKTU</h4>
          <a>Porównaj wersje <ChevronRight size={14} /></a>
        </div>

        {project.variants.length > 0 ? (
          project.variants.map((variant) => (
            <button className="variant-row" key={variant.name}>
              <span>{variant.name}</span>
              <strong>+{money(variant.priceGross)}</strong>
            </button>
          ))
        ) : (
          <p className="muted-note">Warianty dodasz w danych projektu.</p>
        )}
      </div>

      <div className="purchase-block">
        <h4>DODATKI</h4>
        {project.addons.map((addon) => (
          <label className="addon-row" key={addon.code} title={addon.description}>
            <input
              type="checkbox"
              checked={selectedAddons.includes(addon.code)}
              onChange={() => toggleAddon(addon.code)}
            />
            <span>{addon.name}</span>
            <strong>+{money(addon.priceGross)}</strong>
            <Info size={14} />
          </label>
        ))}
      </div>

      <button className="buy-button"><ShoppingCart size={18} /> DODAJ DO KOSZYKA</button>
      <button className="ask-button"><Mail size={17} /> ZAPYTAJ O PROJEKT</button>

      <div className="micro-trust">
        <span><Truck size={16} /> Dostawa zgodnie z zamówieniem</span>
        <span><ShieldCheck size={16} /> Bezpieczne płatności online</span>
        <span><BadgeCheck size={16} /> PDF/link po płatności</span>
      </div>
    </aside>
  );
}
