import fs from "node:fs";
import path from "node:path";
import type { Project, ProjectAddon, ProjectMedia, ProjectPlan } from "@/types/project";

const CONTENT_ROOT = path.join(process.cwd(), "content", "projects");
const PUBLIC_ROOT = path.join(process.cwd(), "public");

export const PDF_EMAIL_ADDON: ProjectAddon = {
  code: "PDF_EMAIL_PACKAGE",
  name: "Pakiet PDF na e-mail",
  priceGross: 250,
  description:
    "Dodatkowa wersja projektu w formacie PDF wysłana bezpośrednio na e-mail po zaksięgowaniu płatności. Przy dużych plikach wyślemy bezpieczny link do pobrania.",
  deliveryAction: "send_pdf_email"
};

type ProjectJson = Omit<Project, "media"> & {
  mediaBase?: string;
  media?: Partial<ProjectMedia>;
};

function publicFileExists(publicUrl: string) {
  const cleanUrl = publicUrl.startsWith("/") ? publicUrl.slice(1) : publicUrl;
  return fs.existsSync(path.join(PUBLIC_ROOT, cleanUrl));
}

function existingAsset(basePath: string, fileName: string) {
  const url = `${basePath}/${fileName}`;
  return publicFileExists(url) ? url : undefined;
}

function existingGallery(basePath: string) {
  const urls: string[] = [];
  for (let index = 1; index <= 12; index += 1) {
    const file = `gallery-${String(index).padStart(2, "0")}.jpg`;
    const url = existingAsset(basePath, file);
    if (url) urls.push(url);
  }
  return urls;
}

function planIfExists(basePath: string, fileName: string, title: string, type: ProjectPlan["type"]): ProjectPlan | null {
  const url = existingAsset(basePath, fileName);
  if (!url) return null;
  return { title, type, fileName, url };
}

function buildMedia(code: string, input?: Partial<ProjectMedia>, mediaBase?: string): ProjectMedia {
  const basePath = input?.basePath || mediaBase || `/projects/${code}`;

  const plans = [
    planIfExists(basePath, "floor-plan-ground.jpg", "Rzut parteru", "floor_plan"),
    planIfExists(basePath, "floor-plan-floor.jpg", "Rzut piętra", "floor_plan"),
    planIfExists(basePath, "floor-plan-roof.jpg", "Rzut dachu", "roof_plan"),
    planIfExists(basePath, "section-aa.jpg", "Przekrój A-A", "section"),
    planIfExists(basePath, "section-bb.jpg", "Przekrój B-B", "section")
  ].filter((item): item is ProjectPlan => Boolean(item));

  const elevations = [
    planIfExists(basePath, "elevation-front.jpg", "Elewacja frontowa", "elevation"),
    planIfExists(basePath, "elevation-garden.jpg", "Elewacja ogrodowa", "elevation"),
    planIfExists(basePath, "elevation-left.jpg", "Elewacja lewa", "elevation"),
    planIfExists(basePath, "elevation-right.jpg", "Elewacja prawa", "elevation")
  ].filter((item): item is ProjectPlan => Boolean(item));

  return {
    basePath,
    hero: existingAsset(basePath, "hero.jpg"),
    thumbnail: existingAsset(basePath, "thumbnail.jpg") || existingAsset(basePath, "hero.jpg"),
    gallery: existingGallery(basePath),
    plans,
    elevations
  };
}

function normalizeProject(raw: ProjectJson): Project {
  return {
    ...raw,
    addons: raw.addons?.length ? raw.addons : [PDF_EMAIL_ADDON],
    variants: raw.variants || [],
    rooms: raw.rooms || [],
    features: raw.features || [],
    relatedSlugs: raw.relatedSlugs || [],
    media: buildMedia(raw.code, raw.media, raw.mediaBase)
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(CONTENT_ROOT)) return [];

  const dirs = fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !entry.name.startsWith("_"))
    .map((entry) => entry.name);

  const projects: Project[] = [];

  for (const dir of dirs) {
    const jsonPath = path.join(CONTENT_ROOT, dir, "project.json");
    if (!fs.existsSync(jsonPath)) continue;

    try {
      const raw = JSON.parse(fs.readFileSync(jsonPath, "utf8")) as ProjectJson;
      projects.push(normalizeProject(raw));
    } catch (error) {
      console.error(`Nie udało się wczytać projektu: ${jsonPath}`, error);
    }
  }

  return projects.sort((a, b) => a.name.localeCompare(b.name, "pl"));
}

export function getPublishedProjects() {
  return getAllProjects().filter((project) => project.status === "active");
}

export function getProjectBySlug(slug: string) {
  return getPublishedProjects().find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project) {
  return project.relatedSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((item): item is Project => Boolean(item));
}
