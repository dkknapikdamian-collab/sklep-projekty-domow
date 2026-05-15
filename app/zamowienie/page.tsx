import { Header } from "@/components/Header";
import { CheckoutForm } from "@/components/order/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-header" data-checkout-v43-page-copy="true">
          <span>ZAMÓWIENIE</span>
          <h1>Zamówienie projektu</h1>
          <p>
            Po wysłaniu potwierdzimy dostępność, płatność i sposób realizacji.
            Zamówienie jest przyjmowane ręcznie, bez automatycznej płatności online.
          </p>
        </section>
        <CheckoutForm />
      </main>
    </>
  );
}
