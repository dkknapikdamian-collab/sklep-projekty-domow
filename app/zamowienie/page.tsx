import { Header } from "@/components/Header";
import { CheckoutForm } from "@/components/order/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-header">
          <span>ZAMOWIENIE</span>
          <h1>Zamowienie testowe</h1>
          <p>W V1 nie uruchamiamy automatycznej platnosci. Po wyslaniu formularza rekord trafi do Supabase.</p>
        </section>
        <CheckoutForm />
      </main>
    </>
  );
}
