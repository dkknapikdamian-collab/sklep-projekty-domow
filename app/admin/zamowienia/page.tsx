import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { updateOrderStatusAction } from "@/app/admin/zamowienia/actions";
import { ADMIN_ORDER_STATUS_LABELS, ADMIN_ORDER_STATUSES, getAdminOrders, type AdminOrderListItem } from "@/lib/admin/orders-admin";
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

function OrderStatusForm({ order }: { order: AdminOrderListItem }) {
  return (
    <form action={updateOrderStatusAction} className="admin-order-status-form" data-admin-order-status-form="true">
      <input type="hidden" name="orderId" value={order.id} />
      <select name="status" defaultValue={order.status} aria-label={`Status zamowienia ${order.shortId}`}>
        {ADMIN_ORDER_STATUSES.map((status) => (
          <option value={status} key={status}>{ADMIN_ORDER_STATUS_LABELS[status]}</option>
        ))}
      </select>
      <button type="submit" className="admin-secondary-button">Zapisz</button>
    </form>
  );
}

function OrderDetails({ order }: { order: AdminOrderListItem }) {
  return (
    <details className="admin-order-details" data-admin-order-details="true">
      <summary>Pozycje i dane obslugi</summary>
      <div className="admin-order-details-grid">
        <section>
          <h3>Pozycje zamowienia</h3>
          <div className="admin-order-items" data-admin-order-items="true">
            {order.items.map((item) => (
              <article key={item.id} className="admin-order-item">
                <strong>{item.projectCode} / {item.projectName}</strong>
                <span>Slug: {item.projectSlug}</span>
                <span>Wariant: {item.variantName}</span>
                <span>Baza: {money(item.basePriceGross)} | Wariant: {money(item.variantPriceGross)} | Razem: {money(item.itemTotalGross)}</span>
                {item.addons.length > 0 && (
                  <ul>
                    {item.addons.map((addon) => (
                      <li key={addon.id}>
                        {addon.name} ({addon.code}) +{money(addon.priceGross)}
                        {addon.deliveryAction ? ` / ${addon.deliveryAction}` : ""}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
        <section>
          <h3>Uwagi klienta</h3>
          <p>{order.notes || "Brak uwag."}</p>
          <h3>Dane do faktury</h3>
          <p>{order.invoiceData || "Brak danych do faktury."}</p>
        </section>
      </div>
    </details>
  );
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const orders = await getAdminOrders();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const updatedId = firstParam(resolvedSearchParams.updated);
  const status = firstParam(resolvedSearchParams.status);

  return (
    <>
      <AdminHeader />
      <main className="admin-shell" data-admin-orders-v42="true">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / ZAMOWIENIA</span>
            <h1>Zamowienia</h1>
            <p>Lista realnych zamowien zapisanych w Supabase. Ten panel sluzy do recznego kontaktu, oznaczania platnosci manualnej i wysylki.</p>
          </div>
          <Link href="/admin" className="admin-secondary-button">
            <ClipboardList size={18} /> Dashboard
          </Link>
        </section>

        {updatedId && (
          <section className="admin-form-success" role="status">
            Status zamowienia {updatedId.slice(0, 8)} zostal zapisany.
          </section>
        )}

        {status === "error" && (
          <section className="admin-form-error" role="status">
            Nie udalo sie zapisac statusu zamowienia. Sprawdz identyfikator i status.
          </section>
        )}

        {orders.length === 0 ? (
          <section className="admin-empty" data-admin-orders-empty="true">
            <h2>Nie ma jeszcze zamowien.</h2>
            <p>Po wyslaniu formularza na `/zamowienie` rekord pojawi sie tutaj razem z pozycjami koszyka.</p>
          </section>
        ) : (
          <section className="admin-table-card" data-admin-orders-list="true">
            <div className="admin-order-list">
              {orders.map((order) => (
                <article className="admin-order-card" data-admin-order-card="true" key={order.id}>
                  <header>
                    <div>
                      <span>Zamowienie</span>
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

                  <OrderStatusForm order={order} />
                  <OrderDetails order={order} />
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
