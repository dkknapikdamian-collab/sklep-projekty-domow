import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import type { CartPayload } from "@/lib/cart/types";

export type CreateOrderInput = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  invoiceData?: string;
  notes?: string;
  termsConsent: boolean;
  contactConsent: boolean;
  cart: CartPayload;
};

export function orderTotal(cart: CartPayload) {
  return cart.items.reduce((sum, item) => {
    const addonsTotal = item.selectedAddons.reduce((addonSum, addon) => addonSum + addon.priceGross, 0);
    return sum + item.basePriceGross + item.variantPriceGross + addonsTotal;
  }, 0);
}

export async function createOrder(input: CreateOrderInput) {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) throw new Error("Brak SUPABASE_SERVICE_ROLE_KEY albo env Supabase.");
  if (input.cart.items.length === 0) throw new Error("Koszyk jest pusty.");

  const totalGross = orderTotal(input.cart);
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      status: "new",
      customer_name: input.customerName,
      customer_email: input.customerEmail,
      customer_phone: input.customerPhone,
      invoice_data: input.invoiceData ? { raw: input.invoiceData } : null,
      notes: input.notes || null,
      consents: {
        terms: input.termsConsent,
        contact: input.contactConsent
      },
      total_gross: totalGross
    })
    .select("id")
    .single();

  if (orderError || !order) {
    throw new Error(`Nie udalo sie zapisac zamowienia: ${orderError?.message || "brak rekordu"}`);
  }

  for (const item of input.cart.items) {
    const addonsTotal = item.selectedAddons.reduce((sum, addon) => sum + addon.priceGross, 0);
    const { data: orderItem, error: itemError } = await supabase
      .from("order_items")
      .insert({
        order_id: order.id,
        project_code: item.projectCode,
        project_slug: item.projectSlug,
        project_name: item.projectName,
        variant_name: item.variantName,
        base_price_gross: item.basePriceGross,
        variant_price_gross: item.variantPriceGross,
        item_total_gross: item.basePriceGross + item.variantPriceGross + addonsTotal
      })
      .select("id")
      .single();

    if (itemError || !orderItem) {
      throw new Error(`Nie udalo sie zapisac pozycji zamowienia: ${itemError?.message || "brak rekordu"}`);
    }

    if (item.selectedAddons.length > 0) {
      const { error: addonsError } = await supabase.from("order_item_addons").insert(
        item.selectedAddons.map((addon) => ({
          order_item_id: orderItem.id,
          addon_code: addon.code,
          addon_name: addon.name,
          price_gross: addon.priceGross,
          delivery_action: addon.deliveryAction || null
        }))
      );

      if (addonsError) {
        throw new Error(`Nie udalo sie zapisac dodatkow zamowienia: ${addonsError.message}`);
      }
    }
  }

  return {
    orderId: String(order.id),
    totalGross
  };
}
