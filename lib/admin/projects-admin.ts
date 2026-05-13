import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminProjectListItem = {
  id: string;
  code: string;
  slug: string;
  name: string;
  status: string;
  priceGross: number;
  mediaCount: number;
  updatedAt: string;
};

export type AdminProjectEditItem = AdminProjectListItem & {
  shortCode: string;
  subtitle: string;
  description: string;
  badgePrimary: string;
  badgeSecondary: string;
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
  features: string[];
  relatedSlugs: string[];
};

export type AdminProjectMetrics = {
  total: number;
  active: number;
  draft: number;
  hidden: number;
};

function toNumber(value: unknown) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function toStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
}

export async function getAdminProjects(): Promise<AdminProjectListItem[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, code, slug, name, status, price_gross, updated_at")
    .order("updated_at", { ascending: false });

  if (error || !projects) {
    console.error("Failed to load admin projects", error);
    return [];
  }

  const ids = projects.map((project) => project.id);

  let mediaCounts = new Map<string, number>();

  if (ids.length) {
    const { data: media } = await supabase
      .from("project_media")
      .select("project_id")
      .in("project_id", ids);

    mediaCounts = new Map<string, number>();

    for (const item of media || []) {
      const key = item.project_id as string;
      mediaCounts.set(key, (mediaCounts.get(key) || 0) + 1);
    }
  }

  return projects.map((project) => ({
    id: project.id as string,
    code: project.code as string,
    slug: project.slug as string,
    name: project.name as string,
    status: project.status as string,
    priceGross: toNumber(project.price_gross),
    mediaCount: mediaCounts.get(project.id as string) || 0,
    updatedAt: String(project.updated_at || "")
  }));
}

export async function getAdminProjectById(id: string): Promise<AdminProjectEditItem | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) return null;

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !project) {
    console.error("Failed to load admin project", error);
    return null;
  }

  const { count } = await supabase
    .from("project_media")
    .select("id", { count: "exact", head: true })
    .eq("project_id", id);

  return {
    id: project.id as string,
    code: project.code as string,
    shortCode: String(project.short_code || project.code || ""),
    slug: project.slug as string,
    name: project.name as string,
    status: project.status as string,
    priceGross: toNumber(project.price_gross),
    mediaCount: count || 0,
    updatedAt: String(project.updated_at || ""),
    subtitle: String(project.subtitle || ""),
    description: String(project.description || ""),
    badgePrimary: String(project.badge_primary || ""),
    badgeSecondary: String(project.badge_secondary || ""),
    type: String(project.type || ""),
    style: String(project.style || ""),
    roof: String(project.roof || ""),
    garage: String(project.garage || ""),
    technology: String(project.technology || ""),
    usableArea: toNumber(project.usable_area),
    buildingArea: toNumber(project.building_area),
    roomsCount: toNumber(project.rooms_count),
    bathroomsCount: toNumber(project.bathrooms_count),
    floorsCount: toNumber(project.floors_count),
    buildingHeight: toNumber(project.building_height),
    minPlotWidth: toNumber(project.min_plot_width),
    minPlotLength: toNumber(project.min_plot_length),
    features: toStringArray(project.features),
    relatedSlugs: toStringArray(project.related_slugs)
  };
}

export async function getAdminProjectMetrics(): Promise<AdminProjectMetrics> {
  const projects = await getAdminProjects();

  return {
    total: projects.length,
    active: projects.filter((project) => project.status === "active").length,
    draft: projects.filter((project) => project.status === "draft").length,
    hidden: projects.filter((project) => project.status === "hidden").length
  };
}
