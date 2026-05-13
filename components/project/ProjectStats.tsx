import { Bath, BedDouble, Car, Construction, House, Layers, Ruler } from "lucide-react";
import type { Project } from "@/types/project";
import { area, meters } from "@/lib/format";

export function ProjectStats({ project }: { project: Project }) {
  const stats = [
    ["Powierzchnia użytkowa", area(project.usableArea), House],
    ["Liczba pokoi", String(project.roomsCount), BedDouble],
    ["Łazienki", String(project.bathroomsCount), Bath],
    ["Garaż", project.garage, Car],
    ["Kondygnacje", project.type, Layers],
    ["Dach", project.roof, House],
    ["Szerokość działki", meters(project.minPlotWidth), Ruler],
    ["Technologia", project.technology, Construction]
  ] as const;

  return (
    <section className="stats-strip">
      {stats.map(([label, value, Icon]) => (
        <div className="stat-item" key={label}>
          <Icon size={27} strokeWidth={1.35} />
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </section>
  );
}
