import Image from "next/image";
import { Project } from "@/data/projects";
import { Car, ChevronDown, Construction, Grid3X3, House, Layers, Sun, ZoomIn } from "lucide-react";

export function ProjectTabs({ project }: { project: Project }) {
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
            const featureIcons = [House, Grid3X3, Car, Layers, Sun, Construction];
            const Icon = featureIcons[index] || House;
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
          {project.media.plans.map((plan) => (
            <article className="plan-card" key={plan.url}>
              <div>
                <Image src={plan.url} alt={plan.title} fill sizes="260px" />
                <button><ZoomIn size={16} /></button>
              </div>
              <strong>{plan.title}</strong>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
