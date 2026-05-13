export function EmptyProjectsState() {
  return (
    <div className="empty-state">
      <span>BRAK OPUBLIKOWANYCH PROJEKTÓW</span>
      <h2>Projekty pojawią się tutaj dopiero po dodaniu ich przez admina.</h2>
      <p>
        To jest poprawne zachowanie produkcyjne. Nie pokazujemy fikcyjnych opisów, cen ani zdjęć jako realnych ofert.
      </p>
    </div>
  );
}
