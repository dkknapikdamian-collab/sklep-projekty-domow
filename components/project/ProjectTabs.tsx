import { Car, ChevronDown, Construction, Grid3X3, House, Layers, Sun, ZoomIn } from "lucide-react";
import type { Project } from "@/types/project";
import { MediaSlot } from "@/components/MediaSlot";

export function ProjectTabs({ project }: { project: Project }) {
  const icons = [House, Grid3X3, Car, Layers, Sun, Construction];

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
          {project.features.length > 0 ? project.features.map((feature, index) => {
            const Icon = icons[index] || House;
            return (
              <div className="feature" key={feature}>
                <Icon size={34} strokeWidth={1.25} />
                <span>{feature}</span>
              </div>
            );
          }) : (
            <p className="muted-note">Cechy projektu dodasz w danych projektu.</p>
          )}
        </div>
      </div>

      <div className="plans-block">
        <h3>Rzuty i przekroje</h3>
        <div className="plans-grid">
          {Array.from({ length: 4 }).map((_, index) => {
            const plan = project.media.plans[index];
            return (
              <article className="plan-card" key={index}>
                <div>
                  <MediaSlot src={plan?.url} alt={plan?.title || `Rzut ${index + 1}`} label={plan?.fileName || "Dodaj rzut/przekrój"} sizes="260px" />
                  <button><ZoomIn size={16} /></button>
                </div>
                <strong>{plan?.title || "Rzut / przekrój"}</strong>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
