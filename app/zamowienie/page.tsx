import { Header } from "@/components/Header";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-page-head">
          <span>CHECKOUT DEMO</span>
          <h1>Tu później powstanie rekord zamówienia</h1>
          <p>
            Kolejny etap po dynamicznym szablonie: koszyk + checkout zapisujący klienta, projekt, dodatki, status płatności i status wysyłki.
          </p>
        </section>

        <section className="checkout-demo-grid">
          <form className="checkout-form">
            <input placeholder="Imię i nazwisko" />
            <input placeholder="E-mail do wysyłki projektu/PDF" />
            <input placeholder="Telefon" />
            <textarea placeholder="Uwagi do zamówienia" />
            <label><input type="checkbox" /> Akceptuję regulamin</label>
            <label><input type="checkbox" /> Chcę otrzymać treści cyfrowe po płatności</label>
            <button type="button">Złóż zamówienie demo</button>
          </form>
        </section>
      </main>
    </>
  );
}
