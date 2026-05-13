import { Header } from "@/components/Header";
import { getPublishedProjects } from "@/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";
import { EmptyProjectsState } from "@/components/EmptyProjectsState";

export default function ProjectsPage() {
  const projects = getPublishedProjects();

  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-page-head">
          <span>KATALOG PROJEKTÓW</span>
          <h1>Projekty domów</h1>
          <p>
            Katalog pokazuje wyłącznie projekty dodane i oznaczone jako opublikowane.
          </p>
        </section>

        {projects.length > 0 ? (
          <section className="catalog-layout-v4">
            <aside className="catalog-filter">
              <h3>Filtry</h3>
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
                <strong>{projects.length} projektów</strong>
                <span>Sortowanie: polecane</span>
              </div>
              <div className="catalog-grid">
                {projects.map((project) => <ProjectCard key={project.code} project={project} />)}
              </div>
            </div>
          </section>
        ) : (
          <EmptyProjectsState />
        )}
      </main>
    </>
  );
}
