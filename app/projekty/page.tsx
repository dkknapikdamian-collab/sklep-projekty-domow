import { Header } from "@/components/Header";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-page-head">
          <span>KATALOG PROJEKTÓW</span>
          <h1>Projekty podpięte pod jeden dynamiczny szablon</h1>
          <p>
            Kliknij dowolny projekt. Ta sama karta projektu podmienia nazwę, kod, cenę, parametry, media, rzuty i dodatki.
          </p>
        </section>

        <section className="catalog-layout-v3">
          <aside className="catalog-filter">
            <h3>Filtry demo</h3>
            <label>
              Szukaj
              <input placeholder="np. 100m2, garaż, działka 20x30" />
            </label>
            <label>
              Typ
              <select>
                <option>Dowolny</option>
                <option>Parterowy</option>
                <option>Z poddaszem</option>
              </select>
            </label>
            <label>
              Garaż
              <select>
                <option>Dowolnie</option>
                <option>Brak</option>
                <option>1 stanowisko</option>
                <option>2 stanowiska</option>
              </select>
            </label>
            <button>Filtruj</button>
          </aside>

          <div>
            <div className="catalog-toolbar">
              <strong>{projects.length} projekty demo</strong>
              <span>Sortowanie: polecane</span>
            </div>
            <div className="catalog-grid">
              {projects.map((project) => <ProjectCard key={project.code} project={project} />)}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
