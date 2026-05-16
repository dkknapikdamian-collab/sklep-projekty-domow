"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/admin";
import {
  ADMIN_ORDER_STATUSES,
  type AdminOrderStatus,
  getAdminOrderById,
  updateAdminOrderFulfillmentChecklist,
  updateAdminOrderStatus
} from "@/lib/admin/orders-admin";
import { writeAdminAuditLog } from "@/lib/admin/audit-log";

function str(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function safeOrderRedirectPath(orderId: string, returnTo: string, fallback = "/admin/zamowienia") {
  const safeReturnTo = returnTo.startsWith("/admin/zamowienia") ? returnTo : "";
  return safeReturnTo || (orderId ? `/admin/zamowienia/${orderId}` : fallback);
}

export async function updateOrderStatusAction(formData: FormData) {
  const admin = await getAdminSession();
  if (!admin.ok) {
    redirect(`/admin/login?reason=${admin.reason}`);
  }

  const orderId = str(formData, "orderId");
  const status = str(formData, "status") as AdminOrderStatus;
  const returnTo = str(formData, "returnTo");

  if (!orderId || !ADMIN_ORDER_STATUSES.includes(status)) {
    redirect("/admin/zamowienia?status=error");
  }

  const orderBeforeStatusUpdate = await getAdminOrderById(orderId);

  await updateAdminOrderStatus(orderId, status);

  await writeAdminAuditLog({
    admin,
    entityType: "order",
    entityId: orderId,
    action: "order_status_update",
    metadata: {
      source: "updateOrderStatusAction",
      orderId,
      fromStatus: orderBeforeStatusUpdate?.status || null,
      toStatus: status,
      previousStatus: orderBeforeStatusUpdate?.status || null,
      newStatus: status
    }
  });

  revalidatePath("/admin/zamowienia");
  revalidatePath(`/admin/zamowienia/${orderId}`);

  const redirectPath = safeOrderRedirectPath(orderId, returnTo);
  redirect(`${redirectPath}${redirectPath.includes("?") ? "&" : "?"}updated=${orderId}`);
}

export async function updateOrderFulfillmentChecklistAction(formData: FormData) {
  const admin = await getAdminSession();
  if (!admin.ok) {
    redirect(`/admin/login?reason=${admin.reason}`);
  }

  const orderId = str(formData, "orderId");
  const returnTo = str(formData, "returnTo");

  if (!orderId) {
    redirect("/admin/zamowienia?status=error");
  }

  const paymentInstruction = str(formData, "paymentInstruction");

  const payload = {
    orderId,
    paymentConfirmed: bool(formData, "paymentConfirmed"),
    pdfSent: bool(formData, "pdfSent"),
    zipSent: bool(formData, "zipSent"),
    orderClosed: bool(formData, "orderClosed"),
    internalNote: str(formData, "internalNote"),
    paymentInstruction
  };

  const orderBeforeChecklistUpdate = await getAdminOrderById(orderId);
  const checklistBefore = orderBeforeChecklistUpdate?.fulfillmentChecklist || null;

  await updateAdminOrderFulfillmentChecklist(payload);

  await writeAdminAuditLog({
    admin,
    entityType: "order",
    entityId: orderId,
    action: "order_fulfillment_checklist_update",
    metadata: {
      source: "updateOrderFulfillmentChecklistAction",
      orderId,
      fromStatus: orderBeforeChecklistUpdate?.status || null,
      toStatus: payload.orderClosed ? "closed" : orderBeforeChecklistUpdate?.status || null,
      previousPaymentConfirmed: checklistBefore?.paymentConfirmed ?? null,
      paymentConfirmed: payload.paymentConfirmed,
      previousPdfSent: checklistBefore?.pdfSent ?? null,
      pdfSent: payload.pdfSent,
      previousZipSent: checklistBefore?.zipSent ?? null,
      zipSent: payload.zipSent,
      previousOrderClosed: checklistBefore?.orderClosed ?? null,
      orderClosed: payload.orderClosed,
      previousHasInternalNote: checklistBefore ? checklistBefore.internalNote.length > 0 : null,
      hasInternalNote: payload.internalNote.length > 0,
      previousHasPaymentInstruction: checklistBefore ? checklistBefore.paymentInstruction.length > 0 : null,
      hasPaymentInstruction: payload.paymentInstruction.length > 0
    }
  });

  revalidatePath("/admin/zamowienia");
  revalidatePath(`/admin/zamowienia/${orderId}`);

  const redirectPath = safeOrderRedirectPath(orderId, returnTo);
  redirect(`${redirectPath}${redirectPath.includes("?") ? "&" : "?"}fulfillment=updated`);
}
