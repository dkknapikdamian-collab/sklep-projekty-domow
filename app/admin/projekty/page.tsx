import Link from "next/link";
import { Header } from "@/components/Header";
import { getAdminProjects } from "@/lib/admin/projects-admin";
import { AdminProjectsTable } from "@/components/admin/AdminProjectsTable";
import { FolderPlus, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <>
      <Header />
      <main className="admin-shell">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / PROJEKTY</span>
            <h1>Projekty</h1>
            <p>Lista projektów zapisana w Supabase. Z tego poziomu możesz zmienić status, wejść w edycję albo usunąć projekt.</p>
          </div>
          <Link href="/admin/projekty/nowy" className="admin-primary-button">
            <FolderPlus size={18} /> Dodaj projekt
          </Link>
        </section>

        <section className="admin-toolbar">
          <div className="admin-search">
            <Search size={18} />
            <input placeholder="Szukaj po nazwie, kodzie, statusie..." />
          </div>
          <select>
            <option>Wszystkie statusy</option>
            <option>Draft</option>
            <option>Active</option>
            <option>Hidden</option>
            <option>Archived</option>
          </select>
        </section>

        {projects.length > 0 ? (
          <AdminProjectsTable projects={projects} />
        ) : (
          <section className="admin-empty">
            <h2>Nie ma jeszcze żadnych projektów.</h2>
            <p>Dodaj pierwszy projekt. Najbezpieczniej zacząć od statusu draft, sprawdzić dane i dopiero potem ustawić active.</p>
            <div>
              <Link href="/admin/projekty/nowy" className="admin-primary-button">Dodaj projekt</Link>
              <Link href="/admin/projekty/podglad" className="admin-secondary-button">Zobacz podgląd karty</Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
