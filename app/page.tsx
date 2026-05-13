import Link from "next/link";
import { Header } from "@/components/Header";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="home-hero">
          <span>DOMPROJEKT / DYNAMICZNY SZABLON</span>
          <h1>Jeden szablon karty, wiele projektów.</h1>
          <p>
            Ten etap wdraża dynamiczną strukturę: dane, opisy, zdjęcia, rzuty i dodatki są podstawiane z projektu, a nie wpisywane ręcznie w stronie.
          </p>
          <div>
            <Link href="/projekty" className="home-cta">Zobacz katalog</Link>
            <Link href="/projekty/dom-w-aurorach-14" className="home-ghost">Zobacz kartę wzorcową</Link>
          </div>
        </section>

        <section className="catalog-preview">
          <div className="catalog-head">
            <h2>Projekty demo</h2>
            <p>Każdy projekt ma własny folder mediów po kodzie projektu.</p>
          </div>
          <div className="catalog-grid">
            {projects.map((project) => <ProjectCard key={project.code} project={project} />)}
          </div>
        </section>
      </main>
    </>
  );
}
