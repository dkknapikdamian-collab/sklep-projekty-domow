import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Search,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Mail,
  Truck,
  ShieldCheck,
  BadgeCheck,
  House,
  BedDouble,
  Bath,
  Car,
  Ruler,
  Layers,
  Construction,
  Sun,
  Grid3X3,
  ZoomIn,
  Share2
} from "lucide-react";
import { project } from "@/data/project";

const specIcons = [House, BedDouble, Bath, Car, Layers, House, Ruler, Construction];

function Header() {
  return (
    <header className="dp-header">
      <div className="dp-header-inner">
        <div className="dp-logo">
          <div className="dp-logo-mark"><House size={26} strokeWidth={1.6} /></div>
          <div>
            <strong>DOMPROJEKT</strong>
            <span>PROJEKTY DOMÓW</span>
          </div>
        </div>

        <nav className="dp-nav">
          <a>PROJEKTY <ChevronDown size={13} /></a>
          <a>USŁUGI <ChevronDown size={13} /></a>
          <a>JAK KUPIĆ?</a>
          <a>O NAS</a>
          <a>KONTAKT</a>
        </nav>

        <div className="dp-actions">
          <a><Heart size={21} /> <span>ULUBIONE</span></a>
          <a className="cart-action"><ShoppingCart size={21} /> <span>KOSZYK</span><em>2</em></a>
          <a><Search size={21} /></a>
          <a className="mobile-user"><User size={21} /></a>
        </div>
      </div>
    </header>
  );
}

function PurchaseBox() {
  return (
    <aside className="purchase-card">
      <div className="code-line">KOD PROJEKTU: <strong>{project.code}</strong></div>

      <div className="price">
        <strong>{project.price.toLocaleString("pl-PL")} zł</strong>
        <span>z VAT</span>
      </div>

      <div className="available"><BadgeCheck size={16} /> Dostępny</div>

      <div className="purchase-section">
        <div className="section-row">
          <h4>WERSJA PROJEKTU</h4>
          <a>Porównaj wersje <ChevronRight size={14} /></a>
        </div>
        {project.variants.map(([name, price]) => (
          <button className="option-row" key={name}>
            <span>{name}</span>
            <strong>+{price} zł</strong>
          </button>
        ))}
      </div>

      <div className="purchase-section">
        <h4>DODATKI</h4>
        {project.addons.map(([name, price]) => (
          <label className="checkbox-row" key={name}>
            <input type="checkbox" defaultChecked={name === "Pakiet PDF na e-mail"} />
            <span>{name}</span>
            <strong>+{price} zł</strong>
            <i>ⓘ</i>
          </label>
        ))}
      </div>

      <button className="main-buy"><ShoppingCart size={18} /> DODAJ DO KOSZYKA</button>
      <button className="ask-btn"><Mail size={17} /> ZAPYTAJ O PROJEKT</button>

      <div className="micro-trust">
        <span><Truck size={16} /> Darmowa dostawa projektu</span>
        <span><ShieldCheck size={16} /> Bezpieczne płatności online</span>
        <span><BadgeCheck size={16} /> Gwarancja najniższej ceny</span>
      </div>
    </aside>
  );
}

function StatsStrip() {
  return (
    <section className="stats-strip">
      {project.stats.map(([label, value], index) => {
        const Icon = specIcons[index] || Grid3X3;
        return (
          <div className="stat-item" key={label}>
            <Icon size={27} strokeWidth={1.35} />
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        );
      })}
    </section>
  );
}

function ProjectTabs() {
  return (
    <div className="tabs-card">
      <div className="tabs">
        {["OPIS PROJEKTU", "RZUTY I PRZEKROJE", "ELEWACJE", "DANE TECHNICZNE", "CO ZAWIERA PROJEKT", "DODATKI", "PODOBNE PROJEKTY"].map((tab, index) => (
          <a className={index === 0 ? "active" : ""} key={tab}>{tab}</a>
        ))}
      </div>

      <div className="description-grid">
        <div className="desc-copy">
          <h3>Opis projektu</h3>
          <p>{project.description}</p>
          <button className="read-more">CZYTAJ WIĘCEJ <ChevronDown size={14} /></button>
        </div>

        <div className="feature-grid">
          {project.features.map((feature, index) => {
            const icons = [House, Grid3X3, Car, Layers, Sun, Construction];
            const Icon = icons[index] || House;
            return (
              <div className="feature" key={feature}>
                <Icon size={34} strokeWidth={1.25} />
                <span>{feature}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="plans-block">
        <h3>Rzuty i przekroje</h3>
        <div className="plans-grid">
          {[
            ["Rzut parteru", "/images/plan-1.jpg"],
            ["Rzut dachu", "/images/plan-2.jpg"],
            ["Przekrój A-A", "/images/plan-3.jpg"],
            ["Przekrój B-B", "/images/plan-4.jpg"]
          ].map(([title, src]) => (
            <article className="plan-card" key={title}>
              <div>
                <Image src={src} alt={title} fill sizes="260px" />
                <button><ZoomIn size={16} /></button>
              </div>
              <strong>{title}</strong>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function RelatedProjects() {
  return (
    <section className="related">
      <div className="related-head">
        <h2>Podobne projekty</h2>
        <a>ZOBACZ WSZYSTKIE <ChevronRight size={15} /></a>
      </div>
      <div className="related-grid">
        {project.related.map(([name, area, rooms, type, price, src]) => (
          <article className="related-card" key={name}>
            <div className="related-image">
              <Image src={src} alt={name} fill sizes="260px" />
              <button><Heart size={20} /></button>
            </div>
            <div className="related-body">
              <h3>{name}</h3>
              <p>{area} <span>|</span> {rooms} <span>|</span> {type}</p>
              <strong>{price}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="hero-project">
          <div className="breadcrumbs">
            <span>Strona główna</span>
            <ChevronRight size={13} />
            <span>Projekty</span>
            <ChevronRight size={13} />
            <span>Domy parterowe</span>
            <ChevronRight size={13} />
            <strong>{project.name}</strong>
          </div>

          <div className="top-grid">
            <div className="gallery-side">
              <div className="title-row">
                <div>
                  <h1>{project.name}</h1>
                  <div className="badges">
                    <span className="badge green">Nowość</span>
                    <span className="badge grey">Bestseller</span>
                  </div>
                </div>
                <div className="title-tools">
                  <button><Heart size={18} /> Dodaj do ulubionych</button>
                  <button><Share2 size={18} /> Udostępnij</button>
                </div>
              </div>

              <div className="main-gallery">
                <button className="slider-arrow left"><ChevronLeft size={23} /></button>
                <Image src="/images/house-main.jpg" alt={project.name} fill priority sizes="760px" />
                <button className="slider-arrow right"><ChevronRight size={23} /></button>
                <button className="heart-float"><Heart size={35} /></button>
              </div>

              <div className="thumbs">
                {["/images/house-thumb-1.jpg", "/images/house-thumb-2.jpg", "/images/house-thumb-3.jpg", "/images/house-thumb-4.jpg"].map((src, index) => (
                  <button className={index === 0 ? "active" : ""} key={src}>
                    <Image src={src} alt={`Miniatura ${index + 1}`} fill sizes="140px" />
                  </button>
                ))}
                <button className="more-thumb">+12<br /><span>więcej</span></button>
              </div>
            </div>

            <PurchaseBox />
          </div>
        </section>

        <StatsStrip />
        <ProjectTabs />
        <RelatedProjects />
      </main>
    </>
  );
}
