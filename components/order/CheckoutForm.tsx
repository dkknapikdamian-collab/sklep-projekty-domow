"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
import { CreditCard, Send } from "lucide-react";
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
    if (state.checkoutUrl) {
      clearCart();
      setCart({ items: [] });
      window.location.assign(state.checkoutUrl);
      return;
    }
    clearCart();
    setCart({ items: [] });
  }, [state.ok, state.checkoutUrl]);

  if (state.ok) {
    return (
      <section
        className="checkout-success"
        data-order-success-v38="true"
        data-checkout-stripe-v39a="true"
        data-payment-online-foundation-v39a="true"
      >
        <h2>{state.message}</h2>
        <p>Numer zamówienia: {state.orderId}</p>
        {state.checkoutUrl ? (
          <p>Jeżeli przekierowanie nie nastąpi automatycznie, użyj bezpiecznego linku do płatności.</p>
        ) : (
          <p>
            Zamówienie zostało zapisane bez uruchomienia płatności, bo Stripe nie jest jeszcze skonfigurowany
            w zmiennych środowiskowych. Pliki nie zostaną wydane bez webhook-confirmed statusu paid.
          </p>
        )}
        {state.checkoutUrl && <a className="empty-link" href={state.checkoutUrl}>Przejdź do płatności</a>}
        {!state.checkoutUrl && <Link className="empty-link" href="/projekty">Wróć do projektów</Link>}
      </section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className="empty-state">
        <span>KOSZYK</span>
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
      data-checkout-stripe-v39a="true"
      data-payment-online-foundation-v39a="true"
    >
      <form action={formAction} className="checkout-form">
        <input type="hidden" name="cartJson" value={cartJson} />

        <div className="checkout-form-intro" data-checkout-v43-copy="true">
          <h2>Dane do zamówienia i płatności</h2>
          <p>
            Po zapisaniu zamówienia aplikacja utworzy sesję płatności online. Pliki projektu są wydawane
            dopiero po webhooku płatności i statusie paid. To etap testowy realnych płatności, nie wysyłamy
            jeszcze produkcyjnych maili.
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
          <span>Akceptuję zapis danych zamówienia oraz przekierowanie do płatności online.</span>
        </label>

        <label className="checkout-checkbox">
          <input type="checkbox" name="contactConsent" required />
          <span>Potwierdzam poprawność danych i wybranych pozycji koszyka.</span>
        </label>

        {state.message && <p className="admin-form-error">{state.message}</p>}

        <button className="buy-button" type="submit" disabled={pending}>
          <CreditCard size={17} /> {pending ? "Tworzenie płatności..." : "Przejdź do płatności"}
        </button>
      </form>

      <aside className="checkout-summary">
        <h2>Podsumowanie zamówienia</h2>
        <p>
          Po płatności webhook zapisuje status paid. Dopiero wtedy aplikacja tworzy dostęp do aktywnych
          plików projektu i krótkoterminowych signed URL.
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
          data-checkout-stripe-summary-v39a="true"
        >
          <p>
            Płatność online jest źródłem prawdy dopiero po webhooku. Strona sukcesu nie wydaje plików sama.
          </p>
          <p>
            Rzuty pomieszczeń i inne bazowe aktywne pliki projektu będą dostępne po statusie paid.
          </p>
          {hasPdfEmailAddon && (
            <p>
              PDF na e-mail jest dodatkiem. System udostępni go tylko po opłaceniu zamówienia i tylko gdy
              dodatek znajduje się w zamówieniu.
            </p>
          )}
        </div>
      </aside>
    </section>
  );
}
