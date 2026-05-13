export type ProjectStatus = "draft" | "active" | "hidden" | "archived";

export type ProjectPlanType = "floor_plan" | "roof_plan" | "section" | "elevation";

export type ProjectPlan = {
  title: string;
  type: ProjectPlanType;
  fileName: string;
  url?: string;
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
  dimensions?: string;
};

export type ProjectVariant = {
  name: string;
  priceGross: number;
};

export type ProjectMedia = {
  basePath: string;
  hero?: string;
  thumbnail?: string;
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
  status: ProjectStatus;
  type: string;
  style: string;
  roof: string;
  garage: string;
  technology: string;
  usableArea: number;
  buildingArea?: number;
  roomsCount: number;
  bathroomsCount: number;
  floorsCount: number;
  buildingHeight?: number;
  minPlotWidth: number;
  minPlotLength?: number;
  variants: ProjectVariant[];
  addons: ProjectAddon[];
  rooms: ProjectRoom[];
  features: string[];
  media: ProjectMedia;
  relatedSlugs: string[];
};
