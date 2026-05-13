import { Header } from "@/components/Header";

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-page-head">
          <span>KOSZYK</span>
          <h1>Koszyk jest pusty.</h1>
          <p>
            Projekty i dodatki trafią tutaj dopiero po dodaniu realnego projektu do katalogu.
          </p>
        </section>
      </main>
    </>
  );
}
