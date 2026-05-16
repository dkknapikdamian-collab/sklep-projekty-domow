import { Header } from "@/components/Header";
import { CheckoutForm } from "@/components/order/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-header" data-checkout-v43-page-copy="true" data-payment-direction-page-v48="true" data-legacy-manual-payment-flow-v48="temporary-internal-only">
          <span>ZAMÓWIENIE</span>
          <h1>Zamówienie projektu</h1>
          <p>
            To tymczasowy wewnętrzny flow zamówienia. Nie jest docelowym modelem płatności.
            Przed publicznym udostępnieniem sklepu checkout zostanie spięty z automatycznym providerem płatności, webhookami i statusami płatności.
          </p>
        </section>
        <CheckoutForm />
      </main>
    </>
  );
}
