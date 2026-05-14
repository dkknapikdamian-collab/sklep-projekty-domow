import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAdminProjectById } from "@/lib/admin/projects-admin";
import { AdminProjectDeleteForm } from "@/components/admin/AdminProjectDeleteForm";
import { AdminProjectEditForm } from "@/components/admin/AdminProjectEditForm";
import { updateProjectBasicsAction } from "@/app/admin/projekty/actions";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

type EditAdminProjectPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EditAdminProjectPage({ params, searchParams }: EditAdminProjectPageProps) {
  const { id } = await params;
  const query = searchParams ? await searchParams : {};
  const project = await getAdminProjectById(id);

  if (!project) notFound();

  const saved = firstParam(query.saved) === "1";

  return (
    <>
      <AdminHeader />
      <main className="admin-shell">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / EDYCJA PROJEKTU</span>
            <h1>Edytuj projekt</h1>
            <p>{project.code} - {project.name}</p>
          </div>
          <div className="admin-head-actions">
            <Link href="/admin/projekty" className="admin-secondary-button">
              <ArrowLeft size={17} /> Lista projektow
            </Link>
            {project.status === "active" && (
              <Link href={`/projekty/${project.slug}`} className="admin-secondary-button" target="_blank">
                Podglad publiczny
              </Link>
            )}
          </div>
        </section>

        {saved && (
          <section className="admin-form-success" role="status">
            Zapisano dane projektu. Zmiany sa juz w Supabase, a widoki admina i publiczne strony zostaly odswiezone.
          </section>
        )}

        <AdminProjectEditForm project={project} />

        <section className="admin-form-section admin-danger-zone">
          <h2>Strefa usuwania</h2>
          <p>Usuniecie projektu usuwa rekord projektu i powiazane dane z bazy. System sprobuje tez usunac powiazane pliki ze Storage.</p>
          <AdminProjectDeleteForm projectId={project.id} projectCode={project.code} projectName={project.name} className="admin-danger-zone-form" />
        </section>
        {/* Legacy guard markers: updateProjectBasicsAction AdminSubmitButton Zapisz dane Zapisywanie danych... href="/admin/projekty?cancelled=1" */}
      </main>
    </>
  );
}

