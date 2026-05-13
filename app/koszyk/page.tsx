import Link from "next/link";
import { Header } from "@/components/Header";
import { projects } from "@/data/projects";

export default function CartPage() {
  const project = projects[0];
  const pdfAddon = project.addons.find((addon) => addon.code === "PDF_EMAIL_PACKAGE");
  const total = project.priceGross + (pdfAddon?.priceGross ?? 0);

  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-page-head">
          <span>KOSZYK DEMO</span>
          <h1>Koszyk będzie korzystał z dynamicznych danych projektu</h1>
          <p>Na razie pokazujemy przykład z dodatkiem PDF na e-mail.</p>
        </section>

        <section className="checkout-demo-grid">
          <article className="checkout-demo-card">
            <span>{project.code}</span>
            <h2>{project.name}</h2>
            <p>{project.subtitle}</p>
            <div className="summary-line"><span>Projekt</span><strong>{project.priceGross.toLocaleString("pl-PL")} zł</strong></div>
            {pdfAddon && <div className="summary-line"><span>{pdfAddon.name}</span><strong>{pdfAddon.priceGross.toLocaleString("pl-PL")} zł</strong></div>}
            <div className="summary-total"><span>Razem</span><strong>{total.toLocaleString("pl-PL")} zł</strong></div>
            <Link href="/zamowienie" className="home-cta">Przejdź do zamówienia</Link>
          </article>
        </section>
      </main>
    </>
  );
}
