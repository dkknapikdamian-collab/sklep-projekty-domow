import { createHash, randomBytes } from "crypto";
import { getAdminOrderById, type AdminOrderItem } from "@/lib/admin/orders-admin";
import { buildAdminOrderPrivateFileFulfillmentItems, type AdminOrderPrivateFile } from "@/lib/admin/order-files";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export const POST_PAYMENT_ACCESS_TOKEN_BYTES = 32;
export const POST_PAYMENT_ACCESS_PANEL_TTL_DAYS = 7;
export const POST_PAYMENT_FILE_LINK_TTL_SECONDS = 30 * 60;

export const POST_PAYMENT_PROJECT_FILES_CONTRACT = {
  stage: "ETAP26C_POST_PAYMENT_PROJECT_FILES",
  storageProvider: "supabase_storage",
  requiresPaidPayment: true,
  usesActiveProjectFilesOnly: true,
  respectsPdfEmailAddon: true,
  includesFloorPlans: true,
  signedUrlsOnly: true,
  logsDownloadEvents: true,
  emailProviderPending: true
} as const;

export const POST_PAYMENT_FULFILLMENT_STATUSES = [
  "blocked_until_paid",
  "manual_review_required",
  "ready",
  "links_generated",
  "sent",
  "expired"
] as const;

export type PostPaymentFulfillmentStatus = (typeof POST_PAYMENT_FULFILLMENT_STATUSES)[number];

export type PostPaymentFulfillmentAccessRow = {
  id: string;
  order_id: string;
  payment_id: string | null;
  status: PostPaymentFulfillmentStatus | string;
  access_token_hash: string | null;
  expires_at: string | null;
  generated_at: string | null;
  sent_at: string | null;
  email_status: string | null;
  delivery_email: string | null;
  metadata: Record<string, unknown> | null;
};

export type PostPaymentOrderPaymentRow = {
  id: string;
  order_id: string;
  provider: string;
  status: string;
  amount_gross: number | string | null;
  currency: string | null;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  paid_at: string | null;
};

export type PostPaymentFulfillmentFile = {
  id: string;
  projectCode: string;
  projectName: string;
  label: string;
  title: string;
  bucket: string;
  fileType: string;
  version: string;
};

export type PostPaymentFulfillmentAccessView = {
  ok: boolean;
  reason: string;
  status: PostPaymentFulfillmentStatus | string;
  orderId: string;
  orderShortId: string;
  expiresAt: string;
  files: PostPaymentFulfillmentFile[];
};

export type PostPaymentFulfillmentEmailDraft = {
  subject: string;
  body: string;
  accessUrl: string;
};

type EnsureAccessResult = {
  ok: boolean;
  reason: string;
  status: PostPaymentFulfillmentStatus;
  token: string;
  accessUrl: string;
  emailDraft: PostPaymentFulfillmentEmailDraft | null;
};

type FileLookupResult = {
  orderId: string;
  orderShortId: string;
  files: AdminOrderPrivateFile[];
  missingRequiredCount: number;
};

function normalize(value: unknown) {
  return String(value || "").trim();
}

function addDays(date: Date, days: number) {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + days);
  return copy;
}

function safeMetadata(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function isExpired(value: string | null) {
  if (!value) return true;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) || parsed.getTime() <= Date.now();
}

function isDownloadableStatus(status: string) {
  return status === "ready" || status === "links_generated" || status === "sent";
}

function toAccessRow(row: Record<string, unknown>): PostPaymentFulfillmentAccessRow {
  return {
    id: normalize(row.id),
    order_id: normalize(row.order_id),
    payment_id: normalize(row.payment_id) || null,
    status: normalize(row.status) || "blocked_until_paid",
    access_token_hash: normalize(row.access_token_hash) || null,
    expires_at: normalize(row.expires_at) || null,
    generated_at: normalize(row.generated_at) || null,
    sent_at: normalize(row.sent_at) || null,
    email_status: normalize(row.email_status) || null,
    delivery_email: normalize(row.delivery_email) || null,
    metadata: safeMetadata(row.metadata)
  };
}

function toPaymentRow(row: Record<string, unknown>): PostPaymentOrderPaymentRow {
  return {
    id: normalize(row.id),
    order_id: normalize(row.order_id),
    provider: normalize(row.provider),
    status: normalize(row.status),
    amount_gross: typeof row.amount_gross === "number" || typeof row.amount_gross === "string" ? row.amount_gross : null,
    currency: normalize(row.currency) || null,
    stripe_checkout_session_id: normalize(row.stripe_checkout_session_id) || null,
    stripe_payment_intent_id: normalize(row.stripe_payment_intent_id) || null,
    paid_at: normalize(row.paid_at) || null
  };
}

export function createPostPaymentAccessToken() {
  return randomBytes(POST_PAYMENT_ACCESS_TOKEN_BYTES).toString("base64url");
}

export function hashPostPaymentAccessToken(token: string) {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function buildPostPaymentAccessUrl(token: string, siteUrl = "") {
  const base = normalize(siteUrl).replace(/\/$/, "");
  const path = `/zamowienie/dostep/${encodeURIComponent(token)}`;
  return base ? `${base}${path}` : path;
}

export function buildPostPaymentFulfillmentEmailDraft(input: {
  orderShortId: string;
  customerName: string;
  accessUrl: string;
  expiresAt: string;
}): PostPaymentFulfillmentEmailDraft {
  const expires = input.expiresAt ? new Date(input.expiresAt).toLocaleString("pl-PL") : "po upływie ważności linku";
  const name = normalize(input.customerName) || "Dzień dobry";

  return {
    subject: `Dostęp do plików zamówienia #${input.orderShortId}`,
    accessUrl: input.accessUrl,
    body: `${name},\n\nPłatność za zamówienie #${input.orderShortId} została potwierdzona.\n\nPliki są dostępne w bezpiecznym panelu pobrań:\n${input.accessUrl}\n\nLink do panelu jest czasowy. Linki do pojedynczych plików są generowane dopiero po kliknięciu i są krótkoterminowe.\n\nW razie problemu odpisz na tę wiadomość.\n\nPozdrawiamy`
  };
}

async function getPaidPaymentByOrderId(orderId: string): Promise<PostPaymentOrderPaymentRow | null> {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("order_payments")
    .select("id, order_id, provider, status, amount_gross, currency, stripe_checkout_session_id, stripe_payment_intent_id, paid_at")
    .eq("order_id", orderId)
    .eq("status", "paid")
    .order("paid_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return toPaymentRow(data as Record<string, unknown>);
}

async function getAccessByToken(token: string): Promise<PostPaymentFulfillmentAccessRow | null> {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return null;

  const tokenHash = hashPostPaymentAccessToken(token);
  const { data, error } = await supabase
    .from("order_fulfillment_access")
    .select("id, order_id, payment_id, status, access_token_hash, expires_at, generated_at, sent_at, email_status, delivery_email, metadata")
    .eq("access_token_hash", tokenHash)
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return toAccessRow(data as Record<string, unknown>);
}

function collectRequiredFiles(items: AdminOrderItem[]): FileLookupResult {
  const files: AdminOrderPrivateFile[] = [];
  let missingRequiredCount = 0;
  let orderId = "";
  let orderShortId = "";

  for (const item of items) {
    const checklist = { paymentConfirmed: true, pdfSent: false, zipSent: false };
    const fulfillmentItems = buildAdminOrderPrivateFileFulfillmentItems(item.privateFiles, item.hasPdfEmailAddon, checklist);
    for (const fulfillmentItem of fulfillmentItems) {
      if (fulfillmentItem.required && fulfillmentItem.file) files.push(fulfillmentItem.file);
      if (fulfillmentItem.required && !fulfillmentItem.file) missingRequiredCount += 1;
    }
  }

  return { orderId, orderShortId, files, missingRequiredCount };
}

async function getOrderFilesForFulfillment(orderId: string): Promise<FileLookupResult | null> {
  const order = await getAdminOrderById(orderId);
  if (!order) return null;

  const result = collectRequiredFiles(order.items);
  return {
    ...result,
    orderId: order.id,
    orderShortId: order.shortId
  };
}

async function recordDownloadEvent(input: {
  orderId: string;
  paymentId: string | null;
  accessId: string | null;
  file: AdminOrderPrivateFile | null;
  eventType: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return;

  const { error } = await supabase.from("order_download_events").insert({
    order_id: input.orderId,
    payment_id: input.paymentId,
    fulfillment_access_id: input.accessId,
    project_file_id: input.file?.id || null,
    event_type: input.eventType,
    file_bucket: input.file?.bucket || null,
    file_path: input.file?.path || null,
    metadata: input.metadata || {},
    created_at: new Date().toISOString()
  });

  if (error) {
    console.error("Failed to record order download event", error);
  }
}

export async function ensurePostPaymentFulfillmentAccessForOrder(input: {
  orderId: string;
  siteUrl?: string;
}): Promise<EnsureAccessResult> {
  const orderId = normalize(input.orderId);
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) {
    return { ok: false, reason: "missing_service_role", status: "blocked_until_paid", token: "", accessUrl: "", emailDraft: null };
  }

  const payment = await getPaidPaymentByOrderId(orderId);
  if (!payment) {
    return { ok: false, reason: "payment_not_paid", status: "blocked_until_paid", token: "", accessUrl: "", emailDraft: null };
  }

  const order = await getAdminOrderById(orderId);
  if (!order) {
    return { ok: false, reason: "order_not_found", status: "manual_review_required", token: "", accessUrl: "", emailDraft: null };
  }

  const fileState = await getOrderFilesForFulfillment(orderId);
  if (!fileState || fileState.files.length === 0 || fileState.missingRequiredCount > 0) {
    await supabase.from("order_fulfillment_access").upsert({
      order_id: orderId,
      payment_id: payment.id,
      status: "manual_review_required",
      email_status: "blocked_manual_review",
      delivery_email: order.customerEmail || null,
      metadata: {
        reason: "missing_required_private_files",
        missingRequiredCount: fileState?.missingRequiredCount || 0,
        ...POST_PAYMENT_PROJECT_FILES_CONTRACT
      },
      updated_at: new Date().toISOString()
    }, { onConflict: "order_id,payment_id" });

    return { ok: false, reason: "missing_required_private_files", status: "manual_review_required", token: "", accessUrl: "", emailDraft: null };
  }

  const token = createPostPaymentAccessToken();
  const tokenHash = hashPostPaymentAccessToken(token);
  const expiresAt = addDays(new Date(), POST_PAYMENT_ACCESS_PANEL_TTL_DAYS).toISOString();
  const accessUrl = buildPostPaymentAccessUrl(token, input.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "");
  const emailDraft = buildPostPaymentFulfillmentEmailDraft({
    orderShortId: order.shortId,
    customerName: order.customerName,
    accessUrl,
    expiresAt
  });

  const { error } = await supabase.from("order_fulfillment_access").upsert({
    order_id: orderId,
    payment_id: payment.id,
    status: "links_generated",
    access_token_hash: tokenHash,
    expires_at: expiresAt,
    generated_at: new Date().toISOString(),
    email_status: "ready_to_send",
    delivery_email: order.customerEmail || null,
    metadata: {
      ...POST_PAYMENT_PROJECT_FILES_CONTRACT,
      fileCount: fileState.files.length,
      emailSubject: emailDraft.subject,
      successPageIsNotSourceOfTruth: true,
      checkoutSessionCompletedRequired: true,
      supportedStripeEvents: ["checkout.session.completed", "checkout.session.async_payment_succeeded"]
    },
    updated_at: new Date().toISOString()
  }, { onConflict: "order_id,payment_id" });

  if (error) {
    return { ok: false, reason: error.message, status: "manual_review_required", token: "", accessUrl: "", emailDraft: null };
  }

  await recordDownloadEvent({
    orderId,
    paymentId: payment.id,
    accessId: null,
    file: null,
    eventType: "access_token_generated",
    metadata: { ...POST_PAYMENT_PROJECT_FILES_CONTRACT, fileCount: fileState.files.length, emailStatus: "ready_to_send" }
  });

  return { ok: true, reason: "access_ready", status: "links_generated", token, accessUrl, emailDraft };
}

export async function getPostPaymentFulfillmentAccessView(token: string, options: { logView?: boolean } = {}): Promise<PostPaymentFulfillmentAccessView> {
  const access = await getAccessByToken(token);
  if (!access) {
    return { ok: false, reason: "access_not_found", status: "blocked_until_paid", orderId: "", orderShortId: "", expiresAt: "", files: [] };
  }

  if (!isDownloadableStatus(access.status)) {
    return { ok: false, reason: "access_not_ready", status: access.status, orderId: access.order_id, orderShortId: access.order_id.slice(0, 8), expiresAt: access.expires_at || "", files: [] };
  }

  if (isExpired(access.expires_at)) {
    return { ok: false, reason: "access_expired", status: "expired", orderId: access.order_id, orderShortId: access.order_id.slice(0, 8), expiresAt: access.expires_at || "", files: [] };
  }

  const payment = await getPaidPaymentByOrderId(access.order_id);
  if (!payment || (access.payment_id && payment.id !== access.payment_id)) {
    return { ok: false, reason: "payment_not_paid", status: "blocked_until_paid", orderId: access.order_id, orderShortId: access.order_id.slice(0, 8), expiresAt: access.expires_at || "", files: [] };
  }

  const fileState = await getOrderFilesForFulfillment(access.order_id);
  if (!fileState || fileState.files.length === 0 || fileState.missingRequiredCount > 0) {
    return { ok: false, reason: "files_not_ready", status: "manual_review_required", orderId: access.order_id, orderShortId: access.order_id.slice(0, 8), expiresAt: access.expires_at || "", files: [] };
  }

  if (options.logView) {
    await recordDownloadEvent({
      orderId: access.order_id,
      paymentId: payment.id,
      accessId: access.id,
      file: null,
      eventType: "access_panel_view",
      metadata: { ...POST_PAYMENT_PROJECT_FILES_CONTRACT }
    });
  }

  return {
    ok: true,
    reason: "access_ready",
    status: access.status,
    orderId: access.order_id,
    orderShortId: fileState.orderShortId,
    expiresAt: access.expires_at || "",
    files: fileState.files.map((file) => ({
      id: file.id,
      projectCode: file.projectCode,
      projectName: file.projectName,
      label: file.fileLabel,
      title: file.title || file.fileLabel,
      bucket: file.bucket,
      fileType: file.fileType,
      version: file.version
    }))
  };
}

export async function createSignedFileRedirectForAccess(input: {
  token: string;
  fileId: string;
}): Promise<{ ok: boolean; reason: string; redirectUrl: string }> {
  const access = await getAccessByToken(input.token);
  if (!access || !isDownloadableStatus(access.status) || isExpired(access.expires_at)) {
    return { ok: false, reason: "access_denied", redirectUrl: "" };
  }

  const payment = await getPaidPaymentByOrderId(access.order_id);
  if (!payment || (access.payment_id && payment.id !== access.payment_id)) {
    return { ok: false, reason: "payment_not_paid", redirectUrl: "" };
  }

  const fileState = await getOrderFilesForFulfillment(access.order_id);
  const file = fileState?.files.find((candidate) => candidate.id === input.fileId) || null;
  if (!file) {
    return { ok: false, reason: "file_not_found", redirectUrl: "" };
  }

  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) {
    return { ok: false, reason: "missing_service_role", redirectUrl: "" };
  }

  const { data, error } = await supabase.storage
    .from(file.bucket)
    .createSignedUrl(file.path, POST_PAYMENT_FILE_LINK_TTL_SECONDS, { download: true });

  if (error || !data?.signedUrl) {
    await recordDownloadEvent({
      orderId: access.order_id,
      paymentId: payment.id,
      accessId: access.id,
      file,
      eventType: "signed_file_url_failed",
      metadata: { ...POST_PAYMENT_PROJECT_FILES_CONTRACT, reason: error?.message || "no_signed_url" }
    });

    return { ok: false, reason: error?.message || "signed_url_failed", redirectUrl: "" };
  }

  await recordDownloadEvent({
    orderId: access.order_id,
    paymentId: payment.id,
    accessId: access.id,
    file,
    eventType: "signed_file_url_issued",
    metadata: { ...POST_PAYMENT_PROJECT_FILES_CONTRACT, ttlSeconds: POST_PAYMENT_FILE_LINK_TTL_SECONDS }
  });

  return { ok: true, reason: "redirect_ready", redirectUrl: data.signedUrl };
}
