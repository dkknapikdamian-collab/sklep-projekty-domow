import type { Project } from "./projects";
import { PDF_EMAIL_ADDON } from "./projects";

/**
 * To jest WYŁĄCZNIE przykład struktury danych dla developera.
 * Tego pliku nie importujemy w aplikacji produkcyjnej.
 */

export const exampleProjectRecord: Project = {
  code: "DP-AUR-014",
  shortCode: "AW14",
  slug: "dom-w-aurorach-14",
  name: "TU_WPISZ_REALNA_NAZWE_PROJEKTU",
  subtitle: "TU_WPISZ_REALNY_PODTYTUL",
  description: "TU_WPISZ_REALNY_OPIS_PROJEKTU",
  priceGross: 0,
  status: "draft",
  type: "Parterowy",
  style: "Nowoczesny",
  roof: "Czterospadowy",
  garage: "2 stanowiska",
  technology: "Murowana",
  usableArea: 0,
  buildingArea: 0,
  roomsCount: 0,
  bathroomsCount: 0,
  floorsCount: 1,
  buildingHeight: 0,
  minPlotWidth: 0,
  minPlotLength: 0,
  variants: [],
  addons: [PDF_EMAIL_ADDON],
  rooms: [],
  features: [],
  media: {
    hero: "/projects/DP-AUR-014/hero.jpg",
    thumbnail: "/projects/DP-AUR-014/thumbnail.jpg",
    gallery: [
      "/projects/DP-AUR-014/gallery-01.jpg",
      "/projects/DP-AUR-014/gallery-02.jpg"
    ],
    plans: [
      {
        title: "Rzut parteru",
        type: "floor_plan",
        url: "/projects/DP-AUR-014/floor-plan-ground.jpg"
      }
    ],
    elevations: [
      {
        title: "Elewacja frontowa",
        type: "elevation",
        url: "/projects/DP-AUR-014/elevation-front.jpg"
      }
    ]
  },
  relatedSlugs: []
};
