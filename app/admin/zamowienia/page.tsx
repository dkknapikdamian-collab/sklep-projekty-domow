import Link from "next/link";
import { ClipboardList, ExternalLink, Filter, ListFilter } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  ADMIN_ORDER_FULFILLMENT_FILTER_LABELS,
  ADMIN_ORDER_FULFILLMENT_FILTERS,
  ADMIN_ORDER_PAYMENT_INSTRUCTION_FILTER_LABELS,
  ADMIN_ORDER_PAYMENT_INSTRUCTION_FILTERS,
  ADMIN_ORDER_PRIORITY_FILTER_LABELS,
  ADMIN_ORDER_PRIORITY_FILTERS,
  ADMIN_ORDER_STATUS_LABELS,
  ADMIN_ORDER_STATUSES,
  getAdminOrderPriorityFlags,
  getAdminOrderPriorityRank,
  getAdminOrders,
  type AdminOrderFulfillmentFilter,
  type AdminOrderPaymentInstructionFilter,
  type AdminOrderPriorityFilter,
  type AdminOrderStatus
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

function normalizeOrderStatusFilter(value: string | undefined): AdminOrderStatus | "all" {
  if (!value || value === "all") return "all";
  return ADMIN_ORDER_STATUSES.includes(value as AdminOrderStatus) ? (value as AdminOrderStatus) : "all";
}

function normalizePaymentFilter(value: string | undefined): AdminOrderPaymentInstructionFilter {
  if (!value) return "all";
  return ADMIN_ORDER_PAYMENT_INSTRUCTION_FILTERS.includes(value as AdminOrderPaymentInstructionFilter)
    ? (value as AdminOrderPaymentInstructionFilter)
    : "all";
}

function normalizeFulfillmentFilter(value: string | undefined): AdminOrderFulfillmentFilter {
  if (!value) return "all";
  return ADMIN_ORDER_FULFILLMENT_FILTERS.includes(value as AdminOrderFulfillmentFilter)
    ? (value as AdminOrderFulfillmentFilter)
    : "all";
}

function normalizePriorityFilter(value: string | undefined): AdminOrderPriorityFilter {
  if (!value) return "all";
  return ADMIN_ORDER_PRIORITY_FILTERS.includes(value as AdminOrderPriorityFilter)
    ? (value as AdminOrderPriorityFilter)
    : "all";
}

function priorityHref(priority: AdminOrderPriorityFilter) {
  return priority === "all" ? "/admin/zamowienia" : `/admin/zamowienia?priority=${priority}`;
}

function priorityLabel(order: Awaited<ReturnType<typeof getAdminOrders>>[number]) {
  const flags = getAdminOrderPriorityFlags(order);

  if (flags.requiresContact) return "Wymaga kontaktu";
  if (flags.readyToSend) return "Do wysyłki";
  if (flags.waitingPayment) return "Czeka na płatność";
  if (order.status === "sent" || flags.orderClosed) return "Zamknięte / wysłane";
  if (order.status === "cancelled") return "Anulowane";

  return "Bez pilnej akcji";
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const orders = await getAdminOrders();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const updatedId = firstParam(resolvedSearchParams.updated);
  const status = firstParam(resolvedSearchParams.status);
  const orderStatus = normalizeOrderStatusFilter(firstParam(resolvedSearchParams.orderStatus));
  const payment = normalizePaymentFilter(firstParam(resolvedSearchParams.payment));
  const fulfillment = normalizeFulfillmentFilter(firstParam(resolvedSearchParams.fulfillment));
  const priority = normalizePriorityFilter(firstParam(resolvedSearchParams.priority));

  const priorityCounts = orders.reduce(
    (acc, order) => {
      const flags = getAdminOrderPriorityFlags(order);
      if (flags.requiresContact) acc.requiresContact += 1;
      if (flags.waitingPayment) acc.waitingPayment += 1;
      if (flags.readyToSend) acc.readyToSend += 1;
      return acc;
    },
    { requiresContact: 0, waitingPayment: 0, readyToSend: 0 }
  );

  const filteredOrders = orders
    .filter((order) => {
      const flags = getAdminOrderPriorityFlags(order);

      if (orderStatus !== "all" && order.status !== orderStatus) return false;
      if (payment === "instruction_set" && !flags.hasPaymentInstruction) return false;
      if (payment === "instruction_missing" && flags.hasPaymentInstruction) return false;
      if (fulfillment === "pdf_sent" && !flags.pdfSent) return false;
      if (fulfillment === "zip_sent" && !flags.zipSent) return false;
      if (fulfillment === "closed" && !flags.orderClosed) return false;
      if (priority === "requires_contact" && !flags.requiresContact) return false;
      if (priority === "waiting_payment" && !flags.waitingPayment) return false;
      if (priority === "ready_to_send" && !flags.readyToSend) return false;

      return true;
    })
    .sort((a, b) => getAdminOrderPriorityRank(a) - getAdminOrderPriorityRank(b));

  return (
    <>
      <AdminHeader />
      <main
        className="admin-shell admin-orders-priority-shell"
        data-admin-orders-v42="true"
        data-admin-orders-list-only-v44="true"
        data-admin-orders-priority-filters-v49="true"
      >
        <section className="admin-page-head">
          <div>
            <span>ADMIN / ZAMÓWIENIA</span>
            <h1>Zamówienia</h1>
            <p>Lista realnych zamówień zapisanych w Supabase. Teraz priorytetem jest szybkie ustalenie, co wymaga reakcji: kontakt, płatność albo wysyłka.</p>
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

        <section className="admin-order-priority-panel" data-admin-order-priority-panel="true">
          <article>
            <span>Wymaga kontaktu</span>
            <strong>{priorityCounts.requiresContact}</strong>
            <Link href={priorityHref("requires_contact")} data-admin-order-priority-quick-filter="requires_contact">Pokaż</Link>
          </article>
          <article>
            <span>Czeka na płatność</span>
            <strong>{priorityCounts.waitingPayment}</strong>
            <Link href={priorityHref("waiting_payment")} data-admin-order-priority-quick-filter="waiting_payment">Pokaż</Link>
          </article>
          <article>
            <span>Do wysyłki</span>
            <strong>{priorityCounts.readyToSend}</strong>
            <Link href={priorityHref("ready_to_send")} data-admin-order-priority-quick-filter="ready_to_send">Pokaż</Link>
          </article>
        </section>

        <form className="admin-order-filter-bar" method="get" data-admin-order-filter-bar="true">
          <div>
            <Filter size={16} />
            <strong>{filteredOrders.length}</strong>
            <span>z {orders.length} zamówień po filtrach</span>
          </div>

          <label>
            <span>Status</span>
            <select name="orderStatus" defaultValue={orderStatus} data-admin-order-status-filter="true">
              <option value="all">Status: wszystkie</option>
              {ADMIN_ORDER_STATUSES.map((item) => (
                <option value={item} key={item}>{ADMIN_ORDER_STATUS_LABELS[item]}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Płatność</span>
            <select name="payment" defaultValue={payment} data-admin-order-payment-filter="true">
              {ADMIN_ORDER_PAYMENT_INSTRUCTION_FILTERS.map((item) => (
                <option value={item} key={item}>{ADMIN_ORDER_PAYMENT_INSTRUCTION_FILTER_LABELS[item]}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Realizacja</span>
            <select name="fulfillment" defaultValue={fulfillment} data-admin-order-fulfillment-filter="true">
              {ADMIN_ORDER_FULFILLMENT_FILTERS.map((item) => (
                <option value={item} key={item}>{ADMIN_ORDER_FULFILLMENT_FILTER_LABELS[item]}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Szybkie oznaczenia</span>
            <select name="priority" defaultValue={priority} data-admin-order-priority-filter="true">
              {ADMIN_ORDER_PRIORITY_FILTERS.map((item) => (
                <option value={item} key={item}>{ADMIN_ORDER_PRIORITY_FILTER_LABELS[item]}</option>
              ))}
            </select>
          </label>

          <button type="submit" className="admin-primary-button" data-admin-order-filter-submit="true">
            <ListFilter size={16} /> Filtruj
          </button>
          <Link href="/admin/zamowienia" className="admin-secondary-button" data-admin-order-filter-reset="true">
            Reset
          </Link>
        </form>

        {orders.length === 0 ? (
          <section className="admin-empty" data-admin-orders-empty="true">
            <h2>Nie ma jeszcze zamówień.</h2>
            <p>Po wysłaniu formularza na `/zamowienie` rekord pojawi się tutaj razem z pozycjami koszyka.</p>
          </section>
        ) : filteredOrders.length === 0 ? (
          <section className="admin-empty" data-admin-orders-filtered-empty="true">
            <h2>Brak zamówień w tym filtrze.</h2>
            <p>Zmień filtr albo wróć do pełnej listy. To pusty koszyk na dane, nie błąd realizacji.</p>
            <div>
              <Link href="/admin/zamowienia" className="admin-primary-button">Pokaż wszystkie</Link>
            </div>
          </section>
        ) : (
          <section className="admin-table-card" data-admin-orders-list="true">
            <div className="admin-order-list">
              {filteredOrders.map((order) => {
                const flags = getAdminOrderPriorityFlags(order);

                return (
                  <article className="admin-order-card admin-order-card-compact" data-admin-order-card="true" key={order.id}>
                    <header>
                      <div>
                        <span>Zamówienie</span>
                        <strong>#{order.shortId}</strong>
                        <small>{order.id}</small>
                      </div>
                      <strong className="admin-order-total">{money(order.totalGross)}</strong>
                    </header>

                    <div className="admin-order-priority-row" data-admin-order-priority-row="true">
                      <span data-admin-order-priority-badge="true">{priorityLabel(order)}</span>
                      <small>{flags.hasPaymentInstruction ? "Instrukcja płatności ustawiona" : "Brak instrukcji płatności"}</small>
                      <small>{flags.pdfSent ? "PDF wysłany" : "PDF niewysłany"}</small>
                      <small>{flags.zipSent ? "ZIP wysłany" : "ZIP niewysłany"}</small>
                      <small>{flags.orderClosed ? "Zamknięte" : "Otwarte"}</small>
                    </div>

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
                );
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
