"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";
import { deleteProjectAction } from "@/app/admin/projekty/actions";

type AdminProjectDeleteFormProps = {
  projectId: string;
  projectCode?: string;
  projectName?: string;
  projectStatus?: string;
  className?: string;
};

function DeleteProjectSubmitButton({ isCodeConfirmed }: { isCodeConfirmed: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="admin-danger-button"
      disabled={pending || !isCodeConfirmed}
      aria-busy={pending}
      data-admin-action="project-delete-submit"
    >
      <Trash2 size={15} /> {pending ? "Usuwanie..." : "Usuń trwale"}
    </button>
  );
}

export function AdminProjectDeleteForm({ projectId, projectCode, projectName, projectStatus, className }: AdminProjectDeleteFormProps) {
  const expectedProjectCode = String(projectCode || "").trim().toUpperCase();
  const projectLabel = [projectCode, projectName].filter(Boolean).join(" — ") || "ten projekt";
  const isActiveProject = projectStatus === "active";
  const [typedConfirmCode, setTypedConfirmCode] = useState("");

  const isCodeConfirmed = useMemo(() => {
    return Boolean(expectedProjectCode) && typedConfirmCode.trim().toUpperCase() === expectedProjectCode;
  }, [expectedProjectCode, typedConfirmCode]);

  return (
    <details className={`admin-delete-safety ${className || ""}`} data-admin-action="project-delete">
      <summary>Usuń projekt</summary>
      <div className="admin-delete-safety-panel">
        <strong>Strefa destrukcyjna</strong>
        <p>
          Usunięcie projektu usuwa rekord projektu i powiązane dane z bazy. System spróbuje też usunąć powiązane pliki ze Storage.
        </p>
        {isActiveProject && (
          <p className="admin-delete-active-warning" data-admin-delete-active-warning="true">
            Ten projekt ma status active i może być widoczny publicznie. Najpierw rozważ ustawienie statusu draft albo archived.
          </p>
        )}
        <p>
          Aby odblokować usuwanie, wpisz kod projektu: <code>{expectedProjectCode || "BRAK KODU"}</code>.
        </p>
        <form
          action={deleteProjectAction}
          data-admin-action="project-delete-form"
          onSubmit={(event) => {
            if (!isCodeConfirmed) {
              event.preventDefault();
              window.alert("Wpisz kod projektu " + expectedProjectCode + ", żeby potwierdzić usunięcie.");
              return;
            }

            if (!window.confirm("Usunąć projekt " + projectLabel + "? Tej operacji nie cofniemy.")) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="projectId" value={projectId} />
          <input type="hidden" name="projectCode" value={projectCode || ""} />
          <input type="hidden" name="projectName" value={projectName || ""} />
          <label>
            Kod projektu wymagany do usunięcia
            <input
              name="deleteConfirmCode"
              value={typedConfirmCode}
              onChange={(event) => setTypedConfirmCode(event.target.value)}
              placeholder={expectedProjectCode || "DP-..."}
              autoComplete="off"
              data-admin-delete-confirm-code="true"
            />
          </label>
          <DeleteProjectSubmitButton isCodeConfirmed={isCodeConfirmed} />
        </form>
      </div>
    </details>
  );
}
