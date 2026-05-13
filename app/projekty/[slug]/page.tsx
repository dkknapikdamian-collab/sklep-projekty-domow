import { notFound } from "next/navigation";
import { getProjectBySlug, getPublishedProjects } from "@/lib/projects";
import { ProjectDetailPage } from "@/components/project/ProjectDetailPage";

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetailPage project={project} />;
}
