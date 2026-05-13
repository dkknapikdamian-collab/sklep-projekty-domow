import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HouseVisual } from "@/components/HouseVisual";
import { ProjectCard } from "@/components/ProjectCard";
import { SearchBox } from "@/components/SearchBox";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Nowoczesne projekty domów</span>
            <h1>Znajdź projekt domu, który da się zrozumieć w kilka minut.</h1>
            <p>
              Ciemny, prosty katalog projektów z czytelnymi parametrami, rzutami, dodatkami i zakupem bez zbędnych kont.
            </p>
            <div className="hero-actions">
              <Link href="/projekty" className="primary-cta">Zobacz projekty</Link>
              <Link href="/projekty/dom-w-aurorach-14" className="secondary-cta">Zobacz kartę projektu</Link>
            </div>
            <div className="hero-stats">
              <div><strong>3</strong><span>projekty demo</span></div>
              <div><strong>+250 zł</strong><span>PDF na e-mail</span></div>
              <div><strong>1:1</strong><span>design lock</span></div>
            </div>
          </div>
          <div className="hero-visual-card">
            <HouseVisual />
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <span>Wybrane projekty</span>
            <h2>Prosty katalog bez wizualnego hałasu</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.code} project={project} />
            ))}
          </div>
        </section>

        <SearchBox />

        <section className="process-section">
          <div className="section-heading">
            <span>Jak to działa</span>
            <h2>Najpierw projekt, potem zamówienie, płatność i dostawa PDF/linku</h2>
          </div>
          <div className="process-grid">
            <div><strong>01</strong><h3>Wybierz projekt</h3><p>Przeglądasz katalog, parametry, rzuty i pomieszczenia.</p></div>
            <div><strong>02</strong><h3>Dodaj opcje</h3><p>Możesz dodać pakiet PDF na e-mail za +250 zł.</p></div>
            <div><strong>03</strong><h3>Złóż zamówienie</h3><p>System zapisuje pełne dane klienta, projekt i statusy.</p></div>
            <div><strong>04</strong><h3>Odbierz projekt</h3><p>Po płatności klient dostaje PDF albo prywatny link.</p></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
