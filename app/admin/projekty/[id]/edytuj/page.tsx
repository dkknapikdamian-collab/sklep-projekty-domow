import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAdminProjectById, type AdminProjectEditItem } from "@/lib/admin/projects-admin";
import { getProjectPublicationReadiness } from "@/lib/admin/project-publication-readiness";
import { AdminProjectArchiveForm, AdminProjectDeleteForm } from "@/components/admin/AdminProjectDeleteForm";
import { AdminProjectEditForm } from "@/components/admin/AdminProjectEditForm";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

type EditAdminProjectPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function decodeQueryValue(value: string | string[] | undefined) {
  const raw = firstParam(value) || "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function ProjectPublicationReadinessBox({ project }: { project: AdminProjectEditItem }) {
  const readiness = getProjectPublicationReadiness({
    name: project.name,
    slug: project.slug,
    code: project.code,
    description: project.description,
    priceGross: project.priceGross,
    usableArea: project.usableArea,
    roomsCount: project.roomsCount,
    media: project.media.map((item) => ({ mediaType: item.mediaType })),
    rooms: project.rooms.map((room) => ({ name: room.name })),
    variants: project.variants.map((variant) => ({ name: variant.name, active: true })),
    privateFiles: project.privateFiles.map((file) => ({ fileType: file.fileType, path: file.path })),
    baseVariantConfirmed: project.variants.length === 0
  });

  return (
    <section
      className="admin-form-section admin-publication-readiness-box"
      data-admin-publication-readiness-v52="true"
      data-publication-readiness-can-publish={readiness.canPublish ? "true" : "false"}
    >
      <div>
        <span>ADMIN / GOTOWOŚĆ PUBLIKACJI</span>
        <h2>Gotowość publikacji</h2>
        <p>
          Status active jest blokowany, jeśli projekt wygląda jak oferta sprzedażowa, ale nie ma danych potrzebnych do sprzedaży.
        </p>
      </div>

      <ul className="admin-publication-readiness-list" data-admin-publication-readiness-list="true">
        {readiness.checks.map((check) => (
          <li
            key={check.key}
            className="admin-publication-readiness-item"
            data-publication-readiness-check={check.key}
            data-publication-readiness-status={check.ok ? "ok" : "missing"}
          >
            <strong>
              {check.label}
              <span className="admin-publication-readiness-state">{check.ok ? "OK" : "BRAK"}</span>
            </strong>
            <small>{check.help}</small>
          </li>
        ))}
      </ul>

      {!readiness.canPublish && (
        <div className="admin-form-error" role="alert" data-admin-publication-readiness-blocker="true">
          <p>Aktywacja projektu zostanie zablokowana.</p>
          <p>Braki: {readiness.missing.join(", ")}</p>
        </div>
      )}

      {readiness.canPublish && (
        <div className="admin-form-success" role="status" data-admin-publication-readiness-ok="true">
          Projekt ma komplet minimalnych danych sprzedażowych do publikacji.
        </div>
      )}
    </section>
  );
}

export default async function EditAdminProjectPage({ params, searchParams }: EditAdminProjectPageProps) {
  const { id } = await params;
  const query = searchParams ? await searchParams : {};
  const project = await getAdminProjectById(id);

  if (!project) notFound();

  const saved = firstParam(query.saved) === "1";
  const archived = firstParam(query.archived) === "1";
  const archiveError = firstParam(query.archive_error) === "1" || firstParam(query.status) === "error";
  const archiveErrorReason = decodeQueryValue(query.reason) || "Nieznany blad akcji admina.";
  const editReturnTo = `/admin/projekty/${project.id}/edytuj`;

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

        {archived && (
          <section className="admin-form-success" role="status" data-admin-edit-archive-success="true">
            Projekt zostal zarchiwizowany. Status powinien byc widoczny po odswiezeniu danych edycji.
          </section>
        )}

        {archiveError && (
          <section className="admin-form-error" role="alert" data-admin-edit-archive-error="true">
            <p>Nie udalo sie wykonac akcji projektu.</p>
            <p>{archiveErrorReason}</p>
          </section>
        )}

        <ProjectPublicationReadinessBox project={project} />
        <AdminProjectEditForm project={project} />

        <section className="admin-form-section admin-danger-zone">
          <h2>Strefa usuwania</h2>
          <p>Usuniecie projektu usuwa rekord projektu i powiazane dane z bazy. System sprobuje tez usunac powiazane pliki ze Storage.</p>
          <div className="admin-edit-danger-actions" data-admin-edit-danger-actions="true">
            <AdminProjectArchiveForm
              projectId={project.id}
              projectCode={project.code}
              projectName={project.name}
              projectSlug={project.slug}
              projectStatus={project.status}
              returnTo={editReturnTo}
            />
            <AdminProjectDeleteForm
              projectId={project.id}
              projectCode={project.code}
              projectName={project.name}
              projectStatus={project.status}
              className="admin-danger-zone-form"
            />
          </div>
        </section>
      </main>
    </>
  );
}
