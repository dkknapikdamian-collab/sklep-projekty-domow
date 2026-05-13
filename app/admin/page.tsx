import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const orders = [
  { id: "DOM-2026-0001", client: "Jan Kowalski", email: "jan@example.com", project: "DP-AUR-014", payment: "paid", delivery: "PDF oczekuje" },
  { id: "DOM-2026-0002", client: "Anna Nowak", email: "anna@example.com", project: "DP-MAL-006", payment: "pending", delivery: "czeka na płatność" },
  { id: "DOM-2026-0003", client: "Marek Zieliński", email: "marek@example.com", project: "DP-KLE-029", payment: "paid", delivery: "link wysłany" }
];

export default function AdminPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero slim">
          <span className="eyebrow">Admin demo</span>
          <h1>Lista zamówień do obsługi</h1>
          <p>W produkcji tutaj będzie logowanie admina, filtrowanie opłaconych i niewysłanych, logi e-maili oraz akcje wysyłki PDF/linku.</p>
        </section>
        <section className="admin-grid">
          <div className="admin-metric"><span>Opłacone i niewysłane</span><strong>1</strong></div>
          <div className="admin-metric"><span>PDF do wysłania</span><strong>1</strong></div>
          <div className="admin-metric"><span>Oczekuje na płatność</span><strong>1</strong></div>
          <div className="admin-metric"><span>Wysłane</span><strong>1</strong></div>
        </section>
        <section className="content-card admin-card">
          <div className="catalog-topline">
            <strong>Zamówienia demo</strong>
            <span>Filtr kluczowy: opłacone i niewysłane</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Numer</th>
                  <th>Klient</th>
                  <th>E-mail</th>
                  <th>Projekt</th>
                  <th>Płatność</th>
                  <th>Dostawa</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.client}</td>
                    <td>{order.email}</td>
                    <td>{order.project}</td>
                    <td>{order.payment}</td>
                    <td>{order.delivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
