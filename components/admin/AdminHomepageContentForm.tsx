"use client";

import { useActionState } from "react";
import type { HomepageHeroContent } from "@/lib/site-content";
import { updateHomepageHeroAction, type HomepageContentState } from "@/app/admin/strona-glowna/actions";

type Props = {
  hero: HomepageHeroContent;
};

const initialState: HomepageContentState = { ok: false, message: "" };

export function AdminHomepageContentForm({ hero }: Props) {
  const [state, formAction, pending] = useActionState(updateHomepageHeroAction, initialState);
  const displayImageUrl = state.imageUrl || hero.imageUrl || "";
  const displayImagePath = state.imagePath || hero.imagePath || "";

  return (
    <form action={formAction} className="admin-form-layout">
      <div className="admin-project-form">
        <section className="admin-form-section">
          <h2>Hero / baner glowny</h2>
          <div className="form-grid two">
            <label>
              Tytul hero
              <input name="title" defaultValue={hero.title} required />
            </label>
            <label>
              Status
              <select name="isActive" defaultValue={hero.isActive ? "active" : "hidden"}>
                <option value="active">aktywny</option>
                <option value="hidden">ukryty</option>
              </select>
            </label>
          </div>

          <label>
            Podtytul hero
            <textarea name="subtitle" defaultValue={hero.subtitle} required />
          </label>

          <div className="form-grid two">
            <label>
              Tekst przycisku CTA
              <input name="ctaLabel" defaultValue={hero.ctaLabel} required />
            </label>
            <label>
              Link przycisku CTA
              <input name="ctaHref" defaultValue={hero.ctaHref} required placeholder="/projekty" />
            </label>
          </div>

          <div className="form-grid two">
            <label>
              Obraz hero / baner
              <input type="file" name="heroFile" accept="image/*" />
              <span className="admin-field-help">Input pliku pokazuje tylko nowo wybrany plik. Aktualnie zapisany baner jest widoczny ponizej.</span>
            </label>
            <label>
              Alt obrazu
              <input name="imageAlt" defaultValue={hero.imageAlt} required />
            </label>
          </div>

          <div className="admin-current-banner-card" data-admin-current-banner="true">
            <div className="admin-current-banner-meta">
              <span>Aktualny baner</span>
              <strong>{displayImageUrl ? "Podlaczony" : "Brak obrazu"}</strong>
              {displayImagePath && <code>{displayImagePath}</code>}
            </div>
            {displayImageUrl ? (
              <>
                <img className="admin-current-banner-preview" src={displayImageUrl} alt={hero.imageAlt || "Baner strony glownej"} />
                <a className="admin-current-media-link" href={displayImageUrl} target="_blank" rel="noreferrer">
                  Otworz aktualny baner
                </a>
              </>
            ) : (
              <p className="admin-field-help">Nie ma jeszcze zapisanego obrazu banera w site_content.</p>
            )}
          </div>
        </section>

        <section className="admin-form-section">
          <h2>Zapis</h2>
          {state.message && <div className={state.ok ? "admin-form-success" : "admin-form-error"}>{state.message}</div>}
          <div className="admin-form-actions">
            <button type="submit" className="admin-primary-button" disabled={pending}>
              {pending ? "Zapisywanie..." : "Zapisz strone glowna"}
            </button>
          </div>
        </section>
      </div>

      <aside className="admin-form-sidebar">
        <div className="admin-side-card">
          <span>ZAKRES V25</span>
          <strong>Hero + media</strong>
          <p>Panel pokazuje aktualnie zapisany baner, sciezke Storage i link do pliku.</p>
        </div>
      </aside>
    </form>
  );
}
