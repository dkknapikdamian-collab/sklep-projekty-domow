import {
  adminOrderProjectFileLookupKey,
  getAdminOrderPrivateFilesByProjectKey,
  isPdfEmailAddon,
  type AdminOrderPrivateFile
} from "@/lib/admin/order-files";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export const ADMIN_ORDER_STATUSES = ["new", "contacted", "paid_manual", "sent", "cancelled"] as const;

export type AdminOrderStatus = (typeof ADMIN_ORDER_STATUSES)[number];

export const ADMIN_ORDER_STATUS_LABELS: Record<AdminOrderStatus, string> = {
  new: "Nowe",
  contacted: "Kontakt był",
  paid_manual: "Opłacone ręcznie",
  sent: "Wysłane",
  cancelled: "Anulowane"
};

export const ADMIN_ORDER_PAYMENT_INSTRUCTION_FILTERS = ["all", "instruction_set", "instruction_missing"] as const;
export type AdminOrderPaymentInstructionFilter = (typeof ADMIN_ORDER_PAYMENT_INSTRUCTION_FILTERS)[number];

export const ADMIN_ORDER_PAYMENT_INSTRUCTION_FILTER_LABELS: Record<AdminOrderPaymentInstructionFilter, string> = {
  all: "Płatność: wszystkie",
  instruction_set: "Instrukcja ustawiona",
  instruction_missing: "Brak instrukcji"
};

export const ADMIN_ORDER_FULFILLMENT_FILTERS = ["all", "pdf_sent", "zip_sent", "closed"] as const;
export type AdminOrderFulfillmentFilter = (typeof ADMIN_ORDER_FULFILLMENT_FILTERS)[number];

export const ADMIN_ORDER_FULFILLMENT_FILTER_LABELS: Record<AdminOrderFulfillmentFilter, string> = {
  all: "Realizacja: wszystkie",
  pdf_sent: "PDF wysłany",
  zip_sent: "ZIP wysłany",
  closed: "Zamknięte"
};

export const ADMIN_ORDER_PRIORITY_FILTERS = ["all", "requires_contact", "waiting_payment", "ready_to_send"] as const;
export type AdminOrderPriorityFilter = (typeof ADMIN_ORDER_PRIORITY_FILTERS)[number];

export const ADMIN_ORDER_PRIORITY_FILTER_LABELS: Record<AdminOrderPriorityFilter, string> = {
  all: "Szybkie oznaczenia: wszystkie",
  requires_contact: "Wymaga kontaktu",
  waiting_payment: "Czeka na płatność",
  ready_to_send: "Do wysyłki"
};

export type AdminOrderAddon = {
  id: string;
  code: string;
  name: string;
  priceGross: number;
  deliveryAction: string;
};

export type AdminOrderFulfillmentChecklist = {
  paymentConfirmed: boolean;
  pdfSent: boolean;
  zipSent: boolean;
  orderClosed: boolean;
  internalNote: string;
  paymentInstruction: string;
  updatedAt: string;
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
  hasPdfEmailAddon: boolean;
  privateFiles: AdminOrderPrivateFile[];
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
  fulfillmentChecklist: AdminOrderFulfillmentChecklist;
  items: AdminOrderItem[];
};

export type AdminOrderPriorityFlags = {
  hasPaymentInstruction: boolean;
  paymentConfirmed: boolean;
  pdfSent: boolean;
  zipSent: boolean;
  orderClosed: boolean;
  requiresContact: boolean;
  waitingPayment: boolean;
  readyToSend: boolean;
};

export type UpdateAdminOrderFulfillmentChecklistInput = {
  orderId: string;
  paymentConfirmed: boolean;
  pdfSent: boolean;
  zipSent: boolean;
  orderClosed: boolean;
  internalNote: string;
  paymentInstruction: string;
};

type FulfillmentRow = {
  order_id: string;
  payment_confirmed: boolean | null;
  pdf_sent: boolean | null;
  zip_sent: boolean | null;
  order_closed: boolean | null;
  internal_note: string | null;
  payment_instruction: string | null;
  updated_at: string | null;
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

export function emptyAdminOrderFulfillmentChecklist(): AdminOrderFulfillmentChecklist {
  return {
    paymentConfirmed: false,
    pdfSent: false,
    zipSent: false,
    orderClosed: false,
    internalNote: "",
    paymentInstruction: "",
    updatedAt: ""
  };
}

export function getAdminOrderPriorityFlags(order: AdminOrderListItem): AdminOrderPriorityFlags {
  const checklist = order.fulfillmentChecklist || emptyAdminOrderFulfillmentChecklist();
  const hasPaymentInstruction = checklist.paymentInstruction.trim().length > 0;
  const paymentConfirmed = Boolean(checklist.paymentConfirmed || order.status === "paid_manual");
  const pdfSent = Boolean(checklist.pdfSent);
  const zipSent = Boolean(checklist.zipSent);
  const orderClosed = Boolean(checklist.orderClosed);
  const terminalStatus = order.status === "sent" || order.status === "cancelled" || orderClosed;

  const requiresContact = order.status === "new" && !terminalStatus;
  const waitingPayment = !paymentConfirmed && !terminalStatus && (order.status === "contacted" || hasPaymentInstruction);
  const readyToSend = paymentConfirmed && !terminalStatus && (!pdfSent || !zipSent);

  return {
    hasPaymentInstruction,
    paymentConfirmed,
    pdfSent,
    zipSent,
    orderClosed,
    requiresContact,
    waitingPayment,
    readyToSend
  };
}

export function getAdminOrderPriorityRank(order: AdminOrderListItem) {
  const flags = getAdminOrderPriorityFlags(order);

  if (flags.requiresContact) return 10;
  if (flags.readyToSend) return 20;
  if (flags.waitingPayment) return 30;
  if (!flags.hasPaymentInstruction && !flags.paymentConfirmed && order.status !== "cancelled") return 40;
  if (order.status === "sent" || flags.orderClosed) return 90;
  if (order.status === "cancelled") return 99;

  return 50;
}

function mapFulfillmentRow(row: FulfillmentRow | undefined): AdminOrderFulfillmentChecklist {
  if (!row) return emptyAdminOrderFulfillmentChecklist();

  return {
    paymentConfirmed: Boolean(row.payment_confirmed),
    pdfSent: Boolean(row.pdf_sent),
    zipSent: Boolean(row.zip_sent),
    orderClosed: Boolean(row.order_closed),
    internalNote: String(row.internal_note || ""),
    paymentInstruction: String(row.payment_instruction || ""),
    updatedAt: String(row.updated_at || "")
  };
}

async function getAdminOrderFulfillmentChecklistByOrderId(orderIds: string[]) {
  const supabase = createSupabaseServiceRoleClient();
  const lookup = new Map<string, AdminOrderFulfillmentChecklist>();

  if (!supabase || orderIds.length === 0) return lookup;

  const { data, error } = await supabase
    .from("order_fulfillment_checklist")
    .select("order_id, payment_confirmed, pdf_sent, zip_sent, order_closed, internal_note, payment_instruction, updated_at")
    .in("order_id", orderIds);

  if (error) {
    console.error("Failed to load order fulfillment checklist", error);
    return lookup;
  }

  for (const row of (data || []) as FulfillmentRow[]) {
    lookup.set(String(row.order_id || ""), mapFulfillmentRow(row));
  }

  return lookup;
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

  const fulfillmentByOrderId = await getAdminOrderFulfillmentChecklistByOrderId(
    (orders || []).map((order) => String(order.id || "")).filter(Boolean)
  );

  const mappedOrders = orders.map((order) => {
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
      fulfillmentChecklist: fulfillmentByOrderId.get(id) || emptyAdminOrderFulfillmentChecklist(),
      items: items.map((item) => {
        const addons = Array.isArray(item.order_item_addons) ? item.order_item_addons : [];
        const mappedAddons = addons.map((addon) => ({
          id: String(addon.id || ""),
          code: String(addon.addon_code || ""),
          name: String(addon.addon_name || ""),
          priceGross: toNumber(addon.price_gross),
          deliveryAction: String(addon.delivery_action || "")
        }));

        return {
          id: String(item.id || ""),
          projectCode: String(item.project_code || ""),
          projectSlug: String(item.project_slug || ""),
          projectName: String(item.project_name || ""),
          variantName: String(item.variant_name || ""),
          basePriceGross: toNumber(item.base_price_gross),
          variantPriceGross: toNumber(item.variant_price_gross),
          itemTotalGross: toNumber(item.item_total_gross),
          hasPdfEmailAddon: mappedAddons.some(isPdfEmailAddon),
          privateFiles: [],
          addons: mappedAddons
        };
      })
    };
  });

  const privateFilesByProjectKey = await getAdminOrderPrivateFilesByProjectKey(
    mappedOrders.flatMap((order) => order.items)
  );

  return mappedOrders.map((order) => ({
    ...order,
    items: order.items.map((item) => ({
      ...item,
      privateFiles: privateFilesByProjectKey[adminOrderProjectFileLookupKey(item.projectCode, item.projectSlug)] || []
    }))
  }));
}

export async function getAdminOrderById(id: string): Promise<AdminOrderListItem | null> {
  const normalizedId = String(id || "").trim();
  if (!normalizedId) return null;

  const orders = await getAdminOrders();

  return orders.find((order) => order.id === normalizedId || order.shortId === normalizedId) || null;
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
    throw new Error(`Nie udało się zapisać statusu zamówienia: ${error.message}`);
  }
}

export async function updateAdminOrderFulfillmentChecklist(input: UpdateAdminOrderFulfillmentChecklistInput) {
  const supabase = createSupabaseServiceRoleClient();

  if (!supabase) {
    throw new Error("Brak SUPABASE_SERVICE_ROLE_KEY albo env Supabase.");
  }

  const orderId = String(input.orderId || "").trim();
  if (!orderId) throw new Error("Brak ID zamówienia.");

  const { error } = await supabase
    .from("order_fulfillment_checklist")
    .upsert({
      order_id: orderId,
      payment_confirmed: input.paymentConfirmed,
      pdf_sent: input.pdfSent,
      zip_sent: input.zipSent,
      order_closed: input.orderClosed,
      internal_note: input.internalNote || null,
      payment_instruction: input.paymentInstruction || null,
      updated_at: new Date().toISOString()
    }, { onConflict: "order_id" });

  if (error) {
    throw new Error(`Nie udało się zapisać checklisty realizacji: ${error.message}`);
  }
}
