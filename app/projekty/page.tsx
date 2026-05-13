import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { SearchBox } from "@/components/SearchBox";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero slim">
          <span className="eyebrow">Katalog projektów</span>
          <h1>Projekty domów z czytelnymi parametrami</h1>
          <p>Wersja demo katalogu. Docelowo filtry będą działać po bazie i indeksie wyszukiwania.</p>
        </section>

        <section className="catalog-layout">
          <aside className="filter-panel">
            <h3>Filtry demo</h3>
            <label>Powierzchnia<input placeholder="np. do 120 m²" /></label>
            <label>Działka<input placeholder="np. 20x30" /></label>
            <label>Garaż<select><option>Dowolny</option><option>Brak</option><option>1 stanowisko</option><option>2 stanowiska</option></select></label>
            <button>Filtruj</button>
          </aside>
          <div className="catalog-content">
            <div className="catalog-topline">
              <strong>{projects.length} projekty demo</strong>
              <span>Sortowanie: polecane</span>
            </div>
            <div className="project-grid">
              {projects.map((project) => <ProjectCard key={project.code} project={project} />)}
            </div>
          </div>
        </section>

        <SearchBox />
      </main>
      <Footer />
    </>
  );
}
