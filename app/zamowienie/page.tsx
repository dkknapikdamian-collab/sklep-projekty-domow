import { Header } from "@/components/Header";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-page-head">
          <span>ZAMÓWIENIE</span>
          <h1>Checkout zostanie podłączony po wdrożeniu koszyka i zamówień.</h1>
          <p>
            Produkcyjnie ten etap będzie tworzył rekord zamówienia z klientem, projektem, dodatkami, statusem płatności i statusem wysyłki.
          </p>
        </section>
      </main>
    </>
  );
}
