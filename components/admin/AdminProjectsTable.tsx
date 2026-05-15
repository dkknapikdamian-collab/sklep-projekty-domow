"use client";

import Link from "next/link";
import { updateProjectStatusAction } from "@/app/admin/projekty/actions";
import type { AdminProjectListItem } from "@/lib/admin/projects-admin";
import { PROJECT_PUBLICATION_MISSING_LABELS } from "@/lib/admin/project-publication-readiness";
import { AdminProjectArchiveForm, AdminProjectDeleteForm } from "./AdminProjectDeleteForm";
import { AdminSubmitButton } from "./AdminSubmitButton";

function formatPrice(value: number) {
  return `${value.toLocaleString("pl-PL")} zl`;
}

function formatDate(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("pl-PL");
}

function missingList(project: AdminProjectListItem) {
  return project.publicationMissing.map((key) => PROJECT_PUBLICATION_MISSING_LABELS[key] || key);
}

function statusBadges(project: AdminProjectListItem) {
  const badges: string[] = [];
  if (project.status === "draft") badges.push("Draft");
  if (project.status === "active") badges.push("Publiczny");
  if (project.status === "hidden") badges.push("Ukryty");
  if (project.status === "archived") badges.push("Archived");
  if (project.canPublish) badges.push("Gotowy");
  if (!project.canPublish) badges.push("Niekompletny");
  if (project.mediaCount <= 0) badges.push("Brak zdjec");
  if (project.projectRoomsCount <= 0) badges.push("Brak pomieszczen");
  return badges;
}

function StatusActionForm({ project, targetStatus }: { project: AdminProjectListItem; targetStatus: string }) {
  const disabled = targetStatus === "active" && !project.canPublish;
  const disabledReason = disabled ? `Braki: ${missingList(project).join(", ")}` : "";

  return (
    <form
      action={updateProjectStatusAction}
      className="admin-inline-form"
      title={disabledReason}
      data-admin-action="project-status-change"
      data-admin-target-status={targetStatus}
    >
      <input type="hidden" name="projectId" value={project.id} />
      <input type="hidden" name="slug" value={project.slug} />
      <input type="hidden" name="status" value={targetStatus} />
      <AdminSubmitButton
        idleLabel={targetStatus === "active" ? "Ustaw active" : "Ustaw draft"}
        pendingLabel="Zapis..."
        className="admin-status-submit"
        iconSize={14}
        disabled={disabled}
      />
    </form>
  );
}

export function AdminProjectsTable({ projects }: { projects: AdminProjectListItem[] }) {
  return (
    <section className="admin-table-card admin-projects-table-card">
      <div className="admin-projects-table-wrap" data-admin-projects-table-scroll="true">
        <table className="admin-table admin-projects-table">
          <thead>
            <tr>
              <th>Kod</th>
              <th>Nazwa</th>
              <th>Status</th>
              <th>Cena</th>
              <th>Pow.</th>
              <th>Pokoje</th>
              <th>Media</th>
              <th>Pomieszczenia</th>
              <th>Gotowosc</th>
              <th>Publiczny link</th>
              <th>Aktualizacja</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const missing = missingList(project);
              const missingText = missing.join(", ") || "-";
              const badges = statusBadges(project);
              const publicHref = `/projekty/${project.slug}`;

              return (
                <tr key={project.id}>
                  <td title={project.code}><strong>{project.code}</strong></td>
                  <td title={`${project.name} / ${project.slug}`}>
                    <div className="admin-project-identity">
                      <strong className="admin-project-name">{project.name}</strong>
                      <small>{project.slug}</small>
                    </div>
                  </td>
                  <td title={badges.join(", ")}>
                    <div className="admin-project-badges">
                      {badges.map((badge) => (
                        <span key={`${project.id}-${badge}`} className="admin-project-badge">{badge}</span>
                      ))}
                    </div>
                  </td>
                  <td>{formatPrice(project.priceGross)}</td>
                  <td>{project.usableArea > 0 ? `${project.usableArea} m2` : "-"}</td>
                  <td>{project.roomsCount > 0 ? project.roomsCount : "-"}</td>
                  <td>{project.mediaCount}</td>
                  <td>{project.projectRoomsCount}</td>
                  <td title={project.canPublish ? "Gotowy do publikacji" : `Braki: ${missingText}`}>
                    {project.canPublish ? (
                      <span className="admin-project-ready">Gotowy</span>
                    ) : (
                      <span className="admin-project-missing">Braki: {missingText}</span>
                    )}
                  </td>
                  <td title={publicHref}>
                    <Link href={publicHref} target="_blank" rel="noreferrer">
                      {publicHref}
                    </Link>
                  </td>
                  <td title={formatDate(project.updatedAt)}>{formatDate(project.updatedAt)}</td>
                  <td>
                    <div className="admin-row-actions" data-admin-project-row-actions="true">
                      <Link href={`/admin/projekty/${project.id}/edytuj`} data-admin-action="project-edit">Edytuj</Link>
                      <Link href={publicHref} target="_blank" rel="noreferrer" data-admin-action="project-public-preview">Podglad publiczny</Link>
                      <AdminProjectArchiveForm
                        projectId={project.id}
                        projectCode={project.code}
                        projectName={project.name}
                        projectSlug={project.slug}
                        projectStatus={project.status}
                      />
                      <StatusActionForm project={project} targetStatus="draft" />
                      <StatusActionForm project={project} targetStatus="active" />
                      <AdminProjectDeleteForm projectId={project.id} projectCode={project.code} projectName={project.name} projectStatus={project.status} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="admin-project-mobile-list">
        {projects.map((project) => {
          const missing = missingList(project);
          const badges = statusBadges(project);
          const publicHref = `/projekty/${project.slug}`;
          return (
            <article key={`mobile-${project.id}`} className="admin-project-mobile-card">
              <header>
                <strong>{project.code}</strong>
                <span>{project.name}</span>
                <small>{project.slug}</small>
              </header>
              <div className="admin-project-mobile-badges">
                {badges.map((badge) => (
                  <span key={`mobile-badge-${project.id}-${badge}`} className="admin-project-badge">{badge}</span>
                ))}
              </div>
              <dl>
                <div><dt>Cena</dt><dd>{formatPrice(project.priceGross)}</dd></div>
                <div><dt>Pow.</dt><dd>{project.usableArea > 0 ? `${project.usableArea} m2` : "-"}</dd></div>
                <div><dt>Pokoje</dt><dd>{project.roomsCount > 0 ? project.roomsCount : "-"}</dd></div>
                <div><dt>Media</dt><dd>{project.mediaCount}</dd></div>
                <div><dt>Pomieszczenia</dt><dd>{project.projectRoomsCount}</dd></div>
                <div><dt>Aktualizacja</dt><dd>{formatDate(project.updatedAt)}</dd></div>
                <div className="admin-project-mobile-readiness">
                  <dt>Gotowosc</dt>
                  <dd>
                    {project.canPublish ? (
                      <span className="admin-project-ready">Gotowy</span>
                    ) : (
                      <span className="admin-project-missing">Braki: {missing.join(", ") || "-"}</span>
                    )}
                  </dd>
                </div>
              </dl>
              <p className="admin-project-mobile-link">
                <Link href={publicHref} target="_blank" rel="noreferrer">
                  {publicHref}
                </Link>
              </p>
              <div className="admin-row-actions" data-admin-project-row-actions="true">
                <Link href={`/admin/projekty/${project.id}/edytuj`} data-admin-action="project-edit">Edytuj</Link>
                <Link href={publicHref} target="_blank" rel="noreferrer" data-admin-action="project-public-preview">Podglad publiczny</Link>
                <AdminProjectArchiveForm
                  projectId={project.id}
                  projectCode={project.code}
                  projectName={project.name}
                  projectSlug={project.slug}
                  projectStatus={project.status}
                />
                <StatusActionForm project={project} targetStatus="draft" />
                <StatusActionForm project={project} targetStatus="active" />
                <AdminProjectDeleteForm projectId={project.id} projectCode={project.code} projectName={project.name} projectStatus={project.status} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
