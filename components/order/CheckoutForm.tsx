"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { submitOrderAction, type CheckoutState } from "@/app/zamowienie/actions";
import type { CartPayload } from "@/lib/cart/types";
import { cartTotal, clearCart, readCart } from "@/lib/cart/storage";
import { money } from "@/lib/format";

const initialState: CheckoutState = {
  ok: false,
  message: ""
};

export function CheckoutForm() {
  const [state, formAction, pending] = useActionState(submitOrderAction, initialState);
  const [cart, setCart] = useState<CartPayload>({ items: [] });
  const cartJson = useMemo(() => JSON.stringify(cart), [cart]);

  useEffect(() => {
    setCart(readCart());
  }, []);

  useEffect(() => {
    if (!state.ok) return;
    clearCart();
    setCart({ items: [] });
  }, [state.ok]);

  if (state.ok) {
    return (
      <section className="checkout-success" data-order-success-v38="true">
        <h2>{state.message}</h2>
        <p>Numer techniczny zamowienia: {state.orderId}</p>
        <Link className="empty-link" href="/projekty">Wroc do projektow</Link>
      </section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className="empty-state">
        <span>ZAMOWIENIE</span>
        <h1>Nie masz pozycji w koszyku.</h1>
        <p>Najpierw wybierz projekt, wariant i dodatki na karcie projektu.</p>
        <Link className="empty-link" href="/projekty">Przejdz do projektow</Link>
      </section>
    );
  }

  return (
    <section className="checkout-layout" data-checkout-form-v38="true">
      <form action={formAction} className="checkout-form">
        <input type="hidden" name="cartJson" value={cartJson} />

        <label>
          Imie i nazwisko *
          <input name="customerName" required />
        </label>

        <label>
          E-mail *
          <input name="customerEmail" type="email" required />
        </label>

        <label>
          Telefon *
          <input name="customerPhone" required />
        </label>

        <label>
          Dane do faktury
          <textarea name="invoiceData" placeholder="NIP, nazwa firmy, adres..." />
        </label>

        <label>
          Uwagi
          <textarea name="notes" placeholder="Termin kontaktu, pytania, preferencje..." />
        </label>

        <label className="checkout-checkbox">
          <input type="checkbox" name="termsConsent" required />
          <span>Akceptuje kontakt w sprawie zamowienia testowego.</span>
        </label>

        <label className="checkout-checkbox">
          <input type="checkbox" name="contactConsent" required />
          <span>Potwierdzam poprawnosc danych i wybranych pozycji koszyka.</span>
        </label>

        {state.message && <p className="admin-form-error">{state.message}</p>}

        <button className="buy-button" type="submit" disabled={pending}>
          <Send size={17} /> {pending ? "Wysylanie..." : "Wyslij zamowienie"}
        </button>
      </form>

      <aside className="checkout-summary">
        <h2>Podsumowanie</h2>
        {cart.items.map((item) => (
          <div className="checkout-summary-item" key={item.id}>
            <strong>{item.projectName}</strong>
            <span>{item.variantName}</span>
            {item.selectedAddons.map((addon) => (
              <span key={addon.code}>{addon.name}: +{money(addon.priceGross)}</span>
            ))}
          </div>
        ))}
        <strong className="checkout-total">{money(cartTotal(cart))}</strong>
      </aside>
    </section>
  );
}
