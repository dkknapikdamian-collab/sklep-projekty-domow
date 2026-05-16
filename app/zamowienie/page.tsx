import { Header } from "@/components/Header";
import { CheckoutForm } from "@/components/order/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section
          className="catalog-header"
          data-checkout-v43-page-copy="true"
          data-checkout-non-public-v31="true"
          data-order-without-payment-v31="true"
          data-payment-later-v31="true"
        >
          <span>ZAMĂ“WIENIE TESTOWE</span>
          <h1>Techniczny test zamĂłwienia</h1>
          <p>
            Ten ekran zapisuje zamĂłwienie bez pĹ‚atnoĹ›ci. To etap techniczny przed integracjÄ…
            pĹ‚atnoĹ›ci online, webhookĂłw i statusĂłw pĹ‚atnoĹ›ci. Checkout pozostaje niewidoczny
            publicznie do czasu gotowoĹ›ci sklepu.
          </p>
        </section>
        <CheckoutForm />
      </main>
    </>
  );
}