import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { retryOrderPostPaymentFulfillmentAction, updateOrderFulfillmentChecklistAction, updateOrderStatusAction } from "@/app/admin/zamowienia/actions";
import { buildManualOrderEmailDrafts, type ManualOrderEmailDraft } from "@/lib/admin/order-email-drafts";
import { buildAdminOrderPrivateFileFulfillmentItems } from "@/lib/admin/order-files";
import {
  getAdminOrderFulfillmentReadiness,
  getAdminOrderPostPaymentRuntime,
  type AdminOrderPostPaymentRuntime
} from "@/lib/admin/order-fulfillment-readiness";
import {
  ADMIN_ORDER_STATUS_LABELS,
  ADMIN_ORDER_STATUSES,
  getAdminOrderById,
  type AdminOrderItem,
  type AdminOrderListItem
} from "@/lib/admin/orders-admin";
import { money } from "@/lib/format";

export const dynamic = "force-dynamic";

type AdminOrderDetailPageProps = {
  params?: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
}

function OrderStatusForm({ order }: { order: AdminOrderListItem }) {
  return (
    <form action={updateOrderStatusAction} className="admin-order-status-form" data-admin-order-status-form="true">
      <input type="hidden" name="orderId" value={order.id} />
      <input type="hidden" name="returnTo" value={`/admin/zamowienia/${order.id}`} />
      <select name="status" defaultValue={order.status} aria-label={`Status zamówienia ${order.shortId}`}>
        {ADMIN_ORDER_STATUSES.map((status) => (
          <option value={status} key={status}>{ADMIN_ORDER_STATUS_LABELS[status]}</option>
        ))}
      </select>
      <button type="submit" className="admin-secondary-button">Zapisz status</button>
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
  const checklist = order.fulfillmentChecklist;

  return (
    <section className="admin-order-fulfillment" data-admin-order-fulfillment-v43="true" data-admin-order-fulfillment-persistent-v45="true">
      <div>
        <h2>Realizacja ręczna</h2>
        <p>
          Ta strona nie generuje linków czasowych i nie wysyła maili automatycznie. Zapisuje tylko stan ręcznej realizacji zamówienia.
        </p>
        {checklist.updatedAt && <small>Ostatnia aktualizacja checklisty: {formatDate(checklist.updatedAt)}</small>}
        <div className="admin-order-manual-payment-note" data-admin-order-manual-payment-note="true">
          <strong>Płatność ręczna</strong>
          <p>Status `Opłacone ręcznie` oznacza, że admin potwierdził płatność poza systemem Stripe/PayU.</p>
        </div>
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

      <form action={updateOrderFulfillmentChecklistAction} className="admin-order-fulfillment-form" data-admin-order-fulfillment-form="true">
        <input type="hidden" name="orderId" value={order.id} />
        <input type="hidden" name="returnTo" value={`/admin/zamowienia/${order.id}`} />

        <ul className="admin-order-fulfillment-checklist" data-admin-order-fulfillment-checklist="true">
          <li data-admin-fulfillment-payment-confirmed="true">
            <label>
              <input type="checkbox" name="paymentConfirmed" defaultChecked={checklist.paymentConfirmed} />
              <span>Płatność potwierdzona</span>
            </label>
          </li>
          <li data-admin-fulfillment-pdf-sent="true">
            <label>
              <input type="checkbox" name="pdfSent" defaultChecked={checklist.pdfSent} />
              <span>PDF wysłany, jeśli dotyczy</span>
            </label>
          </li>
          <li data-admin-fulfillment-zip-sent="true">
            <label>
              <input type="checkbox" name="zipSent" defaultChecked={checklist.zipSent} />
              <span>ZIP wysłany, jeśli dotyczy</span>
            </label>
          </li>
          <li data-admin-fulfillment-order-closed="true">
            <label>
              <input type="checkbox" name="orderClosed" defaultChecked={checklist.orderClosed} />
              <span>Zamówienie zamknięte statusem `Wysłane` albo `Anulowane`</span>
            </label>
          </li>
        </ul>

        <label className="admin-order-payment-instruction" data-admin-order-payment-instruction="true">
          Instrukcja przelewu
          <textarea
            name="paymentInstruction"
            rows={5}
            defaultValue={checklist.paymentInstruction}
            placeholder="Odbiorca, numer konta, tytuł przelewu, kwota i dodatkowe uwagi dla klienta..."
          />
          <small>Dane do przelewu są używane w roboczym e-mailu potwierdzenia zamówienia. System niczego sam nie wysyła.</small>
        </label>

        <label className="admin-order-internal-note" data-admin-order-internal-note="true">
          Notatka admina
          <textarea
            name="internalNote"
            rows={4}
            defaultValue={checklist.internalNote}
            placeholder="Np. klient prosi o telefon przed wysyłką, płatność potwierdzona ręcznie, wysłano paczkę ZIP..."
          />
        </label>

        <button type="submit" className="admin-primary-button" data-admin-order-fulfillment-save="true">
          Zapisz realizację
        </button>
      </form>
    </section>
  );
}


function OrderPostPaymentAutomationPanel({
  order,
  runtime
}: {
  order: AdminOrderListItem;
  runtime: AdminOrderPostPaymentRuntime;
}) {
  const readiness = getAdminOrderFulfillmentReadiness(order);

  return (
    <section className="admin-order-detail-panel" data-admin-order-post-payment-readiness-v41b="true">
      <div>
        <span>ADMIN / AUTOMATYCZNY DOSTĘP PO PŁATNOŚCI</span>
        <h2>Gotowość plików i retry dostępu</h2>
        <p>
          Ten panel pokazuje, czy webhook po płatności może przygotować dostęp do plików i zakolejkować e-mail
          <code>project_files_access</code>. Daty w adminie są pokazywane w czasie Europe/Warsaw, a baza zostaje w UTC.
        </p>
      </div>

      <div className="admin-order-fulfillment-grid" data-admin-fulfillment-runtime-summary="true">
        <article data-admin-post-payment-readiness={readiness.ready ? "ready" : "manual_review_required"}>
          <span>Status gotowości</span>
          <strong>{readiness.ready ? "Gotowe do automatycznego wydania" : "Manual review required"}</strong>
          <p>
            {readiness.ready
              ? "Wymagane typy plików są przypięte do projektu. Można ponowić przygotowanie dostępu, jeśli poprzedni outbox był skipped."
              : "Brakuje wymaganych plików: " + (readiness.missingRequiredKinds.join(", ") || "nieznane") + "."}
          </p>
          <small>Braki: {readiness.missingRequiredCount}</small>
        </article>

        <article data-admin-post-payment-runtime="true">
          <span>Runtime po płatności</span>
          <strong>{runtime.fulfillmentAccessStatus || "brak access row"}</strong>
          <p>
            E-mail access: {runtime.fulfillmentEmailStatus || "brak"}. Powód: {runtime.fulfillmentReason || "-"}.
          </p>
          <small>Aktualizacja: {formatDate(runtime.fulfillmentUpdatedAt)}</small>
        </article>

        <article data-admin-post-payment-paid="true">
          <span>Płatność paid</span>
          <strong>{runtime.hasPaidPayment ? "Potwierdzona" : "Brak paid"}</strong>
          <p>{runtime.hasPaidPayment ? "Payment ID: " + runtime.paidPaymentId : "Retry nie utworzy dostępu bez płatności paid."}</p>
          <small>{runtime.paidAt ? "Paid at: " + formatDate(runtime.paidAt) : "-"}</small>
        </article>
      </div>

      <div className="admin-order-private-files-fulfillment-list" data-admin-fulfillment-missing-files-v41b="true">
        {readiness.projects.map((project) => (
          <article className="admin-order-private-files-project" key={project.itemId} data-admin-fulfillment-project-ready={project.ready ? "true" : "false"}>
            <header>
              <div>
                <span>{project.projectCode}</span>
                <h3>{project.projectName}</h3>
                <p>PDF na e-mail: {project.hasPdfEmailAddon ? "zamówiony" : "nie dotyczy"}</p>
              </div>
              <strong>{project.ready ? "Komplet" : "Braki"}</strong>
            </header>
            <ul className="admin-order-private-file-checklist">
              {project.files.map((file) => (
                <li key={file.kind} data-admin-fulfillment-kind-v41b={file.kind} data-admin-fulfillment-status-v41b={file.status}>
                  <div>
                    <strong>{file.label}</strong>
                    <span>{file.required ? "Wymagany" : "Niewymagany"} / {file.statusLabel}</span>
                    <small>auto_send_after_payment: {file.fileId ? (file.autoSendAfterPayment ? "true" : "false") : "brak pliku"}</small>
                  </div>
                  {file.fileId ? (
                    <div className="admin-order-private-file-source">
                      <small>{file.fileType} / active: {file.active ? "true" : "false"}</small>
                      <code>{file.filePath}</code>
                    </div>
                  ) : (
                    <p className="admin-form-error">Brak pliku typu: {file.kind}</p>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <form action={retryOrderPostPaymentFulfillmentAction} className="admin-order-fulfillment-form" data-admin-order-fulfillment-retry-form-v41b="true">
        <input type="hidden" name="orderId" value={order.id} />
        <input type="hidden" name="returnTo" value={"/admin/zamowienia/" + order.id} />
        <button type="submit" className="admin-primary-button" disabled={!runtime.hasPaidPayment} data-admin-order-fulfillment-retry-button-v41b="true">
          Ponów przygotowanie dostępu i e-maila
        </button>
        <small>
          Retry działa tylko po statusie paid. Jeśli pliki są kompletne, system odtworzy dostęp i ponownie zapisze outbox fake-provider.
        </small>
      </form>

      {runtime.latestEmails.length > 0 && (
        <div className="admin-order-private-files-fulfillment-list" data-admin-email-outbox-latest-v41b="true">
          {runtime.latestEmails.map((email) => (
            <article className="admin-order-private-files-project" key={email.idempotencyKey || email.emailType + "-" + email.createdAt}>
              <header>
                <div>
                  <span>{email.emailType}</span>
                  <h3>{email.subject}</h3>
                  <p>{email.recipientEmail}</p>
                </div>
                <strong>{email.status}</strong>
              </header>
              <small>Provider: {email.provider || "-"}</small>
              <small>Queued: {formatDate(email.queuedAt)} / Sent: {formatDate(email.sentAt)}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function ManualEmailDraftCard({ draft }: { draft: ManualOrderEmailDraft }) {
  return (
    <article className="admin-manual-email-draft" data-admin-manual-email-draft={draft.key}>
      <header>
        <div>
          <span>Roboczy e-mail</span>
          <h3>{draft.title}</h3>
          <p>{draft.copyHint}</p>
        </div>
      </header>

      <label>
        Temat
        <input readOnly value={draft.subject} data-admin-manual-email-subject="true" />
      </label>

      <label>
        Treść do ręcznego skopiowania
        <textarea
          readOnly
          rows={12}
          value={draft.body}
          data-admin-manual-email-body="true"
        />
      </label>
    </article>
  );
}

function ManualEmailDraftsPanel({ order }: { order: AdminOrderListItem }) {
  const drafts = buildManualOrderEmailDrafts(order);

  return (
    <section className="admin-order-detail-panel admin-manual-email-drafts" data-admin-manual-email-drafts-v47="true">
      <div>
        <h2>Robocze e-maile do klienta</h2>
        <p>
          System niczego nie wysyła. Skopiuj temat i treść do swojej skrzynki, sprawdź dane i wyślij ręcznie.
        </p>
      </div>

      <div className="admin-manual-email-drafts-grid">
        {drafts.map((draft) => (
          <ManualEmailDraftCard key={draft.key} draft={draft} />
        ))}
      </div>
    </section>
  );
}

function OrderItemsPanel({ order }: { order: AdminOrderListItem }) {
  return (
    <section className="admin-order-detail-panel" data-admin-order-items="true">
      <h2>Pozycje zamówienia</h2>
      <div className="admin-order-items">
        {order.items.map((item) => (
          <article key={item.id} className="admin-order-item">
            <strong>{item.projectCode} / {item.projectName}</strong>
            <span>Slug: {item.projectSlug}</span>
            <span>Wariant: {item.variantName}</span>
            <span>Baza: {money(item.basePriceGross)} | Wariant: {money(item.variantPriceGross)} | Razem: {money(item.itemTotalGross)}</span>
            <p data-admin-order-item-pdf-email-addon={item.hasPdfEmailAddon ? "true" : "false"}>
              PDF na e-mail: {item.hasPdfEmailAddon ? "zamówiony" : "niezamówiony"}
            </p>
            {item.addons.length > 0 ? (
              <ul>
                {item.addons.map((addon) => (
                  <li key={addon.id}>
                    {addon.name} ({addon.code}) +{money(addon.priceGross)}
                    {addon.deliveryAction ? ` / ${addon.deliveryAction}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Brak dodatków w tej pozycji.</p>
            )}
            <h3>Pliki prywatne przypięte do projektu</h3>
            <PrivateFilesList item={item} />
          </article>
        ))}
      </div>
    </section>
  );
}

function OrderPrivateFilesFulfillmentPanel({ order }: { order: AdminOrderListItem }) {
  const checklist = order.fulfillmentChecklist;

  return (
    <section className="admin-order-detail-panel" data-admin-order-private-files-fulfillment-v51="true">
      <div>
        <span>ADMIN / REALIZACJA PLIKÓW</span>
        <h2>Pliki do realizacji</h2>
        <p>
          Panel dla admina. Nie generuje publicznych linków i nie wysyła plików automatycznie. Pokazuje, co pobrać ręcznie z Supabase Storage po potwierdzeniu płatności.
        </p>
      </div>

      <div className="admin-order-private-files-fulfillment-list" data-admin-order-private-files-fulfillment-list="true">
        {order.items.map((item) => {
          const fulfillmentItems = buildAdminOrderPrivateFileFulfillmentItems(item.privateFiles, item.hasPdfEmailAddon, checklist);
          const hasMissingRequiredFiles = fulfillmentItems.some((fileItem) => fileItem.required && fileItem.status === "missing");

          return (
            <article className="admin-order-private-files-project" key={item.id} data-admin-order-private-files-project="true">
              <header>
                <div>
                  <span data-admin-private-file-project-code="true">{item.projectCode}</span>
                  <h3>{item.projectName}</h3>
                  <p>Wariant: {item.variantName}</p>
                </div>
                <strong data-admin-private-file-project-status={hasMissingRequiredFiles ? "missing" : "ready"}>
                  {hasMissingRequiredFiles ? "Braki w plikach" : "Pliki opisane"}
                </strong>
              </header>

              {hasMissingRequiredFiles && (
                <p className="admin-order-private-file-warning" role="status" data-admin-private-file-missing-warning="true">
                  Brakuje prywatnego pliku dla zamówionego aktywnego projektu. Uzupełnij pliki w edycji projektu albo zapisz ręczną decyzję w notatce admina.
                </p>
              )}

              <ul className="admin-order-private-file-checklist" data-admin-private-file-checklist="true">
                {fulfillmentItems.map((fileItem) => (
                  <li key={fileItem.kind} data-admin-private-file-kind={fileItem.kind} data-admin-private-file-status={fileItem.status}>
                    <div>
                      <strong>{fileItem.label}</strong>
                      <span>{fileItem.statusLabel}</span>
                      {!fileItem.required && <small>Nie wymagany w tym zamówieniu</small>}
                    </div>
                    {fileItem.file ? (
                      <div className="admin-order-private-file-source" data-admin-private-file-source="true">
                        <small>Bucket: {fileItem.file.bucket}</small>
                        <code>{fileItem.file.path}</code>
                        <p>{fileItem.adminDownloadInstruction}</p>
                      </div>
                    ) : (
                      <p data-admin-private-file-manual-instruction="true">{fileItem.adminDownloadInstruction}</p>
                    )}
                    {fileItem.warning && (
                      <p className="admin-form-error" data-admin-private-file-warning="true">{fileItem.warning}</p>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function OrderCustomerPanel({ order }: { order: AdminOrderListItem }) {
  return (
    <section className="admin-order-detail-panel" data-admin-order-customer-panel="true">
      <h2>Dane klienta</h2>
      <dl className="admin-order-meta">
        <div><dt>Klient</dt><dd>{order.customerName}</dd></div>
        <div><dt>E-mail</dt><dd><a href={`mailto:${order.customerEmail}`}>{order.customerEmail}</a></dd></div>
        <div><dt>Telefon</dt><dd><a href={`tel:${order.customerPhone}`}>{order.customerPhone}</a></dd></div>
        <div><dt>Status</dt><dd>{ADMIN_ORDER_STATUS_LABELS[order.status]}</dd></div>
        <div><dt>Utworzone</dt><dd>{formatDate(order.createdAt)}</dd></div>
        <div><dt>Aktualizacja</dt><dd>{formatDate(order.updatedAt)}</dd></div>
      </dl>
      <div className="admin-order-note-grid">
        <article>
          <h3>Uwagi klienta</h3>
          <p>{order.notes || "Brak uwag."}</p>
        </article>
        <article>
          <h3>Dane do faktury</h3>
          <p>{order.invoiceData || "Brak danych do faktury."}</p>
        </article>
        <article data-admin-order-admin-note-persistent="true">
          <h3>Notatka admina</h3>
          <p>{order.fulfillmentChecklist.internalNote || "Brak notatki admina."}</p>
        </article>
      </div>
    </section>
  );
}

export default async function AdminOrderDetailPage({ params, searchParams }: AdminOrderDetailPageProps) {
  const resolvedParams = params ? await params : { id: "" };
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const order = await getAdminOrderById(resolvedParams.id);
  const updatedId = firstParam(resolvedSearchParams.updated);
  const status = firstParam(resolvedSearchParams.status);
  const fulfillment = firstParam(resolvedSearchParams.fulfillment);
  const fulfillmentRetry = firstParam(resolvedSearchParams.fulfillmentRetry);

  if (!order) notFound();

  const postPaymentRuntime = await getAdminOrderPostPaymentRuntime(order.id);

  return (
    <>
      <AdminHeader />
      <main className="admin-shell" data-admin-order-detail-v44="true">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / ZAMÓWIENIA / SZCZEGÓŁY</span>
            <h1>Zamówienie #{order.shortId}</h1>
            <p>Dedykowana strona operacyjna do ręcznej obsługi zamówienia: klient, pozycje, pliki prywatne, PDF na e-mail, checklisty i status.</p>
          </div>
          <Link href="/admin/zamowienia" className="admin-secondary-button">
            <ArrowLeft size={18} /> Lista zamówień
          </Link>
        </section>

        {updatedId && (
          <section className="admin-form-success" role="status">
            Status zamówienia {updatedId.slice(0, 8)} został zapisany.
          </section>
        )}

        {fulfillment === "updated" && (
          <section className="admin-form-success" role="status" data-admin-order-fulfillment-saved="true">
            Realizacja zamówienia została zapisana.
          </section>
        )}

        {fulfillmentRetry === "ready" && (
          <section className="admin-form-success" role="status" data-admin-order-fulfillment-retry-success-v41b="true">
            Ponowiono przygotowanie dostępu do plików. Sprawdź status email outbox i panel dostępu.
          </section>
        )}

        {fulfillmentRetry === "blocked" && (
          <section className="admin-form-error" role="status" data-admin-order-fulfillment-retry-blocked-v41b="true">
            Nie udało się przygotować automatycznego dostępu. Sprawdź brakujące pliki i status płatności paid.
          </section>
        )}

        {status === "error" && (
          <section className="admin-form-error" role="status">
            Nie udało się zapisać statusu zamówienia. Sprawdź identyfikator i status.
          </section>
        )}

        <section className="admin-order-detail-hero">
          <div>
            <span>Zamówienie</span>
            <strong>#{order.shortId}</strong>
            <small>{order.id}</small>
          </div>
          <strong className="admin-order-total">{money(order.totalGross)}</strong>
          <div className="admin-order-priority-row" data-admin-order-payment-panel-v40e="true">
            <small>{order.fulfillmentChecklist.paymentConfirmed || order.status === "paid_manual" ? "Płatność potwierdzona" : "Płatność niepotwierdzona"}</small>
            <small>ID przelewu ręcznego: ZAM-{order.shortId.toUpperCase()}</small>
            <small>Pełne ID zamówienia: {order.id}</small>
          </div>

          <OrderStatusForm order={order} />
          <Link href="/admin/zamowienia" className="admin-secondary-button">
            <ClipboardList size={16} /> Wróć do listy
          </Link>
        </section>

        <div className="admin-order-detail-layout">
          <div className="admin-order-detail-main">
            <OrderCustomerPanel order={order} />
            <OrderItemsPanel order={order} />
            <OrderPrivateFilesFulfillmentPanel order={order} />
            <OrderPostPaymentAutomationPanel order={order} runtime={postPaymentRuntime} />
            <ManualEmailDraftsPanel order={order} />
          </div>
          <aside className="admin-order-detail-side">
            <OrderFulfillmentPanel order={order} />
          </aside>
        </div>
      </main>
    </>
  );
}

