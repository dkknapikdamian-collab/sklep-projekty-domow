import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export const ADMIN_ORDER_PRIVATE_FILE_LABELS: Record<string, string> = {
  documentation: "Dokumentacja PDF",
  full_package: "Pełna paczka ZIP",
  pdf_email_package: "PDF na e-mail"
};

export type AdminOrderPrivateFile = {
  id: string;
  projectId: string;
  projectCode: string;
  projectSlug: string;
  projectName: string;
  bucket: string;
  fileType: string;
  fileLabel: string;
  title: string;
  path: string;
  version: string;
};

export type AdminOrderProjectFileRef = {
  projectCode: string;
  projectSlug: string;
  projectName: string;
};

export type AdminOrderPrivateFileLookup = Record<string, AdminOrderPrivateFile[]>;

type ProjectRow = {
  id: string;
  code: string;
  slug: string;
  name: string;
};

type PrivateFileRow = {
  id: string;
  project_id: string;
  bucket: string | null;
  file_type: string | null;
  title: string | null;
  path: string | null;
  version: string | null;
};

function unique(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function normalizeKey(value: string) {
  return value.trim().toLowerCase();
}

export function adminOrderProjectFileLookupKey(projectCode: string, projectSlug: string) {
  return `${normalizeKey(projectCode)}::${normalizeKey(projectSlug)}`;
}

export function getAdminOrderPrivateFileLabel(fileType: string, fallbackTitle = "") {
  const normalizedType = normalizeKey(fileType);
  return ADMIN_ORDER_PRIVATE_FILE_LABELS[normalizedType] || fallbackTitle || fileType || "Plik prywatny";
}

export function isPdfEmailAddon(addon: { code?: string; name?: string; deliveryAction?: string }) {
  const value = `${addon.code || ""} ${addon.name || ""} ${addon.deliveryAction || ""}`.toLowerCase();

  return (
    value.includes("send_pdf_email") ||
    value.includes("pdf_email") ||
    value.includes("pdf na e-mail") ||
    value.includes("pdf na email") ||
    (value.includes("pdf") && (value.includes("email") || value.includes("e-mail") || value.includes("mail")))
  );
}

function toProjectRow(row: Record<string, unknown>): ProjectRow | null {
  const id = String(row.id || "").trim();
  if (!id) return null;

  return {
    id,
    code: String(row.code || "").trim(),
    slug: String(row.slug || "").trim(),
    name: String(row.name || "").trim()
  };
}

function toPrivateFile(row: PrivateFileRow, project: ProjectRow): AdminOrderPrivateFile {
  const fileType = String(row.file_type || "").trim();
  const title = String(row.title || "").trim();

  return {
    id: String(row.id || ""),
    projectId: project.id,
    projectCode: project.code,
    projectSlug: project.slug,
    projectName: project.name,
    bucket: String(row.bucket || "project-private-files"),
    fileType,
    fileLabel: getAdminOrderPrivateFileLabel(fileType, title),
    title,
    path: String(row.path || ""),
    version: String(row.version || "")
  };
}

export async function getAdminOrderPrivateFilesByProjectKey(items: AdminOrderProjectFileRef[]): Promise<AdminOrderPrivateFileLookup> {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase || items.length === 0) return {};

  const codes = unique(items.map((item) => item.projectCode));
  const slugs = unique(items.map((item) => item.projectSlug));

  const projectsById = new Map<string, ProjectRow>();
  const projectsByCode = new Map<string, ProjectRow>();
  const projectsBySlug = new Map<string, ProjectRow>();

  async function collectProjectsBy(field: "code" | "slug", values: string[]) {
    if (values.length === 0) return;

    const { data, error } = await supabase
      .from("projects")
      .select("id, code, slug, name")
      .in(field, values);

    if (error) {
      console.error(`Failed to load projects for order private files by ${field}`, error);
      return;
    }

    for (const rawProject of data || []) {
      const project = toProjectRow(rawProject as Record<string, unknown>);
      if (!project) continue;
      projectsById.set(project.id, project);
      if (project.code) projectsByCode.set(normalizeKey(project.code), project);
      if (project.slug) projectsBySlug.set(normalizeKey(project.slug), project);
    }
  }

  await collectProjectsBy("code", codes);
  await collectProjectsBy("slug", slugs);

  const projectIds = Array.from(projectsById.keys());
  if (projectIds.length === 0) return {};

  const { data: fileRows, error: filesError } = await supabase
    .from("project_files")
    .select("id, project_id, bucket, file_type, title, path, version, created_at")
    .in("project_id", projectIds)
    .order("created_at", { ascending: false });

  if (filesError) {
    console.error("Failed to load project private files for admin orders", filesError);
    return {};
  }

  const filesByProjectId = new Map<string, AdminOrderPrivateFile[]>();

  for (const row of (fileRows || []) as PrivateFileRow[]) {
    const project = projectsById.get(String(row.project_id || ""));
    if (!project) continue;
    const nextFile = toPrivateFile(row, project);
    filesByProjectId.set(project.id, [...(filesByProjectId.get(project.id) || []), nextFile]);
  }

  const lookup: AdminOrderPrivateFileLookup = {};

  for (const item of items) {
    const project =
      projectsByCode.get(normalizeKey(item.projectCode)) ||
      projectsBySlug.get(normalizeKey(item.projectSlug));

    if (!project) continue;

    lookup[adminOrderProjectFileLookupKey(item.projectCode, item.projectSlug)] = filesByProjectId.get(project.id) || [];
  }

  return lookup;
}
