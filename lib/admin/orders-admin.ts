import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export const ADMIN_ORDER_STATUSES = ["new", "contacted", "paid_manual", "sent", "cancelled"] as const;

export type AdminOrderStatus = (typeof ADMIN_ORDER_STATUSES)[number];

export const ADMIN_ORDER_STATUS_LABELS: Record<AdminOrderStatus, string> = {
  new: "Nowe",
  contacted: "Kontakt byl",
  paid_manual: "Oplacone recznie",
  sent: "Wyslane",
  cancelled: "Anulowane"
};

export type AdminOrderAddon = {
  id: string;
  code: string;
  name: string;
  priceGross: number;
  deliveryAction: string;
};

export type AdminOrderItem = {
  id: string;
  projectCode: string;
  projectSlug: string;
  projectName: string;
  variantName: string;
  basePriceGross: number;
  variantPriceGross: number;
  itemTotalGross: number;
  addons: AdminOrderAddon[];
};

export type AdminOrderListItem = {
  id: string;
  shortId: string;
  status: AdminOrderStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalGross: number;
  createdAt: string;
  updatedAt: string;
  invoiceData: string;
  notes: string;
  items: AdminOrderItem[];
};

function toNumber(value: unknown) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function toOrderStatus(value: unknown): AdminOrderStatus {
  const status = String(value || "");
  return ADMIN_ORDER_STATUSES.includes(status as AdminOrderStatus) ? (status as AdminOrderStatus) : "new";
}

function invoiceDataToText(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && "raw" in value) return String((value as { raw?: unknown }).raw || "");
  return JSON.stringify(value);
}

export async function getAdminOrders(): Promise<AdminOrderListItem[]> {
  const supabase = createSupabaseServiceRoleClient();

  if (!supabase) {
    return [];
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      customer_name,
      customer_email,
      customer_phone,
      invoice_data,
      notes,
      total_gross,
      created_at,
      updated_at,
      order_items (
        id,
        project_code,
        project_slug,
        project_name,
        variant_name,
        base_price_gross,
        variant_price_gross,
        item_total_gross,
        order_item_addons (
          id,
          addon_code,
          addon_name,
          price_gross,
          delivery_action
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error || !orders) {
    console.error("Failed to load admin orders", error);
    return [];
  }

  return orders.map((order) => {
    const id = String(order.id || "");
    const items = Array.isArray(order.order_items) ? order.order_items : [];

    return {
      id,
      shortId: id ? id.slice(0, 8) : "-",
      status: toOrderStatus(order.status),
      customerName: String(order.customer_name || ""),
      customerEmail: String(order.customer_email || ""),
      customerPhone: String(order.customer_phone || ""),
      totalGross: toNumber(order.total_gross),
      createdAt: String(order.created_at || ""),
      updatedAt: String(order.updated_at || ""),
      invoiceData: invoiceDataToText(order.invoice_data),
      notes: String(order.notes || ""),
      items: items.map((item) => {
        const addons = Array.isArray(item.order_item_addons) ? item.order_item_addons : [];

        return {
          id: String(item.id || ""),
          projectCode: String(item.project_code || ""),
          projectSlug: String(item.project_slug || ""),
          projectName: String(item.project_name || ""),
          variantName: String(item.variant_name || ""),
          basePriceGross: toNumber(item.base_price_gross),
          variantPriceGross: toNumber(item.variant_price_gross),
          itemTotalGross: toNumber(item.item_total_gross),
          addons: addons.map((addon) => ({
            id: String(addon.id || ""),
            code: String(addon.addon_code || ""),
            name: String(addon.addon_name || ""),
            priceGross: toNumber(addon.price_gross),
            deliveryAction: String(addon.delivery_action || "")
          }))
        };
      })
    };
  });
}

export async function updateAdminOrderStatus(orderId: string, status: AdminOrderStatus) {
  const supabase = createSupabaseServiceRoleClient();

  if (!supabase) {
    throw new Error("Brak SUPABASE_SERVICE_ROLE_KEY albo env Supabase.");
  }

  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId);

  if (error) {
    throw new Error(`Nie udalo sie zapisac statusu zamowienia: ${error.message}`);
  }
}
