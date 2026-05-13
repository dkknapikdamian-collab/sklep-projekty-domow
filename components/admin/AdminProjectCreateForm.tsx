"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { createProjectAction, initialState } from "@/app/admin/projekty/nowy/actions";
import { CheckCircle2, FileText, ImagePlus, ListPlus, Save, UploadCloud, X } from "lucide-react";
import { SelectWithCustom } from "./SelectWithCustom";
import {
  badgeOptions,
  floorsCountOptions,
  garageOptions,
  projectTypeOptions,
  roofOptions,
  roomFloorOptions,
  styleOptions,
  technologyOptions
} from "./admin-project-options";

type RoomRow = {
  floor: string;
  customFloor?: string;
  number: string;
  name: string;
  area: string;
  dimensions: string;
};

type VariantRow = {
  name: string;
  priceGross: string;
};

type AddonRow = {
  code: string;
  name: string;
  priceGross: string;
  description: string;
  deliveryAction?: string;
};

const CUSTOM_FLOOR = "__custom__";

const defaultRooms: RoomRow[] = [
  { floor: "Parter", number: "1.01", name: "", area: "", dimensions: "" }
];

const defaultVariants: VariantRow[] = [
  { name: "Odbicie lustrzane", priceGross: "390" },
  { name: "Odbicie lustrzane + zmiany", priceGross: "690" }
];

const defaultAddons: AddonRow[] = [
  {
    code: "PDF_EMAIL_PACKAGE",
    name: "Pakiet PDF na e-mail",
    priceGross: "250",
    description: "Dodatkowa wersja projektu w formacie PDF wysłana bezpośrednio na e-mail po zaksięgowaniu płatności.",
    deliveryAction: "send_pdf_email"
  },
  {
    code: "COST_ESTIMATE",
    name: "Kosztorys inwestorski",
    priceGross: "490",
    description: "Dodatkowy kosztorys inwestorski."
  }
];

function updateRow<T>(rows: T[], index: number, patch: Partial<T>) {
  return rows.map((row, currentIndex) => (currentIndex === index ? { ...row, ...patch } : row));
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function currentCodePreview() {
  const year = new Date().getFullYear();
  return `DP-${year}-0001`;
}

function normalizedRooms(rows: RoomRow[]) {
  return rows.map((room) => ({
    ...room,
    floor: room.floor === CUSTOM_FLOOR ? room.customFloor || "" : room.floor
  }));
}

export function AdminProjectCreateForm() {
  const [state, formAction, pending] = useActionState(createProjectAction, initialState);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [status, setStatus] = useState("draft");
  const [rooms, setRooms] = useState<RoomRow[]>(defaultRooms);
  const [variants, setVariants] = useState<VariantRow[]>(defaultVariants);
  const [addons, setAddons] = useState<AddonRow[]>(defaultAddons);

  const completion = useMemo(() => {
    const fields = [name, slug, status];
    const done = fields.filter(Boolean).length;
    return Math.round((done / fields.length) * 100);
  }, [name, slug, status]);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) {
      setSlug(makeSlug(value));
    }
  }

  return (
    <form className="admin-form-layout" action={formAction}>
      <input type="hidden" name="roomsJson" value={JSON.stringify(normalizedRooms(rooms))} />
      <input type="hidden" name="variantsJson" value={JSON.stringify(variants)} />
      <input type="hidden" name="addonsJson" value={JSON.stringify(addons)} />

      <div className="admin-project-form">
        <section className="admin-form-section">
          <div className="form-section-title">
            <FileText size={22} />
            <div>
              <h2>1. Dane podstawowe</h2>
              <p>Kod generuje system. Ty uzupełniasz nazwę, opis i dane projektu.</p>
            </div>
          </div>

          <div className="form-grid two">
            <label>
              Kod projektu
              <input value={`Automatycznie, np. ${currentCodePreview()}`} readOnly />
              <small className="admin-field-help">Format: DP-YYYY-NNNN. Finalny numer nada Supabase przy zapisie.</small>
            </label>
            <label>
              Krótki kod
              <input name="shortCode" placeholder="Opcjonalnie, np. katalogowy skrót" />
            </label>
            <label>
              Nazwa projektu *
              <input name="name" value={name} onChange={(event) => handleNameChange(event.target.value)} placeholder="np. Dom w Aurorach 14" required />
            </label>
            <label>
              Slug *
              <input
                name="slug"
                value={slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setSlug(makeSlug(event.target.value));
                }}
                placeholder="np. dom-w-aurorach-14"
                required
              />
              <small className="admin-field-help">Slug generuje się z nazwy, ale możesz go poprawić ręcznie.</small>
            </label>
          </div>

          <label>
            Krótki opis / podtytuł
            <input name="subtitle" placeholder="np. Nowoczesny dom parterowy z garażem" />
          </label>

          <label>
            Opis projektu
            <textarea name="description" placeholder="Wpisz realny opis projektu. Ten tekst wyświetli się w zakładce OPIS PROJEKTU na karcie projektu." />
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
              <input name="priceGross" placeholder="np. 3590" inputMode="decimal" />
            </label>
            <label>
              Status
              <select name="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="draft">draft</option>
                <option value="active">active</option>
                <option value="hidden">hidden</option>
                <option value="archived">archived</option>
              </select>
            </label>
            <SelectWithCustom name="badgePrimary" label="Badge główny" options={badgeOptions} placeholder="Brak badge" />
            <SelectWithCustom name="badgeSecondary" label="Badge dodatkowy" options={badgeOptions} placeholder="Brak badge" />
            <label>
              Podobne projekty
              <input name="relatedSlugs" placeholder="Ręczne nadpisanie: slug-1, slug-2" />
              <small className="admin-field-help">Docelowo: automatyczny dobór po parametrach + ręczna nadpiska.</small>
            </label>
          </div>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title">
            <ListPlus size={22} />
            <div>
              <h2>3. Parametry techniczne</h2>
              <p>Dane zasilają kartę projektu, katalog, filtry i wyszukiwarkę.</p>
            </div>
          </div>

          <div className="form-grid four">
            <label>Powierzchnia użytkowa<input name="usableArea" placeholder="m²" inputMode="decimal" /></label>
            <label>Powierzchnia zabudowy<input name="buildingArea" placeholder="m²" inputMode="decimal" /></label>
            <label>Liczba pokoi<input name="roomsCount" placeholder="np. 5" inputMode="numeric" /></label>
            <label>Łazienki<input name="bathroomsCount" placeholder="np. 2" inputMode="numeric" /></label>
            <SelectWithCustom name="garage" label="Garaż" options={garageOptions} placeholder="Wybierz garaż" />
            <SelectWithCustom name="type" label="Typ / kondygnacja" options={projectTypeOptions} placeholder="Wybierz typ" />
            <SelectWithCustom name="roof" label="Dach" options={roofOptions} placeholder="Wybierz dach" />
            <SelectWithCustom name="technology" label="Technologia" options={technologyOptions} placeholder="Wybierz technologię" />
            <label>Szerokość działki<input name="minPlotWidth" placeholder="m" inputMode="decimal" /></label>
            <label>Długość działki<input name="minPlotLength" placeholder="m" inputMode="decimal" /></label>
            <label>Wysokość budynku<input name="buildingHeight" placeholder="m" inputMode="decimal" /></label>
            <SelectWithCustom name="style" label="Styl" options={styleOptions} placeholder="Wybierz styl" />
            <SelectWithCustom name="floorsCount" label="Kondygnacje liczba" options={floorsCountOptions} placeholder="Wybierz" />
          </div>

          <label>
            Cechy projektu, jedna na linię
            <textarea name="features" placeholder={"Przestronny salon z wyjściem na taras\nDuża kuchnia ze spiżarnią\nGaraż na 2 auta"} />
          </label>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title">
            <ListPlus size={22} />
            <div>
              <h2>4. Pomieszczenia</h2>
              <p>Tabela pomieszczeń zapisywana do `project_rooms`.</p>
            </div>
          </div>

          <div className="admin-edit-table">
            <div className="admin-edit-row head">
              <span>Kondygnacja</span>
              <span>Nr</span>
              <span>Nazwa</span>
              <span>m²</span>
              <span>Wymiary</span>
              <span />
            </div>
            {rooms.map((room, index) => (
              <div className="admin-edit-row" key={index}>
                <div className="admin-room-floor">
                  <select value={room.floor} onChange={(event) => setRooms(updateRow(rooms, index, { floor: event.target.value }))}>
                    {roomFloorOptions.map((option) => (
                      <option value={option.value} key={option.value}>{option.label}</option>
                    ))}
                    <option value={CUSTOM_FLOOR}>Dodaj ręcznie</option>
                  </select>
                  {room.floor === CUSTOM_FLOOR && (
                    <input
                      value={room.customFloor || ""}
                      onChange={(event) => setRooms(updateRow(rooms, index, { customFloor: event.target.value }))}
                      placeholder="Własna kondygnacja"
                    />
                  )}
                </div>
                <input value={room.number} onChange={(event) => setRooms(updateRow(rooms, index, { number: event.target.value }))} />
                <input value={room.name} onChange={(event) => setRooms(updateRow(rooms, index, { name: event.target.value }))} />
                <input value={room.area} onChange={(event) => setRooms(updateRow(rooms, index, { area: event.target.value }))} />
                <input value={room.dimensions} onChange={(event) => setRooms(updateRow(rooms, index, { dimensions: event.target.value }))} />
                <button type="button" onClick={() => setRooms(rooms.filter((_, currentIndex) => currentIndex !== index))}><X size={15} /></button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="admin-secondary-button"
            onClick={() => setRooms([...rooms, { floor: "Parter", number: "", name: "", area: "", dimensions: "" }])}
          >
            Dodaj pomieszczenie
          </button>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title">
            <ListPlus size={22} />
            <div>
              <h2>5. Warianty i dodatki</h2>
              <p>Warianty zapisujemy osobno, a dodatki w `project_addons`.</p>
            </div>
          </div>

          <h3 className="admin-subtitle">Warianty</h3>
          <div className="admin-edit-table compact">
            {variants.map((variant, index) => (
              <div className="admin-edit-row variant" key={index}>
                <input value={variant.name} onChange={(event) => setVariants(updateRow(variants, index, { name: event.target.value }))} placeholder="Nazwa wariantu" />
                <input value={variant.priceGross} onChange={(event) => setVariants(updateRow(variants, index, { priceGross: event.target.value }))} placeholder="Cena" />
                <button type="button" onClick={() => setVariants(variants.filter((_, currentIndex) => currentIndex !== index))}><X size={15} /></button>
              </div>
            ))}
          </div>
          <button type="button" className="admin-secondary-button" onClick={() => setVariants([...variants, { name: "", priceGross: "0" }])}>
            Dodaj wariant
          </button>

          <h3 className="admin-subtitle">Dodatki</h3>
          <div className="admin-edit-table addons">
            {addons.map((addon, index) => (
              <div className="admin-edit-row addon" key={index}>
                <input value={addon.code} onChange={(event) => setAddons(updateRow(addons, index, { code: event.target.value }))} placeholder="Kod" />
                <input value={addon.name} onChange={(event) => setAddons(updateRow(addons, index, { name: event.target.value }))} placeholder="Nazwa dodatku" />
                <input value={addon.priceGross} onChange={(event) => setAddons(updateRow(addons, index, { priceGross: event.target.value }))} placeholder="Cena" />
                <input value={addon.description} onChange={(event) => setAddons(updateRow(addons, index, { description: event.target.value }))} placeholder="Opis" />
                <button type="button" onClick={() => setAddons(addons.filter((_, currentIndex) => currentIndex !== index))}><X size={15} /></button>
              </div>
            ))}
          </div>
          <button type="button" className="admin-secondary-button" onClick={() => setAddons([...addons, { code: "", name: "", priceGross: "0", description: "" }])}>
            Dodaj dodatek
          </button>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title">
            <ImagePlus size={22} />
            <div>
              <h2>6. Media projektu</h2>
              <p>Publiczne pliki trafią do Supabase Storage bucket `project-media`.</p>
            </div>
          </div>

          <div className="media-upload-grid">
            <label className="upload-box"><UploadCloud size={25} /><strong>Hero</strong><span>hero.jpg</span><input type="file" name="heroFile" accept="image/*" /></label>
            <label className="upload-box"><UploadCloud size={25} /><strong>Miniatura</strong><span>thumbnail.jpg</span><input type="file" name="thumbnailFile" accept="image/*" /></label>
            <label className="upload-box"><UploadCloud size={25} /><strong>Galeria</strong><span>gallery-01, gallery-02...</span><input type="file" name="galleryFiles" accept="image/*" multiple /></label>
            <label className="upload-box"><UploadCloud size={25} /><strong>Rzut parteru</strong><span>floor-plan-ground.jpg</span><input type="file" name="floorPlanGroundFile" accept="image/*,.pdf" /></label>
            <label className="upload-box"><UploadCloud size={25} /><strong>Rzut dachu</strong><span>floor-plan-roof.jpg</span><input type="file" name="floorPlanRoofFile" accept="image/*,.pdf" /></label>
            <label className="upload-box"><UploadCloud size={25} /><strong>Przekrój A-A</strong><span>section-aa.jpg</span><input type="file" name="sectionAaFile" accept="image/*,.pdf" /></label>
            <label className="upload-box"><UploadCloud size={25} /><strong>Przekrój B-B</strong><span>section-bb.jpg</span><input type="file" name="sectionBbFile" accept="image/*,.pdf" /></label>
            <label className="upload-box"><UploadCloud size={25} /><strong>Elewacja frontowa</strong><span>elevation-front.jpg</span><input type="file" name="elevationFrontFile" accept="image/*,.pdf" /></label>
            <label className="upload-box"><UploadCloud size={25} /><strong>Elewacja ogrodowa</strong><span>elevation-garden.jpg</span><input type="file" name="elevationGardenFile" accept="image/*,.pdf" /></label>
          </div>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title">
            <ImagePlus size={22} />
            <div>
              <h2>7. Pliki prywatne po zakupie</h2>
              <p>Prywatne pliki trafią do Supabase Storage bucket `project-private-files`.</p>
            </div>
          </div>

          <div className="media-upload-grid private">
            <label className="upload-box"><UploadCloud size={25} /><strong>Dokumentacja PDF</strong><span>documentation-v1.pdf</span><input type="file" name="documentationFile" accept=".pdf" /></label>
            <label className="upload-box"><UploadCloud size={25} /><strong>Pełna paczka ZIP</strong><span>full-package-v1.zip</span><input type="file" name="fullPackageFile" accept=".zip" /></label>
            <label className="upload-box"><UploadCloud size={25} /><strong>PDF na e-mail</strong><span>pdf-email-package-v1.pdf</span><input type="file" name="pdfEmailPackageFile" accept=".pdf" /></label>
          </div>
        </section>

        <section className="admin-form-section">
          <div className="form-section-title">
            <Save size={22} />
            <div>
              <h2>8. Zapis</h2>
              <p>Projekt zostanie zapisany w Supabase.</p>
            </div>
          </div>

          {state.message && (
            <div className={state.ok ? "admin-form-success" : "admin-form-error"}>
              {state.message}
              {state.existingProjectHref && (
                <p className="admin-error-link">
                  <Link href={state.existingProjectHref}>{state.existingProjectLabel || "Zobacz istniejący projekt"}</Link>
                </p>
              )}
            </div>
          )}

          <div className="admin-form-actions">
            <button type="submit" className="admin-primary-button" disabled={pending}>
              {pending ? "Zapisywanie..." : "Zapisz projekt"}
            </button>
          </div>
        </section>
      </div>

      <aside className="admin-form-sidebar">
        <div className="admin-side-card">
          <span>KOD PROJEKTU</span>
          <strong>Auto</strong>
          <p>System nada kod w formacie DP-YYYY-NNNN i zapisze go w projekcie. Nie musisz nic pamiętać.</p>
        </div>

        <div className="admin-side-card">
          <span>KOMPLETNOŚĆ</span>
          <strong>{completion}%</strong>
          <p>Projekt powinien mieć przynajmniej nazwę, slug, cenę, opis, podstawowe parametry i media.</p>
        </div>

        <div className="admin-side-card">
          <span>ŹRÓDŁO DANYCH</span>
          <strong>Supabase</strong>
          <p>Zapis idzie do Postgres. Media idą do Storage. Prywatne PDF-y nie są publiczne.</p>
        </div>

        <div className="admin-side-card">
          <span>PUBLICZNOŚĆ</span>
          <strong>{status}</strong>
          <p>Publicznie widoczne są tylko projekty active. Draft zostaje w adminie.</p>
        </div>
      </aside>
    </form>
  );
}
