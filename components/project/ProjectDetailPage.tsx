import { ChevronRight } from "lucide-react";
import type { Project } from "@/types/project";
import { getRelatedPublicProjects } from "@/lib/project-repository";
import { Header } from "@/components/Header";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectPurchaseBox } from "./ProjectPurchaseBox";
import { ProjectStats } from "./ProjectStats";
import { ProjectTabs } from "./ProjectTabs";
import { RelatedProjects } from "./RelatedProjects";

export async function ProjectDetailPage({ project }: { project: Project }) {
  const related = await getRelatedPublicProjects(project);

  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="project-top">
          <div className="breadcrumbs">
            <span>Strona główna</span>
            <ChevronRight size={13} />
            <span>Projekty</span>
            <ChevronRight size={13} />
            <span>{project.type}</span>
            <ChevronRight size={13} />
            <strong>{project.name}</strong>
          </div>

          <div className="project-title-mobile">
            <h1>{project.name}</h1>
            <p className="project-code">Kod projektu: <strong>{project.code}</strong></p>
          </div>

          <div className="top-grid">
            <div>
              <div className="project-title">
                <div>
                  <h1>{project.name}</h1>
                  <p className="project-code">Kod projektu: <strong>{project.code}</strong></p>
                  <div className="badges">
                    {project.badgePrimary && <span className="badge green">{project.badgePrimary}</span>}
                    {project.badgeSecondary && <span className="badge grey">{project.badgeSecondary}</span>}
                  </div>
                </div>
              </div>
              <ProjectGallery project={project} />
            </div>

            <ProjectPurchaseBox project={project} />
          </div>
        </section>

        <ProjectStats project={project} />
        <ProjectTabs project={project} />
        <RelatedProjects projects={related} />
      </main>
    </>
  );
}