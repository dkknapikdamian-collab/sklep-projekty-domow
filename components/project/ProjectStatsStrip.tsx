import { Project } from "@/data/projects";
import { Bath, BedDouble, Car, Construction, House, Layers, Ruler } from "lucide-react";

const icons = [House, BedDouble, Bath, Car, Layers, House, Ruler, Construction];

export function ProjectStatsStrip({ project }: { project: Project }) {
  const stats = [
    ["Powierzchnia użytkowa", `${project.usableArea.toLocaleString("pl-PL")} m²`],
    ["Liczba pokoi", String(project.roomsCount)],
    ["Łazienki", String(project.bathroomsCount)],
    ["Garaż", project.garage],
    ["Kondygnacje", project.type],
    ["Dach", project.roof],
    ["Szerokość działki", `${project.minPlotWidth.toLocaleString("pl-PL")} m`],
    ["Technologia", project.technology]
  ];

  return (
    <section className="stats-strip">
      {stats.map(([label, value], index) => {
        const Icon = icons[index] || House;
        return (
          <div className="stat-item" key={label}>
            <Icon size={27} strokeWidth={1.35} />
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        );
      })}
    </section>
  );
}
