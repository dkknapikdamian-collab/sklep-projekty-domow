import Link from "next/link";
import { ShieldCheck, FileArchive, Clock } from "lucide-react";
import { getPostPaymentFulfillmentAccessView } from "@/lib/fulfillment/post-payment-fulfillment";

export const dynamic = "force-dynamic";

type AccessPageProps = {
  params?: Promise<{ token: string }>;
};

function formatDate(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("pl-PL");
}

function StatusBox({ reason }: { reason: string }) {
  const message =
    reason === "payment_not_paid"
      ? "Nie znaleziono potwierdzonej płatności dla tego dostępu. Pliki nie są wydawane przed płatnością."
      : reason === "access_expired"
        ? "Ten panel pobrań wygasł. Skontaktuj się ze sklepem, żeby wygenerować nowy dostęp."
        : reason === "files_not_ready" || reason === "access_not_ready"
          ? "Płatność może być przyjęta, ale pliki wymagają ręcznej weryfikacji. Dostęp nie został jeszcze otwarty."
          : "Link jest nieprawidłowy albo został wycofany.";

  return (
    <section className="cart-shell" data-post-payment-access-blocked="true">
      <div className="cart-empty-card">
        <span>Bezpieczny dostęp do plików</span>
        <h1>Pliki nie są dostępne</h1>
        <p>{message}</p>
        <Link href="/" className="hero-cta secondary">Wróć na stronę główną</Link>
      </div>
    </section>
  );
}

export default async function PostPaymentAccessPage({ params }: AccessPageProps) {
  const resolvedParams = params ? await params : { token: "" };
  const token = String(resolvedParams.token || "").trim();
  const access = await getPostPaymentFulfillmentAccessView(token, { logView: true });

  if (!access.ok) {
    return <StatusBox reason={access.reason} />;
  }

  return (
    <main className="cart-shell" data-post-payment-access-panel-v36="true">
      <section className="cart-empty-card" data-post-payment-access-ready="true">
        <span>ZAMÓWIENIE #{access.orderShortId}</span>
        <h1>Bezpieczny panel pobrań</h1>
        <p>
          Płatność została potwierdzona po stronie serwera. Poniżej są prywatne pliki zamówienia. Każdy przycisk generuje krótki, czasowy link do pliku.
        </p>
        <div className="admin-order-fulfillment-grid" data-post-payment-access-security="true">
          <article>
            <ShieldCheck size={18} />
            <strong>Brak publicznych linków</strong>
            <p>Pliki są wydawane przez serwerowy endpoint dopiero po sprawdzeniu tokenu, statusu dostępu i płatności.</p>
          </article>
          <article>
            <Clock size={18} />
            <strong>Panel ważny do</strong>
            <p>{formatDate(access.expiresAt)}</p>
          </article>
        </div>
      </section>

      <section className="admin-order-detail-panel" data-post-payment-file-list="true">
        <h2>Pliki do pobrania</h2>
        <div className="admin-order-items">
          {access.files.map((file) => (
            <article key={file.id} className="admin-order-item" data-post-payment-file-card="true">
              <strong>{file.projectCode} / {file.projectName}</strong>
              <span>{file.label}</span>
              <span>{file.title}</span>
              {file.version && <small>Wersja: {file.version}</small>}
              <Link
                className="admin-primary-button"
                href={`/zamowienie/dostep/${encodeURIComponent(token)}/plik/${encodeURIComponent(file.id)}`}
                data-post-payment-file-download="true"
              >
                <FileArchive size={16} /> Pobierz plik
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
