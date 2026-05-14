import { Header } from "@/components/Header";
import { CartClient } from "@/components/cart/CartClient";

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-header">
          <span>KOSZYK</span>
          <h1>Twoj koszyk</h1>
          <p>Sprawdz wariant, dodatki i sume brutto przed wyslaniem zamowienia testowego.</p>
        </section>
        <CartClient />
      </main>
    </>
  );
}
