import { notFound } from "next/navigation";
import { getPublicProjectBySlug, getPublicProjects } from "@/lib/project-repository";
import { ProjectDetailPage } from "@/components/project/ProjectDetailPage";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const projects = await getPublicProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetailPage project={project} />;
}
