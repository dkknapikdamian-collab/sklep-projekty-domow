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
      <section
        className="checkout-success"
        data-order-success-v38="true"
        data-checkout-non-public-success-v31="true"
      >
        <h2>{state.message}</h2>
        <p>Numer zamówienia testowego: {state.orderId}</p>
        <p>
          Zamówienie zostało zapisane bez uruchamiania płatności. To techniczny test
          procesu przed integracją płatności online, webhooków i statusów płatności.
          Ekran nie jest przeznaczony do publicznego użycia.
        </p>
        <Link className="empty-link" href="/projekty">Wróć do projektów</Link>
      </section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className="empty-state">
        <span>ZAMÓWIENIE TESTOWE</span>
        <h1>Nie masz pozycji w koszyku.</h1>
        <p>Najpierw wybierz projekt, wariant i dodatki na karcie projektu.</p>
        <Link className="empty-link" href="/projekty">Przejdź do projektów</Link>
      </section>
    );
  }

  return (
    <section
      className="checkout-layout"
      data-checkout-form-v38="true"
      data-checkout-non-public-v31="true"
      data-order-without-payment-v31="true"
      data-payment-later-v31="true"
    >
      <form action={formAction} className="checkout-form">
        <input type="hidden" name="cartJson" value={cartJson} />

        <div className="checkout-form-intro" data-checkout-v43-copy="true">
          <h2>Dane do zamówienia testowego</h2>
          <p>
            Ten formularz służy do technicznego sprawdzenia zapisu zamówienia z koszyka.
            Wysłanie formularza nie uruchamia płatności ani dostarczenia plików. Publiczne
            udostępnienie checkoutu wymaga osobnego etapu integracji płatności online,
            webhooków i statusów płatności.
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
          <span>Akceptuję zapis danych w technicznym teście zamówienia.</span>
        </label>

        <label className="checkout-checkbox">
          <input type="checkbox" name="contactConsent" required />
          <span>Potwierdzam poprawność danych i wybranych pozycji koszyka.</span>
        </label>

        {state.message && <p className="admin-form-error">{state.message}</p>}

        <button className="buy-button" type="submit" disabled={pending}>
          <Send size={17} /> {pending ? "Zapisywanie..." : "Zapisz zamówienie testowe"}
        </button>
      </form>

      <aside className="checkout-summary">
        <h2>Zakres testowego zamówienia</h2>
        <p>
          Podsumowanie obejmuje projekt, wariant oraz dodatki wybrane w koszyku. Ten etap
          nie obsługuje płatności online, potwierdzenia płatności ani automatycznej wysyłki
          plików. Checkout ma pozostać niewidoczny publicznie do czasu gotowości sklepu.
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
        <div
          className="checkout-summary-note"
          data-checkout-v43-delivery-note="true"
          data-checkout-non-public-summary-v31="true"
        >
          <p>
            Zamówienie jest zapisem technicznym bez płatności. Publiczne użycie checkoutu
            wymaga osobnej integracji płatności online, webhooków i statusów płatności.
          </p>
          <p>
            Pliki projektu nie są wydawane automatycznie w tym etapie. Dostarczanie plików
            pozostaje poza publicznym flow do czasu decyzji o docelowym modelu realizacji.
          </p>
          {hasPdfEmailAddon && (
            <p>
              PDF na e-mail pozostaje dodatkiem zapisanym w zamówieniu testowym. Jego
              finalna obsługa musi zostać spięta z docelowym procesem płatności i realizacji.
            </p>
          )}
        </div>
      </aside>
    </section>
  );
}
