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
  const hasPdfEmailAddon = useMemo(
    () => cart.items.some((item) => item.selectedAddons.some((addon) => addon.code === "send_pdf_email")),
    [cart]
  );

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
        <p>Numer zamówienia: {state.orderId}</p>
        <p>
          Skontaktujemy się z Tobą, żeby potwierdzić dostępność projektu, dane do płatności przelewem i sposób realizacji.
          Pliki przekażemy po ręcznym potwierdzeniu płatności i realizacji.
        </p>
        <Link className="empty-link" href="/projekty">Wróć do projektów</Link>
      </section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className="empty-state">
        <span>ZAMÓWIENIE</span>
        <h1>Nie masz pozycji w koszyku.</h1>
        <p>Najpierw wybierz projekt, wariant i dodatki na karcie projektu.</p>
        <Link className="empty-link" href="/projekty">Przejdź do projektów</Link>
      </section>
    );
  }

  return (
    <section className="checkout-layout" data-checkout-form-v38="true" data-manual-payment-checkout-v48="true">
      <form action={formAction} className="checkout-form">
        <input type="hidden" name="cartJson" value={cartJson} />

        <div className="checkout-form-intro" data-checkout-v43-copy="true">
          <h2>Dane do zamówienia</h2>
          <p>
            Kupujesz wybrane projekty, warianty i dodatki z koszyka. Po wysłaniu
            formularza skontaktujemy się z Tobą, aby potwierdzić dostępność, płatność i sposób realizacji.
            Instrukcję przelewu wyślemy po weryfikacji. Na tym etapie nie pobieramy płatności online.
          </p>
        </div>

        <label>
          Imię i nazwisko *
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
          <span>Akceptuję kontakt w sprawie zamówienia projektu i ręcznej płatności.</span>
        </label>

        <label className="checkout-checkbox">
          <input type="checkbox" name="contactConsent" required />
          <span>Potwierdzam poprawność danych i wybranych pozycji koszyka.</span>
        </label>

        {state.message && <p className="admin-form-error">{state.message}</p>}

        <button className="buy-button" type="submit" disabled={pending}>
          <Send size={17} /> {pending ? "Wysyłanie..." : "Wyślij zamówienie"}
        </button>
      </form>

      <aside className="checkout-summary">
        <h2>Co zamawiasz?</h2>
        <p>
          Podsumowanie obejmuje wybrany projekt, wariant oraz dodatki. Zamówienie
          nie uruchamia jeszcze automatycznej płatności ani automatycznej wysyłki plików.
        </p>
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
        <div className="checkout-summary-note" data-checkout-v43-delivery-note="true" data-manual-payment-summary-v48="true">
          <p>
            Płatność odbywa się ręcznie po kontakcie z obsługą. Dane do przelewu wyślemy po weryfikacji zamówienia.
          </p>
          <p>
            Pliki projektu przekażemy po ręcznym potwierdzeniu dostępności, płatności i realizacji.
          </p>
          {hasPdfEmailAddon && (
            <p>
              PDF na e-mail oznacza dodatkowy pakiet PDF wysłany na podany adres
              po potwierdzeniu realizacji. Nie zastępuje on ręcznego potwierdzenia
              zamówienia.
            </p>
          )}
        </div>
      </aside>
    </section>
  );
}
