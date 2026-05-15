"use client";

export type FavoriteProject = {
  projectCode: string;
  projectSlug: string;
  projectName: string;
  addedAt: string;
};

export type FavoritesPayload = {
  items: FavoriteProject[];
};

export const FAVORITES_STORAGE_KEY = "project-favorites-v1";
export const FAVORITES_UPDATED_EVENT = "project-favorites-updated";

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeFavorite(value: unknown): FavoriteProject | null {
  if (!value || typeof value !== "object") return null;
  const favorite = value as Partial<FavoriteProject>;
  const projectCode = nonEmptyString(favorite.projectCode);
  const projectSlug = nonEmptyString(favorite.projectSlug);
  const projectName = nonEmptyString(favorite.projectName);
  const addedAt = nonEmptyString(favorite.addedAt) || new Date().toISOString();

  if (!projectCode || !projectSlug || !projectName) return null;
  return { projectCode, projectSlug, projectName, addedAt };
}

function safeFavoritesPayload(value: unknown): FavoritesPayload {
  if (!value || typeof value !== "object" || !("items" in value)) return { items: [] };
  const rawItems = Array.isArray((value as { items?: unknown }).items) ? (value as { items: unknown[] }).items : [];
  const unique = new Map<string, FavoriteProject>();

  for (const item of rawItems) {
    const favorite = normalizeFavorite(item);
    if (favorite) unique.set(favorite.projectSlug, favorite);
  }

  return { items: Array.from(unique.values()) };
}

export function readFavorites(): FavoritesPayload {
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return { items: [] };
    return safeFavoritesPayload(JSON.parse(raw));
  } catch {
    return { items: [] };
  }
}

export function writeFavorites(favorites: FavoritesPayload) {
  const safeFavorites = safeFavoritesPayload(favorites);
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(safeFavorites));
  window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
}

export function isFavorite(projectSlug: string) {
  return readFavorites().items.some((item) => item.projectSlug === projectSlug);
}

export function toggleFavorite(input: Omit<FavoriteProject, "addedAt">) {
  const favorite = normalizeFavorite({ ...input, addedAt: new Date().toISOString() });
  if (!favorite) {
    throw new Error("Niepoprawny projekt ulubiony: brakuje kodu, sluga albo nazwy.");
  }

  const favorites = readFavorites();
  const exists = favorites.items.some((item) => item.projectSlug === favorite.projectSlug);
  const items = exists
    ? favorites.items.filter((item) => item.projectSlug !== favorite.projectSlug)
    : [...favorites.items, favorite];

  writeFavorites({ items });
  return !exists;
}
