import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero slim">
          <span className="eyebrow">Checkout demo</span>
          <h1>Dane zamówienia i kontakt do wysyłki projektu</h1>
          <p>W produkcji po kliknięciu powstanie rekord zamówienia, klient, order_items, zgody i status płatności.</p>
        </section>
        <section className="checkout-layout">
          <form className="checkout-form">
            <h2>Dane klienta</h2>
            <input placeholder="Imię i nazwisko" />
            <input placeholder="E-mail do wysyłki projektu/PDF" />
            <input placeholder="Telefon" />
            <input placeholder="Dane do faktury / NIP opcjonalnie" />
            <textarea placeholder="Uwagi do zamówienia" />
            <label className="legal-row"><input type="checkbox" /> Akceptuję regulamin i politykę prywatności.</label>
            <label className="legal-row"><input type="checkbox" /> Chcę otrzymać treści cyfrowe po płatności i rozumiem zasady dostarczenia projektu.</label>
            <button type="button">Złóż zamówienie demo</button>
          </form>
          <aside className="purchase-box static">
            <span className="eyebrow">Zamówienie</span>
            <div className="summary-line"><span>Dom w Aurorach 14</span><strong>4 290 zł</strong></div>
            <div className="summary-line"><span>Pakiet PDF na e-mail</span><strong>250 zł</strong></div>
            <div className="summary-total"><span>Razem</span><strong>4 540 zł</strong></div>
            <div className="trust-list">
              <span>Rekord zamówienia w bazie</span>
              <span>E-mail do klienta</span>
              <span>Status płatności</span>
              <span>Status wysyłki PDF/linku</span>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
