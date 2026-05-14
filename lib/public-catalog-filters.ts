import type { Project } from "@/types/project";

export type PublicCatalogFilterState = {
  q: string;
  style: string;
  garage: string;
  type: string;
  technology: string;
  rooms: string;
  floors: string;
  areaFrom: string;
  areaTo: string;
};

export type PublicCatalogOptions = {
  styles: string[];
  garages: string[];
  types: string[];
  technologies: string[];
  rooms: string[];
  floors: string[];
};

function firstParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function normalize(value: unknown): string {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function numericFilterValue(value: string): number | null {
  const normalized = String(value || "").replace(",", ".").trim();
  if (!normalized) return null;

  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
}

function uniqueSorted(values: Array<string | number | null | undefined>): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => String(value || "").trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, "pl"));
}

export function getCatalogFiltersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): PublicCatalogFilterState {
  return {
    q: firstParam(searchParams.q),
    style: firstParam(searchParams.style),
    garage: firstParam(searchParams.garage),
    type: firstParam(searchParams.type),
    technology: firstParam(searchParams.technology),
    rooms: firstParam(searchParams.rooms),
    floors: firstParam(searchParams.floors),
    areaFrom: firstParam(searchParams.areaFrom),
    areaTo: firstParam(searchParams.areaTo)
  };
}

export function hasActivePublicCatalogFilters(filters: PublicCatalogFilterState): boolean {
  return Object.values(filters).some((value) => String(value || "").trim().length > 0);
}

export function hasPublicCatalogFilters(filters: PublicCatalogFilterState): boolean {
  return hasActivePublicCatalogFilters(filters);
}

export function buildCatalogOptions(projects: Project[]): PublicCatalogOptions {
  return {
    styles: uniqueSorted(projects.map((project) => project.style)),
    garages: uniqueSorted(projects.map((project) => project.garage)),
    types: uniqueSorted(projects.map((project) => project.type)),
    technologies: uniqueSorted(projects.map((project) => project.technology)),
    rooms: uniqueSorted(projects.map((project) => project.roomsCount)).sort((a, b) => Number(a) - Number(b)),
    floors: uniqueSorted(projects.map((project) => project.floorsCount)).sort((a, b) => Number(a) - Number(b))
  };
}

function projectMatchesQuery(project: Project, query: string): boolean {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return true;

  const haystack = [
    project.code,
    project.shortCode,
    project.slug,
    project.name,
    project.subtitle,
    project.description,
    project.type,
    project.style,
    project.roof,
    project.garage,
    project.technology,
    project.usableArea,
    project.buildingArea,
    project.roomsCount,
    project.floorsCount,
    project.minPlotWidth,
    project.minPlotLength,
    ...(project.features || [])
  ].map(normalize).join(" ");

  return haystack.includes(normalizedQuery);
}

export function filterPublicProjects(projects: Project[], filters: PublicCatalogFilterState): Project[] {
  const areaFrom = numericFilterValue(filters.areaFrom);
  const areaTo = numericFilterValue(filters.areaTo);

  return projects.filter((project) => {
    if (!projectMatchesQuery(project, filters.q)) return false;
    if (filters.style && project.style !== filters.style) return false;
    if (filters.garage && project.garage !== filters.garage) return false;
    if (filters.type && project.type !== filters.type) return false;
    if (filters.technology && project.technology !== filters.technology) return false;
    if (filters.rooms && String(project.roomsCount) !== filters.rooms) return false;
    if (filters.floors && String(project.floorsCount) !== filters.floors) return false;
    if (areaFrom !== null && project.usableArea < areaFrom) return false;
    if (areaTo !== null && project.usableArea > areaTo) return false;

    return true;
  });
}
