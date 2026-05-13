export type ProjectPlan = {
  title: string;
  type: "floor_plan" | "roof_plan" | "section" | "elevation";
  url: string;
};

export type ProjectAddon = {
  code: string;
  name: string;
  priceGross: number;
  description: string;
  deliveryAction?: "send_pdf_email";
};

export type ProjectRoom = {
  floor: string;
  number: string;
  name: string;
  area: number;
  dimensions: string;
};

export type ProjectMedia = {
  hero: string;
  thumbnail: string;
  gallery: string[];
  plans: ProjectPlan[];
  elevations: ProjectPlan[];
};

export type Project = {
  code: string;
  shortCode: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  priceGross: number;
  badgePrimary?: string;
  badgeSecondary?: string;
  status: "active" | "draft" | "hidden";
  type: string;
  style: string;
  roof: string;
  garage: string;
  technology: string;
  usableArea: number;
  buildingArea: number;
  roomsCount: number;
  bathroomsCount: number;
  floorsCount: number;
  buildingHeight: number;
  minPlotWidth: number;
  minPlotLength: number;
  variants: Array<{ name: string; priceGross: number }>;
  addons: ProjectAddon[];
  rooms: ProjectRoom[];
  features: string[];
  media: ProjectMedia;
  relatedSlugs: string[];
};

const pdfAddon: ProjectAddon = {
  code: "PDF_EMAIL_PACKAGE",
  name: "Pakiet PDF na e-mail",
  priceGross: 250,
  description:
    "Dodatkowa wersja projektu w formacie PDF wysłana bezpośrednio na e-mail po zaksięgowaniu płatności. Przy dużych plikach wyślemy bezpieczny link do pobrania.",
  deliveryAction: "send_pdf_email"
};

function media(code: string): ProjectMedia {
  const base = `/projects/${code}`;
  return {
    hero: `${base}/hero.jpg`,
    thumbnail: `${base}/thumbnail.jpg`,
    gallery: [
      `${base}/gallery-01.jpg`,
      `${base}/gallery-02.jpg`,
      `${base}/gallery-03.jpg`,
      `${base}/gallery-04.jpg`
    ],
    plans: [
      { title: "Rzut parteru", type: "floor_plan", url: `${base}/floor-plan-ground.jpg` },
      { title: "Rzut dachu", type: "roof_plan", url: `${base}/floor-plan-roof.jpg` },
      { title: "Przekrój A-A", type: "section", url: `${base}/section-aa.jpg` },
      { title: "Przekrój B-B", type: "section", url: `${base}/section-bb.jpg` }
    ],
    elevations: [
      { title: "Elewacja frontowa", type: "elevation", url: `${base}/elevation-front.jpg` },
      { title: "Elewacja ogrodowa", type: "elevation", url: `${base}/elevation-garden.jpg` },
      { title: "Elewacja lewa", type: "elevation", url: `${base}/elevation-left.jpg` },
      { title: "Elewacja prawa", type: "elevation", url: `${base}/elevation-right.jpg` }
    ]
  };
}

export const projects: Project[] = [
  {
    code: "DP-AUR-014",
    shortCode: "AW14",
    slug: "dom-w-aurorach-14",
    name: "Dom w Aurorach 14",
    subtitle: "Nowoczesny dom parterowy z garażem dwustanowiskowym",
    description:
      "Dom w Aurorach 14 to nowoczesny, parterowy projekt domu z dwustanowiskowym garażem, który łączy funkcjonalność z estetyką. Przemyślany układ pomieszczeń zapewnia komfort codziennego życia dla 4–5 osobowej rodziny. Strefa dzienna to przestronny salon z jadalnią, otwarta kuchnia oraz bezpośrednie wyjście na taras.",
    priceGross: 3590,
    badgePrimary: "Nowość",
    badgeSecondary: "Bestseller",
    status: "active",
    type: "Parterowy",
    style: "Nowoczesny",
    roof: "Czterospadowy",
    garage: "2 stanowiska",
    technology: "Murowana",
    usableArea: 131.24,
    buildingArea: 172.25,
    roomsCount: 5,
    bathroomsCount: 2,
    floorsCount: 1,
    buildingHeight: 7.2,
    minPlotWidth: 22.6,
    minPlotLength: 28,
    variants: [
      { name: "Odbicie lustrzane", priceGross: 390 },
      { name: "Odbicie lustrzane + zmiany", priceGross: 690 }
    ],
    addons: [
      { code: "COST_ESTIMATE", name: "Kosztorys inwestorski", priceGross: 490, description: "Orientacyjny kosztorys inwestorski." },
      { code: "MECH_VENT", name: "Projekt wentylacji mechanicznej", priceGross: 650, description: "Dodatkowy projekt wentylacji." },
      { code: "RECUPERATION", name: "Projekt rekuperacji", priceGross: 890, description: "Dodatkowy projekt rekuperacji." },
      { code: "BUILD_BOARD", name: "Tablica budowy", priceGross: 49, description: "Tablica informacyjna budowy." },
      pdfAddon
    ],
    rooms: [
      { floor: "Parter", number: "1.01", name: "Wiatrołap", area: 4.2, dimensions: "2,10 × 2,00 m" },
      { floor: "Parter", number: "1.02", name: "Hol", area: 8.1, dimensions: "3,60 × 2,25 m" },
      { floor: "Parter", number: "1.03", name: "Salon z jadalnią", area: 32.5, dimensions: "6,20 × 5,10 m" },
      { floor: "Parter", number: "1.04", name: "Kuchnia", area: 10.8, dimensions: "3,60 × 3,00 m" },
      { floor: "Parter", number: "1.05", name: "Spiżarnia", area: 2.4, dimensions: "1,60 × 1,50 m" },
      { floor: "Parter", number: "1.06", name: "Łazienka", area: 5.6, dimensions: "2,80 × 2,00 m" },
      { floor: "Parter", number: "1.07", name: "Sypialnia", area: 13.9, dimensions: "3,80 × 3,65 m" },
      { floor: "Parter", number: "1.08", name: "Garaż", area: 34, dimensions: "6,00 × 5,65 m" }
    ],
    features: [
      "Przestronny salon z wyjściem na taras",
      "Duża kuchnia ze spiżarnią",
      "Garaż na 2 auta + kotłownia",
      "Funkcjonalny układ strefy nocnej",
      "Optymalne doświetlenie wnętrz",
      "Nowoczesna bryła i elegancka elewacja"
    ],
    media: media("DP-AUR-014"),
    relatedSlugs: ["dom-w-malinowkach-6", "dom-klejnot-29"]
  },
  {
    code: "DP-MAL-006",
    shortCode: "ML06",
    slug: "dom-w-malinowkach-6",
    name: "Dom w Malinówkach 6",
    subtitle: "Kompaktowy dom parterowy do 100 m²",
    description:
      "Dom w Malinówkach 6 to prosty, ekonomiczny projekt dla osób szukających czytelnego układu i niewielkiej powierzchni. Dobrze sprawdza się na regularnych działkach oraz jako projekt do powtarzalnej inwestycji osiedlowej.",
    priceGross: 3290,
    badgePrimary: "Nowość",
    status: "active",
    type: "Parterowy",
    style: "Minimalistyczny",
    roof: "Dwuspadowy",
    garage: "Brak",
    technology: "Murowana",
    usableArea: 98.8,
    buildingArea: 118.2,
    roomsCount: 4,
    bathroomsCount: 1,
    floorsCount: 1,
    buildingHeight: 6.8,
    minPlotWidth: 18,
    minPlotLength: 26,
    variants: [
      { name: "Odbicie lustrzane", priceGross: 290 },
      { name: "Wersja z małymi zmianami", priceGross: 590 }
    ],
    addons: [
      { code: "COST_ESTIMATE", name: "Kosztorys inwestorski", priceGross: 390, description: "Orientacyjny kosztorys inwestorski." },
      { code: "BUILD_BOARD", name: "Tablica budowy", priceGross: 49, description: "Tablica informacyjna budowy." },
      pdfAddon
    ],
    rooms: [
      { floor: "Parter", number: "1.01", name: "Wiatrołap", area: 3.9, dimensions: "2,00 × 1,95 m" },
      { floor: "Parter", number: "1.02", name: "Salon z kuchnią", area: 34.2, dimensions: "6,80 × 5,00 m" },
      { floor: "Parter", number: "1.03", name: "Pokój", area: 12.1, dimensions: "3,40 × 3,55 m" },
      { floor: "Parter", number: "1.04", name: "Pokój", area: 11.8, dimensions: "3,30 × 3,55 m" },
      { floor: "Parter", number: "1.05", name: "Sypialnia", area: 13.4, dimensions: "3,70 × 3,60 m" },
      { floor: "Parter", number: "1.06", name: "Łazienka", area: 5.2, dimensions: "2,60 × 2,00 m" }
    ],
    features: [
      "Kompaktowa powierzchnia użytkowa",
      "Prosta bryła pod tanią budowę",
      "Czytelny układ dzienny",
      "Dobra propozycja na mniejszą działkę",
      "Wygodna kuchnia otwarta",
      "Łatwe dopasowanie pod inwestycję"
    ],
    media: media("DP-MAL-006"),
    relatedSlugs: ["dom-w-aurorach-14", "dom-klejnot-29"]
  },
  {
    code: "DP-KLE-029",
    shortCode: "KL29",
    slug: "dom-klejnot-29",
    name: "Dom Klejnot 29",
    subtitle: "Rodzinny dom z poddaszem i garażem dwustanowiskowym",
    description:
      "Dom Klejnot 29 to większy projekt rodzinny z czytelnym podziałem stref. Parter pełni funkcję dzienną, a poddasze daje prywatną część nocną. To projekt dla klienta, który potrzebuje większego domu i mocniejszego efektu wizualnego.",
    priceGross: 4890,
    badgeSecondary: "Promocja",
    status: "active",
    type: "Z poddaszem",
    style: "Elegancki",
    roof: "Wielospadowy",
    garage: "2 stanowiska",
    technology: "Murowana",
    usableArea: 158.4,
    buildingArea: 146.9,
    roomsCount: 5,
    bathroomsCount: 3,
    floorsCount: 2,
    buildingHeight: 8.6,
    minPlotWidth: 24,
    minPlotLength: 30,
    variants: [
      { name: "Odbicie lustrzane", priceGross: 390 },
      { name: "Odbicie lustrzane + zmiany", priceGross: 790 }
    ],
    addons: [
      { code: "COST_ESTIMATE", name: "Kosztorys inwestorski", priceGross: 590, description: "Orientacyjny kosztorys inwestorski." },
      { code: "MECH_VENT", name: "Projekt wentylacji mechanicznej", priceGross: 650, description: "Dodatkowy projekt wentylacji." },
      { code: "RECUPERATION", name: "Projekt rekuperacji", priceGross: 890, description: "Dodatkowy projekt rekuperacji." },
      pdfAddon
    ],
    rooms: [
      { floor: "Parter", number: "1.01", name: "Wiatrołap", area: 5.2, dimensions: "2,30 × 2,25 m" },
      { floor: "Parter", number: "1.02", name: "Salon", area: 36.4, dimensions: "7,00 × 5,20 m" },
      { floor: "Parter", number: "1.03", name: "Kuchnia", area: 12.8, dimensions: "4,00 × 3,20 m" },
      { floor: "Poddasze", number: "2.01", name: "Sypialnia główna", area: 18.2, dimensions: "4,70 × 3,85 m" },
      { floor: "Poddasze", number: "2.02", name: "Pokój", area: 13.6, dimensions: "3,70 × 3,65 m" },
      { floor: "Poddasze", number: "2.03", name: "Pokój", area: 13.1, dimensions: "3,65 × 3,60 m" }
    ],
    features: [
      "Duża strefa dzienna",
      "Poddasze z prywatną częścią nocną",
      "Garaż na 2 auta",
      "Reprezentacyjna bryła",
      "Dobra propozycja dla większej rodziny",
      "Możliwość wersji premium"
    ],
    media: media("DP-KLE-029"),
    relatedSlugs: ["dom-w-aurorach-14", "dom-w-malinowkach-6"]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project) {
  return project.relatedSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((item): item is Project => Boolean(item));
}
