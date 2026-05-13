"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

function str(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function num(formData: FormData, key: string) {
  const value = String(formData.get(key) || "").replace(",", ".").trim();
  if (!value) return 0;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function intNum(formData: FormData, key: string) {
  return Math.round(num(formData, key));
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function requireAdminAndClient() {
  const admin = await getAdminSession();

  if (!admin.ok) {
    throw new Error(`Brak dostępu admina: ${admin.reason}`);
  }

  const supabase = createSupabaseServiceRoleClient();

  if (!supabase) {
    throw new Error("Brak SUPABASE_SERVICE_ROLE_KEY albo env Supabase.");
  }

  return supabase;
}

function assertStatus(status: string) {
  if (!["draft", "active", "hidden", "archived"].includes(status)) {
    throw new Error("Niepoprawny status projektu.");
  }
}

export async function updateProjectStatusAction(formData: FormData) {
  const projectId = str(formData, "projectId");
  const status = str(formData, "status");
  const slug = str(formData, "slug");

  if (!projectId) {
    throw new Error("Brak ID projektu.");
  }

  assertStatus(status);

  const supabase = await requireAdminAndClient();

  const { error } = await supabase
    .from("projects")
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq("id", projectId);

  if (error) {
    throw new Error(`Nie udało się zmienić statusu projektu: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/projekty");
  if (slug) revalidatePath(`/projekty/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/projekty");

  redirect("/admin/projekty?status=updated");
}

export async function deleteProjectAction(formData: FormData) {
  const projectId = str(formData, "projectId");

  if (!projectId) {
    throw new Error("Brak ID projektu.");
  }

  const supabase = await requireAdminAndClient();

  const { data: project } = await supabase
    .from("projects")
    .select("slug, code")
    .eq("id", projectId)
    .maybeSingle();

  const { data: mediaRows } = await supabase
    .from("project_media")
    .select("bucket, path")
    .eq("project_id", projectId);

  const { data: privateRows } = await supabase
    .from("project_files")
    .select("bucket, path")
    .eq("project_id", projectId);

  const storageGroups = new Map<string, string[]>();

  for (const row of [...(mediaRows || []), ...(privateRows || [])]) {
    const bucket = String(row.bucket || "");
    const path = String(row.path || "");

    if (!bucket || !path) continue;

    storageGroups.set(bucket, [...(storageGroups.get(bucket) || []), path]);
  }

  for (const [bucket, paths] of storageGroups) {
    if (paths.length) {
      await supabase.storage.from(bucket).remove(paths);
    }
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    throw new Error(`Nie udało się usunąć projektu: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/projekty");
  if (project?.slug) revalidatePath(`/projekty/${project.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/projekty");

  redirect("/admin/projekty?deleted=1");
}

export async function updateProjectBasicsAction(formData: FormData) {
  const projectId = str(formData, "projectId");
  const name = str(formData, "name");
  const slug = str(formData, "slug") || slugify(name);
  const status = str(formData, "status") || "draft";

  if (!projectId) {
    throw new Error("Brak ID projektu.");
  }

  if (!name || !slug) {
    throw new Error("Uzupełnij nazwę i slug projektu.");
  }

  assertStatus(status);

  const supabase = await requireAdminAndClient();

  const { data: duplicateSlug, error: duplicateError } = await supabase
    .from("projects")
    .select("id, code, name")
    .eq("slug", slug)
    .neq("id", projectId)
    .maybeSingle();

  if (duplicateError) {
    throw new Error(`Nie udało się sprawdzić unikalności slug: ${duplicateError.message}`);
  }

  if (duplicateSlug) {
    throw new Error(`Slug jest już używany przez projekt ${duplicateSlug.code || ""} ${duplicateSlug.name || ""}.`);
  }

  const features = parseLines(str(formData, "features"));
  const relatedSlugs = parseCommaList(str(formData, "relatedSlugs"));

  const { data: oldProject } = await supabase
    .from("projects")
    .select("slug")
    .eq("id", projectId)
    .maybeSingle();

  const { error } = await supabase
    .from("projects")
    .update({
      name,
      slug,
      subtitle: str(formData, "subtitle"),
      description: str(formData, "description"),
      price_gross: num(formData, "priceGross"),
      badge_primary: str(formData, "badgePrimary") || null,
      badge_secondary: str(formData, "badgeSecondary") || null,
      status,
      type: str(formData, "type"),
      style: str(formData, "style"),
      roof: str(formData, "roof"),
      garage: str(formData, "garage"),
      technology: str(formData, "technology"),
      usable_area: num(formData, "usableArea"),
      building_area: num(formData, "buildingArea"),
      rooms_count: intNum(formData, "roomsCount"),
      bathrooms_count: intNum(formData, "bathroomsCount"),
      floors_count: intNum(formData, "floorsCount"),
      building_height: num(formData, "buildingHeight"),
      min_plot_width: num(formData, "minPlotWidth"),
      min_plot_length: num(formData, "minPlotLength"),
      features,
      related_slugs: relatedSlugs,
      updated_at: new Date().toISOString()
    })
    .eq("id", projectId);

  if (error) {
    throw new Error(`Nie udało się zapisać zmian projektu: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/projekty");
  if (oldProject?.slug) revalidatePath(`/projekty/${oldProject.slug}`);
  revalidatePath(`/projekty/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/projekty");
  revalidatePath(`/admin/projekty/${projectId}/edytuj`);

  redirect(`/admin/projekty/${projectId}/edytuj?saved=1`);
}
