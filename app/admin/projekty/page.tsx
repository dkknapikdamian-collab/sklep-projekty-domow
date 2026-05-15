import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAdminProjects } from "@/lib/admin/projects-admin";
import { AdminProjectsListClient } from "@/components/admin/AdminProjectsListClient";
import { FolderPlus } from "lucide-react";

export const dynamic = "force-dynamic";

type AdminListMessage = {
  tone: "success" | "neutral" | "error";
  text: string;
  checklist?: string[];
};

type AdminProjectsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getAdminListMessage(searchParams: Record<string, string | string[] | undefined>): AdminListMessage | null {
  if (firstParam(searchParams.status) === "updated") {
    return {
      tone: "success",
      text: "Status projektu zostal zapisany. Lista i publiczne strony zostaly odswiezone."
    };
  }

  if (firstParam(searchParams.status) === "error") {
    const rawReason = firstParam(searchParams.reason) || "unknown";
    let reason = rawReason;

    try {
      reason = decodeURIComponent(rawReason);
    } catch {
      reason = rawReason;
    }

    const missingParam = firstParam(searchParams.missing) || "";
    const checklist = missingParam
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    return {
      tone: "error",
      text: `Nie udalo sie zapisac zmiany projektu. Powod: ${reason}`,
      checklist: checklist.length ? checklist : undefined
    };
  }

  if (firstParam(searchParams.archived) === "1") {
    return {
      tone: "success",
      text: "Projekt zostal zarchiwizowany. Nie jest juz codzienna pozycja robocza i nie powinien byc widoczny publicznie."
    };
  }


  if (firstParam(searchParams.deleted) === "1") {
    return {
      tone: "success",
      text: "Projekt zostal trwale usuniety awaryjnie. Jezeli mial pliki w Storage, system sprobowal je usunac razem z rekordem."
    };
  }

  if (firstParam(searchParams.cancelled) === "1") {
    return {
      tone: "neutral",
      text: "Edycja zostala anulowana. Formularz nie wyslal zmian do Supabase."
    };
  }

  if (firstParam(searchParams.sample) === "created") {
    return {
      tone: "success",
      text: "Projekt przykladowy zostal utworzony i opublikowany jako active."
    };
  }

  if (firstParam(searchParams.sample) === "exists") {
    return {
      tone: "neutral",
      text: "Projekt przykladowy juz istnieje w bazie."
    };
  }

  return null;
}

export default async function AdminProjectsPage({ searchParams }: AdminProjectsPageProps) {
  const projects = await getAdminProjects();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const message = getAdminListMessage(resolvedSearchParams);

  return (
    <>
      <AdminHeader />
      <main className="admin-shell admin-projects-shell">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / PROJEKTY</span>
            <h1>Projekty</h1>
            <p>Lista projektow zapisana w Supabase. Z tego poziomu mozesz filtrowac, zmienic status, wejsc w edycje albo usunac projekt.</p>
          </div>
          <Link href="/admin/projekty/nowy" className="admin-primary-button">
            <FolderPlus size={18} /> Dodaj projekt
          </Link>
        </section>

        {message && (
          <section className={message.tone === "success" ? "admin-form-success" : message.tone === "error" ? "admin-form-error" : "admin-inline-notice"} role="status">
            <p>{message.text}</p>
            {message.checklist && message.checklist.length > 0 && (
              <ul>
                {message.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        <AdminProjectsListClient projects={projects} />
      </main>
    </>
  );
}
