import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { projects, PDF_EMAIL_ADDON } from "@/data/projects";

export default function CartPage() {
  const project = projects[0];
  const total = project.price + PDF_EMAIL_ADDON.price;

  return (
    <>
      <Header />
      <main>
        <section className="page-hero slim">
          <span className="eyebrow">Koszyk demo</span>
          <h1>Projekt i dodatki przed zamówieniem</h1>
          <p>To jest widok demonstracyjny. Docelowo koszyk będzie zapisywany w sesji/local storage.</p>
        </section>
        <section className="cart-layout">
          <div className="cart-items">
            <article className="cart-item">
              <div>
                <span className="project-code">{project.code}</span>
                <h3>{project.name}</h3>
                <p>{project.shortDescription}</p>
                <div className="addon-preview">Dodatek: {PDF_EMAIL_ADDON.name} +250 zł</div>
              </div>
              <strong>{total.toLocaleString("pl-PL")} zł</strong>
            </article>
          </div>
          <aside className="purchase-box static">
            <span className="eyebrow">Podsumowanie</span>
            <div className="summary-line"><span>Projekt</span><strong>{project.price.toLocaleString("pl-PL")} zł</strong></div>
            <div className="summary-line"><span>PDF na e-mail</span><strong>250 zł</strong></div>
            <div className="summary-total"><span>Razem</span><strong>{total.toLocaleString("pl-PL")} zł</strong></div>
            <Link className="primary-cta" href="/zamowienie">Przejdź do zamówienia</Link>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
