import Link from "next/link";
import { Header } from "@/components/Header";
import { AdminProjectFormPreview } from "@/components/admin/AdminProjectFormPreview";

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
              To jest produkcyjny formularz pod docelowy panel. Na razie nie zapisuje do bazy, ale jego struktura zostaje pod Supabase.
            </p>
          </div>
          <Link href="/admin/projekty/podglad" className="admin-secondary-button">Podgląd karty</Link>
        </section>

        <AdminProjectFormPreview />
      </main>
    </>
  );
}
