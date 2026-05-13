import { Header } from "@/components/Header";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-header">
          <span>ZAMÓWIENIE</span>
          <h1>Checkout produkcyjny będzie tworzył rekord zamówienia.</h1>
          <p>Kolejny etap: koszyk, dane klienta, zgody, płatność, e-mail i dostawa PDF/linku po płatności.</p>
        </section>
      </main>
    </>
  );
}
