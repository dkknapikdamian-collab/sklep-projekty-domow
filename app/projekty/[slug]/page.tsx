import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HouseVisual } from "@/components/HouseVisual";
import { ProjectPurchaseBox } from "@/components/ProjectPurchaseBox";
import { SpecsStrip } from "@/components/SpecsStrip";
import { RoomsTable } from "@/components/RoomsTable";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectBySlug, projects } from "@/data/projects";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <>
      <Header />
      <main>
        <section className="project-detail">
          <div className="breadcrumb">Strona główna / Projekty / {project.name}</div>
          <div className="project-detail-grid">
            <div>
              <div className="project-title-row">
                <div>
                  <span className="project-code">{project.code}</span>
                  <h1>{project.name}</h1>
                  <p>{project.shortDescription}</p>
                </div>
                {project.badge && <span className="badge">{project.badge}</span>}
              </div>
              <div className="gallery-card">
                <HouseVisual />
              </div>
              <div className="thumb-row">
                <span>Wizualizacja</span>
                <span>Rzut parteru</span>
                <span>Elewacje</span>
                <span>Przekrój</span>
              </div>
            </div>
            <ProjectPurchaseBox project={project} />
          </div>
        </section>

        <section className="section no-top">
          <SpecsStrip project={project} />
        </section>

        <section className="project-content">
          <div className="content-main">
            <div className="content-card">
              <span className="eyebrow">Opis projektu</span>
              <h2>Dom zaprojektowany prosto, czytelnie i sprzedażowo</h2>
              <p>{project.longDescription}</p>
              <p>
                To miejsce w produkcji będzie pobierane z panelu admina. Opis nie jest wpisany w komponent, tylko idzie z danych projektu.
              </p>
            </div>

            <div className="content-card">
              <span className="eyebrow">Rzuty i pomieszczenia</span>
              <h2>Tabela pomieszczeń</h2>
              <RoomsTable project={project} />
            </div>

            <div className="content-card">
              <span className="eyebrow">Działka</span>
              <h2>Czy projekt pasuje do Twojej działki?</h2>
              <p>
                Minimalne wymiary działki dla tego projektu: <strong>{project.minPlotWidth} × {project.minPlotLength} m</strong>.
              </p>
              <a className="secondary-cta" href="#zapytaj">Sprawdź z doradcą</a>
            </div>

            <div className="content-card" id="zapytaj">
              <span className="eyebrow">Zapytanie</span>
              <h2>Zapytaj o ten projekt</h2>
              <form className="inquiry-form">
                <input placeholder="Imię i nazwisko" />
                <input placeholder="E-mail" />
                <input placeholder="Telefon" />
                <textarea placeholder={`Dzień dobry, interesuje mnie projekt ${project.code}...`} />
                <button type="button">Wyślij zapytanie</button>
              </form>
            </div>
          </div>

          <aside className="side-note">
            <h3>Co zawiera projekt?</h3>
            <ul>
              <li>Projekt architektoniczny</li>
              <li>Parametry techniczne</li>
              <li>Rzuty i elewacje</li>
              <li>Możliwość dodatku PDF na e-mail</li>
              <li>Faktura i obsługa zamówienia</li>
            </ul>
          </aside>
        </section>

        <section className="section">
          <div className="section-heading">
            <span>Podobne projekty</span>
            <h2>Sprawdź też</h2>
          </div>
          <div className="project-grid compact">
            {related.map((item) => <ProjectCard key={item.code} project={item} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
