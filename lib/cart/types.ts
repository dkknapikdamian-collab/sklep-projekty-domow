export type CartAddon = {
  code: string;
  name: string;
  priceGross: number;
  description?: string;
  deliveryAction?: string;
};

export type CartItem = {
  id: string;
  projectCode: string;
  projectSlug: string;
  projectName: string;
  basePriceGross: number;
  variantName: string;
  variantPriceGross: number;
  selectedAddons: CartAddon[];
  availableAddons: CartAddon[];
  addedAt: string;
};

export type CartPayload = {
  items: CartItem[];
};
