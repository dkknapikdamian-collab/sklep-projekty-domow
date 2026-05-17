import { isProjectFileActive, isProjectFileRequiredForPublication, normalizeProjectFileType } from "@/lib/admin/project-files-model";

export type ProjectPublicationReadinessCheck = { key: string; label: string; ok: boolean; help: string };
export type ProjectPublicationReadiness = { canPublish: boolean; missing: string[]; checks: ProjectPublicationReadinessCheck[] };

type PublicationReadinessInput = {
  name?: string;
  slug?: string;
  code?: string;
  description?: string;
  priceGross?: number;
  usableArea?: number;
  roomsCount?: number;
  baseVariantConfirmed?: boolean;
  rooms?: Array<{ name?: string | null }>;
  media?: Array<{ mediaType?: string | null; media_type?: string | null }>;
  variants?: Array<{ name?: string | null; active?: boolean | null }>;
  privateFiles?: Array<{ fileType?: string | null; file_type?: string | null; path?: string | null; active?: boolean | null; required_for_publication?: boolean | null; requiredForPublication?: boolean | null }>;
};

export const PROJECT_PUBLICATION_MISSING_LABELS: Record<string, string> = {
  name: "nazwy projektu",
  slug: "slug",
  code: "kodu projektu",
  priceGross: "ceny brutto > 0",
  usableArea: "powierzchni uzytkowej > 0",
  roomsCount: "liczby pokoi > 0",
  description: "jasnego opisu sprzedażowego",
  hero: "zdjęcia hero",
  thumbnail: "miniatury katalogowej",
  floorPlan: "minimum jednego rzutu",
  privateDocumentation: "prywatnego pliku dokumentacji PDF",
  salesVariant: "wariantu albo potwierdzonego projektu podstawowego",
  projectRooms: "pomieszczeń"
};

function toNumber(value: unknown) { const numeric = Number(value); return Number.isFinite(numeric) ? numeric : 0; }
function normalizedType(item: { mediaType?: string | null; media_type?: string | null }) { return String(item.mediaType ?? item.media_type ?? "").trim(); }
function normalizedFileType(item: { fileType?: string | null; file_type?: string | null; path?: string | null }) { return normalizeProjectFileType(String(item.fileType ?? item.file_type ?? "")); }
function hasMediaType(media: Array<{ mediaType?: string | null; media_type?: string | null }>, expected: string) { return media.some((item) => normalizedType(item) === expected); }
function hasAnyPlan(media: Array<{ mediaType?: string | null; media_type?: string | null }>) { return media.some((item) => ["floor_plan", "roof_plan"].includes(normalizedType(item))); }
function countNamedRooms(rooms: Array<{ name?: string | null }>) { return rooms.filter((room) => String(room.name || "").trim().length > 0).length; }
function hasDocumentationPrivateFile(files: NonNullable<PublicationReadinessInput["privateFiles"]>) {
  return files.some((file) => {
    if (!isProjectFileActive(file)) return false;
    const type = normalizedFileType(file);
    const filePath = String(file.path || "").toLowerCase();
    return type === "documentation" || (type === "pdf" && filePath.endsWith(".pdf"));
  });
}
function hasRequiredPublicationPrivateFiles(files: NonNullable<PublicationReadinessInput["privateFiles"]>) {
  const activeFiles = files.filter(isProjectFileActive);
  const requiredFiles = activeFiles.filter(isProjectFileRequiredForPublication);
  if (requiredFiles.length === 0) return hasDocumentationPrivateFile(activeFiles);
  return requiredFiles.every((file) => String(file.path || "").trim().length > 0);
}
function hasSalesVariant(input: PublicationReadinessInput) {
  const activeVariants = (input.variants || []).filter((variant) => {
    if (variant.active === false) return false;
    return String(variant.name || "").trim().length > 0;
  });
  return activeVariants.length > 0 || input.baseVariantConfirmed === true;
}
function shouldCheck(value: unknown) { return value !== undefined; }

export function getProjectPublicationReadiness(input: PublicationReadinessInput): ProjectPublicationReadiness {
  const rooms = input.rooms || [];
  const media = input.media || [];
  const privateFiles = input.privateFiles || [];
  const checks: ProjectPublicationReadinessCheck[] = [];
  function addCheck(key: string, ok: boolean, help: string) { checks.push({ key, label: PROJECT_PUBLICATION_MISSING_LABELS[key] || key, ok, help }); }

  addCheck("name", String(input.name || "").trim().length > 0, "Uzupełnij nazwę projektu.");
  addCheck("slug", String(input.slug || "").trim().length > 0, "Uzupełnij slug/adres projektu.");
  if (shouldCheck(input.code)) addCheck("code", String(input.code || "").trim().length > 0, "Projekt musi mieć kod sprzedażowy.");
  addCheck("priceGross", toNumber(input.priceGross) > 0, "Cena musi być większa od zera.");
  addCheck("usableArea", toNumber(input.usableArea) > 0, "Metraż użytkowy musi być większy od zera.");
  addCheck("roomsCount", toNumber(input.roomsCount) > 0, "Liczba pokoi musi być większa od zera.");
  if (shouldCheck(input.description)) addCheck("description", String(input.description || "").trim().length >= 20, "Dodaj jasny opis sprzedażowy, nie pustą etykietę.");
  addCheck("hero", hasMediaType(media, "hero"), "Dodaj zdjęcie hero.");
  addCheck("thumbnail", hasMediaType(media, "thumbnail"), "Dodaj miniaturę katalogową.");
  addCheck("floorPlan", hasAnyPlan(media), "Dodaj minimum jeden rzut projektu.");
  if (shouldCheck(input.privateFiles)) addCheck("privateDocumentation", hasRequiredPublicationPrivateFiles(privateFiles), "Dodaj aktywny prywatny plik wymagany do publikacji albo nie aktywuj projektu.");
  if (shouldCheck(input.variants) || shouldCheck(input.baseVariantConfirmed)) addCheck("salesVariant", hasSalesVariant(input), "Dodaj wariant albo potwierdź sprzedaż projektu podstawowego.");
  addCheck("projectRooms", countNamedRooms(rooms) > 0, "Dodaj przynajmniej jedno nazwane pomieszczenie.");
  const missing = checks.filter((check) => !check.ok).map((check) => check.key);
  return { canPublish: missing.length === 0, missing, checks };
}

export function getProjectPublicationErrorMessage(missing: string[]) {
  const labels = missing.map((key) => PROJECT_PUBLICATION_MISSING_LABELS[key] || key);
  return `Nie mozna opublikowac projektu. Brakuje:\n- ${labels.join("\n- ")}`;
}
