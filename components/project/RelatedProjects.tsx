import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="related">
      <div className="related-head">
        <h2>Podobne projekty</h2>
        <Link href="/projekty">ZOBACZ WSZYSTKIE <ChevronRight size={15} /></Link>
      </div>
      <div className="related-grid">
        {projects.map((project) => <ProjectCard key={project.code} project={project} />)}
      </div>
    </section>
  );
}
