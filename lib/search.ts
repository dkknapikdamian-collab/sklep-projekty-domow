import { Project } from "@/data/projects";

export function normalizeQuery(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/m²|m kw|m2|metrow kwadratowych/g, "m2")
    .replace(/,/g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

export function projectSearchText(project: Project) {
  return normalizeQuery(
    [
      project.code,
      project.name,
      project.shortDescription,
      project.longDescription,
      project.type,
      project.style,
      project.roof,
      project.garage,
      project.usableArea,
      project.buildingArea,
      project.minPlotWidth,
      project.minPlotLength,
      `${project.minPlotWidth}x${project.minPlotLength}`,
      `${project.usableArea}m2`,
      `${project.rooms} pokoje`,
      `${project.bathrooms} lazienki`,
      ...project.tags,
      ...project.roomList.map((room) => room.name)
    ].join(" ")
  );
}

export function filterProjects(projects: Project[], query: string) {
  const normalized = normalizeQuery(query);
  if (!normalized) return projects;

  const compact = normalized.replace(/\s/g, "");
  return projects.filter((project) => {
    const text = projectSearchText(project);
    const code = normalizeQuery(project.code).replace(/\s/g, "");
    const plot = `${project.minPlotWidth}x${project.minPlotLength}`;
    const area = `${Math.round(project.usableArea)}m2`;

    return (
      text.includes(normalized) ||
      code.includes(compact) ||
      text.includes(compact) ||
      normalizeQuery(plot).includes(compact) ||
      normalizeQuery(area).includes(compact)
    );
  });
}
