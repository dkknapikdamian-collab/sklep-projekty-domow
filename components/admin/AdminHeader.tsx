import Link from "next/link";
import { ArrowUpRight, Bug, ClipboardList, History, Home, LayoutDashboard, ListChecks, MonitorCog, PlusCircle, ShieldCheck } from "lucide-react";
import { AdminUiDebugReporter } from "@/components/admin/AdminUiDebugReporter";
import { AdminScrollStabilizer } from "@/components/admin/AdminScrollStabilizer";

export function AdminHeader() {
  return (
    <header className="admin-header-v24" data-admin-header-v24="true">
      <div className="admin-header-v24-top">
        <Link href="/admin" className="admin-header-v24-brand" aria-label="Panel admina">
          <span className="admin-header-v24-mark"><ShieldCheck size={24} strokeWidth={1.7} /></span>
          <span>
            <strong>ADMIN</strong>
            <small>Projekty domów</small>
          </span>
        </Link>

        <div className="admin-header-v24-context">
          <span>Tryb administracyjny</span>
          <small>Zmiany zapisują się w Supabase</small>
        </div>

        <Link href="/" className="admin-header-v24-store-link">
          Zobacz sklep <ArrowUpRight size={15} />
        </Link>
      </div>

      <nav className="admin-header-v24-nav" aria-label="Nawigacja admina">
        <Link href="/admin"><LayoutDashboard size={17} /> Dashboard</Link>
        <Link href="/admin/projekty"><ListChecks size={17} /> Projekty</Link>
        <Link href="/admin/zamowienia"><ClipboardList size={17} /> Zamówienia</Link>
        <Link href="/admin/audit"><History size={17} /> Audit</Link>
        <Link href="/admin/projekty/nowy"><PlusCircle size={17} /> Dodaj projekt</Link>
        <Link href="/admin/strona-glowna"><MonitorCog size={17} /> Strona główna</Link>
        <Link href="/admin/debug"><Bug size={17} /> Debug</Link>
        <Link href="/projekty" className="admin-header-v24-public-preview"><Home size={17} /> Publiczny katalog</Link>
      </nav>
      <AdminUiDebugReporter />
      <AdminScrollStabilizer />
    </header>
  );
}
