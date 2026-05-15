import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { updateOrderStatusAction } from "@/app/admin/zamowienia/actions";
import {
  ADMIN_ORDER_STATUS_LABELS,
  ADMIN_ORDER_STATUSES,
  getAdminOrders,
  type AdminOrderItem,
  type AdminOrderListItem
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

function OrderStatusForm({ order }: { order: AdminOrderListItem }) {
  return (
    <form action={updateOrderStatusAction} className="admin-order-status-form" data-admin-order-status-form="true">
      <input type="hidden" name="orderId" value={order.id} />
      <select name="status" defaultValue={order.status} aria-label={`Status zamówienia ${order.shortId}`}>
        {ADMIN_ORDER_STATUSES.map((status) => (
          <option value={status} key={status}>{ADMIN_ORDER_STATUS_LABELS[status]}</option>
        ))}
      </select>
      <button type="submit" className="admin-secondary-button">Zapisz</button>
    </form>
  );
}

function PrivateFilesList({ item }: { item: AdminOrderItem }) {
  if (item.privateFiles.length === 0) {
    return (
      <p className="admin-order-private-files-empty" data-admin-order-private-files-empty="true">
        Brak plików prywatnych przypiętych do tego projektu. Przed realizacją sprawdź media prywatne w edycji projektu.
      </p>
    );
  }

  return (
    <ul className="admin-order-private-files" data-admin-order-private-files="true">
      {item.privateFiles.map((file) => (
        <li key={file.id} data-admin-order-private-file-type={file.fileType}>
          <strong>{file.fileLabel}</strong>
          <span>{file.title || file.fileType}</span>
          <small>Bucket: {file.bucket}</small>
          {file.version && <small>Wersja: {file.version}</small>}
          <code>{file.path}</code>
        </li>
      ))}
    </ul>
  );
}

function OrderFulfillmentPanel({ order }: { order: AdminOrderListItem }) {
  const privateFiles = order.items.flatMap((item) => item.privateFiles);
  const hasPdfEmailAddon = order.items.some((item) => item.hasPdfEmailAddon);
  const hasPdfEmailFile = privateFiles.some((file) => file.fileType === "pdf_email_package");
  const hasZipFile = privateFiles.some((file) => file.fileType === "full_package" || file.path.toLowerCase().endsWith(".zip"));
  const hasDocumentationFile = privateFiles.some((file) => file.fileType === "documentation");

  return (
    <section className="admin-order-fulfillment" data-admin-order-fulfillment-v43="true">
      <div>
        <h3>Realizacja ręczna</h3>
        <p>
          Ten panel nie generuje linków czasowych i nie wysyła maili automatycznie. Ma pokazać operatorowi, co trzeba wysłać klientowi po potwierdzeniu płatności.
        </p>
      </div>

      <div className="admin-order-fulfillment-grid">
        <article data-admin-order-pdf-email-addon={hasPdfEmailAddon ? "true" : "false"}>
          <span>Dodatek PDF na e-mail</span>
          <strong>{hasPdfEmailAddon ? "Tak, zamówiony" : "Nie dotyczy"}</strong>
          <p>
            {hasPdfEmailAddon
              ? hasPdfEmailFile
                ? "Wyślij klientowi prywatny plik typu PDF na e-mail."
                : "Dodatek jest w zamówieniu, ale nie znaleziono przypiętego pliku pdf_email_package przy projekcie."
              : "Nie wysyłaj dodatkowego PDF-a na e-mail, jeśli nie ustalisz tego ręcznie z klientem."}
          </p>
        </article>

        <article data-admin-order-send-instructions="true">
          <span>Co wysłać klientowi</span>
          <strong>{privateFiles.length > 0 ? `${privateFiles.length} plików prywatnych do sprawdzenia` : "Brak plików prywatnych"}</strong>
          <p>
            Najpierw potwierdź płatność. Następnie wyślij prywatne pliki przypięte do projektów w zamówieniu: dokumentację PDF, paczkę ZIP oraz PDF na e-mail, jeśli dodatek został zamówiony.
          </p>
          <small>PDF: {hasDocumentationFile ? "jest" : "brak"} / ZIP: {hasZipFile ? "jest" : "brak"}</small>
        </article>
      </div>

      <ul className="admin-order-fulfillment-checklist" data-admin-order-fulfillment-checklist="true">
        <li data-admin-fulfillment-payment-confirmed="true"><span aria-hidden="true">☐</span> Płatność potwierdzona</li>
        <li data-admin-fulfillment-pdf-sent="true"><span aria-hidden="true">☐</span> PDF wysłany, jeśli dotyczy</li>
        <li data-admin-fulfillment-zip-sent="true"><span aria-hidden="true">☐</span> ZIP wysłany, jeśli dotyczy</li>
        <li data-admin-fulfillment-order-closed="true"><span aria-hidden="true">☐</span> Zamówienie zamknięte statusem `Wysłane` albo `Anulowane`</li>
      </ul>
    </section>
  );
}

function OrderDetails({ order }: { order: AdminOrderListItem }) {
  return (
    <details className="admin-order-details" data-admin-order-details="true">
      <summary>Pozycje, pliki prywatne i dane obsługi</summary>
      <div className="admin-order-details-grid">
        <section>
          <h3>Pozycje zamówienia</h3>
          <div className="admin-order-items" data-admin-order-items="true">
            {order.items.map((item) => (
              <article key={item.id} className="admin-order-item">
                <strong>{item.projectCode} / {item.projectName}</strong>
                <span>Slug: {item.projectSlug}</span>
                <span>Wariant: {item.variantName}</span>
                <span>Baza: {money(item.basePriceGross)} | Wariant: {money(item.variantPriceGross)} | Razem: {money(item.itemTotalGross)}</span>
                <p data-admin-order-item-pdf-email-addon={item.hasPdfEmailAddon ? "true" : "false"}>
                  PDF na e-mail: {item.hasPdfEmailAddon ? "zamówiony" : "niezamówiony"}
                </p>
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
                <h4>Pliki prywatne przypięte do projektu</h4>
                <PrivateFilesList item={item} />
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
      <OrderFulfillmentPanel order={order} />
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
            <span>ADMIN / ZAMÓWIENIA</span>
            <h1>Zamówienia</h1>
            <p>Lista realnych zamówień zapisanych w Supabase. Ten panel służy do ręcznego kontaktu, potwierdzenia płatności i przygotowania plików do wysyłki.</p>
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
                <article className="admin-order-card" data-admin-order-card="true" key={order.id}>
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
