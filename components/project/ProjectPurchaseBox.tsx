"use client";

import { useMemo, useState } from "react";
import { Project } from "@/data/projects";
import { BadgeCheck, ChevronRight, Mail, ShieldCheck, ShoppingCart, Truck } from "lucide-react";

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

      <div className="price">
        <strong>{total.toLocaleString("pl-PL")} zł</strong>
        <span>z VAT</span>
      </div>

      <div className="available"><BadgeCheck size={16} /> Dostępny</div>

      <div className="purchase-section">
        <div className="section-row">
          <h4>WERSJA PROJEKTU</h4>
          <a>Porównaj wersje <ChevronRight size={14} /></a>
        </div>
        {project.variants.map((variant) => (
          <button className="option-row" key={variant.name}>
            <span>{variant.name}</span>
            <strong>+{variant.priceGross} zł</strong>
          </button>
        ))}
      </div>

      <div className="purchase-section">
        <h4>DODATKI</h4>
        {project.addons.map((addon) => (
          <label className="checkbox-row" key={addon.code} title={addon.description}>
            <input
              type="checkbox"
              checked={selectedAddons.includes(addon.code)}
              onChange={() => toggleAddon(addon.code)}
            />
            <span>{addon.name}</span>
            <strong>+{addon.priceGross} zł</strong>
            <i>ⓘ</i>
          </label>
        ))}
      </div>

      <button className="main-buy"><ShoppingCart size={18} /> DODAJ DO KOSZYKA</button>
      <button className="ask-btn"><Mail size={17} /> ZAPYTAJ O PROJEKT</button>

      <div className="micro-trust">
        <span><Truck size={16} /> Dostawa zgodnie z zamówieniem</span>
        <span><ShieldCheck size={16} /> Bezpieczne płatności online</span>
        <span><BadgeCheck size={16} /> PDF/link po płatności</span>
      </div>
    </aside>
  );
}
