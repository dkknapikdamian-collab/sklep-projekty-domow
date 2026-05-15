"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import {
  getProjectPublicationErrorMessage,
  getProjectPublicationReadiness,
  PROJECT_PUBLICATION_MISSING_LABELS
} from "@/lib/admin/project-publication-readiness";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export type UpdateProjectState = {
  ok: boolean;
  message: string;
};

type RoomInput = {
  floor?: string;
  number?: string;
  name?: string;
  area?: string | number;
  dimensions?: string;
};

type VariantInput = {
  name?: string;
  priceGross?: string | number;
};

type AddonInput = {
  code?: string;
  name?: string;
  priceGross?: string | number;
  description?: string;
  deliveryAction?: string;
};

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

function parseJsonArray<T>(formData: FormData, key: string): T[] {
  const raw = str(formData, key);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isRealFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0 && value.name !== "";
}

async function requireAdminAndClient() {
  const admin = await getAdminSession();

  if (!admin.ok) {
    throw new Error(`Brak dostepu admina: ${admin.reason}`);
  }

  const supabase = createSupabaseServiceRoleClient();

  if (!supabase) {
    throw new Error("Brak SUPABASE_SERVICE_ROLE_KEY albo env Supabase.");
  }

  return { admin, supabase };
}

function assertStatus(status: string) {
  if (!["draft", "active", "hidden", "archived"].includes(status)) {
    throw new Error("Niepoprawny status projektu.");
  }
}

async function getProjectPublicationContext(
  supabase: NonNullable<ReturnType<typeof createSupabaseServiceRoleClient>>,
  projectId: string
) {
  const [{ data: mediaRows, error: mediaError }, { data: roomRows, error: roomsError }] = await Promise.all([
    supabase.from("project_media").select("media_type").eq("project_id", projectId),
    supabase.from("project_rooms").select("name").eq("project_id", projectId)
  ]);

  if (mediaError) {
    throw new Error(`Nie udalo sie sprawdzic mediow projektu: ${mediaError.message}`);
  }

  if (roomsError) {
    throw new Error(`Nie udalo sie sprawdzic tabeli pomieszczen: ${roomsError.message}`);
  }

  return {
    mediaRows: mediaRows || [],
    roomRows: roomRows || []
  };
}

async function uploadPublicMedia(params: {
  supabase: ReturnType<typeof createSupabaseServiceRoleClient>;
  projectId: string;
  projectCode: string;
  formData: FormData;
}) {
  const { supabase, projectId, projectCode, formData } = params;
  if (!supabase) return;

  const uploads: Array<{ formKey: string; fileName: string; mediaType: string; title: string; sortOrder: number }> = [
    { formKey: "heroFile", fileName: "hero.jpg", mediaType: "hero", title: "Hero", sortOrder: 1 },
    { formKey: "thumbnailFile", fileName: "thumbnail.jpg", mediaType: "thumbnail", title: "Miniatura", sortOrder: 2 },
    { formKey: "floorPlanGroundFile", fileName: "floor-plan-ground.jpg", mediaType: "floor_plan", title: "Rzut parteru", sortOrder: 100 },
    { formKey: "floorPlanRoofFile", fileName: "floor-plan-roof.jpg", mediaType: "roof_plan", title: "Rzut dachu", sortOrder: 110 },
    { formKey: "sectionAaFile", fileName: "section-aa.jpg", mediaType: "section", title: "Przekroj A-A", sortOrder: 120 },
    { formKey: "sectionBbFile", fileName: "section-bb.jpg", mediaType: "section", title: "Przekroj B-B", sortOrder: 130 },
    { formKey: "elevationFrontFile", fileName: "elevation-front.jpg", mediaType: "elevation", title: "Elewacja frontowa", sortOrder: 200 },
    { formKey: "elevationGardenFile", fileName: "elevation-garden.jpg", mediaType: "elevation", title: "Elewacja ogrodowa", sortOrder: 210 }
  ];

  for (const upload of uploads) {
    const file = formData.get(upload.formKey);
    if (!isRealFile(file)) continue;

    const path = `${projectCode}/${upload.fileName}`;
    const { error } = await supabase.storage.from("project-media").upload(path, file, {
      upsert: true,
      contentType: file.type || "image/jpeg"
    });

    if (error) throw new Error(`Upload failed for ${upload.fileName}: ${error.message}`);

    const { data: publicUrlData } = supabase.storage.from("project-media").getPublicUrl(path);

    await supabase.from("project_media").delete().eq("project_id", projectId).eq("path", path);
    await supabase.from("project_media").insert({
      project_id: projectId,
      bucket: "project-media",
      path,
      media_type: upload.mediaType,
      title: upload.title,
      alt: upload.title,
      sort_order: upload.sortOrder,
      public_url: publicUrlData.publicUrl
    });
  }

  const galleryFiles = formData.getAll("galleryFiles").filter(isRealFile);
  if (!galleryFiles.length) return;

  await supabase.from("project_media").delete().eq("project_id", projectId).eq("media_type", "gallery");

  for (let index = 0; index < galleryFiles.length; index += 1) {
    const file = galleryFiles[index];
    const fileName = `gallery-${String(index + 1).padStart(2, "0")}.jpg`;
    const path = `${projectCode}/${fileName}`;

    const { error } = await supabase.storage.from("project-media").upload(path, file, {
      upsert: true,
      contentType: file.type || "image/jpeg"
    });

    if (error) throw new Error(`Upload failed for ${fileName}: ${error.message}`);

    const { data: publicUrlData } = supabase.storage.from("project-media").getPublicUrl(path);

    await supabase.from("project_media").insert({
      project_id: projectId,
      bucket: "project-media",
      path,
      media_type: "gallery",
      title: `Galeria ${index + 1}`,
      alt: `Galeria ${index + 1}`,
      sort_order: 10 + index,
      public_url: publicUrlData.publicUrl
    });
  }
}

async function uploadPrivateFiles(params: {
  supabase: ReturnType<typeof createSupabaseServiceRoleClient>;
  projectId: string;
  projectCode: string;
  formData: FormData;
}) {
  const { supabase, projectId, projectCode, formData } = params;
  if (!supabase) return;

  const files: Array<{ formKey: string; fileName: string; fileType: string; title: string }> = [
    { formKey: "documentationFile", fileName: "documentation-v1.pdf", fileType: "documentation", title: "Dokumentacja PDF" },
    { formKey: "fullPackageFile", fileName: "full-package-v1.zip", fileType: "full_package", title: "Pelna paczka ZIP" },
    { formKey: "pdfEmailPackageFile", fileName: "pdf-email-package-v1.pdf", fileType: "pdf_email_package", title: "Pakiet PDF na e-mail" }
  ];

  for (const item of files) {
    const file = formData.get(item.formKey);
    if (!isRealFile(file)) continue;

    const path = `${projectCode}/${item.fileName}`;
    const { error } = await supabase.storage.from("project-private-files").upload(path, file, {
      upsert: true,
      contentType: file.type || "application/octet-stream"
    });

    if (error) throw new Error(`Private file upload failed for ${item.fileName}: ${error.message}`);

    await supabase.from("project_files").delete().eq("project_id", projectId).eq("file_type", item.fileType);
    await supabase.from("project_files").insert({
      project_id: projectId,
      bucket: "project-private-files",
      path,
      file_type: item.fileType,
      title: item.title,
      version: "v1"
    });
  }
}

export async function updateProjectStatusAction(formData: FormData) {
  const projectId = str(formData, "projectId");
  const status = str(formData, "status");
  const slug = str(formData, "slug");

  if (!projectId) {
    redirect("/admin/projekty?status=error&reason=missing_project_id");
  }

  try {
    assertStatus(status);
  } catch {
    redirect("/admin/projekty?status=error&reason=invalid_status");
  }

  let supabase: ReturnType<typeof createSupabaseServiceRoleClient> | null = null;

  try {
    const resolved = await requireAdminAndClient();
    supabase = resolved.supabase;
  } catch (error) {
    const reason = error instanceof Error ? encodeURIComponent(error.message) : "auth_or_env_error";
    redirect(`/admin/projekty?status=error&reason=${reason}`);
  }

  if (status === "active") {
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("name, slug, price_gross, usable_area, rooms_count")
      .eq("id", projectId)
      .maybeSingle();

    if (projectError) {
      redirect(`/admin/projekty?status=error&reason=${encodeURIComponent(projectError.message)}`);
    }

    if (!project) {
      redirect("/admin/projekty?status=error&reason=Nie%20znaleziono%20projektu%20do%20publikacji");
    }

    const { mediaRows, roomRows } = await getProjectPublicationContext(supabase, projectId);
    const readiness = getProjectPublicationReadiness({
      name: String(project.name || ""),
      slug: String(project.slug || ""),
      priceGross: Number(project.price_gross || 0),
      usableArea: Number(project.usable_area || 0),
      roomsCount: Number(project.rooms_count || 0),
      media: mediaRows,
      rooms: roomRows
    });

    if (!readiness.canPublish) {
      const reason = encodeURIComponent(getProjectPublicationErrorMessage(readiness.missing));
      const missing = encodeURIComponent(
        readiness.missing.map((item) => PROJECT_PUBLICATION_MISSING_LABELS[item] || item).join(",")
      );
      redirect(`/admin/projekty?status=error&reason=${reason}&missing=${missing}`);
    }
  }

  const { error } = await supabase
    .from("projects")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", projectId);

  if (error) {
    redirect(`/admin/projekty?status=error&reason=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/projekty");
  if (slug) revalidatePath(`/projekty/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/projekty");

  redirect("/admin/projekty?status=updated");
}

export async function archiveProjectAction(formData: FormData) {
  const projectId = str(formData, "projectId");
  const slug = str(formData, "slug");

  if (!projectId) {
    redirect("/admin/projekty?status=error&reason=missing_project_id");
  }

  let supabase: ReturnType<typeof createSupabaseServiceRoleClient> | null = null;

  try {
    const resolved = await requireAdminAndClient();
    supabase = resolved.supabase;
  } catch (error) {
    const reason = error instanceof Error ? encodeURIComponent(error.message) : "auth_or_env_error";
    redirect(`/admin/projekty?status=error&reason=${reason}`);
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, slug, status")
    .eq("id", projectId)
    .maybeSingle();

  if (projectError) {
    redirect(`/admin/projekty?status=error&reason=${encodeURIComponent(projectError.message)}`);
  }

  if (!project?.id) {
    redirect("/admin/projekty?status=error&reason=Nie%20znaleziono%20projektu%20do%20archiwizacji");
  }

  if (project.status !== "archived") {
    const { error } = await supabase
      .from("projects")
      .update({ status: "archived", updated_at: new Date().toISOString() })
      .eq("id", projectId);

    if (error) {
      redirect(`/admin/projekty?status=error&reason=${encodeURIComponent(error.message)}`);
    }
  }

  const projectSlug = String(project.slug || slug || "");

  revalidatePath("/");
  revalidatePath("/projekty");
  if (projectSlug) revalidatePath(`/projekty/${projectSlug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/projekty");

  redirect("/admin/projekty?archived=1");
}


export async function deleteProjectAction(formData: FormData) {
  const projectId = str(formData, "projectId");
  const confirmationCode = str(formData, "deleteConfirmCode").toUpperCase();

  if (!projectId) throw new Error("Brak ID projektu.");

  const { supabase } = await requireAdminAndClient();

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, slug, code, name, status")
    .eq("id", projectId)
    .maybeSingle();

  if (projectError) throw new Error("Nie udalo sie pobrac projektu przed usunieciem: " + projectError.message);
  if (!project?.id) throw new Error("Nie znaleziono projektu do usuniecia.");

  const projectStatusBeforeDelete = String(project.status || "");
  if (!["archived", "draft"].includes(projectStatusBeforeDelete)) {
    redirect("/admin/projekty?status=error&reason=Najpierw%20zarchiwizuj%20projekt%20albo%20ustaw%20draft%20przed%20trwalym%20usunieciem");
  }

  const projectStatusBeforeDelete = String(project.status || "");
  if (!["archived", "draft"].includes(projectStatusBeforeDelete)) {
    redirect("/admin/projekty?status=error&reason=Najpierw%20zarchiwizuj%20projekt%20albo%20ustaw%20draft%20przed%20trwalym%20usunieciem");
  }

  const expectedCode = String(project.code || "").trim().toUpperCase();
  if (!expectedCode || confirmationCode !== expectedCode) {
    throw new Error("Wpisany kod projektu nie potwierdza usuniecia.");
  }

  const { data: mediaRows } = await supabase.from("project_media").select("bucket, path").eq("project_id", projectId);
  const { data: privateRows } = await supabase.from("project_files").select("bucket, path").eq("project_id", projectId);

  const storageGroups = new Map<string, string[]>();

  for (const row of [...(mediaRows || []), ...(privateRows || [])]) {
    const bucket = String(row.bucket || "");
    const path = String(row.path || "");
    if (!bucket || !path) continue;
    storageGroups.set(bucket, [...(storageGroups.get(bucket) || []), path]);
  }

  for (const [bucket, paths] of storageGroups) {
    if (paths.length) await supabase.storage.from(bucket).remove(paths);
  }

  const { error } = await supabase.from("projects").delete().eq("id", projectId);
  if (error) throw new Error("Nie udalo sie usunac projektu: " + error.message);

  revalidatePath("/");
  revalidatePath("/projekty");
  if (project.slug) revalidatePath(`/projekty/${project.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/projekty");

  redirect("/admin/projekty?deleted=1");
}


export async function deleteProjectMediaItemAction(formData: FormData) {
  const projectId = str(formData, "projectId");
  const mediaId = str(formData, "mediaId");
  const projectSlug = str(formData, "projectSlug");
  const projectCode = str(formData, "projectCode");
  const path = str(formData, "path");
  const bucket = str(formData, "bucket") || "project-media";

  if (!projectId || !mediaId) throw new Error("Brak danych media do usuniecia.");

  const { supabase } = await requireAdminAndClient();

  if (path) {
    await supabase.storage.from(bucket).remove([path]);
  }

  const { error } = await supabase
    .from("project_media")
    .delete()
    .eq("id", mediaId)
    .eq("project_id", projectId);

  if (error) throw new Error(`Nie udalo sie usunac media: ${error.message}`);

  revalidatePath("/");
  revalidatePath("/projekty");
  if (projectSlug) revalidatePath(`/projekty/${projectSlug}`);
  revalidatePath("/admin/projekty");
  if (projectId) revalidatePath(`/admin/projekty/${projectId}/edytuj`);

  redirect(`/admin/projekty/${projectId}/edytuj?saved=1&media_deleted=${encodeURIComponent(projectCode || "1")}`);
}

export async function setProjectMediaTypeAction(formData: FormData) {
  const projectId = str(formData, "projectId");
  const mediaId = str(formData, "mediaId");
  const targetType = str(formData, "targetType");
  const projectSlug = str(formData, "projectSlug");
  const projectCode = str(formData, "projectCode");

  if (!projectId || !mediaId) throw new Error("Brak danych media do aktualizacji typu.");
  if (!["hero", "thumbnail"].includes(targetType)) throw new Error("Nieobslugiwany typ media.");

  const { supabase } = await requireAdminAndClient();

  const { data: selectedMedia, error: selectedMediaError } = await supabase
    .from("project_media")
    .select("id, project_id")
    .eq("id", mediaId)
    .eq("project_id", projectId)
    .maybeSingle();

  if (selectedMediaError) throw new Error(`Nie udalo sie pobrac media: ${selectedMediaError.message}`);
  if (!selectedMedia) throw new Error("Nie znaleziono media do aktualizacji.");

  const { error: demoteError } = await supabase
    .from("project_media")
    .update({ media_type: "gallery" })
    .eq("project_id", projectId)
    .eq("media_type", targetType)
    .neq("id", mediaId);

  if (demoteError) throw new Error(`Nie udalo sie zwolnic typu ${targetType}: ${demoteError.message}`);

  const { error: updateError } = await supabase
    .from("project_media")
    .update({ media_type: targetType })
    .eq("id", mediaId)
    .eq("project_id", projectId);

  if (updateError) throw new Error(`Nie udalo sie ustawic typu ${targetType}: ${updateError.message}`);

  revalidatePath("/");
  revalidatePath("/projekty");
  if (projectSlug) revalidatePath(`/projekty/${projectSlug}`);
  revalidatePath("/admin/projekty");
  revalidatePath(`/admin/projekty/${projectId}/edytuj`);

  redirect(`/admin/projekty/${projectId}/edytuj?saved=1&media_updated=${encodeURIComponent(projectCode || "1")}`);
}

export async function setProjectMediaTypeBoundAction(
  projectId: string,
  projectSlug: string,
  projectCode: string,
  mediaId: string,
  targetType: string
) {
  const formData = new FormData();
  formData.set("projectId", projectId);
  formData.set("projectSlug", projectSlug);
  formData.set("projectCode", projectCode);
  formData.set("mediaId", mediaId);
  formData.set("targetType", targetType);
  return setProjectMediaTypeAction(formData);
}

export async function deleteProjectMediaItemBoundAction(
  projectId: string,
  projectSlug: string,
  projectCode: string,
  mediaId: string,
  path: string,
  bucket: string
) {
  const formData = new FormData();
  formData.set("projectId", projectId);
  formData.set("projectSlug", projectSlug);
  formData.set("projectCode", projectCode);
  formData.set("mediaId", mediaId);
  formData.set("path", path);
  formData.set("bucket", bucket);
  return deleteProjectMediaItemAction(formData);
}

export async function deleteProjectPrivateFileItemBoundAction(
  projectId: string,
  fileId: string,
  path: string,
  bucket: string
) {
  const formData = new FormData();
  formData.set("projectId", projectId);
  formData.set("fileId", fileId);
  formData.set("path", path);
  formData.set("bucket", bucket);
  return deleteProjectPrivateFileItemAction(formData);
}

export async function deleteProjectPrivateFileItemAction(formData: FormData) {
  const projectId = str(formData, "projectId");
  const fileId = str(formData, "fileId");
  const path = str(formData, "path");
  const bucket = str(formData, "bucket") || "project-private-files";

  if (!projectId || !fileId) throw new Error("Brak danych pliku prywatnego do usuniecia.");

  const { supabase } = await requireAdminAndClient();

  if (path) {
    await supabase.storage.from(bucket).remove([path]);
  }

  const { error } = await supabase
    .from("project_files")
    .delete()
    .eq("id", fileId)
    .eq("project_id", projectId);

  if (error) throw new Error(`Nie udalo sie usunac pliku prywatnego: ${error.message}`);

  revalidatePath("/admin/projekty");
  revalidatePath(`/admin/projekty/${projectId}/edytuj`);
  redirect(`/admin/projekty/${projectId}/edytuj?saved=1&private_file_deleted=1`);
}

export async function updateProjectAction(
  _prevState: UpdateProjectState,
  formData: FormData
): Promise<UpdateProjectState> {
  try {
    const projectId = str(formData, "projectId");
    const name = str(formData, "name");
    const slug = str(formData, "slug") || slugify(name);
    const status = str(formData, "status") || "draft";

    if (!projectId) throw new Error("Brak ID projektu.");
    if (!name || !slug) throw new Error("Uzupelnij nazwe i slug projektu.");
    assertStatus(status);

    const { supabase } = await requireAdminAndClient();

    const { data: duplicateSlug, error: duplicateError } = await supabase
      .from("projects")
      .select("id, code, name")
      .eq("slug", slug)
      .neq("id", projectId)
      .maybeSingle();

    if (duplicateError) throw new Error(`Nie udalo sie sprawdzic unikalnosci slug: ${duplicateError.message}`);
    if (duplicateSlug) throw new Error(`Slug jest juz uzywany przez projekt ${duplicateSlug.code || ""} ${duplicateSlug.name || ""}.`);

    const { data: oldProject } = await supabase.from("projects").select("slug, code").eq("id", projectId).maybeSingle();
    if (!oldProject?.code) throw new Error("Nie znaleziono projektu do edycji.");

    const rooms = parseJsonArray<RoomInput>(formData, "roomsJson");
    const variants = parseJsonArray<VariantInput>(formData, "variantsJson");
    const addons = parseJsonArray<AddonInput>(formData, "addonsJson");
    const relatedSlugs = parseCommaList(str(formData, "relatedSlugs"));

    const featuresRaw = str(formData, "features");
    const features = featuresRaw
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (status === "active") {
      const hasHeroUpload = isRealFile(formData.get("heroFile"));
      const hasThumbnailUpload = isRealFile(formData.get("thumbnailFile"));
      const { mediaRows, roomRows } = await getProjectPublicationContext(supabase, projectId);
      const readiness = getProjectPublicationReadiness({
        name,
        slug,
        priceGross: num(formData, "priceGross"),
        usableArea: num(formData, "usableArea"),
        roomsCount: intNum(formData, "roomsCount"),
        media: hasHeroUpload || hasThumbnailUpload ? [{ media_type: "hero" }, ...mediaRows] : mediaRows,
        rooms: rooms.length ? rooms.map((room) => ({ name: room.name })) : roomRows
      });

      if (!readiness.canPublish) {
        return { ok: false, message: getProjectPublicationErrorMessage(readiness.missing) };
      }
    }

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

    if (error) throw new Error(`Nie udalo sie zapisac zmian projektu: ${error.message}`);

    await supabase.from("project_rooms").delete().eq("project_id", projectId);
    const roomRows = rooms
      .filter((room) => room.name && String(room.name).trim())
      .map((room, index) => ({
        project_id: projectId,
        floor: room.floor || "Parter",
        number: room.number || "",
        name: room.name || "",
        area: Number(String(room.area || "0").replace(",", ".")) || 0,
        dimensions: room.dimensions || "",
        sort_order: index
      }));
    if (roomRows.length) {
      const { error: roomsError } = await supabase.from("project_rooms").insert(roomRows);
      if (roomsError) throw new Error(`Nie udalo sie zapisac pomieszczen: ${roomsError.message}`);
    }

    await supabase.from("project_variants").delete().eq("project_id", projectId);
    const variantRows = variants
      .filter((variant) => variant.name && String(variant.name).trim())
      .map((variant, index) => ({
        project_id: projectId,
        name: variant.name || "",
        price_gross: Number(String(variant.priceGross || "0").replace(",", ".")) || 0,
        active: true,
        sort_order: index
      }));
    if (variantRows.length) {
      const { error: variantsError } = await supabase.from("project_variants").insert(variantRows);
      if (variantsError) throw new Error(`Nie udalo sie zapisac wariantow: ${variantsError.message}`);
    }

    await supabase.from("project_addons").delete().eq("project_id", projectId);
    const addonRows = addons
      .filter((addon) => addon.code && addon.name)
      .map((addon, index) => ({
        project_id: projectId,
        code: String(addon.code || "").toUpperCase(),
        name: addon.name || "",
        description: addon.description || "",
        price_gross: Number(String(addon.priceGross || "0").replace(",", ".")) || 0,
        delivery_action: addon.deliveryAction || null,
        active: true,
        sort_order: index
      }));
    if (addonRows.length) {
      const { error: addonsError } = await supabase.from("project_addons").insert(addonRows);
      if (addonsError) throw new Error(`Nie udalo sie zapisac dodatkow: ${addonsError.message}`);
    }

    await uploadPublicMedia({ supabase, projectId, projectCode: oldProject.code, formData });
    await uploadPrivateFiles({ supabase, projectId, projectCode: oldProject.code, formData });

    revalidatePath("/");
    revalidatePath("/projekty");
    if (oldProject.slug) revalidatePath(`/projekty/${oldProject.slug}`);
    revalidatePath(`/projekty/${slug}`);
    revalidatePath("/admin");
    revalidatePath("/admin/projekty");
    revalidatePath(`/admin/projekty/${projectId}/edytuj`);
    redirect(`/admin/projekty?updated=${encodeURIComponent(oldProject.code)}&saved=1`);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      String((error as { digest?: unknown }).digest || "").startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Nieznany blad zapisu projektu."
    };
  }
}

export async function updateProjectBasicsAction(formData: FormData) {
  const result = await updateProjectAction({ ok: false, message: "" }, formData);

  if (!result.ok) {
    throw new Error(result.message);
  }

  const projectId = str(formData, "projectId");
  redirect(`/admin/projekty/${projectId}/edytuj?saved=1`);
}

export async function createSampleProjectAction() {
  const { admin, supabase } = await requireAdminAndClient();

  const baseSlug = "projekt-przykladowy-v22";

  const { data: existing } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", baseSlug)
    .maybeSingle();

  if (existing?.id) {
    redirect("/admin/projekty?sample=exists");
  }

  const { data: nextCode, error: codeError } = await supabase.rpc("next_project_code", {
    code_prefix: "DP"
  });

  if (codeError || !nextCode) {
    throw new Error("Nie udalo sie wygenerowac kodu dla przykladowego projektu.");
  }

  const { error } = await supabase.from("projects").insert({
    code: String(nextCode).toUpperCase(),
    short_code: String(nextCode).toUpperCase(),
    slug: baseSlug,
    name: "Projekt Przykladowy V22",
    subtitle: "Nowoczesny dom parterowy z garazem",
    description: "Przykladowy projekt do testow publicznego katalogu i karty produktu.",
    price_gross: 3590,
    badge_primary: "Nowosc",
    badge_secondary: "Best Seller",
    status: "active",
    type: "Parterowy",
    style: "Nowoczesny",
    roof: "Dwuspadowy",
    garage: "1-stanowiskowy",
    technology: "Murowana",
    usable_area: 118.4,
    building_area: 156.2,
    rooms_count: 5,
    bathrooms_count: 2,
    floors_count: 1,
    building_height: 7.6,
    min_plot_width: 21.5,
    min_plot_length: 24.1,
    features: ["Duze przeszklenia", "Strefa dzienna otwarta", "Gabinet na parterze"],
    related_slugs: [],
    created_by: admin.userId
  });

  if (error) {
    throw new Error(`Nie udalo sie utworzyc przykladowego projektu: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/projekty");
  revalidatePath("/admin");
  revalidatePath("/admin/projekty");

  redirect("/admin/projekty?sample=created");
}

