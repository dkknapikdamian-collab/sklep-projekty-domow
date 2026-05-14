"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
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

function toNumber(value: unknown) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
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

const PUBLICATION_MISSING_LABELS: Record<string, string> = {
  name: "nazwy projektu",
  slug: "slug",
  price: "ceny > 0",
  usable_area: "powierzchni uzytkowej > 0",
  rooms_count: "liczby pokoi > 0",
  media_main: "zdjecia glownego (hero albo thumbnail)",
  rooms_table: "tabeli pomieszczen"
};

type PublicationValidationPayload = {
  name?: string;
  slug?: string;
  priceGross?: number;
  usableArea?: number;
  roomsCount?: number;
  roomRowsCount?: number;
  hasMainMedia?: boolean;
};

function buildPublicationErrorMessage(missing: string[]) {
  const lines = missing.map((key) => `- ${PUBLICATION_MISSING_LABELS[key] || key}`);
  return `Nie mozna opublikowac projektu. Brakuje:\n${lines.join("\n")}`;
}

async function validateProjectPublication(params: {
  supabase: NonNullable<ReturnType<typeof createSupabaseServiceRoleClient>>;
  projectId: string;
  payload?: PublicationValidationPayload;
}) {
  const { supabase, projectId, payload } = params;

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("name, slug, price_gross, usable_area, rooms_count")
    .eq("id", projectId)
    .maybeSingle();

  if (projectError) {
    throw new Error(`Nie udalo sie sprawdzic danych publikacji: ${projectError.message}`);
  }

  if (!project) {
    throw new Error("Nie znaleziono projektu do publikacji.");
  }

  const { count: roomsCountDb, error: roomsCountError } = await supabase
    .from("project_rooms")
    .select("id", { count: "exact", head: true })
    .eq("project_id", projectId);

  if (roomsCountError) {
    throw new Error(`Nie udalo sie sprawdzic tabeli pomieszczen: ${roomsCountError.message}`);
  }

  const { data: mediaRows, error: mediaError } = await supabase
    .from("project_media")
    .select("media_type")
    .eq("project_id", projectId);

  if (mediaError) {
    throw new Error(`Nie udalo sie sprawdzic mediow projektu: ${mediaError.message}`);
  }

  const hasMainMediaInDb = (mediaRows || []).some((item) => {
    const type = String(item.media_type || "");
    return type === "hero" || type === "thumbnail";
  });

  const finalName = (payload?.name ?? String(project.name || "")).trim();
  const finalSlug = (payload?.slug ?? String(project.slug || "")).trim();
  const finalPrice = payload?.priceGross ?? toNumber(project.price_gross);
  const finalUsableArea = payload?.usableArea ?? toNumber(project.usable_area);
  const finalRoomsCount = payload?.roomsCount ?? toNumber(project.rooms_count);
  const finalRoomRowsCount = payload?.roomRowsCount ?? toNumber(roomsCountDb);
  const finalHasMainMedia = payload?.hasMainMedia ?? hasMainMediaInDb;

  const missing: string[] = [];
  if (!finalName) missing.push("name");
  if (!finalSlug) missing.push("slug");
  if (finalPrice <= 0) missing.push("price");
  if (finalUsableArea <= 0) missing.push("usable_area");
  if (finalRoomsCount <= 0) missing.push("rooms_count");
  if (!finalHasMainMedia) missing.push("media_main");
  if (finalRoomRowsCount <= 0) missing.push("rooms_table");

  return {
    ok: missing.length === 0,
    missing,
    message: missing.length ? buildPublicationErrorMessage(missing) : ""
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
    const publication = await validateProjectPublication({
      supabase,
      projectId
    });

    if (!publication.ok) {
      const reason = encodeURIComponent(publication.message);
      const missing = encodeURIComponent(
        publication.missing.map((item) => PUBLICATION_MISSING_LABELS[item] || item).join(",")
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

export async function deleteProjectAction(formData: FormData) {
  const projectId = str(formData, "projectId");
  if (!projectId) throw new Error("Brak ID projektu.");

  const { supabase } = await requireAdminAndClient();

  const { data: project } = await supabase.from("projects").select("slug, code").eq("id", projectId).maybeSingle();
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
  if (error) throw new Error(`Nie udalo sie usunac projektu: ${error.message}`);

  revalidatePath("/");
  revalidatePath("/projekty");
  if (project?.slug) revalidatePath(`/projekty/${project.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/projekty");

  redirect("/admin/projekty?deleted=1");
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
      const roomRowsCount = rooms.filter((room) => room.name && String(room.name).trim()).length;
      const hasHeroUpload = isRealFile(formData.get("heroFile"));
      const hasThumbnailUpload = isRealFile(formData.get("thumbnailFile"));

      const publication = await validateProjectPublication({
        supabase,
        projectId,
        payload: {
          name,
          slug,
          priceGross: num(formData, "priceGross"),
          usableArea: num(formData, "usableArea"),
          roomsCount: intNum(formData, "roomsCount"),
          roomRowsCount,
          hasMainMedia: hasHeroUpload || hasThumbnailUpload
        }
      });

      if (!publication.ok) {
        return { ok: false, message: publication.message };
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

    return { ok: true, message: "Zapisano projekt i wszystkie powiazane dane." };
  } catch (error) {
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

