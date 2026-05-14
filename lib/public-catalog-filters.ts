import type { Project } from "@/types/project";

export type PublicCatalogSearchParams = Record<string, string | string[] | undefined>;

export type PublicCatalogFilters = {
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

const EMPTY_FILTERS: PublicCatalogFilters = {
  q: "",
  style: "",
  garage: "",
  type: "",
  technology: "",
  rooms: "",
  floors: "",
  areaFrom: "",
  areaTo: ""
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function normalizeCatalogValue(value: unknown) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .trim();
}

function uniqueSorted(values: Array<string | number | null | undefined>) {
  return Array.from(
    new Set(
      values
        .map((value) => String(value || "").trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, "pl"));
}

export function getCatalogFiltersFromSearchParams(searchParams: PublicCatalogSearchParams = {}): PublicCatalogFilters {
  return {
    q: firstParam(searchParams.q) || "",
    style: firstParam(searchParams.style) || "",
    garage: firstParam(searchParams.garage) || "",
    type: firstParam(searchParams.type) || "",
    technology: firstParam(searchParams.technology) || "",
    rooms: firstParam(searchParams.rooms) || "",
    floors: firstParam(searchParams.floors) || "",
    areaFrom: firstParam(searchParams.areaFrom) || "",
    areaTo: firstParam(searchParams.areaTo) || ""
  };
}

export function hasPublicCatalogFilters(filters: PublicCatalogFilters) {
  return Object.entries(filters).some(([key, value]) => {
    if (!(key in EMPTY_FILTERS)) return false;
    return String(value || "").trim().length > 0;
  });
}

function numberFilterValue(value: string) {
  const normalized = value.replace(",", ".").trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function projectSearchHaystack(project: Project) {
  return [
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
    project.features.join(" ")
  ].map(normalizeCatalogValue).join(" ");
}

export function filterPublicProjects(projects: Project[], filters: PublicCatalogFilters) {
  const query = normalizeCatalogValue(filters.q);
  const style = normalizeCatalogValue(filters.style);
  const garage = normalizeCatalogValue(filters.garage);
  const type = normalizeCatalogValue(filters.type);
  const technology = normalizeCatalogValue(filters.technology);
  const rooms = numberFilterValue(filters.rooms);
  const floors = numberFilterValue(filters.floors);
  const areaFrom = numberFilterValue(filters.areaFrom);
  const areaTo = numberFilterValue(filters.areaTo);

  return projects.filter((project) => {
    if (query && !projectSearchHaystack(project).includes(query)) return false;
    if (style && normalizeCatalogValue(project.style) !== style) return false;
    if (garage && normalizeCatalogValue(project.garage) !== garage) return false;
    if (type && normalizeCatalogValue(project.type) !== type) return false;
    if (technology && normalizeCatalogValue(project.technology) !== technology) return false;
    if (rooms !== null && project.roomsCount !== rooms) return false;
    if (floors !== null && project.floorsCount !== floors) return false;
    if (areaFrom !== null && project.usableArea < areaFrom) return false;
    if (areaTo !== null && project.usableArea > areaTo) return false;

    return true;
  });
}

export function buildCatalogOptions(projects: Project[]): PublicCatalogOptions {
  return {
    styles: uniqueSorted(projects.map((project) => project.style)),
    garages: uniqueSorted(projects.map((project) => project.garage)),
    types: uniqueSorted(projects.map((project) => project.type)),
    technologies: uniqueSorted(projects.map((project) => project.technology)),
    rooms: uniqueSorted(projects.map((project) => project.roomsCount).filter((value) => Number(value) > 0)),
    floors: uniqueSorted(projects.map((project) => project.floorsCount).filter((value) => Number(value) > 0))
  };
}
