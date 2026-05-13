import Link from "next/link";
import { Header } from "@/components/Header";
import { getPublishedProjects } from "@/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";
import { EmptyProjectsState } from "@/components/EmptyProjectsState";

export default function HomePage() {
  const projects = getPublishedProjects();

  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="home-hero">
          <span>PROJEKTY DOMÓW</span>
          <h1>Nowoczesny katalog projektów domów.</h1>
          <p>
            Wybierz projekt, sprawdź parametry, rzuty i dodatki, a następnie złóż zamówienie online.
          </p>
          <div>
            <Link href="/projekty" className="home-cta">Zobacz projekty</Link>
            <a className="home-ghost">Pomoc w wyborze</a>
          </div>
        </section>

        <section className="catalog-preview">
          <div className="catalog-head">
            <h2>Projekty</h2>
            <p>Na stronie widoczne są tylko opublikowane projekty.</p>
          </div>

          {projects.length > 0 ? (
            <div className="catalog-grid">
              {projects.map((project) => <ProjectCard key={project.code} project={project} />)}
            </div>
          ) : (
            <EmptyProjectsState />
          )}
        </section>
      </main>
    </>
  );
}
