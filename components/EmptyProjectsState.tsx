import Link from "next/link";

export function EmptyProjectsState() {
  return (
    <div className="empty-state">
      <span>BRAK OPUBLIKOWANYCH PROJEKTÓW</span>
      <h2>Projekty pojawią się tutaj dopiero po dodaniu ich do folderu content/projects.</h2>
      <p>
        To jest prawidłowe zachowanie produkcyjne. Nie pokazujemy fikcyjnych ofert, cen ani zdjęć.
        Dodaj realny projekt z kodem, opisem, parametrami i statusem active.
      </p>
      <Link href="/admin" className="empty-link">Zobacz instrukcję dodawania projektu</Link>
    </div>
  );
}
