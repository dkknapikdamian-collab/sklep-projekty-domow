import { queuePostPaymentEmailOutboxForPaidOrder } from "@/lib/email/email-outbox";
import { ensurePostPaymentFulfillmentAccessForOrder } from "@/lib/fulfillment/post-payment-fulfillment";
import {
  buildAdminOrderPrivateFileFulfillmentItems,
  type AdminOrderPrivateFileFulfillmentKind,
  type AdminOrderPrivateFileFulfillmentStatus
} from "@/lib/admin/order-files";
import { type AdminOrderListItem } from "@/lib/admin/orders-admin";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export const ADMIN_ORDER_FULFILLMENT_READINESS_CONTRACT = {
  stage: "ETAP41B_FULFILLMENT_READINESS_RETRY",
  adminShowsMissingRequiredPrivateFiles: true,
  adminShowsManualReviewRequired: true,
  adminCanRetryAfterFilesAreFixed: true,
  retryRequiresPaidPayment: true,
  retryUsesFakeEmailOutboxProvider: true,
  datesDisplayedInEuropeWarsaw: true,
  databaseTimestampsRemainUtc: true
} as const;

export type AdminOrderFulfillmentReadinessFile = {
  kind: AdminOrderPrivateFileFulfillmentKind;
  label: string;
  required: boolean;
  status: AdminOrderPrivateFileFulfillmentStatus;
  statusLabel: string;
  fileId: string;
  fileType: string;
  fileTitle: string;
  filePath: string;
  active: boolean;
  autoSendAfterPayment: boolean;
  requiredForPublication: boolean;
  warning: string;
};

export type AdminOrderFulfillmentReadinessProject = {
  itemId: string;
  projectCode: string;
  projectSlug: string;
  projectName: string;
  hasPdfEmailAddon: boolean;
  ready: boolean;
  missingRequiredCount: number;
  missingRequiredKinds: string[];
  files: AdminOrderFulfillmentReadinessFile[];
};

export type AdminOrderFulfillmentReadiness = {
  ready: boolean;
  missingRequiredCount: number;
  missingRequiredKinds: string[];
  requiresManualReview: boolean;
  projects: AdminOrderFulfillmentReadinessProject[];
};

export type AdminOrderPostPaymentRuntimeEmail = {
  emailType: string;
  status: string;
  provider: string;
  recipientEmail: string;
  subject: string;
  idempotencyKey: string;
  queuedAt: string;
  sentAt: string;
  createdAt: string;
};

export type AdminOrderPostPaymentRuntime = {
  hasPaidPayment: boolean;
  paidPaymentId: string;
  paidAt: string;
  paymentProvider: string;
  paymentStatus: string;
  paymentAmountGross: number;
  paymentCurrency: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId: string;
  fulfillmentAccessStatus: string;
  fulfillmentEmailStatus: string;
  fulfillmentDeliveryEmail: string;
  fulfillmentReason: string;
  fulfillmentMissingRequiredCount: number;
  fulfillmentUpdatedAt: string;
  latestEmails: AdminOrderPostPaymentRuntimeEmail[];
};

export type RetryPostPaymentFulfillmentResult = {
  ok: boolean;
  reason: string;
  fulfillmentStatus: string;
  queuedCount: number;
  skippedCount: number;
  paymentId: string;
};

type PaymentRuntimeRow = {
  id?: string | null;
  provider?: string | null;
  status?: string | null;
  amount_gross?: number | string | null;
  currency?: string | null;
  stripe_checkout_session_id?: string | null;
  stripe_payment_intent_id?: string | null;
  paid_at?: string | null;
};

type AccessRuntimeRow = {
  status?: string | null;
  email_status?: string | null;
  delivery_email?: string | null;
  metadata?: Record<string, unknown> | null;
  updated_at?: string | null;
};

type EmailRuntimeRow = {
  email_type?: string | null;
  status?: string | null;
  provider?: string | null;
  recipient_email?: string | null;
  subject?: string | null;
  idempotency_key?: string | null;
  queued_at?: string | null;
  sent_at?: string | null;
  created_at?: string | null;
};

function normalize(value: unknown) {
  return String(value || "").trim();
}

function toNumber(value: unknown) {
  const numeric = Number(value || 0);
  return Number.isFinite(numeric) ? numeric : 0;
}

function metadataString(value: Record<string, unknown> | null | undefined, key: string) {
  if (!value || typeof value !== "object") return "";
  return normalize(value[key]);
}

function metadataNumber(value: Record<string, unknown> | null | undefined, key: string) {
  const raw = value && typeof value === "object" ? value[key] : 0;
  return toNumber(raw);
}

export function getAdminOrderFulfillmentReadiness(order: AdminOrderListItem): AdminOrderFulfillmentReadiness {
  const projects = order.items.map((item) => {
    const fulfillmentItems = buildAdminOrderPrivateFileFulfillmentItems(
      item.privateFiles,
      item.hasPdfEmailAddon,
      order.fulfillmentChecklist
    );

    const files = fulfillmentItems.map((fileItem) => ({
      kind: fileItem.kind,
      label: fileItem.label,
      required: fileItem.required,
      status: fileItem.status,
      statusLabel: fileItem.statusLabel,
      fileId: fileItem.file?.id || "",
      fileType: fileItem.file?.fileType || "",
      fileTitle: fileItem.file?.title || "",
      filePath: fileItem.file?.path || "",
      active: fileItem.file ? fileItem.file.active !== false : false,
      autoSendAfterPayment: fileItem.file ? fileItem.file.autoSendAfterPayment === true : false,
      requiredForPublication: fileItem.file ? fileItem.file.requiredForPublication === true : false,
      warning: fileItem.warning
    }));

    const missingRequiredKinds = files
      .filter((file) => file.required && file.status === "missing")
      .map((file) => file.kind);

    return {
      itemId: item.id,
      projectCode: item.projectCode,
      projectSlug: item.projectSlug,
      projectName: item.projectName,
      hasPdfEmailAddon: item.hasPdfEmailAddon,
      ready: missingRequiredKinds.length === 0,
      missingRequiredCount: missingRequiredKinds.length,
      missingRequiredKinds,
      files
    };
  });

  const missingRequiredKinds = Array.from(new Set(projects.flatMap((project) => project.missingRequiredKinds)));
  const missingRequiredCount = projects.reduce((sum, project) => sum + project.missingRequiredCount, 0);

  return {
    ready: missingRequiredCount === 0,
    missingRequiredCount,
    missingRequiredKinds,
    requiresManualReview: missingRequiredCount > 0,
    projects
  };
}

async function getLatestPaidPayment(orderId: string): Promise<PaymentRuntimeRow | null> {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase || !orderId) return null;

  const { data, error } = await supabase
    .from("order_payments")
    .select("id, provider, status, amount_gross, currency, stripe_checkout_session_id, stripe_payment_intent_id, paid_at")
    .eq("order_id", orderId)
    .eq("status", "paid")
    .order("paid_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return data as PaymentRuntimeRow;
}

async function getLatestFulfillmentAccess(orderId: string): Promise<AccessRuntimeRow | null> {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase || !orderId) return null;

  const { data, error } = await supabase
    .from("order_fulfillment_access")
    .select("status, email_status, delivery_email, metadata, updated_at")
    .eq("order_id", orderId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return data as AccessRuntimeRow;
}

async function getLatestOutboxEmails(orderId: string): Promise<AdminOrderPostPaymentRuntimeEmail[]> {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase || !orderId) return [];

  const { data, error } = await supabase
    .from("email_outbox")
    .select("email_type, status, provider, recipient_email, subject, idempotency_key, queued_at, sent_at, created_at")
    .eq("order_id", orderId)
    .order("created_at", { ascending: false })
    .limit(8);

  if (error || !data) return [];

  return (data as EmailRuntimeRow[]).map((row) => ({
    emailType: normalize(row.email_type),
    status: normalize(row.status),
    provider: normalize(row.provider),
    recipientEmail: normalize(row.recipient_email),
    subject: normalize(row.subject),
    idempotencyKey: normalize(row.idempotency_key),
    queuedAt: normalize(row.queued_at),
    sentAt: normalize(row.sent_at),
    createdAt: normalize(row.created_at)
  }));
}

export async function getAdminOrderPostPaymentRuntime(orderId: string): Promise<AdminOrderPostPaymentRuntime> {
  const [payment, access, latestEmails] = await Promise.all([
    getLatestPaidPayment(orderId),
    getLatestFulfillmentAccess(orderId),
    getLatestOutboxEmails(orderId)
  ]);

  const metadata = access?.metadata || null;

  return {
    hasPaidPayment: Boolean(payment?.id),
    paidPaymentId: normalize(payment?.id),
    paidAt: normalize(payment?.paid_at),
    paymentProvider: normalize(payment?.provider),
    paymentStatus: normalize(payment?.status),
    paymentAmountGross: toNumber(payment?.amount_gross),
    paymentCurrency: normalize(payment?.currency || "PLN").toUpperCase(),
    stripeCheckoutSessionId: normalize(payment?.stripe_checkout_session_id),
    stripePaymentIntentId: normalize(payment?.stripe_payment_intent_id),
    fulfillmentAccessStatus: normalize(access?.status),
    fulfillmentEmailStatus: normalize(access?.email_status),
    fulfillmentDeliveryEmail: normalize(access?.delivery_email),
    fulfillmentReason: metadataString(metadata, "reason") || metadataString(metadata, "fulfillmentReason"),
    fulfillmentMissingRequiredCount: metadataNumber(metadata, "missingRequiredCount"),
    fulfillmentUpdatedAt: normalize(access?.updated_at),
    latestEmails
  };
}

export async function retryPostPaymentFulfillmentForOrder(orderId: string): Promise<RetryPostPaymentFulfillmentResult> {
  const normalizedOrderId = normalize(orderId);
  const payment = await getLatestPaidPayment(normalizedOrderId);

  if (!normalizedOrderId) {
    return { ok: false, reason: "missing_order_id", fulfillmentStatus: "blocked_until_paid", queuedCount: 0, skippedCount: 0, paymentId: "" };
  }

  if (!payment?.id) {
    return { ok: false, reason: "payment_not_paid", fulfillmentStatus: "blocked_until_paid", queuedCount: 0, skippedCount: 0, paymentId: "" };
  }

  const fulfillment = await ensurePostPaymentFulfillmentAccessForOrder({ orderId: normalizedOrderId });
  const outbox = await queuePostPaymentEmailOutboxForPaidOrder({
    orderId: normalizedOrderId,
    paymentId: normalize(payment.id),
    fulfillmentEmailDraft: fulfillment.emailDraft,
    fulfillmentAccessReady: fulfillment.ok,
    fulfillmentReason: fulfillment.reason
  });

  return {
    ok: fulfillment.ok && outbox.ok,
    reason: `${fulfillment.reason}:${outbox.reason}`,
    fulfillmentStatus: fulfillment.status,
    queuedCount: outbox.queuedCount,
    skippedCount: outbox.skippedCount,
    paymentId: normalize(payment.id)
  };
}
