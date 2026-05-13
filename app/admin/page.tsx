import { Header } from "@/components/Header";

export default function AdminInfoPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-header">
          <span>ADMIN / ETAP NASTĘPNY</span>
          <h1>Dodawanie projektów na tym etapie odbywa się przez foldery.</h1>
          <p>Docelowo powstanie panel admina. Teraz dodaj projekt przez `content/projects/[KOD]/project.json` i media przez `public/projects/[KOD]/`.</p>
        </section>

        <section className="instruction-card">
          <h2>Jak dodać projekt teraz</h2>
          <ol>
            <li>Skopiuj `content/projects/_TEMPLATE/project.json`.</li>
            <li>Utwórz folder `content/projects/DP-TWOJ-KOD/project.json`.</li>
            <li>Wypełnij realną nazwę, opis, cenę, parametry i ustaw `status: "active"`.</li>
            <li>Dodaj media do `public/projects/DP-TWOJ-KOD/`.</li>
            <li>Uruchom ponownie `npm run dev` albo odśwież stronę.</li>
          </ol>
        </section>
      </main>
    </>
  );
}
