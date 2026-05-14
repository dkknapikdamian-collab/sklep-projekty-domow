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
            </label>
            <label>
              Alt obrazu
              <input name="imageAlt" defaultValue={hero.imageAlt} required />
            </label>
          </div>

          {hero.imageUrl && (
            <p className="admin-field-help">Aktualny baner: {hero.imageUrl}</p>
          )}
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
          <span>ZAKRES V23</span>
          <strong>Hero + CTA</strong>
          <p>W tym etapie edytujemy glowny baner i tresc hero z poziomu admina.</p>
        </div>
      </aside>
    </form>
  );
}
