import Link from "next/link";
import { Header } from "@/components/Header";
import { getAdminProjects } from "@/lib/admin/projects-admin";
import { AdminProjectsListClient } from "@/components/admin/AdminProjectsListClient";
import { FolderPlus } from "lucide-react";

export const dynamic = "force-dynamic";

type AdminListMessage = {
  tone: "success" | "neutral" | "error";
  text: string;
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
      text: "Status projektu został zapisany. Lista i publiczne strony zostały odświeżone."
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

    return {
      tone: "error",
      text: `Nie udało się zapisać zmiany projektu. Powód: ${reason}`
    };
  }

  if (firstParam(searchParams.deleted) === "1") {
    return {
      tone: "success",
      text: "Projekt został usunięty z bazy. Jeżeli miał pliki w Storage, system spróbował je usunąć razem z rekordem."
    };
  }

  if (firstParam(searchParams.cancelled) === "1") {
    return {
      tone: "neutral",
      text: "Edycja została anulowana. Formularz nie wysłał zmian do Supabase."
    };
  }

  if (firstParam(searchParams.sample) === "created") {
    return {
      tone: "success",
      text: "Projekt przykładowy został utworzony i opublikowany jako active."
    };
  }

  if (firstParam(searchParams.sample) === "exists") {
    return {
      tone: "neutral",
      text: "Projekt przykładowy już istnieje w bazie."
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
      <Header />
      <main className="admin-shell">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / PROJEKTY</span>
            <h1>Projekty</h1>
            <p>Lista projektów zapisana w Supabase. Z tego poziomu możesz filtrować, zmienić status, wejść w edycję albo usunąć projekt.</p>
          </div>
          <Link href="/admin/projekty/nowy" className="admin-primary-button">
            <FolderPlus size={18} /> Dodaj projekt
          </Link>
        </section>

        {message && (
          <section className={message.tone === "success" ? "admin-form-success" : message.tone === "error" ? "admin-form-error" : "admin-inline-notice"} role="status">
            {message.text}
          </section>
        )}

        <AdminProjectsListClient projects={projects} />
      </main>
    </>
  );
}
