import Link from "next/link";
import { Header } from "@/components/Header";

type PaymentStatusPageProps = {
  searchParams?: Promise<{ session_id?: string }>;
};

export default async function PaymentStatusPage({ searchParams }: PaymentStatusPageProps) {
  const params = await searchParams;
  const sessionId = params?.session_id || "";

  return (
    <>
      <Header />
      <main className="page-shell">
        <section
          className="checkout-success"
          data-stripe-return-page-v39a="true"
          data-success-page-is-not-source-of-truth-v39a="true"
        >
          <h1>Płatność jest przetwarzana</h1>
          <p>
            Wróciłeś ze strony płatności. Dostęp do plików zostanie aktywowany dopiero po
            potwierdzeniu płatności przez webhook po stronie serwera.
          </p>
          {sessionId && <p>Id sesji płatności: {sessionId}</p>}
          <p>
            Jeżeli płatność została zatwierdzona, system przygotuje bezpieczny dostęp do plików.
            To nie ta strona wydaje pliki, tylko backend po statusie paid.
          </p>
          <Link className="empty-link" href="/projekty">Wróć do projektów</Link>
        </section>
      </main>
    </>
  );
}
