import { Project } from "@/data/projects";

export function SpecsStrip({ project }: { project: Project }) {
  const items = [
    ["Powierzchnia", `${project.usableArea} m²`],
    ["Zabudowa", `${project.buildingArea} m²`],
    ["Pokoje", `${project.rooms}`],
    ["Łazienki", `${project.bathrooms}`],
    ["Garaż", project.garage],
    ["Działka min.", `${project.minPlotWidth} × ${project.minPlotLength} m`],
    ["Dach", project.roof],
    ["Wysokość", `${project.height} m`]
  ];

  return (
    <div className="specs-strip">
      {items.map(([label, value]) => (
        <div key={label} className="spec-tile">
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}
