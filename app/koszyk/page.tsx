import { Header } from "@/components/Header";

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-header">
          <span>KOSZYK</span>
          <h1>Koszyk jest pusty.</h1>
          <p>Po dodaniu realnego projektu i wdrożeniu koszyka wybrane projekty oraz dodatki pojawią się tutaj.</p>
        </section>
      </main>
    </>
  );
}
