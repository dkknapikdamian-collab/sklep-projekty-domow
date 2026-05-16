import type { SupabaseClient } from "@supabase/supabase-js";
import type { CartAddon, CartItem, CartPayload } from "@/lib/cart/types";

const CART_PRICE_CHANGED_MESSAGE = "Cena projektu lub dodatków zmieniła się. Odśwież koszyk.";

type DbProjectForOrder = {
  id: string;
  code: string;
  slug: string;
  name: string;
  price_gross: number | string | null;
  status: string | null;
};

type DbProjectAddonForOrder = {
  code: string;
  name: string;
  description: string | null;
  price_gross: number | string | null;
  delivery_action: string | null;
  active: boolean | null;
};

type DbProjectVariantForOrder = {
  name: string;
  price_gross: number | string | null;
  active: boolean | null;
};

function moneyNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return 0;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function cents(value: number | string | null | undefined) {
  return Math.round(moneyNumber(value) * 100);
}

function assertSamePrice(cartValue: number, dbValue: number | string | null | undefined) {
  if (cents(cartValue) !== cents(dbValue)) {
    throw new Error(CART_PRICE_CHANGED_MESSAGE);
  }
}

function normalizeName(value: string) {
  return value.trim().toLocaleLowerCase("pl-PL");
}

function isBaseVariant(item: CartItem) {
  return normalizeName(item.variantName) === normalizeName("Projekt podstawowy") && cents(item.variantPriceGross) === 0;
}

async function loadProjectForCartItem(supabase: SupabaseClient, item: CartItem): Promise<DbProjectForOrder> {
  const select = "id,code,slug,name,price_gross,status";
  const byCode = item.projectCode
    ? await supabase.from("projects").select(select).eq("code", item.projectCode).maybeSingle()
    : { data: null, error: null };

  if (byCode.error) throw new Error(CART_PRICE_CHANGED_MESSAGE);
  if (byCode.data) return byCode.data as DbProjectForOrder;

  const bySlug = item.projectSlug
    ? await supabase.from("projects").select(select).eq("slug", item.projectSlug).maybeSingle()
    : { data: null, error: null };

  if (bySlug.error || !bySlug.data) throw new Error(CART_PRICE_CHANGED_MESSAGE);
  return bySlug.data as DbProjectForOrder;
}

async function loadActiveAddonsForProject(supabase: SupabaseClient, projectId: string): Promise<DbProjectAddonForOrder[]> {
  const { data, error } = await supabase
    .from("project_addons")
    .select("code,name,description,price_gross,delivery_action,active")
    .eq("project_id", projectId)
    .eq("active", true);

  if (error) throw new Error(CART_PRICE_CHANGED_MESSAGE);
  return (data || []) as DbProjectAddonForOrder[];
}

async function loadActiveVariantsForProject(supabase: SupabaseClient, projectId: string): Promise<DbProjectVariantForOrder[]> {
  const { data, error } = await supabase
    .from("project_variants")
    .select("name,price_gross,active")
    .eq("project_id", projectId)
    .eq("active", true);

  if (error) throw new Error(CART_PRICE_CHANGED_MESSAGE);
  return (data || []) as DbProjectVariantForOrder[];
}

function validateVariantFromDb(item: CartItem, variants: DbProjectVariantForOrder[]) {
  if (isBaseVariant(item)) {
    return {
      variantName: "Projekt podstawowy",
      variantPriceGross: 0
    };
  }

  const variant = variants.find((candidate) => normalizeName(candidate.name) === normalizeName(item.variantName));
  if (!variant || variant.active === false) throw new Error(CART_PRICE_CHANGED_MESSAGE);
  assertSamePrice(item.variantPriceGross, variant.price_gross);

  return {
    variantName: variant.name,
    variantPriceGross: moneyNumber(variant.price_gross)
  };
}

function validateAddonsFromDb(item: CartItem, addons: DbProjectAddonForOrder[]): CartAddon[] {
  return item.selectedAddons.map((selectedAddon) => {
    const addon = addons.find((candidate) => candidate.code === selectedAddon.code);
    if (!addon || addon.active === false) throw new Error(CART_PRICE_CHANGED_MESSAGE);
    assertSamePrice(selectedAddon.priceGross, addon.price_gross);

    return {
      code: addon.code,
      name: addon.name,
      description: addon.description || "",
      priceGross: moneyNumber(addon.price_gross),
      deliveryAction: addon.delivery_action || undefined
    };
  });
}

export async function validateCartAgainstDb(supabase: SupabaseClient, cart: CartPayload): Promise<CartPayload> {
  const items: CartItem[] = [];

  for (const item of cart.items) {
    const project = await loadProjectForCartItem(supabase, item);
    if (project.status !== "active") throw new Error(CART_PRICE_CHANGED_MESSAGE);
    assertSamePrice(item.basePriceGross, project.price_gross);

    const [addons, variants] = await Promise.all([
      loadActiveAddonsForProject(supabase, project.id),
      loadActiveVariantsForProject(supabase, project.id)
    ]);

    const validatedVariant = validateVariantFromDb(item, variants);
    const selectedAddons = validateAddonsFromDb(item, addons);
    const availableAddons: CartAddon[] = addons.map((addon) => ({
      code: addon.code,
      name: addon.name,
      description: addon.description || "",
      priceGross: moneyNumber(addon.price_gross),
      deliveryAction: addon.delivery_action || undefined
    }));

    items.push({
      ...item,
      projectCode: project.code,
      projectSlug: project.slug,
      projectName: project.name,
      basePriceGross: moneyNumber(project.price_gross),
      variantName: validatedVariant.variantName,
      variantPriceGross: validatedVariant.variantPriceGross,
      selectedAddons,
      availableAddons
    });
  }

  return { items };
}

export { CART_PRICE_CHANGED_MESSAGE };
