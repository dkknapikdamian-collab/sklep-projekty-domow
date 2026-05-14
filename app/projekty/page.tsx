import Link from "next/link";
import { Header } from "@/components/Header";
import { EmptyProjectsState } from "@/components/EmptyProjectsState";
import { ProjectCard } from "@/components/project/ProjectCard";
import { getPublicProjects } from "@/lib/project-repository";
import {
  buildCatalogOptions,
  filterPublicProjects,
  getCatalogFiltersFromSearchParams,
  hasPublicCatalogFilters
} from "@/lib/public-catalog-filters";
import { Search, X } from "lucide-react";

export const dynamic = "force-dynamic";

type ProjectsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const projects = await getPublicProjects();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const filters = getCatalogFiltersFromSearchParams(resolvedSearchParams);
  const filteredProjects = filterPublicProjects(projects, filters);
  const options = buildCatalogOptions(projects);
  const filtersActive = hasPublicCatalogFilters(filters);

  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="catalog-header">
          <span>KATALOG PROJEKTÓW</span>
          <h1>Projekty domów</h1>
          <p>Katalog pokazuje wyłącznie projekty dodane w adminie i oznaczone jako aktywne.</p>
        </section>

        <form className="catalog-search catalog-search-live" action="/projekty" method="get" data-public-catalog-search="query-params">
          <input
            name="q"
            placeholder="Szukaj po nazwie, kodzie, metrażu, działce..."
            defaultValue={filters.q}
          />
          <button type="submit"><Search size={20} /> Szukaj</button>
        </form>

        {projects.length > 0 ? (
          <section className="catalog-layout">
            <aside className="filters">
              <form action="/projekty" method="get" data-public-catalog-filters="query-params">
                <h3>Filtry</h3>

                <label>
                  Szukaj
                  <input name="q" placeholder="Nazwa, kod, slug..." defaultValue={filters.q} />
                </label>

                <label>
                  Styl domu
                  <select name="style" defaultValue={filters.style}>
                    <option value="">Wszystkie style</option>
                    {options.styles.map((style) => <option value={style} key={style}>{style}</option>)}
                  </select>
                </label>

                <label>
                  Powierzchnia
                  <span className="catalog-range-inline">
                    <input name="areaFrom" placeholder="od" defaultValue={filters.areaFrom} inputMode="decimal" />
                    <input name="areaTo" placeholder="do" defaultValue={filters.areaTo} inputMode="decimal" />
                  </span>
                </label>

                <label>
                  Garaż
                  <select name="garage" defaultValue={filters.garage}>
                    <option value="">Dowolnie</option>
                    {options.garages.map((garage) => <option value={garage} key={garage}>{garage}</option>)}
                  </select>
                </label>

                <label>
                  Typ domu
                  <select name="type" defaultValue={filters.type}>
                    <option value="">Dowolnie</option>
                    {options.types.map((type) => <option value={type} key={type}>{type}</option>)}
                  </select>
                </label>

                <label>
                  Technologia
                  <select name="technology" defaultValue={filters.technology}>
                    <option value="">Dowolnie</option>
                    {options.technologies.map((technology) => <option value={technology} key={technology}>{technology}</option>)}
                  </select>
                </label>

                <label>
                  Liczba pokoi
                  <select name="rooms" defaultValue={filters.rooms}>
                    <option value="">Wszystkie</option>
                    {options.rooms.map((rooms) => <option value={rooms} key={rooms}>{rooms}</option>)}
                  </select>
                </label>

                <label>
                  Kondygnacje
                  <select name="floors" defaultValue={filters.floors}>
                    <option value="">Dowolnie</option>
                    {options.floors.map((floors) => <option value={floors} key={floors}>{floors}</option>)}
                  </select>
                </label>

                <div className="catalog-filter-actions">
                  <button type="submit"><Search size={17} /> Zastosuj filtry</button>
                  {filtersActive && (
                    <Link href="/projekty" className="catalog-clear-filters"><X size={16} /> Wyczyść</Link>
                  )}
                </div>
              </form>
            </aside>

            <div>
              <div className="catalog-toolbar" data-public-catalog-results="true">
                <strong>{filteredProjects.length} z {projects.length} projektów</strong>
                <span>{filtersActive ? "Filtry aktywne" : "Sortowanie: polecane"}</span>
              </div>

              {filteredProjects.length > 0 ? (
                <div className="project-grid">
                  {filteredProjects.map((project) => <ProjectCard key={project.code} project={project} />)}
                </div>
              ) : (
                <section className="empty-state catalog-filter-empty" data-public-catalog-filter-empty="true">
                  <span>BRAK WYNIKÓW</span>
                  <h2>Nie znaleźliśmy projektu dla tych filtrów.</h2>
                  <p>Filtry działają na aktywnych projektach z Supabase. Zmień parametry albo wyczyść filtr.</p>
                  <Link href="/projekty" className="empty-link">Wyczyść filtry</Link>
                </section>
              )}
            </div>
          </section>
        ) : (
          <EmptyProjectsState />
        )}
      </main>
    </>
  );
}
