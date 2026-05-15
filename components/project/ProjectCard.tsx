import Link from "next/link";
import { FileText } from "lucide-react";
import type { Project } from "@/types/project";
import { MediaSlot } from "@/components/MediaSlot";
import { FavoriteButton } from "@/components/project/FavoriteButton";
import { area, money } from "@/lib/format";

export function ProjectCard({ project }: { project: Project }) {
  const floorPlanImage = project.media.plans.find((item) => item.type === "floor_plan")?.url;
  const cardImageSrc =
    project.media.thumbnail ||
    project.media.hero ||
    project.media.gallery[0] ||
    project.media.elevations[0]?.url ||
    floorPlanImage;

  return (
    <article className="project-card">
      <Link href={`/projekty/${project.slug}`} className="project-image">
        {project.badgePrimary && <span className="card-badge">{project.badgePrimary}</span>}
        <MediaSlot src={cardImageSrc} alt={project.name} label="Dodaj miniature projektu" sizes="360px" />
        <FavoriteButton projectCode={project.code} projectSlug={project.slug} projectName={project.name} />
      </Link>

      <div className="project-body">
        <h3>{project.name}</h3>
        <p>{area(project.usableArea)} <span>-</span> {project.roomsCount} pokoi <span>-</span> {project.garage}</p>
        <strong>{money(project.priceGross)}</strong>
        <div className="project-actions">
          <button type="button" aria-label="Dokumentacja projektu"><FileText size={17} /></button>
          <Link href={`/projekty/${project.slug}`}>Zobacz projekt</Link>
        </div>
      </div>
    </article>
  );
}
