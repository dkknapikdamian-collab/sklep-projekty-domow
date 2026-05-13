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

export async function getAdminProjectMetrics(): Promise<AdminProjectMetrics> {
  const projects = await getAdminProjects();

  return {
    total: projects.length,
    active: projects.filter((project) => project.status === "active").length,
    draft: projects.filter((project) => project.status === "draft").length,
    hidden: projects.filter((project) => project.status === "hidden").length
  };
}
