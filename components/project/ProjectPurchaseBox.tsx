"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, ChevronRight, Info, Mail, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import type { Project } from "@/types/project";
import { money } from "@/lib/format";
import { addCartItem } from "@/lib/cart/storage";

export function ProjectPurchaseBox({ project }: { project: Project }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [cartMessage, setCartMessage] = useState("");
  const orderedAddons = useMemo(() => {
    return [...project.addons].sort((left, right) => {
      const leftName = `${left.code} ${left.name}`.toLowerCase();
      const rightName = `${right.code} ${right.name}`.toLowerCase();
      const rank = (value: string) => {
        if (value.includes("pdf") || value.includes("email") || value.includes("e-mail")) return 0;
        if (value.includes("cost") || value.includes("kosztorys")) return 1;
        return 2;
      };

      return rank(leftName) - rank(rightName);
    });
  }, [project.addons]);

  const addonsTotal = useMemo(() => {
    return orderedAddons
      .filter((addon) => selectedAddons.includes(addon.code))
      .reduce((sum, addon) => sum + addon.priceGross, 0);
  }, [orderedAddons, selectedAddons]);

  const selectedVariantPrice = selectedVariant === 0 ? 0 : project.variants[selectedVariant - 1]?.priceGross || 0;
  const selectedVariantName = selectedVariant === 0 ? "Projekt podstawowy" : project.variants[selectedVariant - 1]?.name || "Projekt podstawowy";
  const total = project.priceGross + selectedVariantPrice + addonsTotal;

  function toggleAddon(code: string) {
    setSelectedAddons((current) =>
      current.includes(code) ? current.filter((item) => item !== code) : [...current, code]
    );
  }

  function handleAddToCart() {
    const addons = orderedAddons.map((addon) => ({
      code: addon.code,
      name: addon.name,
      priceGross: addon.priceGross,
      description: addon.description,
      deliveryAction: addon.deliveryAction
    }));

    addCartItem({
      projectCode: project.code,
      projectSlug: project.slug,
      projectName: project.name,
      basePriceGross: project.priceGross,
      variantName: selectedVariantName,
      variantPriceGross: selectedVariantPrice,
      selectedAddons: addons.filter((addon) => selectedAddons.includes(addon.code)),
      availableAddons: addons
    });

    setCartMessage("Projekt dodany do koszyka.");
    window.location.assign("/koszyk");
  }

  return (
    <aside className="purchase-card">
      <div className="code-line">KOD PROJEKTU: <strong>{project.shortCode}</strong></div>

      <div className="price-line">
        <strong>{money(total)}</strong>
        <span>z VAT</span>
      </div>

      <div className="available-line"><BadgeCheck size={16} /> Dostepny</div>

      <div className="purchase-block" id="project-variants">
        <div className="block-header">
          <h4>WERSJA PROJEKTU</h4>
          <a href="#project-variants">Porownaj wersje <ChevronRight size={14} /></a>
        </div>

        {project.variants.length > 0 ? (
          <>
            <button
              className={selectedVariant === 0 ? "variant-row active" : "variant-row"}
              key="base-variant"
              type="button"
              onClick={() => setSelectedVariant(0)}
            >
              <span>Projekt podstawowy</span>
              <strong>+{money(0)}</strong>
            </button>
            {project.variants.map((variant, index) => (
              <button
                className={selectedVariant === index + 1 ? "variant-row active" : "variant-row"}
                key={variant.name}
                type="button"
                onClick={() => setSelectedVariant(index + 1)}
              >
                <span>{variant.name}</span>
                <strong>+{money(variant.priceGross)}</strong>
              </button>
            ))}
          </>
        ) : (
          <p className="muted-note">Warianty zostana uzupelnione przez administratora.</p>
        )}
      </div>

      <div className="purchase-block">
        <h4>DODATKI</h4>
        {orderedAddons.length > 0 ? (
          orderedAddons.map((addon) => (
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
          ))
        ) : (
          <p className="muted-note">Dodatki zostana uzupelnione przez administratora.</p>
        )}
      </div>

      <button className="buy-button" type="button" onClick={handleAddToCart}><ShoppingCart size={18} /> DODAJ DO KOSZYKA</button>
      {cartMessage && <p className="muted-note" role="status">{cartMessage}</p>}
      <a className="ask-button" href={`mailto:kontakt@domprojekt.pl?subject=Pytanie o projekt ${encodeURIComponent(project.name)}`}>
        <Mail size={17} /> ZAPYTAJ O PROJEKT
      </a>

      <div className="micro-trust">
        <span><Truck size={16} /> Dostawa zgodnie z zamowieniem</span>
        <span><ShieldCheck size={16} /> Bezpieczne platnosci online</span>
        <span><BadgeCheck size={16} /> PDF/link po platnosci</span>
      </div>
    </aside>
  );
}
