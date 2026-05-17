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
          data-checkout-stripe-v39a="true"
          data-payment-online-foundation-v39a="true"
        >
          <span>PŁATNOŚĆ ONLINE</span>
          <h1>Zamówienie i płatność</h1>
          <p>
            Ten etap tworzy fundament realnych płatności online. Status paid pochodzi z webhooka,
            a pliki projektu są udostępniane dopiero po potwierdzeniu płatności po stronie serwera.
          </p>
        </section>
        <CheckoutForm />
      </main>
    </>
  );
}
