import Link from "next/link";
import { Activity, ArrowLeft, Filter } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  ADMIN_AUDIT_ACTION_FILTER_LABELS,
  ADMIN_AUDIT_ACTION_FILTERS,
  adminAuditMetadataJson,
  adminAuditMetadataSummary,
  getAdminAuditLogEntries,
  toAdminAuditActionFilter
} from "@/lib/admin/audit-log";

export const dynamic = "force-dynamic";

type AdminAuditPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("pl-PL");
}

function shortId(value: string) {
  if (!value) return "-";
  return value.length > 18 ? `${value.slice(0, 18)}…` : value;
}

function actionLabel(value: string) {
  const normalized = toAdminAuditActionFilter(value);
  if (normalized === "all" && value !== "all") return value || "-";
  return ADMIN_AUDIT_ACTION_FILTER_LABELS[normalized];
}

export default async function AdminAuditPage({ searchParams }: AdminAuditPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const action = toAdminAuditActionFilter(firstParam(resolvedSearchParams.action));
  const entries = await getAdminAuditLogEntries({ action, limit: 100 });

  return (
    <>
      <AdminHeader />
      <main className="admin-shell admin-audit-shell" data-admin-audit-v50="true" data-admin-audit-log="true">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / AUDIT LOG</span>
            <h1>Audit operacji</h1>
            <p>
              Ślad operacji wykonanych w panelu admina. Ten widok jest tylko do odczytu:
              pokazuje kto, kiedy i na jakiej encji wykonał akcję.
            </p>
          </div>
          <Link href="/admin" className="admin-secondary-button">
            <ArrowLeft size={18} /> Dashboard
          </Link>
        </section>

        <form className="admin-audit-filter-bar" method="get" data-admin-audit-filter-bar="true">
          <div>
            <Filter size={16} />
            <strong>{entries.length}</strong>
            <span>ostatnich wpisów</span>
          </div>

          <label>
            <span>Typ akcji</span>
            <select name="action" defaultValue={action} data-admin-audit-action-filter="true">
              {ADMIN_AUDIT_ACTION_FILTERS.map((item) => (
                <option value={item} key={item}>
                  {ADMIN_AUDIT_ACTION_FILTER_LABELS[item]}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="admin-primary-button" data-admin-audit-filter-submit="true">
            <Activity size={16} /> Filtruj
          </button>

          <Link href="/admin/audit" className="admin-secondary-button" data-admin-audit-filter-reset="true">
            Reset
          </Link>
        </form>

        {entries.length === 0 ? (
          <section className="admin-empty" data-admin-audit-empty="true">
            <h2>Brak wpisów audit logu.</h2>
            <p>
              Wykonaj operację admina, np. zmianę statusu projektu albo zamówienia,
              a potem wróć tutaj. Jeśli filtr jest aktywny, spróbuj resetu.
            </p>
          </section>
        ) : (
          <section className="admin-table-card admin-audit-table-card" data-admin-audit-table="true">
            <div className="admin-audit-table-wrap">
              <table className="admin-table admin-audit-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Admin</th>
                    <th>Akcja</th>
                    <th>Typ encji</th>
                    <th>ID encji</th>
                    <th>Metadata</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr data-admin-audit-entry="true" data-admin-audit-action-value={entry.action} key={entry.id}>
                      <td data-admin-audit-created-at="true">{formatDate(entry.createdAt)}</td>
                      <td data-admin-audit-actor="true">
                        <strong>{entry.actorEmail || "admin"}</strong>
                        {entry.actorUserId && <small>{shortId(entry.actorUserId)}</small>}
                      </td>
                      <td data-admin-audit-action="true">{actionLabel(entry.action)}</td>
                      <td data-admin-audit-entity-type="true">{entry.entityType}</td>
                      <td data-admin-audit-entity-id="true"><code>{shortId(entry.entityId)}</code></td>
                      <td data-admin-audit-metadata-summary="true">
                        <code title={adminAuditMetadataJson(entry.metadata)}>
                          {adminAuditMetadataSummary(entry.metadata)}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

