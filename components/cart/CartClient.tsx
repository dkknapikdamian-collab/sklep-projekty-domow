"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import type { CartAddon, CartPayload } from "@/lib/cart/types";
import { cartItemTotal, cartTotal, readCart, removeCartItem, updateCartItemAddons } from "@/lib/cart/storage";
import { money } from "@/lib/format";

function hasAddon(addons: CartAddon[], code: string) {
  return addons.some((addon) => addon.code === code);
}

export function CartClient() {
  const [cart, setCart] = useState<CartPayload>({ items: [] });

  function refreshCart() {
    setCart(readCart());
  }

  useEffect(() => {
    refreshCart();
    window.addEventListener("project-cart-updated", refreshCart);
    return () => window.removeEventListener("project-cart-updated", refreshCart);
  }, []);

  function handleRemove(itemId: string) {
    removeCartItem(itemId);
    refreshCart();
  }

  function handleAddonChange(itemId: string, addon: CartAddon) {
    const item = cart.items.find((current) => current.id === itemId);
    if (!item) return;

    const nextAddons = hasAddon(item.selectedAddons, addon.code)
      ? item.selectedAddons.filter((current) => current.code !== addon.code)
      : [...item.selectedAddons, addon];

    updateCartItemAddons(itemId, nextAddons);
    refreshCart();
  }

  if (cart.items.length === 0) {
    return (
      <section className="empty-state">
        <span>KOSZYK</span>
        <h1>Koszyk jest pusty.</h1>
        <p>Dodaj projekt z publicznej karty, wybierajac wariant i dodatki. Koszyk V1 zapisuje sie lokalnie w tej przegladarce.</p>
        <Link className="empty-link" href="/projekty">Przejdz do projektow</Link>
      </section>
    );
  }

  return (
    <section className="cart-layout" data-cart-v38="true">
      <div className="cart-items">
        {cart.items.map((item) => (
          <article className="cart-item" key={item.id}>
            <div>
              <span>{item.projectCode}</span>
              <h2>{item.projectName}</h2>
              <p>{item.variantName}: {money(item.variantPriceGross)}</p>
            </div>

            <div className="cart-price-lines">
              <span>Projekt: <strong>{money(item.basePriceGross)}</strong></span>
              <span>Wariant: <strong>{money(item.variantPriceGross)}</strong></span>
              <span>Suma pozycji: <strong>{money(cartItemTotal(item))}</strong></span>
            </div>

            {item.availableAddons.length > 0 && (
              <div className="cart-addons">
                <h3>Edytuj dodatki</h3>
                {item.availableAddons.map((addon) => (
                  <label key={addon.code}>
                    <input
                      type="checkbox"
                      checked={hasAddon(item.selectedAddons, addon.code)}
                      onChange={() => handleAddonChange(item.id, addon)}
                    />
                    <span>{addon.name}</span>
                    <strong>+{money(addon.priceGross)}</strong>
                  </label>
                ))}
              </div>
            )}

            <button className="cart-remove" type="button" onClick={() => handleRemove(item.id)}>
              <Trash2 size={16} /> Usun pozycje
            </button>
          </article>
        ))}
      </div>

      <aside className="cart-summary">
        <ShoppingCart size={24} />
        <h2>Podsumowanie</h2>
        <p>Po wyslaniu zamowienia skontaktujemy sie w sprawie platnosci i realizacji.</p>
        <strong>{money(cartTotal(cart))}</strong>
        <Link className="buy-button" href="/zamowienie">Przejdz do zamowienia</Link>
      </aside>
    </section>
  );
}
