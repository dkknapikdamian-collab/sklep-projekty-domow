import { notFound } from "next/navigation";
import { getPublicProjectBySlug } from "@/lib/project-repository";
import { ProjectDetailPage } from "@/components/project/ProjectDetailPage";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetailPage project={project} />;
}
