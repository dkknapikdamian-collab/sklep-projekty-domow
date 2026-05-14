export type ProjectPublicationReadiness = {
  canPublish: boolean;
  missing: string[];
};

type PublicationReadinessInput = {
  name?: string;
  slug?: string;
  priceGross?: number;
  usableArea?: number;
  roomsCount?: number;
  rooms?: Array<{ name?: string | null }>;
  media?: Array<{ mediaType?: string | null; media_type?: string | null }>;
};

export const PROJECT_PUBLICATION_MISSING_LABELS: Record<string, string> = {
  name: "nazwy projektu",
  slug: "slug",
  priceGross: "ceny brutto > 0",
  usableArea: "powierzchni uzytkowej",
  roomsCount: "liczby pokoi",
  mainMedia: "zdjecia glownego lub miniatury",
  projectRooms: "pomieszczen"
};

function toNumber(value: unknown) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function hasMainMedia(media: Array<{ mediaType?: string | null; media_type?: string | null }>) {
  return media.some((item) => {
    const type = String(item.mediaType ?? item.media_type ?? "").trim();
    return type === "hero" || type === "thumbnail";
  });
}

function countNamedRooms(rooms: Array<{ name?: string | null }>) {
  return rooms.filter((room) => String(room.name || "").trim().length > 0).length;
}

export function getProjectPublicationReadiness(input: PublicationReadinessInput): ProjectPublicationReadiness {
  const rooms = input.rooms || [];
  const media = input.media || [];
  const missing: string[] = [];

  if (!String(input.name || "").trim()) missing.push("name");
  if (!String(input.slug || "").trim()) missing.push("slug");
  if (toNumber(input.priceGross) <= 0) missing.push("priceGross");
  if (toNumber(input.usableArea) <= 0) missing.push("usableArea");
  if (toNumber(input.roomsCount) <= 0) missing.push("roomsCount");
  if (!hasMainMedia(media)) missing.push("mainMedia");
  if (countNamedRooms(rooms) <= 0) missing.push("projectRooms");

  return {
    canPublish: missing.length === 0,
    missing
  };
}

export function getProjectPublicationErrorMessage(missing: string[]) {
  const labels = missing.map((key) => PROJECT_PUBLICATION_MISSING_LABELS[key] || key);
  return `Nie mozna opublikowac projektu. Brakuje:\n- ${labels.join("\n- ")}`;
}
