import { Header } from "@/components/Header";
import { CheckoutForm } from "@/components/order/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-header" data-checkout-v43-page-copy="true" data-manual-payment-page-v48="true">
          <span>ZAMÓWIENIE</span>
          <h1>Zamówienie projektu</h1>
          <p>
            Po wysłaniu potwierdzimy dostępność, płatność i sposób realizacji,
            a instrukcję płatności przelewem wyślemy po weryfikacji. Zamówienie
            jest przyjmowane ręcznie, bez Stripe, PayU i automatycznej płatności online.
          </p>
        </section>
        <CheckoutForm />
      </main>
    </>
  );
}
