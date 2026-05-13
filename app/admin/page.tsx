import Link from "next/link";
import { Header } from "@/components/Header";
import { getAdminProjectMetrics } from "@/lib/admin/projects-admin";
import { FolderPlus, Home, Images, ListChecks, LockKeyhole, PackageCheck, Settings, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const metrics = await getAdminProjectMetrics();

  return (
    <>
      <Header />
      <main className="admin-shell">
        <section className="admin-hero">
          <span>ADMIN PANEL / SUPABASE</span>
          <h1>Panel zarządzania sklepem</h1>
          <p>
            To jest prawdziwy panel admina. Projekty są zapisywane w Supabase, a media w Supabase Storage.
          </p>
        </section>

        <section className="admin-metrics-grid">
          <div className="admin-metric-card"><PackageCheck size={27} /><span>Wszystkie projekty</span><strong>{metrics.total}</strong></div>
          <div className="admin-metric-card"><ShieldCheck size={27} /><span>Opublikowane</span><strong>{metrics.active}</strong></div>
          <div className="admin-metric-card"><ListChecks size={27} /><span>Szkice</span><strong>{metrics.draft}</strong></div>
          <div className="admin-metric-card"><LockKeyhole size={27} /><span>Auth</span><strong>Supabase</strong></div>
        </section>

        <section className="admin-action-grid">
          <Link href="/admin/projekty" className="admin-action-card">
            <Home size={34} />
            <h2>Projekty</h2>
            <p>Lista projektów z Supabase Postgres.</p>
          </Link>

          <Link href="/admin/projekty/nowy" className="admin-action-card primary">
            <FolderPlus size={34} />
            <h2>Dodaj projekt</h2>
            <p>Dodaj projekt, parametry, pomieszczenia, dodatki, warianty i media.</p>
          </Link>

          <Link href="/admin/projekty/podglad" className="admin-action-card">
            <Images size={34} />
            <h2>Podgląd karty</h2>
            <p>Zobacz kartę projektu jako draft bez publikowania oferty.</p>
          </Link>

          <div className="admin-action-card muted">
            <Settings size={34} />
            <h2>Ustawienia</h2>
            <p>Tu później pojawią się dane sklepu, role, płatności i e-mail.</p>
          </div>
        </section>
      </main>
    </>
  );
}
