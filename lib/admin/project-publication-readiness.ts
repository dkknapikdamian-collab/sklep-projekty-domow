export type ProjectPublicationReadiness = {
  canPublish: boolean;
  missing: string[];
  missingLabels: string[];
  message: string;
};

type ProjectPublicationReadinessInput = {
  name?: string;
  slug?: string;
  priceGross?: number;
  usableArea?: number;
  roomsCount?: number;
  roomRowsCount?: number;
  hasMainMedia?: boolean;
};

export const PROJECT_PUBLICATION_MISSING_LABELS: Record<string, string> = {
  name: "nazwy projektu",
  slug: "slug",
  priceGross: "ceny brutto",
  usableArea: "powierzchni uzytkowej",
  roomsCount: "liczby pokoi",
  hasMainMedia: "zdjecia glownego lub miniatury",
  roomRowsCount: "pomieszczen"
};

function toNumber(value: unknown) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

export function getProjectPublicationReadiness(input: ProjectPublicationReadinessInput): ProjectPublicationReadiness {
  const missing: string[] = [];

  if (!String(input.name || "").trim()) missing.push("name");
  if (!String(input.slug || "").trim()) missing.push("slug");
  if (toNumber(input.priceGross) <= 0) missing.push("priceGross");
  if (toNumber(input.usableArea) <= 0) missing.push("usableArea");
  if (toNumber(input.roomsCount) <= 0) missing.push("roomsCount");
  if (!input.hasMainMedia) missing.push("hasMainMedia");
  if (toNumber(input.roomRowsCount) <= 0) missing.push("roomRowsCount");

  const missingLabels = missing.map((key) => PROJECT_PUBLICATION_MISSING_LABELS[key] || key);
  const message = missing.length
    ? `Nie mozna opublikowac projektu. Brakuje:\n- ${missingLabels.join("\n- ")}`
    : "Projekt gotowy do publikacji.";

  return {
    canPublish: missing.length === 0,
    missing,
    missingLabels,
    message
  };
}

export function getProjectPublicationErrorMessage(missing: string[]) {
  const missingLabels = missing.map((key) => PROJECT_PUBLICATION_MISSING_LABELS[key] || key);
  return `Nie mozna opublikowac projektu. Brakuje:\n- ${missingLabels.join("\n- ")}`;
}
