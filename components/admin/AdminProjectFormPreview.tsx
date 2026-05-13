"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, FileText, ImagePlus, ListPlus, Save, UploadCloud } from "lucide-react";

export function AdminProjectFormPreview() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("draft");

  const completion = useMemo(() => {
    const fields = [name, code, slug, status];
    const done = fields.filter(Boolean).length;
    return Math.round((done / fields.length) * 100);
  }, [name, code, slug, status]);

  return (
    <div className="admin-form-layout">
      <form className="admin-project-form">
        <section className="admin-form-section">
          <div className="form-section-title">
            <FileText size={22} />
            <div>
              <h2>1. Dane podstawowe</h2>
              <p>Kod, nazwa, slug, opis i status projektu.</p>
            </div>
          </div>

          <div className="form-grid two">
            <label>
              Kod projektu
              <input value={code} onChange={(event) => setCode(event.target.value)} placeholder="np. DP-AUR-014" />
            </label>
            <label>
              Krótki kod
              <input placeholder="np. AW14" />
            </label>
            <label>
              Nazwa projektu
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="np. Dom w Aurorach 14" />
            </label>
            <label>
              Slug
              <input value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="np. dom-w-aurorach-14" />
            </label>
          </div>

          <label>
            Krótki opis / podtytuł
            <input placeholder="np. Nowoczesny dom parterowy z garażem" />
          </label>

          <label>
            Opis projektu
            <textarea placeholder="Tutaj wpiszesz realny opis projektu. Nie publikujemy opisów roboczych jako oferty." />
          </label>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title">
            <CheckCircle2 size={22} />
            <div>
              <h2>2. Cena, status i publikacja</h2>
              <p>Projekt publicznie pojawia się dopiero po statusie active.</p>
            </div>
          </div>

          <div className="form-grid three">
            <label>
              Cena brutto
              <input placeholder="np. 3590" />
            </label>
            <label>
              Status
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="draft">draft</option>
                <option value="active">active</option>
                <option value="hidden">hidden</option>
                <option value="archived">archived</option>
              </select>
            </label>
            <label>
              Badge
              <input placeholder="np. Nowość / Bestseller" />
            </label>
          </div>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title">
            <ListPlus size={22} />
            <div>
              <h2>3. Parametry techniczne</h2>
              <p>Dane, które później zasilą kartę projektu i wyszukiwarkę.</p>
            </div>
          </div>

          <div className="form-grid four">
            <label>Powierzchnia użytkowa<input placeholder="m²" /></label>
            <label>Powierzchnia zabudowy<input placeholder="m²" /></label>
            <label>Liczba pokoi<input placeholder="np. 5" /></label>
            <label>Łazienki<input placeholder="np. 2" /></label>
            <label>Garaż<input placeholder="np. 2 stanowiska" /></label>
            <label>Kondygnacje<input placeholder="np. Parterowy" /></label>
            <label>Dach<input placeholder="np. Czterospadowy" /></label>
            <label>Technologia<input placeholder="np. Murowana" /></label>
            <label>Szerokość działki<input placeholder="m" /></label>
            <label>Długość działki<input placeholder="m" /></label>
            <label>Wysokość budynku<input placeholder="m" /></label>
            <label>Styl<input placeholder="np. Nowoczesny" /></label>
          </div>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title">
            <ImagePlus size={22} />
            <div>
              <h2>4. Media projektu</h2>
              <p>Teraz przygotowujemy UI. Docelowo upload pójdzie do Supabase Storage.</p>
            </div>
          </div>

          <div className="media-upload-grid">
            {["Hero", "Miniatura", "Galeria", "Rzut parteru", "Rzut dachu", "Przekroje", "Elewacje", "Prywatny PDF/ZIP"].map((item) => (
              <div className="upload-box" key={item}>
                <UploadCloud size={25} />
                <strong>{item}</strong>
                <span>Upload po podpięciu Supabase Storage</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title">
            <Save size={22} />
            <div>
              <h2>5. Akcje</h2>
              <p>Na razie przyciski są przygotowane wizualnie. Zapis podłączymy przez adapter danych.</p>
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="button" className="admin-secondary-button">Zapisz jako szkic później</button>
            <button type="button" className="admin-primary-button">Opublikuj po walidacji później</button>
          </div>
        </section>
      </form>

      <aside className="admin-form-sidebar">
        <div className="admin-side-card">
          <span>KOMPLETNOŚĆ</span>
          <strong>{completion}%</strong>
          <p>To jest przyszła walidacja przed publikacją. Projekt nie przejdzie na active, jeśli brakuje krytycznych danych.</p>
        </div>

        <div className="admin-side-card">
          <span>ŹRÓDŁO DANYCH</span>
          <strong>Lokalnie teraz</strong>
          <p>Docelowo: Supabase Postgres + Supabase Storage. UI formularza zostaje.</p>
        </div>

        <div className="admin-side-card">
          <span>PUBLICZNOŚĆ</span>
          <strong>{status}</strong>
          <p>Publicznie widoczne będą tylko projekty ze statusem active.</p>
        </div>
      </aside>
    </div>
  );
}
