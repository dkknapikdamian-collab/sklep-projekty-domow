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
        <p>Numer zamĂłwienia testowego: {state.orderId}</p>
        <p>
          ZamĂłwienie zostaĹ‚o zapisane bez uruchamiania pĹ‚atnoĹ›ci. To techniczny test
          procesu przed integracjÄ… pĹ‚atnoĹ›ci online, webhookĂłw i statusĂłw pĹ‚atnoĹ›ci.
          Ekran nie jest przeznaczony do publicznego uĹĽycia.
        </p>
        <Link className="empty-link" href="/projekty">WrĂłÄ‡ do projektĂłw</Link>
      </section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className="empty-state">
        <span>ZAMĂ“WIENIE TESTOWE</span>
        <h1>Nie masz pozycji w koszyku.</h1>
        <p>Najpierw wybierz projekt, wariant i dodatki na karcie projektu.</p>
        <Link className="empty-link" href="/projekty">PrzejdĹş do projektĂłw</Link>
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
          <h2>Dane do zamĂłwienia testowego</h2>
          <p>
            Ten formularz sĹ‚uĹĽy do technicznego sprawdzenia zapisu zamĂłwienia z koszyka.
            WysĹ‚anie formularza nie uruchamia pĹ‚atnoĹ›ci ani dostarczenia plikĂłw. Publiczne
            udostÄ™pnienie checkoutu wymaga osobnego etapu integracji pĹ‚atnoĹ›ci online,
            webhookĂłw i statusĂłw pĹ‚atnoĹ›ci.
          </p>
        </div>

        <label>
          ImiÄ™ i nazwisko *
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
          <span>AkceptujÄ™ zapis danych w technicznym teĹ›cie zamĂłwienia.</span>
        </label>

        <label className="checkout-checkbox">
          <input type="checkbox" name="contactConsent" required />
          <span>Potwierdzam poprawnoĹ›Ä‡ danych i wybranych pozycji koszyka.</span>
        </label>

        {state.message && <p className="admin-form-error">{state.message}</p>}

        <button className="buy-button" type="submit" disabled={pending}>
          <Send size={17} /> {pending ? "Zapisywanie..." : "Zapisz zamĂłwienie testowe"}
        </button>
      </form>

      <aside className="checkout-summary">
        <h2>Zakres testowego zamĂłwienia</h2>
        <p>
          Podsumowanie obejmuje projekt, wariant oraz dodatki wybrane w koszyku. Ten etap
          nie obsĹ‚uguje pĹ‚atnoĹ›ci online, potwierdzenia pĹ‚atnoĹ›ci ani automatycznej wysyĹ‚ki
          plikĂłw. Checkout ma pozostaÄ‡ niewidoczny publicznie do czasu gotowoĹ›ci sklepu.
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
            ZamĂłwienie jest zapisem technicznym bez pĹ‚atnoĹ›ci. Publiczne uĹĽycie checkoutu
            wymaga osobnej integracji pĹ‚atnoĹ›ci online, webhookĂłw i statusĂłw pĹ‚atnoĹ›ci.
          </p>
          <p>
            Pliki projektu nie sÄ… wydawane automatycznie w tym etapie. Dostarczanie plikĂłw
            pozostaje poza publicznym flow do czasu decyzji o docelowym modelu realizacji.
          </p>
          {hasPdfEmailAddon && (
            <p>
              PDF na e-mail pozostaje dodatkiem zapisanym w zamĂłwieniu testowym. Jego
              finalna obsĹ‚uga musi zostaÄ‡ spiÄ™ta z docelowym procesem pĹ‚atnoĹ›ci i realizacji.
            </p>
          )}
        </div>
      </aside>
    </section>
  );
}