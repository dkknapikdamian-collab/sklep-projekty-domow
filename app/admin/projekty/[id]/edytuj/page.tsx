import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { updateProjectBasicsAction } from "@/app/admin/projekty/actions";
import { getAdminProjectById } from "@/lib/admin/projects-admin";
import { AdminProjectDeleteForm } from "@/components/admin/AdminProjectDeleteForm";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_OPTIONS = ["draft", "active", "hidden", "archived"];

type EditAdminProjectPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EditAdminProjectPage({ params, searchParams }: EditAdminProjectPageProps) {
  const { id } = await params;
  const query = searchParams ? await searchParams : {};
  const project = await getAdminProjectById(id);

  if (!project) notFound();

  const saved = firstParam(query.saved) === "1";

  return (
    <>
      <Header />
      <main className="admin-shell">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / EDYCJA PROJEKTU</span>
            <h1>Edytuj projekt</h1>
            <p>{project.code} — {project.name}</p>
          </div>
          <div className="admin-head-actions">
            <Link href="/admin/projekty" className="admin-secondary-button">
              <ArrowLeft size={17} /> Lista projektów
            </Link>
            {project.status === "active" && (
              <Link href={`/projekty/${project.slug}`} className="admin-secondary-button" target="_blank">
                Podgląd publiczny
              </Link>
            )}
          </div>
        </section>

        {saved && (
          <section className="admin-form-success" role="status">
            Zapisano dane projektu. Zmiany są już w Supabase, a widoki admina i publiczne strony zostały odświeżone.
          </section>
        )}

        <form action={updateProjectBasicsAction} className="admin-edit-project-form">
          <input type="hidden" name="projectId" value={project.id} />

          <section className="admin-form-section">
            <h2>Dane podstawowe</h2>
            <div className="form-grid two">
              <label>
                Kod projektu
                <input value={project.code} readOnly />
              </label>
              <label>
                Status
                <select name="status" defaultValue={project.status}>
                  {STATUS_OPTIONS.map((status) => (
                    <option value={status} key={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label>
                Nazwa projektu
                <input name="name" defaultValue={project.name} required />
              </label>
              <label>
                Slug
                <input name="slug" defaultValue={project.slug} required />
              </label>
              <label>
                Cena brutto
                <input name="priceGross" defaultValue={project.priceGross} inputMode="decimal" />
              </label>
              <label>
                Krótki kod
                <input value={project.shortCode || project.code} readOnly />
              </label>
            </div>

            <label>
              Krótki opis / podtytuł
              <input name="subtitle" defaultValue={project.subtitle || ""} />
            </label>

            <label>
              Opis projektu
              <textarea name="description" defaultValue={project.description || ""} />
            </label>
          </section>

          <section className="admin-form-section">
            <h2>Parametry techniczne</h2>
            <div className="form-grid four">
              <label>Badge główny<input name="badgePrimary" defaultValue={project.badgePrimary || ""} /></label>
              <label>Badge dodatkowy<input name="badgeSecondary" defaultValue={project.badgeSecondary || ""} /></label>
              <label>Typ / kondygnacja<input name="type" defaultValue={project.type || ""} /></label>
              <label>Styl<input name="style" defaultValue={project.style || ""} /></label>
              <label>Dach<input name="roof" defaultValue={project.roof || ""} /></label>
              <label>Garaż<input name="garage" defaultValue={project.garage || ""} /></label>
              <label>Technologia<input name="technology" defaultValue={project.technology || ""} /></label>
              <label>Powierzchnia użytkowa<input name="usableArea" defaultValue={project.usableArea} inputMode="decimal" /></label>
              <label>Powierzchnia zabudowy<input name="buildingArea" defaultValue={project.buildingArea} inputMode="decimal" /></label>
              <label>Liczba pokoi<input name="roomsCount" defaultValue={project.roomsCount} inputMode="numeric" /></label>
              <label>Łazienki<input name="bathroomsCount" defaultValue={project.bathroomsCount} inputMode="numeric" /></label>
              <label>Kondygnacje liczba<input name="floorsCount" defaultValue={project.floorsCount} inputMode="numeric" /></label>
              <label>Wysokość budynku<input name="buildingHeight" defaultValue={project.buildingHeight} inputMode="decimal" /></label>
              <label>Szerokość działki<input name="minPlotWidth" defaultValue={project.minPlotWidth} inputMode="decimal" /></label>
              <label>Długość działki<input name="minPlotLength" defaultValue={project.minPlotLength} inputMode="decimal" /></label>
            </div>
          </section>

          <section className="admin-form-section">
            <h2>Cechy i podobne projekty</h2>
            <label>
              Cechy projektu, jedna na linię
              <textarea name="features" defaultValue={project.features.join("\n")} />
            </label>
            <label>
              Podobne projekty, slug po przecinku
              <input name="relatedSlugs" defaultValue={project.relatedSlugs.join(", ")} />
            </label>
          </section>

          <section className="admin-form-section admin-edit-actions">
            <AdminSubmitButton idleLabel="Zapisz dane" pendingLabel="Zapisywanie danych..." />
            <Link href="/admin/projekty?cancelled=1" className="admin-secondary-button">
              Anuluj
            </Link>
          </section>
        </form>

        <section className="admin-form-section admin-danger-zone">
          <h2>Strefa usuwania</h2>
          <p>Usunięcie projektu usuwa rekord projektu i powiązane dane z bazy. System spróbuje też usunąć powiązane pliki ze Storage.</p>
          <AdminProjectDeleteForm projectId={project.id} projectCode={project.code} projectName={project.name} className="admin-danger-zone-form" />
        </section>
      </main>
    </>
  );
}
