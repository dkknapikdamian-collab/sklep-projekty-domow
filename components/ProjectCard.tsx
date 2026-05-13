import Link from "next/link";
import { Project } from "@/data/projects";
import { HouseVisual } from "./HouseVisual";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link href={`/projekty/${project.slug}`} className="project-card-image">
        {project.badge && <span className="badge floating">{project.badge}</span>}
        <HouseVisual variant="card" />
      </Link>
      <div className="project-card-body">
        <div>
          <span className="project-code">{project.code}</span>
          <h3>{project.name}</h3>
          <p>{project.shortDescription}</p>
        </div>
        <div className="project-meta-grid">
          <span>{project.usableArea} m²</span>
          <span>{project.rooms} pok.</span>
          <span>{project.garage}</span>
        </div>
        <div className="project-card-footer">
          <strong>{project.promoPrice ?? project.price} zł</strong>
          <Link href={`/projekty/${project.slug}`} className="small-cta">Zobacz</Link>
        </div>
      </div>
    </article>
  );
}
