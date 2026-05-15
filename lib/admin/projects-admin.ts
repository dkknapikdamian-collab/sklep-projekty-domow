import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProjectPublicationReadiness } from "@/lib/admin/project-publication-readiness";

export type AdminProjectListItem = {
  id: string;
  code: string;
  slug: string;
  name: string;
  status: string;
  priceGross: number;
  usableArea: number;
  roomsCount: number;
  mediaCount: number;
  projectRoomsCount: number;
  canPublish: boolean;
  publicationMissing: string[];
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
  rooms: AdminProjectRoomItem[];
  variants: AdminProjectVariantItem[];
  addons: AdminProjectAddonItem[];
  media: AdminProjectMediaItem[];
  privateFiles: AdminProjectFileItem[];
};

export type AdminProjectRoomItem = {
  floor: string;
  number: string;
  name: string;
  area: number;
  dimensions: string;
};

export type AdminProjectVariantItem = {
  name: string;
  priceGross: number;
};

export type AdminProjectAddonItem = {
  code: string;
  name: string;
  priceGross: number;
  description: string;
  deliveryAction: string;
};

export type AdminProjectMediaItem = {
  id: string;
  bucket: string;
  mediaType: string;
  title: string;
  path: string;
  publicUrl: string;
  sortOrder: number;
};

export type AdminProjectFileItem = {
  id: string;
  bucket: string;
  fileType: string;
  title: string;
  path: string;
  version: string;
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
    .select("id, code, slug, name, status, price_gross, usable_area, rooms_count, updated_at")
    .order("updated_at", { ascending: false });

  if (error || !projects) {
    console.error("Failed to load admin projects", error);
    return [];
  }

  const ids = projects.map((project) => project.id);

  let mediaByProject = new Map<string, string[]>();
  let roomCounts = new Map<string, number>();

  if (ids.length) {
    const [{ data: media }, { data: rooms }] = await Promise.all([
      supabase.from("project_media").select("project_id, media_type").in("project_id", ids),
      supabase.from("project_rooms").select("project_id, name").in("project_id", ids)
    ]);

    mediaByProject = new Map<string, string[]>();
    roomCounts = new Map<string, number>();

    for (const item of media || []) {
      const key = item.project_id as string;
      mediaByProject.set(key, [...(mediaByProject.get(key) || []), String(item.media_type || "")]);
    }

    for (const room of rooms || []) {
      const key = String(room.project_id || "");
      const roomName = String(room.name || "").trim();
      if (!key || !roomName) continue;
      roomCounts.set(key, (roomCounts.get(key) || 0) + 1);
    }
  }

  return projects.map((project) => {
    const projectId = project.id as string;
    const mediaTypes = mediaByProject.get(projectId) || [];
    const projectRoomsCount = roomCounts.get(projectId) || 0;
    const publication = getProjectPublicationReadiness({
      name: String(project.name || ""),
      slug: String(project.slug || ""),
      priceGross: toNumber(project.price_gross),
      usableArea: toNumber(project.usable_area),
      roomsCount: toNumber(project.rooms_count),
      media: mediaTypes.map((mediaType) => ({ mediaType })),
      rooms: Array.from({ length: projectRoomsCount }, () => ({ name: "room" }))
    });

    return {
      id: projectId,
      code: project.code as string,
      slug: project.slug as string,
      name: project.name as string,
      status: project.status as string,
      priceGross: toNumber(project.price_gross),
      usableArea: toNumber(project.usable_area),
      roomsCount: toNumber(project.rooms_count),
      mediaCount: mediaTypes.length,
      projectRoomsCount,
      canPublish: publication.canPublish,
      publicationMissing: publication.missing,
      updatedAt: String(project.updated_at || "")
    };
  });
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

  const [{ data: rooms }, { data: variants }, { data: addons }, { data: media }, { data: files }] = await Promise.all([
    supabase.from("project_rooms").select("floor, number, name, area, dimensions, sort_order").eq("project_id", id).order("sort_order"),
    supabase.from("project_variants").select("name, price_gross, sort_order").eq("project_id", id).order("sort_order"),
    supabase.from("project_addons").select("code, name, description, price_gross, delivery_action, sort_order").eq("project_id", id).order("sort_order"),
    supabase.from("project_media").select("id, bucket, media_type, title, path, public_url, sort_order").eq("project_id", id).order("sort_order"),
    supabase.from("project_files").select("id, bucket, file_type, title, path, version, created_at").eq("project_id", id).order("created_at", { ascending: false })
  ]);

  return {
    ...(() => {
      const publication = getProjectPublicationReadiness({
        name: String(project.name || ""),
        slug: String(project.slug || ""),
        priceGross: toNumber(project.price_gross),
        usableArea: toNumber(project.usable_area),
        roomsCount: toNumber(project.rooms_count),
        media: (media || []).map((item) => ({ mediaType: String(item.media_type || "") })),
        rooms: (rooms || []).map((room) => ({ name: String(room.name || "") }))
      });

      return {
        projectRoomsCount: (rooms || []).filter((room) => String(room.name || "").trim()).length,
        canPublish: publication.canPublish,
        publicationMissing: publication.missing
      };
    })(),
    id: project.id as string,
    code: project.code as string,
    shortCode: String(project.short_code || project.code || ""),
    slug: project.slug as string,
    name: project.name as string,
    status: project.status as string,
    priceGross: toNumber(project.price_gross),
    mediaCount: (media || []).length,
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
    relatedSlugs: toStringArray(project.related_slugs),
    rooms: (rooms || []).map((room) => ({
      floor: String(room.floor || ""),
      number: String(room.number || ""),
      name: String(room.name || ""),
      area: toNumber(room.area),
      dimensions: String(room.dimensions || "")
    })),
    variants: (variants || []).map((variant) => ({
      name: String(variant.name || ""),
      priceGross: toNumber(variant.price_gross)
    })),
    addons: (addons || []).map((addon) => ({
      code: String(addon.code || ""),
      name: String(addon.name || ""),
      priceGross: toNumber(addon.price_gross),
      description: String(addon.description || ""),
      deliveryAction: String(addon.delivery_action || "")
    })),
    media: (media || []).map((item) => ({
      id: String(item.id || ""),
      bucket: String(item.bucket || "project-media"),
      mediaType: String(item.media_type || ""),
      title: String(item.title || ""),
      path: String(item.path || ""),
      publicUrl: String(item.public_url || ""),
      sortOrder: toNumber(item.sort_order)
    })),
    privateFiles: (files || []).map((item) => ({
      id: String(item.id || ""),
      bucket: String(item.bucket || "project-private-files"),
      fileType: String(item.file_type || ""),
      title: String(item.title || ""),
      path: String(item.path || ""),
      version: String(item.version || "")
    }))
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


