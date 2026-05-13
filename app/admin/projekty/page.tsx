import Link from "next/link";
import { Header } from "@/components/Header";
import { getAllProjects } from "@/lib/projects";
import { FolderPlus, ImageIcon, Pencil, Search } from "lucide-react";

export default function AdminProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <Header />
      <main className="admin-shell">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / PROJEKTY</span>
            <h1>Projekty</h1>
            <p>Na razie lista czyta lokalne foldery `content/projects`. Docelowo będzie to lista z Supabase.</p>
          </div>
          <Link href="/admin/projekty/nowy" className="admin-primary-button">
            <FolderPlus size={18} /> Dodaj projekt
          </Link>
        </section>

        <section className="admin-toolbar">
          <div className="admin-search">
            <Search size={18} />
            <input placeholder="Szukaj po nazwie, kodzie, statusie..." />
          </div>
          <select>
            <option>Wszystkie statusy</option>
            <option>Draft</option>
            <option>Active</option>
            <option>Hidden</option>
          </select>
        </section>

        {projects.length > 0 ? (
          <section className="admin-table-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kod</th>
                  <th>Nazwa</th>
                  <th>Status</th>
                  <th>Cena</th>
                  <th>Media</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.code}>
                    <td><strong>{project.code}</strong></td>
                    <td>{project.name}</td>
                    <td><span className={`status-pill ${project.status}`}>{project.status}</span></td>
                    <td>{project.priceGross.toLocaleString("pl-PL")} zł</td>
                    <td>
                      <span className="media-count">
                        <ImageIcon size={15} />
                        {project.media.gallery.length + (project.media.hero ? 1 : 0)}
                      </span>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <Link href={`/projekty/${project.slug}`}>Podgląd publiczny</Link>
                        <button><Pencil size={15} /> Edytuj później</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : (
          <section className="admin-empty">
            <h2>Nie ma jeszcze żadnych projektów.</h2>
            <p>
              To jest poprawne. Dodawanie przez panel jest przygotowywane. Na teraz możesz zobaczyć formularz i podgląd karty projektu.
            </p>
            <div>
              <Link href="/admin/projekty/nowy" className="admin-primary-button">Dodaj projekt</Link>
              <Link href="/admin/projekty/podglad" className="admin-secondary-button">Zobacz podgląd karty</Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
