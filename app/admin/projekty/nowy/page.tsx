import Link from "next/link";
import { Header } from "@/components/Header";
import { AdminProjectCreateForm } from "@/components/admin/AdminProjectCreateForm";

export const dynamic = "force-dynamic";

export default function NewAdminProjectPage() {
  return (
    <>
      <Header />
      <main className="admin-shell">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / NOWY PROJEKT</span>
            <h1>Dodaj projekt</h1>
            <p>
              Projekt zostanie zapisany w Supabase. Media publiczne trafią do `project-media`, a pliki prywatne do `project-private-files`.
            </p>
          </div>
          <Link href="/admin/projekty/podglad" className="admin-secondary-button">Podgląd karty</Link>
        </section>

        <AdminProjectCreateForm />
      </main>
    </>
  );
}
