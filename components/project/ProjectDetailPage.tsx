import { Project, getRelatedProjects } from "@/data/projects";
import { Header } from "@/components/Header";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectPurchaseBox } from "./ProjectPurchaseBox";
import { ProjectStatsStrip } from "./ProjectStatsStrip";
import { ProjectTabs } from "./ProjectTabs";
import { RelatedProjects } from "./RelatedProjects";
import { ChevronRight } from "lucide-react";

export function ProjectDetailPage({ project }: { project: Project }) {
  const related = getRelatedProjects(project);

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
            <span>{project.type}</span>
            <ChevronRight size={13} />
            <strong>{project.name}</strong>
          </div>

          <div className="top-grid">
            <ProjectGallery project={project} />
            <ProjectPurchaseBox project={project} />
          </div>
        </section>

        <ProjectStatsStrip project={project} />
        <ProjectTabs project={project} />
        <RelatedProjects projects={related} />
      </main>
    </>
  );
}
