import type { Project, ProjectAddon, ProjectMedia, ProjectPlan, ProjectRoom, ProjectVariant } from "@/types/project";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

type DbProject = {
  id: string;
  code: string;
  short_code: string | null;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  price_gross: number | string | null;
  badge_primary: string | null;
  badge_secondary: string | null;
  status: Project["status"];
  type: string | null;
  style: string | null;
  roof: string | null;
  garage: string | null;
  technology: string | null;
  usable_area: number | string | null;
  building_area: number | string | null;
  rooms_count: number | null;
  bathrooms_count: number | null;
  floors_count: number | null;
  building_height: number | string | null;
  min_plot_width: number | string | null;
  min_plot_length: number | string | null;
  features: unknown;
  related_slugs: unknown;
};

type DbRoom = {
  project_id: string;
  floor: string;
  number: string | null;
  name: string;
  area: number | string | null;
  dimensions: string | null;
  sort_order: number | null;
};

type DbAddon = {
  project_id: string;
  code: string;
  name: string;
  description: string | null;
  price_gross: number | string | null;
  delivery_action: string | null;
  active: boolean | null;
  sort_order: number | null;
};

type DbVariant = {
  project_id: string;
  name: string;
  price_gross: number | string | null;
  active: boolean | null;
  sort_order: number | null;
};

type DbMedia = {
  project_id: string;
  path: string;
  media_type: string;
  title: string | null;
  alt: string | null;
  sort_order: number | null;
  public_url: string | null;
};

function toNumber(value: number | string | null | undefined, fallback = 0) {
  if (value === null || value === undefined || value === "") return fallback;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function arrayFromUnknown(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}

function fileNameFromPath(path: string) {
  return path.split("/").pop() || path;
}

function mediaUrl(media: DbMedia) {
  return media.public_url || "";
}

function mediaPlanType(row: DbMedia): ProjectPlan["type"] {
  if (row.media_type === "roof_plan") return "roof_plan";
  if (row.media_type === "section") return "section";
  return "floor_plan";
}

function buildMedia(projectId: string, mediaRows: DbMedia[]): ProjectMedia {
  const rows = mediaRows
    .filter((row) => row.project_id === projectId)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  const hero = rows.find((row) => row.media_type === "hero");
  const thumbnail = rows.find((row) => row.media_type === "thumbnail");
  const gallery = rows.filter((row) => row.media_type === "gallery").map(mediaUrl).filter(Boolean);

  const plans: ProjectPlan[] = rows
    .filter((row) => ["floor_plan", "roof_plan", "section"].includes(row.media_type))
    .map((row) => ({
      title: row.title || row.alt || fileNameFromPath(row.path),
      type: mediaPlanType(row),
      fileName: fileNameFromPath(row.path),
      url: mediaUrl(row)
    }));

  const elevations: ProjectPlan[] = rows
    .filter((row) => row.media_type === "elevation")
    .map((row) => ({
      title: row.title || row.alt || fileNameFromPath(row.path),
      type: "elevation",
      fileName: fileNameFromPath(row.path),
      url: mediaUrl(row)
    }));

  return {
    basePath: "",
    hero: hero ? mediaUrl(hero) : undefined,
    thumbnail: thumbnail ? mediaUrl(thumbnail) : hero ? mediaUrl(hero) : undefined,
    gallery,
    plans,
    elevations
  };
}

function mapProject(
  row: DbProject,
  rooms: DbRoom[],
  addons: DbAddon[],
  variants: DbVariant[],
  media: DbMedia[]
): Project {
  const projectRooms: ProjectRoom[] = rooms
    .filter((room) => room.project_id === row.id)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((room) => ({
      floor: room.floor,
      number: room.number || "",
      name: room.name,
      area: toNumber(room.area),
      dimensions: room.dimensions || ""
    }));

  const projectAddons: ProjectAddon[] = addons
    .filter((addon) => addon.project_id === row.id && addon.active !== false)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((addon) => ({
      code: addon.code,
      name: addon.name,
      description: addon.description || "",
      priceGross: toNumber(addon.price_gross),
      deliveryAction: addon.delivery_action === "send_pdf_email" ? "send_pdf_email" : undefined
    }));

  const projectVariants: ProjectVariant[] = variants
    .filter((variant) => variant.project_id === row.id && variant.active !== false)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((variant) => ({
      name: variant.name,
      priceGross: toNumber(variant.price_gross)
    }));

  return {
    code: row.code,
    shortCode: row.short_code || row.code,
    slug: row.slug,
    name: row.name,
    subtitle: row.subtitle || "",
    description: row.description || "",
    priceGross: toNumber(row.price_gross),
    badgePrimary: row.badge_primary || undefined,
    badgeSecondary: row.badge_secondary || undefined,
    status: row.status,
    type: row.type || "",
    style: row.style || "",
    roof: row.roof || "",
    garage: row.garage || "",
    technology: row.technology || "",
    usableArea: toNumber(row.usable_area),
    buildingArea: toNumber(row.building_area),
    roomsCount: row.rooms_count || 0,
    bathroomsCount: row.bathrooms_count || 0,
    floorsCount: row.floors_count || 0,
    buildingHeight: toNumber(row.building_height),
    minPlotWidth: toNumber(row.min_plot_width),
    minPlotLength: toNumber(row.min_plot_length),
    variants: projectVariants,
    addons: projectAddons,
    rooms: projectRooms,
    features: arrayFromUnknown(row.features),
    media: buildMedia(row.id, media),
    relatedSlugs: arrayFromUnknown(row.related_slugs).filter((slug) => slug !== row.slug),
    privateFilesInfo: []
  };
}

async function loadActiveFromSupabase() {
  // V27/V29: public pages read through server-only service role and still filter status=active.
  // This avoids anon/RLS drift while keeping drafts/hidden/archived out of public output.
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return [];

  const { data: projectRows, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "active")
    .order("name", { ascending: true });

  if (projectError) {
    console.error("Failed to load active projects from Supabase", projectError);
    return [];
  }

  const projects = (projectRows || []) as DbProject[];
  if (!projects.length) return [];

  const projectIds = projects.map((project) => project.id);

  const [roomsResult, addonsResult, variantsResult, mediaResult] = await Promise.all([
    supabase.from("project_rooms").select("*").in("project_id", projectIds).order("sort_order"),
    supabase.from("project_addons").select("*").in("project_id", projectIds).order("sort_order"),
    supabase.from("project_variants").select("*").in("project_id", projectIds).order("sort_order"),
    supabase.from("project_media").select("*").in("project_id", projectIds).order("sort_order")
  ]);

  const rooms = (roomsResult.data || []) as DbRoom[];
  const addons = (addonsResult.data || []) as DbAddon[];
  const variants = (variantsResult.data || []) as DbVariant[];
  const media = (mediaResult.data || []) as DbMedia[];

  return projects.map((project) => mapProject(project, rooms, addons, variants, media));
}

export async function getPublicProjects(): Promise<Project[]> {
  return loadActiveFromSupabase();
}

export async function getPublicProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getPublicProjects();
  return projects.find((item) => item.slug === slug);
}

export async function getRelatedPublicProjects(project: Project): Promise<Project[]> {
  const projects = await getPublicProjects();
  const pool = projects.filter((item) => item.slug !== project.slug);

  if (project.relatedSlugs.length > 0) {
    return project.relatedSlugs
      .map((slug) => pool.find((item) => item.slug === slug))
      .filter((item): item is Project => Boolean(item))
      .slice(0, 4);
  }

  const scored = pool
    .map((candidate) => {
      let score = 0;
      if (candidate.type && project.type && candidate.type === project.type) score += 3;
      if (candidate.style && project.style && candidate.style === project.style) score += 2;
      if (candidate.garage && project.garage && candidate.garage === project.garage) score += 2;
      if (candidate.technology && project.technology && candidate.technology === project.technology) score += 2;

      const areaDiff = Math.abs(candidate.usableArea - project.usableArea);
      if (areaDiff <= 10) score += 3;
      else if (areaDiff <= 20) score += 2;
      else if (areaDiff <= 35) score += 1;

      return { candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "pl"))
    .slice(0, 4)
    .map((item) => item.candidate);

  return scored;
}
