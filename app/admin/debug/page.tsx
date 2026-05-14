import { AdminHeader } from "@/components/admin/AdminHeader";
import { Bug, Download, Keyboard, ListChecks, MousePointer2, ShieldCheck, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

const steps = [
  {
    title: "1. Wlacz Debug",
    text: "Kliknij plywajacy przycisk Debug w prawym dolnym rogu panelu admina. To uruchamia tryb wybierania elementow na ekranie."
  },
  {
    title: "2. Kliknij problematyczny element",
    text: "Kliknij przycisk, pole, kafelek, link albo fragment UI. Debug zatrzyma akcje klikniecia i zaznaczy wybrany element do opisania."
  },
  {
    title: "3. Opisz problem",
    text: "Wpisz krotka uwage, np. przycisk nie dziala, obraz znika po odswiezeniu, zly tekst, zla pozycja albo brak komunikatu."
  },
  {
    title: "4. Enter zapisuje",
    text: "Enter zapisuje zgloszenie. Shift+Enter dodaje nowa linie. Escape zamyka okno bez zapisu."
  },
  {
    title: "5. Pobierz raport i wyczysc",
    text: "Po zebraniu uwag kliknij Pobierz raport i wyczysc. System pobierze plik Markdown i skasuje lokalne zgloszenia."
  }
];

export default function AdminDebugPage() {
  return (
    <>
      <AdminHeader />
      <main className="admin-shell admin-ui-debug-route-v29" data-admin-debug-v29="true">
        <section className="admin-ui-debug-route-hero-v29">
          <span>ADMIN / DEBUG UI</span>
          <h1>Tryb zglaszania bledow z ekranu</h1>
          <p>
            To nie jest juz stary panel diagnostyczny. Ten ekran opisuje aktualny tryb pracy:
            wlaczasz Debug, klikasz obiekt na stronie, opisujesz problem, Enter zapisuje wpis,
            a na koniec pobierasz zbiorczy raport.
          </p>
          <div className="admin-ui-debug-route-badges-v29">
            <strong><Bug size={17} /> Debug klikalny</strong>
            <strong><MousePointer2 size={17} /> Wybieranie elementow</strong>
            <strong><Keyboard size={17} /> Enter zapisuje</strong>
            <strong><Download size={17} /> Raport Markdown</strong>
          </div>
        </section>

        <section className="admin-ui-debug-route-grid-v29">
          {steps.map((step) => (
            <article key={step.title} className="admin-ui-debug-route-card-v29">
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </article>
          ))}
        </section>

        <section className="admin-ui-debug-route-note-v29">
          <div>
            <span><ShieldCheck size={22} /> Bezpieczne lokalne zbieranie uwag</span>
            <p>
              Zgloszenia sa zapisywane lokalnie w localStorage przegladarki pod kluczem debuggera UI.
              Na tym etapie nie ida do Supabase, wiec mozna szybko zbierac uwagi bez dodawania kolejnej tabeli.
            </p>
          </div>
          <div>
            <span><ListChecks size={22} /> Co trafia do raportu</span>
            <p>
              Raport zawiera trase strony, viewport, selektor elementu, tekst elementu, klasy CSS,
              pozycje na ekranie i Twoj opis problemu.
            </p>
          </div>
          <div>
            <span><Trash2 size={22} /> Czyszczenie po eksporcie</span>
            <p>
              Przycisk Pobierz raport i wyczysc pobiera plik Markdown oraz kasuje zebrane lokalnie wpisy,
              zeby kolejne testy zaczynaly sie od czystej listy.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
