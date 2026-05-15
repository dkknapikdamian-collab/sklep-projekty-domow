import Link from "next/link";
import { ClipboardList, ExternalLink } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  ADMIN_ORDER_STATUS_LABELS,
  getAdminOrders
} from "@/lib/admin/orders-admin";
import { money } from "@/lib/format";

export const dynamic = "force-dynamic";

type AdminOrdersPageProps = {
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

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const orders = await getAdminOrders();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const updatedId = firstParam(resolvedSearchParams.updated);
  const status = firstParam(resolvedSearchParams.status);

  return (
    <>
      <AdminHeader />
      <main className="admin-shell" data-admin-orders-v42="true" data-admin-orders-list-only-v44="true">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / ZAMÓWIENIA</span>
            <h1>Zamówienia</h1>
            <p>Lista realnych zamówień zapisanych w Supabase. Szczegółowa obsługa zamówienia jest na osobnej stronie operacyjnej.</p>
          </div>
          <Link href="/admin" className="admin-secondary-button">
            <ClipboardList size={18} /> Dashboard
          </Link>
        </section>

        {updatedId && (
          <section className="admin-form-success" role="status">
            Status zamówienia {updatedId.slice(0, 8)} został zapisany.
          </section>
        )}

        {status === "error" && (
          <section className="admin-form-error" role="status">
            Nie udało się zapisać statusu zamówienia. Sprawdź identyfikator i status.
          </section>
        )}

        {orders.length === 0 ? (
          <section className="admin-empty" data-admin-orders-empty="true">
            <h2>Nie ma jeszcze zamówień.</h2>
            <p>Po wysłaniu formularza na `/zamowienie` rekord pojawi się tutaj razem z pozycjami koszyka.</p>
          </section>
        ) : (
          <section className="admin-table-card" data-admin-orders-list="true">
            <div className="admin-order-list">
              {orders.map((order) => (
                <article className="admin-order-card admin-order-card-compact" data-admin-order-card="true" key={order.id}>
                  <header>
                    <div>
                      <span>Zamówienie</span>
                      <strong>#{order.shortId}</strong>
                      <small>{order.id}</small>
                    </div>
                    <strong className="admin-order-total">{money(order.totalGross)}</strong>
                  </header>

                  <dl className="admin-order-meta">
                    <div><dt>Klient</dt><dd>{order.customerName}</dd></div>
                    <div><dt>E-mail</dt><dd><a href={`mailto:${order.customerEmail}`}>{order.customerEmail}</a></dd></div>
                    <div><dt>Telefon</dt><dd><a href={`tel:${order.customerPhone}`}>{order.customerPhone}</a></dd></div>
                    <div><dt>Status</dt><dd>{ADMIN_ORDER_STATUS_LABELS[order.status]}</dd></div>
                    <div><dt>Data</dt><dd>{formatDate(order.createdAt)}</dd></div>
                    <div><dt>Pozycje</dt><dd>{order.items.length}</dd></div>
                  </dl>

                  <div className="admin-order-list-actions">
                    <Link
                      href={`/admin/zamowienia/${order.id}`}
                      className="admin-primary-button"
                      data-admin-order-detail-link="true"
                    >
                      <ExternalLink size={16} /> Obsłuż zamówienie
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
