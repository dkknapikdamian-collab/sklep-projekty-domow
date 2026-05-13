import Link from "next/link";
import { Header } from "@/components/Header";
import { getAllProjects, getPublishedProjects } from "@/lib/projects";
import { FolderPlus, Home, Images, ListChecks, LockKeyhole, PackageCheck, Settings, ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  const allProjects = getAllProjects();
  const activeProjects = getPublishedProjects();
  const draftProjects = allProjects.filter((project) => project.status === "draft");

  return (
    <>
      <Header />
      <main className="admin-shell">
        <section className="admin-hero">
          <span>ADMIN PANEL / TRYB LOKALNY</span>
          <h1>Panel zarządzania sklepem</h1>
          <p>
            To jest produkcyjny szkielet panelu admina. Teraz czyta dane lokalnie, a po podpięciu Supabase przełączymy logowanie, bazę i storage.
          </p>
        </section>

        <section className="admin-metrics-grid">
          <div className="admin-metric-card">
            <PackageCheck size={27} />
            <span>Wszystkie projekty</span>
            <strong>{allProjects.length}</strong>
          </div>
          <div className="admin-metric-card">
            <ShieldCheck size={27} />
            <span>Opublikowane</span>
            <strong>{activeProjects.length}</strong>
          </div>
          <div className="admin-metric-card">
            <ListChecks size={27} />
            <span>Szkice</span>
            <strong>{draftProjects.length}</strong>
          </div>
          <div className="admin-metric-card">
            <LockKeyhole size={27} />
            <span>Auth</span>
            <strong>Supabase później</strong>
          </div>
        </section>

        <section className="admin-action-grid">
          <Link href="/admin/projekty" className="admin-action-card">
            <Home size={34} />
            <h2>Projekty</h2>
            <p>Lista projektów z lokalnego źródła danych. Docelowo będzie czytana z Supabase Postgres.</p>
          </Link>

          <Link href="/admin/projekty/nowy" className="admin-action-card primary">
            <FolderPlus size={34} />
            <h2>Dodaj projekt</h2>
            <p>Formularz produkcyjny pod kod, nazwę, cenę, parametry, pomieszczenia, media i status.</p>
          </Link>

          <Link href="/admin/projekty/podglad" className="admin-action-card">
            <Images size={34} />
            <h2>Podgląd karty</h2>
            <p>Zobacz kartę projektu jako draft bez publikowania fikcyjnej oferty w katalogu.</p>
          </Link>

          <div className="admin-action-card muted">
            <Settings size={34} />
            <h2>Ustawienia</h2>
            <p>Tu później pojawią się dane sklepu, konta, role, storage, płatności i e-mail.</p>
          </div>
        </section>

        <section className="admin-note-card">
          <h2>Co zostanie po przejściu na Supabase?</h2>
          <p>
            Zostaje układ panelu, formularze, walidacje, podgląd i logika publikacji. Do wymiany pójdzie tylko lokalny adapter danych:
            zamiast czytać i zapisywać pliki, zaczniemy czytać i zapisywać rekordy w Supabase.
          </p>
        </section>
      </main>
    </>
  );
}
