import Link from "next/link";
import { Header } from "@/components/Header";
import { EmptyProjectsState } from "@/components/EmptyProjectsState";
import { ProjectCard } from "@/components/project/ProjectCard";
import { getPublicProjects } from "@/lib/project-repository";
import {
  Facebook,
  FileCheck2,
  HelpCircle,
  Home,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Youtube,
  ShoppingCart,
  WalletCards,
  BadgeCheck,
  Hammer,
  Send,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await getPublicProjects();

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
                <span><Home size={28} /> Sprawdzone projekty i aktualne pozwolenia</span>
                <span><SlidersHorizontal size={28} /> Dostosuj projekt do swoich potrzeb</span>
                <span><ShieldCheck size={28} /> Bezpieczne zakupy i gwarancja jakości</span>
              </div>
            </div>
            <div className="hero-image-placeholder">
              <Home size={70} strokeWidth={1.2} />
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

        <section className="home-section categories-section">
          <div className="section-head">
            <h2>Kategorie projektów</h2>
          </div>
          <div className="category-grid">
            {["Nowoczesne domy", "Małe domy", "Domy z garażem", "Parterowe", "Piętrowe", "Z poddaszem"].map((name) => (
              <div className="category-card" key={name}>
                <Home size={40} strokeWidth={1.2} />
                <strong>{name}</strong>
                <span>projekty pojawią się po dodaniu</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bottom-benefits">
          <div><BadgeCheck size={30} /><span>Ponad 20 lat doświadczenia<br />w projektowaniu domów</span></div>
          <div><Home size={30} /><span>Tysiące zrealizowanych inwestycji<br />w całej Polsce</span></div>
          <div><FileCheck2 size={30} /><span>Gwarancja zgodności<br />z warunkami technicznymi</span></div>
          <div><Hammer size={30} /><span>Wsparcie na każdym etapie<br />budowy domu</span></div>
          <div><WalletCards size={30} /><span>Bezpieczne płatności<br />i szybka realizacja</span></div>
        </section>

        <section className="how-and-reviews">
          <div className="how-block">
            <h2>Jak to działa?</h2>
            <div className="steps-line">
              <div className="step-item"><strong>1</strong><span><Search size={42} /></span><h3>Wybierz projekt</h3><p>Przeglądaj projekty i znajdź idealny dla siebie.</p></div>
              <div className="step-item"><strong>2</strong><span><SlidersHorizontal size={42} /></span><h3>Dopasuj do siebie</h3><p>Skorzystaj z opcji adaptacji i zmian w projekcie.</p></div>
              <div className="step-item"><strong>3</strong><span><ShoppingCart size={42} /></span><h3>Kup projekt online</h3><p>Szybka i bezpieczna płatność. Projekt otrzymasz mailem.</p></div>
              <div className="step-item"><strong>4</strong><span><Home size={42} /></span><h3>Buduj z nami</h3><p>Zrealizuj marzenie o własnym domu z naszym wsparciem.</p></div>
            </div>
          </div>

          <aside className="review-card">
            <h3>Co mówią nasi klienci</h3>
            <div className="rating">4,9 / 5 <span>★★★★★</span></div>
            <p className="review-count">Na podstawie 1243 opinii</p>
            <blockquote>„Świetny wybór projektów i fachowe doradztwo. Adaptacja przebiegła sprawnie, a projekt spełnił wszystkie nasze oczekiwania.”</blockquote>
            <p className="review-author">— Anna i Piotr, Kraków</p>
            <div className="review-nav"><button><ChevronLeft size={18} /></button><span /><span /><span /><button><ChevronRight size={18} /></button></div>
          </aside>
        </section>

        <section className="newsletter-strip">
          <div className="newsletter-copy">
            <Send size={42} />
            <div>
              <h2>Bądź na bieżąco z nowościami i promocjami</h2>
              <p>Zapisz się do newslettera i odbierz 5% rabatu na pierwszy zakup.</p>
            </div>
          </div>
          <form className="newsletter-form">
            <div><input placeholder="Twój adres e-mail" /><button type="button">Zapisz się</button></div>
            <label><input type="checkbox" /> Wyrażam zgodę na przetwarzanie danych osobowych. <u>Polityka prywatności</u></label>
          </form>
        </section>

        <footer className="full-footer">
          <div className="footer-brand">
            <Link href="/" className="footer-logo"><span><Home size={30} strokeWidth={1.4} /></span><strong>PROJEKTY<br />DOMÓW</strong></Link>
            <p>Gotowe projekty domów jednorodzinnych dopasowane do Twoich potrzeb.</p>
            <div className="social-row"><a><Facebook size={18} /></a><a><Instagram size={18} /></a><a><Youtube size={18} /></a><a>p</a></div>
          </div>
          <div className="footer-col"><h3>PROJEKTY</h3><a>Wszystkie projekty</a><a>Nowości</a><a>Bestsellery</a><a>Promocje</a><a>Ostatnie zmiany</a></div>
          <div className="footer-col"><h3>KATEGORIE</h3><a>Nowoczesne domy</a><a>Małe domy</a><a>Domy z garażem</a><a>Parterowe</a><a>Piętrowe</a><a>Z poddaszem</a></div>
          <div className="footer-col"><h3>INFORMACJE</h3><a>Jak kupować?</a><a>Dostawa projektu</a><a>Adaptacja projektu</a><a>Zwroty i reklamacje</a><a>Regulamin</a><a>Polityka prywatności</a></div>
          <div className="footer-col"><h3>POMOC</h3><a>Najczęściej pytania</a><a>Poradnik budowy</a><a>Kontakt</a></div>
          <div className="footer-col contact-col"><h3>KONTAKT</h3><a><Phone size={15} /> 22 123 45 67</a><a><Mail size={15} /> biuro@projektydomow.pl</a><a><HelpCircle size={15} /> Pon. - Pt.: 9:00 - 17:00</a><a><MapPin size={15} /> ul. Projektowa 10<br />05-500 Piaseczno</a></div>
        </footer>

        <div className="copyright">© 2024 ProjektyDomow.pl – Wszelkie prawa zastrzeżone.</div>
      </main>
    </>
  );
}
