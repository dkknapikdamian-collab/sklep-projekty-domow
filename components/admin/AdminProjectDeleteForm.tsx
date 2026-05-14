"use client";

import { useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";
import { deleteProjectAction } from "@/app/admin/projekty/actions";

type AdminProjectDeleteFormProps = {
  projectId: string;
  projectCode?: string;
  projectName?: string;
  className?: string;
};

function DeleteProjectSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="admin-danger-button" disabled={pending} aria-busy={pending} data-admin-action="project-delete-submit">
      <Trash2 size={15} /> {pending ? "Usuwanie..." : "Usuń"}
    </button>
  );
}

export function AdminProjectDeleteForm({ projectId, projectCode, projectName, className }: AdminProjectDeleteFormProps) {
  const projectLabel = [projectCode, projectName].filter(Boolean).join(" — ") || "ten projekt";

  return (
    <form
      action={deleteProjectAction}
      className={className}
      data-admin-action="project-delete"
      onSubmit={(event) => {
        if (!window.confirm(`Usunąć projekt ${projectLabel}? Tej operacji nie cofniemy.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="projectCode" value={projectCode || ""} />
      <input type="hidden" name="projectName" value={projectName || ""} />
      <DeleteProjectSubmitButton />
    </form>
  );
}
