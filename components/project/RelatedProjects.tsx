import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { ChevronRight, Heart } from "lucide-react";

export function RelatedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="related">
      <div className="related-head">
        <h2>Podobne projekty</h2>
        <Link href="/projekty">ZOBACZ WSZYSTKIE <ChevronRight size={15} /></Link>
      </div>
      <div className="related-grid">
        {projects.map((project) => (
          <article className="related-card" key={project.code}>
            <Link href={`/projekty/${project.slug}`} className="related-image">
              <Image src={project.media.thumbnail} alt={project.name} fill sizes="260px" />
              <button><Heart size={20} /></button>
            </Link>
            <div className="related-body">
              <h3>{project.name}</h3>
              <p>{project.usableArea.toLocaleString("pl-PL")} m² <span>|</span> {project.roomsCount} pokoi <span>|</span> {project.type}</p>
              <strong>{project.priceGross.toLocaleString("pl-PL")} zł</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
