import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { Heart } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="catalog-card">
      <Link href={`/projekty/${project.slug}`} className="catalog-image">
        <Image src={project.media.thumbnail} alt={project.name} fill sizes="360px" />
        <button><Heart size={20} /></button>
      </Link>
      <div className="catalog-body">
        <span>{project.code}</span>
        <h3>{project.name}</h3>
        <p>{project.usableArea.toLocaleString("pl-PL")} m² <i>|</i> {project.roomsCount} pokoi <i>|</i> {project.type}</p>
        <strong>{project.priceGross.toLocaleString("pl-PL")} zł</strong>
      </div>
    </article>
  );
}
