"use client";

import Link from "next/link";
import { updateProjectStatusAction } from "@/app/admin/projekty/actions";
import type { AdminProjectListItem } from "@/lib/admin/projects-admin";
import { Eye, ImageIcon, Pencil } from "lucide-react";
import { AdminProjectDeleteForm } from "./AdminProjectDeleteForm";
import { AdminSubmitButton } from "./AdminSubmitButton";

const STATUS_OPTIONS = ["draft", "active", "hidden", "archived"];

export function AdminProjectsTable({ projects }: { projects: AdminProjectListItem[] }) {
  return (
    <section className="admin-table-card">
      <table className="admin-table admin-projects-table">
        <thead>
          <tr>
            <th>Kod</th>
            <th>Nazwa</th>
            <th>Status</th>
            <th>Cena</th>
            <th>Media</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td><strong>{project.code}</strong></td>
              <td>
                <strong className="admin-project-name">{project.name}</strong>
                <small>{project.slug}</small>
              </td>
              <td>
                <form action={updateProjectStatusAction} className="admin-status-form">
                  <input type="hidden" name="projectId" value={project.id} />
                  <input type="hidden" name="slug" value={project.slug} />
                  <select name="status" defaultValue={project.status} aria-label={`Status projektu ${project.code}`}>
                    {STATUS_OPTIONS.map((status) => (
                      <option value={status} key={status}>{status}</option>
                    ))}
                  </select>
                  <AdminSubmitButton idleLabel="Zmień" pendingLabel="Zapis..." className="admin-status-submit" iconSize={14} />
                </form>
              </td>
              <td>{project.priceGross.toLocaleString("pl-PL")} zł</td>
              <td><span className="media-count"><ImageIcon size={15} />{project.mediaCount}</span></td>
              <td>
                <div className="admin-row-actions">
                  {project.status === "active" && (
                    <Link href={`/projekty/${project.slug}`} target="_blank">
                      <Eye size={15} /> Publicznie
                    </Link>
                  )}
                  <Link href={`/admin/projekty/${project.id}/edytuj`}>
                    <Pencil size={15} /> Edytuj
                  </Link>
                  <AdminProjectDeleteForm projectId={project.id} projectCode={project.code} projectName={project.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
