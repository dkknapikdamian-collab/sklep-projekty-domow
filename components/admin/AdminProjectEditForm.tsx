"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, FileText, ImagePlus, ListPlus, Save } from "lucide-react";
import { updateProjectAction, type UpdateProjectState } from "@/app/admin/projekty/actions";
import { FeaturePicker } from "./FeaturePicker";
import { SelectWithCustom } from "./SelectWithCustom";
import type { AdminProjectEditItem } from "@/lib/admin/projects-admin";
import { badgeOptions, floorsCountOptions, garageOptions, projectTypeOptions, roofOptions, styleOptions, technologyOptions } from "./admin-project-options";
import { AdminProjectRoomsEditor, normalizeRooms, roomRowFromDb, type RoomRow } from "./AdminProjectRoomsEditor";
import { AdminProjectVariantsEditor, type VariantRow } from "./AdminProjectVariantsEditor";
import { AdminProjectAddonsEditor, type AddonRow } from "./AdminProjectAddonsEditor";
import { AdminProjectMediaManager } from "./AdminProjectMediaManager";

const initialState: UpdateProjectState = { ok: false, message: "" };

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AdminProjectEditForm({ project }: { project: AdminProjectEditItem }) {
  const formRef = useRef<HTMLFormElement>(null);
  const editDraftKey = `admin-project-edit-draft-v1:${project.id}`;
  const [state, formAction, pending] = useActionState(updateProjectAction, initialState);
  const [name, setName] = useState(project.name);
  const [slug, setSlug] = useState(project.slug);
  const [slugTouched, setSlugTouched] = useState(true);
  const [status, setStatus] = useState(project.status);
  const [rooms, setRooms] = useState<RoomRow[]>(
    project.rooms.length > 0
      ? project.rooms.map((room) => roomRowFromDb(room.floor, room.number, room.name, room.area, room.dimensions))
      : [{ floor: "Parter", number: "1.01", name: "", area: "", dimensions: "" }]
  );
  const [variants, setVariants] = useState<VariantRow[]>(
    project.variants.length > 0 ? project.variants.map((variant) => ({ name: variant.name, priceGross: String(variant.priceGross) })) : [{ name: "", priceGross: "0" }]
  );
  const [addons, setAddons] = useState<AddonRow[]>(
    project.addons.length > 0
      ? project.addons.map((addon) => ({
          code: addon.code,
          name: addon.name,
          priceGross: String(addon.priceGross),
          description: addon.description,
          deliveryAction: addon.deliveryAction
        }))
      : [{ code: "", name: "", priceGross: "0", description: "" }]
  );

  const completion = useMemo(() => Math.round(([name, slug, status].filter(Boolean).length / 3) * 100), [name, slug, status]);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(makeSlug(value));
  }

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(editDraftKey);
      if (!raw) return;
      const draft = JSON.parse(raw) as {
        name?: string;
        slug?: string;
        slugTouched?: boolean;
        status?: string;
        rooms?: RoomRow[];
        variants?: VariantRow[];
        addons?: AddonRow[];
        fields?: Record<string, string>;
      };

      if (typeof draft.name === "string") setName(draft.name);
      if (typeof draft.slug === "string") setSlug(draft.slug);
      if (typeof draft.slugTouched === "boolean") setSlugTouched(draft.slugTouched);
      if (typeof draft.status === "string") setStatus(draft.status);
      if (Array.isArray(draft.rooms) && draft.rooms.length > 0) setRooms(draft.rooms);
      if (Array.isArray(draft.variants) && draft.variants.length > 0) setVariants(draft.variants);
      if (Array.isArray(draft.addons) && draft.addons.length > 0) setAddons(draft.addons);

      if (draft.fields) {
        requestAnimationFrame(() => {
          const form = formRef.current;
          if (!form) return;
          const restoredFields = draft.fields || {};
          for (const [fieldName, fieldValue] of Object.entries(restoredFields)) {
            const element = form.elements.namedItem(fieldName);
            if (!element) continue;
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
              element.value = fieldValue;
              element.dispatchEvent(new Event("input", { bubbles: true }));
              element.dispatchEvent(new Event("change", { bubbles: true }));
            }
          }
        });
      }
    } catch {
      // ignore corrupted local draft
    }
  }, [editDraftKey]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const fields: Record<string, string> = {};
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) continue;
      if (key.endsWith("Json")) continue;
      if (!fields[key]) fields[key] = String(value || "");
    }

    const payload = {
      name,
      slug,
      slugTouched,
      status,
      rooms,
      variants,
      addons,
      fields
    };

    try {
      window.localStorage.setItem(editDraftKey, JSON.stringify(payload));
    } catch {
      // ignore storage limits
    }
  }, [editDraftKey, name, slug, slugTouched, status, rooms, variants, addons]);

  return (
    <form ref={formRef} className="admin-form-layout" action={formAction}>
      <input type="hidden" name="projectId" value={project.id} />
      <input type="hidden" name="roomsJson" value={JSON.stringify(normalizeRooms(rooms))} />
      <input type="hidden" name="variantsJson" value={JSON.stringify(variants)} />
      <input type="hidden" name="addonsJson" value={JSON.stringify(addons)} />

      <div className="admin-project-form">
        <section className="admin-form-section">
          <div className="form-section-title"><FileText size={22} /><div><h2>1. Dane podstawowe</h2><p>Edytujesz ten sam zakres danych co przy tworzeniu projektu.</p></div></div>
          <div className="form-grid two">
            <label>Kod projektu<input value={project.code} readOnly /></label>
            <label>Krotki kod<input value={project.shortCode || project.code} readOnly /></label>
            <label>Nazwa projektu *<input name="name" value={name} onChange={(event) => handleNameChange(event.target.value)} required /></label>
            <label>Slug *<input name="slug" value={slug} onChange={(event) => { setSlugTouched(true); setSlug(makeSlug(event.target.value)); }} required /></label>
          </div>
          <label>Krotki opis / podtytul<input name="subtitle" defaultValue={project.subtitle || ""} /></label>
          <label>Opis projektu<textarea name="description" defaultValue={project.description || ""} /></label>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title"><CheckCircle2 size={22} /><div><h2>2. Cena, status i publikacja</h2><p>Status active publikuje projekt, pozostale statusy ukrywaja go publicznie.</p></div></div>
          <div className="form-grid three">
            <label>Cena brutto<input name="priceGross" defaultValue={project.priceGross} inputMode="decimal" /></label>
            <label>Status<select name="status" value={status} onChange={(event) => setStatus(event.target.value)}><option value="draft">draft</option><option value="active">active</option><option value="hidden">hidden</option><option value="archived">archived</option></select></label>
            <SelectWithCustom name="badgePrimary" label="Badge glowny" options={badgeOptions} defaultValue={project.badgePrimary || ""} placeholder="Brak badge" />
            <SelectWithCustom name="badgeSecondary" label="Badge dodatkowy" options={badgeOptions} defaultValue={project.badgeSecondary || ""} placeholder="Brak badge" />
            <label>Podobne projekty<input name="relatedSlugs" defaultValue={project.relatedSlugs.join(", ")} placeholder="slug-1, slug-2" /></label>
          </div>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title"><ListPlus size={22} /><div><h2>3. Parametry techniczne</h2><p>Te dane zasilaja katalog i karte projektu.</p></div></div>
          <div className="form-grid four">
            <label>Powierzchnia uzytkowa<input name="usableArea" defaultValue={project.usableArea} inputMode="decimal" /></label>
            <label>Powierzchnia zabudowy<input name="buildingArea" defaultValue={project.buildingArea} inputMode="decimal" /></label>
            <label>Liczba pokoi<input name="roomsCount" defaultValue={project.roomsCount} inputMode="numeric" /></label>
            <label>Lazienki<input name="bathroomsCount" defaultValue={project.bathroomsCount} inputMode="numeric" /></label>
            <SelectWithCustom name="garage" label="Garaz" options={garageOptions} defaultValue={project.garage || ""} placeholder="Wybierz" />
            <SelectWithCustom name="type" label="Typ / kondygnacja" options={projectTypeOptions} defaultValue={project.type || ""} placeholder="Wybierz" />
            <SelectWithCustom name="roof" label="Dach" options={roofOptions} defaultValue={project.roof || ""} placeholder="Wybierz" />
            <SelectWithCustom name="technology" label="Technologia" options={technologyOptions} defaultValue={project.technology || ""} placeholder="Wybierz" />
            <label>Szerokosc dzialki<input name="minPlotWidth" defaultValue={project.minPlotWidth} inputMode="decimal" /></label>
            <label>Dlugosc dzialki<input name="minPlotLength" defaultValue={project.minPlotLength} inputMode="decimal" /></label>
            <label>Wysokosc budynku<input name="buildingHeight" defaultValue={project.buildingHeight} inputMode="decimal" /></label>
            <SelectWithCustom name="style" label="Styl" options={styleOptions} defaultValue={project.style || ""} placeholder="Wybierz" />
            <SelectWithCustom name="floorsCount" label="Kondygnacje liczba" options={floorsCountOptions} defaultValue={project.floorsCount ? String(project.floorsCount) : ""} placeholder="Wybierz" />
          </div>
          <div className="admin-feature-section"><h3>Cechy projektu</h3><FeaturePicker initialSelected={project.features} /></div>
        </section>

        <section className="admin-form-section"><div className="form-section-title"><ListPlus size={22} /><div><h2>4. Pomieszczenia</h2></div></div><AdminProjectRoomsEditor rooms={rooms} setRooms={setRooms} /></section>

        <section className="admin-form-section">
          <div className="form-section-title"><ListPlus size={22} /><div><h2>5. Warianty i dodatki</h2></div></div>
          <h3 className="admin-subtitle">Warianty</h3>
          <AdminProjectVariantsEditor variants={variants} setVariants={setVariants} />
          <h3 className="admin-subtitle">Dodatki</h3>
          <AdminProjectAddonsEditor addons={addons} setAddons={setAddons} />
        </section>

        <section className="admin-form-section">
          <div className="form-section-title"><ImagePlus size={22} /><div><h2>6. Media publiczne</h2><p>Mozesz podmienic pliki i dograc nowe.</p></div></div>
          <AdminProjectMediaManager
            projectId={project.id}
            projectSlug={project.slug}
            projectCode={project.code}
            media={project.media}
            privateFiles={project.privateFiles}
          />
        </section>

        <section className="admin-form-section"><div className="form-section-title"><Save size={22} /><div><h2>7. Zapis</h2></div></div>{state.message && <div className={state.ok ? "admin-form-success" : "admin-form-error"}>{state.message}</div>}<div className="admin-form-actions"><button type="submit" className="admin-primary-button" disabled={pending}>{pending ? "Zapisywanie..." : "Zapisz projekt"}</button><Link href="/admin/projekty?cancelled=1" className="admin-secondary-button">Anuluj</Link></div></section>
      </div>

      <aside className="admin-form-sidebar"><div className="admin-side-card"><span>KOD PROJEKTU</span><strong>{project.code}</strong></div><div className="admin-side-card"><span>KOMPLETNOSC</span><strong>{completion}%</strong></div><div className="admin-side-card"><span>ZRODLO DANYCH</span><strong>Supabase</strong></div><div className="admin-side-card"><span>PUBLICZNOSC</span><strong>{status}</strong></div></aside>
    </form>
  );
}

