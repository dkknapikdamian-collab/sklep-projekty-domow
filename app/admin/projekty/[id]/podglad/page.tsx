import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getAdminPreviewProjectById } from "@/lib/project-repository";
import { ProjectDetailPage } from "@/components/project/ProjectDetailPage";

export const dynamic = "force-dynamic";

type AdminProjectPublicPreviewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminProjectPublicPreviewPage({ params }: AdminProjectPublicPreviewPageProps) {
  const { id } = await params;
  const project = await getAdminPreviewProjectById(id);

  if (!project) notFound();

  const livePublicHref = project.status === "active" ? `/projekty/${project.slug}` : "";

  return (
    <>
      <section className="admin-public-preview-ribbon" data-admin-project-public-preview="true">
        <div>
          <span>ADMIN PREVIEW</span>
          <strong>{project.code} - {project.name}</strong>
          <small>Status: {project.status}. Ten podglad dziala takze dla draft, hidden i archived.</small>
        </div>
        <nav aria-label="Nawigacja podgladu admina">
          <Link href={`/admin/projekty/${id}/edytuj`} className="admin-secondary-button" data-admin-preview-edit-link="true">
            <ArrowLeft size={16} /> Wroc do edycji
          </Link>
          {livePublicHref ? (
            <Link href={livePublicHref} className="admin-secondary-button" target="_blank" rel="noreferrer" data-admin-preview-live-link="true">
              <ExternalLink size={16} /> Publiczny live
            </Link>
          ) : (
            <span className="admin-preview-nonpublic" data-admin-preview-nonpublic="true">Niepubliczny poza adminem</span>
          )}
        </nav>
      </section>
      <ProjectDetailPage project={project} />
    </>
  );
}
