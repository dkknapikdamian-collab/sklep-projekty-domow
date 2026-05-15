import {
  BadgeCheck,
  Car,
  ChevronDown,
  Construction,
  FileText,
  Grid3X3,
  House,
  Layers,
  PackageCheck,
  Sun,
  ZoomIn
} from "lucide-react";
import type { Project } from "@/types/project";
import { MediaSlot } from "@/components/MediaSlot";
import { area, meters, money } from "@/lib/format";

type OfferTab = {
  label: string;
  href: string;
};

function roomAreaTotal(project: Project) {
  return project.rooms.reduce((sum, room) => sum + room.area, 0);
}

function includedItems(project: Project) {
  const items = [
    "Dokumentacja architektoniczno-budowlana",
    "Rzuty, przekroje i elewacje",
    "Zestawienie powierzchni pomieszczen",
    "Parametry techniczne do rozmowy z wykonawca"
  ];

  if (project.media.plans.length > 0) items.push("Materialy graficzne projektu");
  if (project.variants.length > 0) items.push("Dostepne warianty projektu");

  return items;
}

function whyItems(project: Project) {
  return [
    project.usableArea > 0 ? `Przemyslana powierzchnia ${area(project.usableArea)}` : "Czytelnie opisane parametry projektu",
    project.roomsCount > 0 ? `${project.roomsCount} pokoi do wygodnego planowania domu` : "Uklad gotowy do doprecyzowania",
    project.garage ? `Garaz: ${project.garage}` : "Dane techniczne zebrane w jednym miejscu",
    project.technology ? `Technologia: ${project.technology}` : "Oferta oparta o dane projektu"
  ];
}

export function ProjectTabs({ project }: { project: Project }) {
  const icons = [House, Grid3X3, Car, Layers, Sun, Construction];
  const plans = project.media.plans.filter((plan) => plan.url);
  const elevations = project.media.elevations.filter((elevation) => elevation.url);
  const tabs: OfferTab[] = [
    { label: "OPIS PROJEKTU", href: "#project-description" },
    ...(plans.length > 0 ? [{ label: "RZUTY I PRZEKROJE", href: "#project-plans" }] : []),
    ...(elevations.length > 0 ? [{ label: "ELEWACJE", href: "#project-elevations" }] : []),
    { label: "POMIESZCZENIA", href: "#project-rooms" },
    { label: "DANE TECHNICZNE", href: "#project-technical" },
    { label: "CO ZAWIERA PROJEKT", href: "#project-included" },
    { label: "DODATKI", href: "#project-addons" },
    { label: "PODOBNE PROJEKTY", href: "#related-projects" },
    { label: "DLACZEGO WARTO", href: "#project-why" }
  ];
  const technicalRows = [
    ["Powierzchnia uzytkowa", area(project.usableArea)],
    ["Powierzchnia zabudowy", project.buildingArea ? area(project.buildingArea) : "-"],
    ["Liczba pokoi", String(project.roomsCount || "-")],
    ["Lazienki", String(project.bathroomsCount || "-")],
    ["Garaz", project.garage || "-"],
    ["Kondygnacje", project.type || String(project.floorsCount || "-")],
    ["Technologia", project.technology || "-"],
    ["Dach", project.roof || "-"],
    ["Szerokosc dzialki", meters(project.minPlotWidth)],
    ["Dlugosc dzialki", meters(project.minPlotLength)],
    ["Wysokosc budynku", meters(project.buildingHeight)]
  ];

  return (
    <div className="tabs-card project-sales-detail" data-public-project-sales-v37="true">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <a className={index === 0 ? "active" : ""} href={tab.href} key={tab.href}>{tab.label}</a>
        ))}
      </div>

      <div className="description-grid" id="project-description">
        <div className="desc-copy">
          <h3>Opis projektu</h3>
          <p>{project.description || "Opis projektu zostanie uzupelniony przez administratora."}</p>
          <a className="read-more" href="#project-technical">CZYTAJ WIECEJ <ChevronDown size={14} /></a>
        </div>

        <div className="feature-grid">
          {project.features.length > 0 ? project.features.map((feature, index) => {
            const Icon = icons[index] || House;
            return (
              <div className="feature" key={feature}>
                <Icon size={34} strokeWidth={1.25} />
                <span>{feature}</span>
              </div>
            );
          }) : (
            <p className="muted-note">Cechy projektu zostana uzupelnione przez administratora.</p>
          )}
        </div>
      </div>

      {plans.length > 0 && (
        <div className="plans-block" id="project-plans">
          <h3>Rzuty i przekroje</h3>
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <article className="plan-card" key={`${plan.url}-${index}`}>
                <div>
                  <MediaSlot src={plan.url} alt={plan.title || `Rzut ${index + 1}`} label={plan.fileName || "Rzut/przekroj"} sizes="260px" />
                  <a href={plan.url} target="_blank" rel="noreferrer" aria-label={`Powieksz ${plan.title || plan.fileName}`}>
                    <ZoomIn size={16} />
                  </a>
                </div>
                <strong>{plan.title || "Rzut / przekroj"}</strong>
              </article>
            ))}
          </div>
        </div>
      )}

      {elevations.length > 0 && (
        <div className="plans-block" id="project-elevations">
          <h3>Elewacje</h3>
          <div className="plans-grid">
            {elevations.map((elevation, index) => (
              <article className="plan-card" key={`${elevation.url}-${index}`}>
                <div>
                  <MediaSlot src={elevation.url} alt={elevation.title || `Elewacja ${index + 1}`} label={elevation.fileName || "Elewacja"} sizes="260px" />
                  <a href={elevation.url} target="_blank" rel="noreferrer" aria-label={`Powieksz ${elevation.title || elevation.fileName}`}>
                    <ZoomIn size={16} />
                  </a>
                </div>
                <strong>{elevation.title || "Elewacja"}</strong>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="plans-block" id="project-rooms" data-project-rooms-section="true">
        <h3>Pomieszczenia</h3>
        {project.rooms.length > 0 ? (
          <table className="project-rooms-table">
            <thead>
              <tr>
                <th>Kondygnacja</th>
                <th>Nr</th>
                <th>Nazwa</th>
                <th>Powierzchnia</th>
                <th>Wymiary</th>
              </tr>
            </thead>
            <tbody>
              {project.rooms.map((room, index) => (
                <tr key={`${room.floor}-${room.number}-${index}`}>
                  <td>{room.floor}</td>
                  <td>{room.number || "-"}</td>
                  <td>{room.name}</td>
                  <td>{area(room.area)}</td>
                  <td>{room.dimensions || "-"}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>Suma powierzchni pomieszczen</td>
                <td>{area(roomAreaTotal(project))}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        ) : (
          <p className="muted-note">Tabela pomieszczen zostanie uzupelniona przez administratora.</p>
        )}
      </div>

      <div className="project-sales-grid">
        <section className="project-sales-section" id="project-technical" data-project-technical-section="true">
          <h3>Dane techniczne</h3>
          <dl className="technical-list">
            {technicalRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="project-sales-section" id="project-included" data-project-included-section="true">
          <h3>Co zawiera projekt</h3>
          <div className="offer-list">
            {includedItems(project).map((item) => (
              <span key={item}><PackageCheck size={18} /> {item}</span>
            ))}
          </div>
        </section>

        <section className="project-sales-section" id="project-addons" data-project-addons-section="true">
          <h3>Dodatki</h3>
          {project.addons.length > 0 ? (
            <div className="offer-list">
              {project.addons.map((addon) => (
                <span key={addon.code} title={addon.description}>
                  <FileText size={18} /> {addon.name} <strong>+{money(addon.priceGross)}</strong>
                </span>
              ))}
            </div>
          ) : (
            <p className="muted-note">Dodatki zostana uzupelnione przez administratora.</p>
          )}
        </section>

        <section className="project-sales-section" id="project-why" data-project-why-section="true">
          <h3>Dlaczego warto</h3>
          <div className="offer-list">
            {whyItems(project).map((item) => (
              <span key={item}><BadgeCheck size={18} /> {item}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
