export type ProjectAddon = {
  code: string;
  name: string;
  description: string;
  price: number;
};

export type ProjectRoom = {
  floor: string;
  number: string;
  name: string;
  area: number;
  dimensions: string;
};

export type Project = {
  code: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  promoPrice?: number;
  type: string;
  style: string;
  roof: string;
  garage: string;
  rooms: number;
  bathrooms: number;
  floors: number;
  usableArea: number;
  buildingArea: number;
  minPlotWidth: number;
  minPlotLength: number;
  height: number;
  tags: string[];
  badge?: string;
  addons: ProjectAddon[];
  roomList: ProjectRoom[];
};

export const PDF_EMAIL_ADDON: ProjectAddon = {
  code: "PDF_EMAIL_PACKAGE",
  name: "Pakiet PDF na e-mail",
  description:
    "Dodatkowa wersja projektu w formacie PDF wysłana bezpośrednio na e-mail po zaksięgowaniu płatności. Przy dużych plikach wyślemy bezpieczny link do pobrania.",
  price: 250
};

export const projects: Project[] = [
  {
    code: "DP-AUR-014",
    slug: "dom-w-aurorach-14",
    name: "Dom w Aurorach 14",
    shortDescription: "Nowoczesny dom parterowy z dużym salonem, prostą bryłą i garażem.",
    longDescription:
      "Projekt dla osób, które chcą prostego, eleganckiego domu bez zbędnych komplikacji. Układ dzienny otwiera się na ogród, a część prywatna jest wyraźnie oddzielona od strefy wejściowej.",
    price: 4290,
    type: "Parterowy",
    style: "Nowoczesny",
    roof: "Dwuspadowy",
    garage: "1 stanowisko",
    rooms: 4,
    bathrooms: 2,
    floors: 1,
    usableArea: 104.6,
    buildingArea: 132.4,
    minPlotWidth: 20,
    minPlotLength: 28,
    height: 7.2,
    tags: ["parterowy", "nowoczesny", "garaż", "100m2", "działka 20x28"],
    badge: "Bestseller",
    addons: [PDF_EMAIL_ADDON],
    roomList: [
      { floor: "Parter", number: "1.01", name: "Wiatrołap", area: 4.2, dimensions: "2,10 × 2,00 m" },
      { floor: "Parter", number: "1.02", name: "Hol", area: 8.1, dimensions: "3,60 × 2,25 m" },
      { floor: "Parter", number: "1.03", name: "Salon z jadalnią", area: 32.5, dimensions: "6,20 × 5,10 m" },
      { floor: "Parter", number: "1.04", name: "Kuchnia", area: 10.8, dimensions: "3,60 × 3,00 m" },
      { floor: "Parter", number: "1.05", name: "Spiżarnia", area: 2.4, dimensions: "1,60 × 1,50 m" },
      { floor: "Parter", number: "1.06", name: "Łazienka", area: 5.6, dimensions: "2,80 × 2,00 m" },
      { floor: "Parter", number: "1.07", name: "Sypialnia", area: 13.9, dimensions: "3,80 × 3,65 m" },
      { floor: "Parter", number: "1.08", name: "Garaż", area: 18.4, dimensions: "3,20 × 5,75 m" }
    ]
  },
  {
    code: "DP-MAL-006",
    slug: "dom-w-malinowkach-6",
    name: "Dom w Malinówkach 6",
    shortDescription: "Kompaktowy dom około 100 m² z trzema pokojami i czytelną strefą dzienną.",
    longDescription:
      "Prosty projekt pod inwestycję lub rodzinne osiedle. Bryła jest oszczędna, łatwa do powielenia i dobrze nadaje się pod działki o regularnych wymiarach.",
    price: 3890,
    type: "Parterowy",
    style: "Minimalistyczny",
    roof: "Dwuspadowy",
    garage: "Brak",
    rooms: 3,
    bathrooms: 1,
    floors: 1,
    usableArea: 98.8,
    buildingArea: 118.2,
    minPlotWidth: 18,
    minPlotLength: 26,
    height: 6.8,
    tags: ["100m2", "parterowy", "bez garażu", "osiedle", "działka 18x26"],
    badge: "Nowość",
    addons: [PDF_EMAIL_ADDON],
    roomList: [
      { floor: "Parter", number: "1.01", name: "Wiatrołap", area: 3.9, dimensions: "2,00 × 1,95 m" },
      { floor: "Parter", number: "1.02", name: "Salon z kuchnią", area: 34.2, dimensions: "6,80 × 5,00 m" },
      { floor: "Parter", number: "1.03", name: "Pokój", area: 12.1, dimensions: "3,40 × 3,55 m" },
      { floor: "Parter", number: "1.04", name: "Pokój", area: 11.8, dimensions: "3,30 × 3,55 m" },
      { floor: "Parter", number: "1.05", name: "Sypialnia", area: 13.4, dimensions: "3,70 × 3,60 m" },
      { floor: "Parter", number: "1.06", name: "Łazienka", area: 5.2, dimensions: "2,60 × 2,00 m" }
    ]
  },
  {
    code: "DP-KLE-029",
    slug: "dom-klejnot-29",
    name: "Dom Klejnot 29",
    shortDescription: "Elegancki dom z poddaszem, garażem dwustanowiskowym i dużą strefą nocną.",
    longDescription:
      "Projekt dla większej rodziny. Parter jest reprezentacyjny, a poddasze daje prywatną strefę sypialnianą z wygodnym układem pomieszczeń.",
    price: 5190,
    promoPrice: 4890,
    type: "Z poddaszem",
    style: "Elegancki",
    roof: "Wielospadowy",
    garage: "2 stanowiska",
    rooms: 5,
    bathrooms: 3,
    floors: 2,
    usableArea: 158.4,
    buildingArea: 146.9,
    minPlotWidth: 24,
    minPlotLength: 30,
    height: 8.6,
    tags: ["poddasze", "garaż 2", "rodzinny", "160m2", "działka 24x30"],
    badge: "Promocja",
    addons: [PDF_EMAIL_ADDON],
    roomList: [
      { floor: "Parter", number: "1.01", name: "Wiatrołap", area: 5.2, dimensions: "2,30 × 2,25 m" },
      { floor: "Parter", number: "1.02", name: "Salon", area: 36.4, dimensions: "7,00 × 5,20 m" },
      { floor: "Parter", number: "1.03", name: "Kuchnia", area: 12.8, dimensions: "4,00 × 3,20 m" },
      { floor: "Poddasze", number: "2.01", name: "Sypialnia główna", area: 18.2, dimensions: "4,70 × 3,85 m" },
      { floor: "Poddasze", number: "2.02", name: "Pokój", area: 13.6, dimensions: "3,70 × 3,65 m" },
      { floor: "Poddasze", number: "2.03", name: "Pokój", area: 13.1, dimensions: "3,65 × 3,60 m" }
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
