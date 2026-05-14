"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getProjectPublicationErrorMessage, getProjectPublicationReadiness } from "@/lib/admin/project-publication-readiness";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export type CreateProjectState = {
  ok: boolean;
  message: string;
  existingProjectHref?: string;
  existingProjectLabel?: string;
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

function isRealFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0 && value.name !== "";
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

async function generateProjectCode(supabase: ReturnType<typeof createSupabaseServiceRoleClient>) {
  if (!supabase) {
    throw new Error("Brak klienta Supabase do wygenerowania kodu projektu.");
  }

  const { data, error } = await supabase.rpc("next_project_code", {
    code_prefix: "DP"
  });

  if (error || !data) {
    throw new Error(
      "Nie udało się wygenerować kodu projektu. Uruchom migrację 0012_project_code_generation.sql w Supabase."
    );
  }

  return String(data).toUpperCase();
}

async function uploadPublicMedia(params: {
  supabase: ReturnType<typeof createSupabaseServiceRoleClient>;
  projectId: string;
  projectCode: string;
  formData: FormData;
}) {
  const { supabase, projectId, projectCode, formData } = params;

  if (!supabase) return;

  const uploads: Array<{
    formKey: string;
    fileName: string;
    mediaType: string;
    title: string;
    sortOrder: number;
  }> = [
    { formKey: "heroFile", fileName: "hero.jpg", mediaType: "hero", title: "Hero", sortOrder: 1 },
    { formKey: "thumbnailFile", fileName: "thumbnail.jpg", mediaType: "thumbnail", title: "Miniatura", sortOrder: 2 },
    { formKey: "floorPlanGroundFile", fileName: "floor-plan-ground.jpg", mediaType: "floor_plan", title: "Rzut parteru", sortOrder: 100 },
    { formKey: "floorPlanRoofFile", fileName: "floor-plan-roof.jpg", mediaType: "roof_plan", title: "Rzut dachu", sortOrder: 110 },
    { formKey: "sectionAaFile", fileName: "section-aa.jpg", mediaType: "section", title: "Przekrój A-A", sortOrder: 120 },
    { formKey: "sectionBbFile", fileName: "section-bb.jpg", mediaType: "section", title: "Przekrój B-B", sortOrder: 130 },
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

    if (error) {
      throw new Error(`Upload failed for ${upload.fileName}: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage.from("project-media").getPublicUrl(path);

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

  for (let index = 0; index < galleryFiles.length; index += 1) {
    const file = galleryFiles[index];
    const fileName = `gallery-${String(index + 1).padStart(2, "0")}.jpg`;
    const path = `${projectCode}/${fileName}`;

    const { error } = await supabase.storage.from("project-media").upload(path, file, {
      upsert: true,
      contentType: file.type || "image/jpeg"
    });

    if (error) {
      throw new Error(`Upload failed for ${fileName}: ${error.message}`);
    }

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
    { formKey: "fullPackageFile", fileName: "full-package-v1.zip", fileType: "full_package", title: "Pełna paczka ZIP" },
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

    if (error) {
      throw new Error(`Private file upload failed for ${item.fileName}: ${error.message}`);
    }

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

function duplicateState(kind: "code" | "slug", existing: { code?: string; slug?: string; name?: string; status?: string }) {
  const label = existing.code && existing.name ? `${existing.code} — ${existing.name}` : existing.name || existing.code || "Istniejący projekt";
  const href = existing.status === "active" && existing.slug ? `/projekty/${existing.slug}` : "/admin/projekty";

  return {
    ok: false,
    message:
      kind === "code"
        ? `Projekt o kodzie ${existing.code} już istnieje. Nie można dodać drugiego projektu z tym samym kodem.`
        : `Projekt o adresie/slug ${existing.slug} już istnieje. Zmień nazwę lub slug, albo przejdź do istniejącego projektu.`,
    existingProjectHref: href,
    existingProjectLabel: label
  };
}

export async function createProjectAction(
  _prevState: CreateProjectState,
  formData: FormData
): Promise<CreateProjectState> {
  const admin = await getAdminSession();

  if (!admin.ok) {
    return {
      ok: false,
      message: `Brak dostępu admina: ${admin.reason}`
    };
  }

  const supabase = createSupabaseServiceRoleClient();

  if (!supabase) {
    return {
      ok: false,
      message: "Brak SUPABASE_SERVICE_ROLE_KEY albo env Supabase."
    };
  }

  const name = str(formData, "name");
  const slug = str(formData, "slug") || slugify(name);
  const status = str(formData, "status") || "draft";

  if (!name || !slug) {
    return {
      ok: false,
      message: "Uzupełnij minimum: nazwę i slug. Kod projektu wygeneruje się automatycznie."
    };
  }

  if (!["draft", "active", "hidden", "archived"].includes(status)) {
    return {
      ok: false,
      message: "Niepoprawny status projektu."
    };
  }

  const { data: existingSlugProject, error: existingSlugError } = await supabase
    .from("projects")
    .select("id, code, name, slug, status")
    .eq("slug", slug)
    .maybeSingle();

  if (existingSlugError) {
    return {
      ok: false,
      message: `Nie udało się sprawdzić unikalności slug: ${existingSlugError.message}`
    };
  }

  if (existingSlugProject) {
    return duplicateState("slug", existingSlugProject);
  }

  let code = "";

  try {
    code = await generateProjectCode(supabase);
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Nie udało się wygenerować kodu projektu. Sprawdź migrację 0012_project_code_generation.sql w Supabase."
    };
  }

  const { data: existingCodeProject, error: existingCodeError } = await supabase
    .from("projects")
    .select("id, code, name, slug, status")
    .eq("code", code)
    .maybeSingle();

  if (existingCodeError) {
    return {
      ok: false,
      message: `Nie udało się sprawdzić unikalności kodu: ${existingCodeError.message}`
    };
  }

  if (existingCodeProject) {
    return duplicateState("code", existingCodeProject);
  }

  const features = str(formData, "features")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const relatedSlugs = str(formData, "relatedSlugs")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const rooms = parseJsonArray<RoomInput>(formData, "roomsJson");
  const variants = parseJsonArray<VariantInput>(formData, "variantsJson");
  const addons = parseJsonArray<AddonInput>(formData, "addonsJson");

  if (status === "active") {
    const hasHeroUpload = isRealFile(formData.get("heroFile"));
    const hasThumbnailUpload = isRealFile(formData.get("thumbnailFile"));
    const readiness = getProjectPublicationReadiness({
      name,
      slug,
      priceGross: num(formData, "priceGross"),
      usableArea: num(formData, "usableArea"),
      roomsCount: intNum(formData, "roomsCount"),
      media: hasHeroUpload || hasThumbnailUpload ? [{ media_type: "hero" }] : [],
      rooms: rooms.map((room) => ({ name: room.name }))
    });

    if (!readiness.canPublish) {
      return {
        ok: false,
        message: getProjectPublicationErrorMessage(readiness.missing)
      };
    }
  }

  try {
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        code,
        short_code: str(formData, "shortCode") || code,
        slug,
        name,
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
        created_by: admin.userId
      })
      .select("id")
      .single();

    if (projectError || !project) {
      if (projectError?.code === "23505") {
        return {
          ok: false,
          message: "Projekt o takim kodzie lub slug już istnieje. Zmień slug albo sprawdź listę projektów.",
          existingProjectHref: "/admin/projekty",
          existingProjectLabel: "Przejdź do listy projektów"
        };
      }

      return {
        ok: false,
        message: projectError?.message || "Nie udało się utworzyć projektu."
      };
    }

    const projectId = project.id as string;

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
      const { error } = await supabase.from("project_rooms").insert(roomRows);
      if (error) throw new Error(error.message);
    }

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
      const { error } = await supabase.from("project_variants").insert(variantRows);
      if (error) throw new Error(error.message);
    }

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
      const { error } = await supabase.from("project_addons").insert(addonRows);
      if (error) throw new Error(error.message);
    }

    await uploadPublicMedia({ supabase, projectId, projectCode: code, formData });
    await uploadPrivateFiles({ supabase, projectId, projectCode: code, formData });

    revalidatePath("/");
    revalidatePath("/projekty");
    revalidatePath(`/projekty/${slug}`);
    revalidatePath("/admin");
    revalidatePath("/admin/projekty");
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Nieznany błąd zapisu projektu."
    };
  }

  redirect(`/admin/projekty?created=${encodeURIComponent(code)}`);
}
