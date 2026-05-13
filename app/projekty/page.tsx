import { Header } from "@/components/Header";
import { EmptyProjectsState } from "@/components/EmptyProjectsState";
import { ProjectCard } from "@/components/project/ProjectCard";
import { getPublicProjects } from "@/lib/project-repository";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-header">
          <span>KATALOG PROJEKTÓW</span>
          <h1>Projekty domów</h1>
          <p>Katalog pokazuje wyłącznie projekty dodane w adminie i oznaczone jako aktywne.</p>
        </section>

        <section className="catalog-search">
          <input placeholder="Szukaj po nazwie, kodzie, metrażu, działce..." />
          <button><Search size={20} /> Szukaj</button>
        </section>

        {projects.length > 0 ? (
          <section className="catalog-layout">
            <aside className="filters">
              <h3>Filtry</h3>
              <label>Styl domu<select><option>Wszystkie style</option></select></label>
              <label>Powierzchnia<input placeholder="od – do" /></label>
              <label>Garaż<select><option>Dowolnie</option></select></label>
              <label>Kondygnacje<select><option>Dowolnie</option></select></label>
            </aside>
            <div>
              <div className="catalog-toolbar">
                <strong>{projects.length} projektów</strong>
                <span>Sortowanie: polecane</span>
              </div>
              <div className="project-grid">
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
