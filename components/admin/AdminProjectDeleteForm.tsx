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
  returnTo?: string;
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
      <Trash2 size={14} /> {pending ? "Usuwanie..." : "Usuń trwale"}
    </button>
  );
}

export function AdminProjectArchiveForm({
  projectId,
  projectCode,
  projectName,
  projectSlug,
  projectStatus,
  returnTo
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
      <input type="hidden" name="returnTo" value={returnTo || ""} />
      <ArchiveProjectSubmitButton isArchived={isArchived} />
    </form>
  );
}

export function AdminProjectDeleteForm({ projectId, projectCode, projectName, projectStatus, className }: AdminProjectDeleteFormProps) {
  const expectedProjectCode = String(projectCode || "").trim().toUpperCase();
  const projectLabel = [projectCode, projectName].filter(Boolean).join(" — ") || "ten projekt";
  const isActiveProject = projectStatus === "active";
  const canAttemptPhysicalDelete = Boolean(expectedProjectCode);
  const [typedConfirmCode, setTypedConfirmCode] = useState("");

  const isCodeConfirmed = useMemo(() => {
    return Boolean(expectedProjectCode) && typedConfirmCode.trim().toUpperCase() === expectedProjectCode;
  }, [expectedProjectCode, typedConfirmCode]);

  return (
    <details className={`admin-delete-safety ${className || ""}`} data-admin-action="project-hard-delete">
      <summary><ShieldAlert size={12} /> Awaryjne usunięcie</summary>
      <div className="admin-delete-safety-panel" data-admin-emergency-delete-panel="true">
        <strong>Trwałe usunięcie</strong>
        <p>
          Domyślnie używaj archiwizacji. Trwałe usunięcie kasuje projekt i powiązane dane z bazy. System spróbuje też usunąć pliki ze Storage.
        </p>
        <p className="admin-delete-active-warning" data-admin-delete-active-warning="true">
          Usunięcie działa także dla statusu active po wpisaniu kodu projektu, ale to operacja awaryjna i nieodwracalna.
        </p>
        {isActiveProject && (
          <p className="admin-delete-active-warning" data-admin-delete-active-first-warning="true">
            Projekt active może być publiczny. Najbezpieczniej najpierw go zarchiwizować, a dopiero potem usuwać trwale.
          </p>
        )}
        <p>
          Wpisz kod projektu: <code>{expectedProjectCode || "BRAK KODU"}</code>.
        </p>
        <form
          action={deleteProjectAction}
          data-admin-action="project-delete-form"
          onSubmit={(event) => {
            if (!expectedProjectCode) {
              event.preventDefault();
              window.alert("Brak kodu projektu. Bez kodu nie można wykonać trwałego usunięcia.");
              return;
            }

            if (!isCodeConfirmed) {
              event.preventDefault();
              window.alert("Wpisz kod projektu " + expectedProjectCode + ", żeby potwierdzić usunięcie.");
              return;
            }

            const activeSuffix = isActiveProject ? " Projekt ma status active." : "";
            if (!window.confirm("Awaryjnie usunąć trwale projekt " + projectLabel + "? Tej operacji nie cofniemy." + activeSuffix)) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="projectId" value={projectId} />
          <input type="hidden" name="projectCode" value={projectCode || ""} />
          <input type="hidden" name="projectName" value={projectName || ""} />
          <label>
            Kod projektu
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
