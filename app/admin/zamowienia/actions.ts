"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/admin";
import { ADMIN_ORDER_STATUSES, type AdminOrderStatus, updateAdminOrderStatus } from "@/lib/admin/orders-admin";
import { writeAdminAuditLog } from "@/lib/admin/audit-log";

function str(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function updateOrderStatusAction(formData: FormData) {
  const admin = await getAdminSession();
  if (!admin.ok) {
    redirect(`/admin/login?reason=${admin.reason}`);
  }

  const orderId = str(formData, "orderId");
  const status = str(formData, "status") as AdminOrderStatus;

  if (!orderId || !ADMIN_ORDER_STATUSES.includes(status)) {
    redirect("/admin/zamowienia?status=error");
  }

  await updateAdminOrderStatus(orderId, status);

  await writeAdminAuditLog({
    admin,
    entityType: "order",
    entityId: orderId,
    action: "order_status_update",
    metadata: {
      toStatus: status
    }
  });

  revalidatePath("/admin/zamowienia");
  redirect(`/admin/zamowienia?updated=${orderId}`);
}
