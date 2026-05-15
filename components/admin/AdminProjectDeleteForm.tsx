"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { Archive, ShieldAlert, Trash2 } from "lucide-react";
import { archiveProjectAction, deleteProjectAction } from "@/app/admin/projekty/actions";

type AdminProjectDeleteFormProps = {
  projectId: string;
  projectCode?: string;
  projectName?: string;
  projectStatus?: string;
  className?: string;
};

type AdminProjectArchiveFormProps = {
  projectId: string;
  projectCode?: string;
  projectName?: string;
  projectSlug?: string;
  projectStatus?: string;
};

function ArchiveProjectSubmitButton({ isArchived }: { isArchived: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="admin-archive-submit"
      disabled={pending || isArchived}
      aria-busy={pending}
      data-admin-action="project-archive-submit"
    >
      <Archive size={14} /> {pending ? "Archiwizowanie..." : isArchived ? "Zarchiwizowany" : "Archiwizuj"}
    </button>
  );
}

function DeleteProjectSubmitButton({
  isCodeConfirmed,
  canAttemptPhysicalDelete
}: {
  isCodeConfirmed: boolean;
  canAttemptPhysicalDelete: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="admin-danger-button"
      disabled={pending || !isCodeConfirmed || !canAttemptPhysicalDelete}
      aria-busy={pending}
      data-admin-action="project-delete-submit"
    >
      <Trash2 size={15} /> {pending ? "Usuwanie..." : "Usuń trwale"}
    </button>
  );
}

export function AdminProjectArchiveForm({
  projectId,
  projectCode,
  projectName,
  projectSlug,
  projectStatus
}: AdminProjectArchiveFormProps) {
  const isArchived = projectStatus === "archived";
  const projectLabel = [projectCode, projectName].filter(Boolean).join(" — ") || "ten projekt";

  return (
    <form
      action={archiveProjectAction}
      className="admin-inline-form"
      data-admin-action="project-archive"
      onSubmit={(event) => {
        if (isArchived) {
          event.preventDefault();
          return;
        }

        if (!window.confirm("Zarchiwizować projekt " + projectLabel + "? Zniknie z codziennej pracy i nie będzie publiczny.")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="slug" value={projectSlug || ""} />
      <ArchiveProjectSubmitButton isArchived={isArchived} />
    </form>
  );
}

export function AdminProjectDeleteForm({ projectId, projectCode, projectName, projectStatus, className }: AdminProjectDeleteFormProps) {
  const expectedProjectCode = String(projectCode || "").trim().toUpperCase();
  const projectLabel = [projectCode, projectName].filter(Boolean).join(" — ") || "ten projekt";
  const isActiveProject = projectStatus === "active";
  const canAttemptPhysicalDelete = projectStatus === "archived" || projectStatus === "draft";
  const [typedConfirmCode, setTypedConfirmCode] = useState("");

  const isCodeConfirmed = useMemo(() => {
    return Boolean(expectedProjectCode) && typedConfirmCode.trim().toUpperCase() === expectedProjectCode;
  }, [expectedProjectCode, typedConfirmCode]);

  return (
    <details className={`admin-delete-safety ${className || ""}`} data-admin-action="project-hard-delete">
      <summary><ShieldAlert size={13} /> Awaryjne</summary>
      <div className="admin-delete-safety-panel" data-admin-emergency-delete-panel="true">
        <strong>Ostatni guzik pod szkłem</strong>
        <p>
          Codzienna praca admina ma używać archiwizacji. Fizyczne usunięcie jest operacją awaryjną i usuwa rekord projektu oraz powiązane dane z bazy. System spróbuje też usunąć powiązane pliki ze Storage.
        </p>
        {!canAttemptPhysicalDelete && (
          <p className="admin-delete-active-warning" data-admin-delete-active-warning="true">
            Najpierw zarchiwizuj projekt albo ustaw draft. Fizyczne usunięcie jest zablokowane dla statusu {projectStatus || "nieznanego"}.
          </p>
        )}
        {isActiveProject && (
          <p className="admin-delete-active-warning" data-admin-delete-active-first-warning="true">
            Ten projekt jest active i może być widoczny publicznie. Nie wolno usuwać go trwale bez wcześniejszej archiwizacji albo zejścia do draft.
          </p>
        )}
        <p>
          Aby odblokować usuwanie awaryjne, wpisz kod projektu: <code>{expectedProjectCode || "BRAK KODU"}</code>.
        </p>
        <form
          action={deleteProjectAction}
          data-admin-action="project-delete-form"
          onSubmit={(event) => {
            if (!canAttemptPhysicalDelete) {
              event.preventDefault();
              window.alert("Najpierw zarchiwizuj projekt albo ustaw draft. Dopiero potem można użyć awaryjnego usunięcia.");
              return;
            }

            if (!isCodeConfirmed) {
              event.preventDefault();
              window.alert("Wpisz kod projektu " + expectedProjectCode + ", żeby potwierdzić usunięcie.");
              return;
            }

            if (!window.confirm("Awaryjnie usunąć trwale projekt " + projectLabel + "? Tej operacji nie cofniemy.")) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="projectId" value={projectId} />
          <input type="hidden" name="projectCode" value={projectCode || ""} />
          <input type="hidden" name="projectName" value={projectName || ""} />
          <label>
            Kod projektu wymagany do usunięcia awaryjnego
            <input
              name="deleteConfirmCode"
              value={typedConfirmCode}
              onChange={(event) => setTypedConfirmCode(event.target.value)}
              placeholder={expectedProjectCode || "DP-..."}
              autoComplete="off"
              data-admin-delete-confirm-code="true"
            />
          </label>
          <DeleteProjectSubmitButton isCodeConfirmed={isCodeConfirmed} canAttemptPhysicalDelete={canAttemptPhysicalDelete} />
        </form>
      </div>
    </details>
  );
}
