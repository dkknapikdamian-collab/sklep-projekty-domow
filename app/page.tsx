import Link from "next/link";
import { Header } from "@/components/Header";
import { EmptyProjectsState } from "@/components/EmptyProjectsState";
import { ProjectCard } from "@/components/project/ProjectCard";
import { getPublishedProjects } from "@/lib/projects";
import { House, Search, ShieldCheck, SlidersHorizontal, ShoppingCart, Star } from "lucide-react";

export default function HomePage() {
  const projects = getPublishedProjects();

  return (
    <>
      <Header />
      <main>
        <section className="home-hero">
          <div className="hero-overlay">
            <div className="hero-copy">
              <h1>Znajdź projekt swojego wymarzonego domu</h1>
              <p>Tysiące gotowych projektów domów jednorodzinnych dopasowanych do Twoich potrzeb.</p>
              <div className="hero-points">
                <span><House size={28} /> Sprawdzone projekty i aktualne pozwolenia</span>
                <span><SlidersHorizontal size={28} /> Dostosuj projekt do swoich potrzeb</span>
                <span><ShieldCheck size={28} /> Bezpieczne zakupy i gwarancja jakości</span>
              </div>
            </div>
            <div className="hero-image-placeholder">
              <House size={70} strokeWidth={1.2} />
              <span>Tu dodamy docelowe zdjęcie hero strony głównej</span>
            </div>
          </div>

          <div className="home-search">
            <label>Styl domu<select><option>Wszystkie style</option></select></label>
            <label>Powierzchnia (m²)<input placeholder="od                 –       do" /></label>
            <label>Liczba pokoi<select><option>Wszystkie</option></select></label>
            <label>Garaż<select><option>Dowolnie</option></select></label>
            <label>Kondygnacje<select><option>Dowolnie</option></select></label>
            <button><Search size={22} /> Szukaj projektów</button>
          </div>
        </section>

        <section className="home-section">
          <div className="section-head">
            <h2>Polecane projekty domów</h2>
            <Link href="/projekty">Zobacz wszystkie projekty →</Link>
          </div>

          {projects.length > 0 ? (
            <div className="project-grid">
              {projects.slice(0, 5).map((project) => <ProjectCard key={project.code} project={project} />)}
            </div>
          ) : (
            <EmptyProjectsState />
          )}
        </section>

        <section className="home-section">
          <div className="section-head">
            <h2>Kategorie projektów</h2>
          </div>
          <div className="category-grid">
            {["Nowoczesne domy", "Małe domy", "Domy z garażem", "Parterowe", "Piętrowe", "Z poddaszem"].map((name) => (
              <div className="category-card" key={name}>
                <House size={40} strokeWidth={1.2} />
                <strong>{name}</strong>
                <span>projekty pojawią się po dodaniu</span>
              </div>
            ))}
          </div>
        </section>

        <section className="trust-strip">
          <span><Star size={26} /> Ponad 20 lat doświadczenia w projektowaniu domów</span>
          <span><ShieldCheck size={26} /> Gwarancja zgodności z warunkami technicznymi</span>
          <span><ShoppingCart size={26} /> Bezpieczne płatności i szybka realizacja</span>
        </section>

        <section className="how-section">
          <h2>Jak to działa?</h2>
          <div className="steps">
            <div><strong>1</strong><Search size={42} /><h3>Wybierz projekt</h3><p>Przeglądaj projekty dodane do katalogu.</p></div>
            <div><strong>2</strong><SlidersHorizontal size={42} /><h3>Dopasuj do siebie</h3><p>Skorzystaj z dodatków i zmian.</p></div>
            <div><strong>3</strong><ShoppingCart size={42} /><h3>Kup projekt online</h3><p>Zamówienie zostanie zapisane w systemie.</p></div>
            <div><strong>4</strong><House size={42} /><h3>Buduj z nami</h3><p>Projekt otrzymasz zgodnie z wybraną dostawą.</p></div>
          </div>
        </section>

        <footer className="site-footer">
          <div>
            <strong>PROJEKTY DOMÓW</strong>
            <p>Gotowe projekty domów jednorodzinnych dopasowane do Twoich potrzeb.</p>
          </div>
          <div>
            <strong>Kontakt</strong>
            <p>22 123 45 67<br />biuro@projektydomow.pl</p>
          </div>
        </footer>
      </main>
    </>
  );
}
