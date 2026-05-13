export type ProjectStatus = "draft" | "active" | "hidden" | "archived";

export type ProjectPlan = {
  title: string;
  type: "floor_plan" | "roof_plan" | "section" | "elevation";
  url: string;
};

export type ProjectAddon = {
  code: string;
  name: string;
  priceGross: number;
  description: string;
  deliveryAction?: "send_pdf_email";
};

export type ProjectRoom = {
  floor: string;
  number: string;
  name: string;
  area: number;
  dimensions: string;
};

export type ProjectMedia = {
  hero: string;
  thumbnail: string;
  gallery: string[];
  plans: ProjectPlan[];
  elevations: ProjectPlan[];
};

export type Project = {
  code: string;
  shortCode: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  priceGross: number;
  badgePrimary?: string;
  badgeSecondary?: string;
  status: ProjectStatus;
  type: string;
  style: string;
  roof: string;
  garage: string;
  technology: string;
  usableArea: number;
  buildingArea: number;
  roomsCount: number;
  bathroomsCount: number;
  floorsCount: number;
  buildingHeight: number;
  minPlotWidth: number;
  minPlotLength: number;
  variants: Array<{ name: string; priceGross: number }>;
  addons: ProjectAddon[];
  rooms: ProjectRoom[];
  features: string[];
  media: ProjectMedia;
  relatedSlugs: string[];
};

/**
 * PRODUCTION RULE:
 * Nie dodawaj tutaj fikcyjnych projektów.
 * Projekt dodajemy dopiero, gdy ma realne dane i realne media.
 */
export const projects: Project[] = [];

export const PDF_EMAIL_ADDON: ProjectAddon = {
  code: "PDF_EMAIL_PACKAGE",
  name: "Pakiet PDF na e-mail",
  priceGross: 250,
  description:
    "Dodatkowa wersja projektu w formacie PDF wysłana bezpośrednio na e-mail po zaksięgowaniu płatności. Przy dużych plikach wyślemy bezpieczny link do pobrania.",
  deliveryAction: "send_pdf_email"
};

export function getPublishedProjects() {
  return projects.filter((project) => project.status === "active");
}

export function getProjectBySlug(slug: string) {
  return getPublishedProjects().find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project) {
  return project.relatedSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((item): item is Project => Boolean(item));
}
