import { ProjectDetailPage } from "@/components/project/ProjectDetailPage";
import { PDF_EMAIL_ADDON } from "@/lib/projects";
import type { Project } from "@/types/project";

const previewProject: Project = {
  code: "DP-PREVIEW",
  shortCode: "PV01",
  slug: "podglad-projektu",
  name: "Podgląd projektu roboczego",
  subtitle: "To jest podgląd szablonu, nie publiczna oferta",
  description:
    "Ten ekran służy wyłącznie do oceny wyglądu karty projektu w panelu admina. Po dodaniu realnego projektu dane, zdjęcia, rzuty, cena i parametry będą podstawiane z panelu admina albo z lokalnego źródła danych.",
  priceGross: 0,
  badgePrimary: "Draft",
  status: "draft",
  type: "Parterowy",
  style: "Nowoczesny",
  roof: "Do uzupełnienia",
  garage: "Do uzupełnienia",
  technology: "Do uzupełnienia",
  usableArea: 0,
  buildingArea: 0,
  roomsCount: 0,
  bathroomsCount: 0,
  floorsCount: 1,
  buildingHeight: 0,
  minPlotWidth: 0,
  minPlotLength: 0,
  variants: [
    { name: "Odbicie lustrzane", priceGross: 0 },
    { name: "Zmiany w projekcie", priceGross: 0 }
  ],
  addons: [PDF_EMAIL_ADDON],
  rooms: [],
  features: [
    "Cechy projektu pojawią się po uzupełnieniu danych",
    "Rzuty pojawią się po dodaniu plików",
    "Zdjęcia pojawią się po uploadzie mediów",
    "Parametry będą czytane z danych projektu"
  ],
  media: {
    basePath: "/projects/DP-PREVIEW",
    gallery: [],
    plans: [],
    elevations: []
  },
  relatedSlugs: []
};

export default function AdminProjectPreviewPage() {
  return <ProjectDetailPage project={previewProject} />;
}
