import type { PostPaymentFulfillmentEmailDraft } from "@/lib/fulfillment/post-payment-fulfillment";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import {
  RESEND_RUNTIME_EMAIL_PROVIDER_CONTRACT,
  getConfiguredTransactionalEmailProvider,
  sendTransactionalEmailViaConfiguredProvider
} from "@/lib/email/transactional-email-provider";

export const EMAIL_OUTBOX_FAKE_PROVIDER_CONTRACT = {
  stage: "ETAP41A_EMAIL_OUTBOX_FAKE_PROVIDER",
  provider: "fake_noop",
  noRealEmailSend: true,
  paidRequired: true,
  idempotencyKey: "order_id + payment_id + email_type",
  emailTypes: ["payment_confirmation", "project_files_access"],
  statuses: ["queued", "sent", "failed", "retry_pending", "skipped"]
} as const;

export const EMAIL_OUTBOX_RESEND_PROVIDER_CONTRACT = {
  stage: "ETAP42B_RESEND_RUNTIME_INTEGRATION",
  provider: "resend",
  sendsRealEmail: true,
  noAttachments: true,
  deliveryModel: "secure_download_panel_link_no_attachments",
  paidRequired: true,
  statusFlow: ["queued", "sent", "failed", "retry_pending"]
} as const;

export type DispatchTransactionalEmailOutboxResult = {
  ok: boolean;
  reason: string;
  sentCount: number;
  failedCount: number;
  skippedCount: number;
};

export const EMAIL_OUTBOX_TYPES = ["payment_confirmation", "project_files_access"] as const;
export type EmailOutboxType = (typeof EMAIL_OUTBOX_TYPES)[number];

export const EMAIL_OUTBOX_STATUSES = ["queued", "sent", "failed", "retry_pending", "skipped"] as const;
export type EmailOutboxStatus = (typeof EMAIL_OUTBOX_STATUSES)[number];

type OrderEmailRow = {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  total_gross: number | string | null;
  status: string | null;
};

type PaymentEmailRow = {
  id: string;
  order_id: string;
  provider: string | null;
  status: string | null;
  amount_gross: number | string | null;
  currency: string | null;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  paid_at: string | null;
};

export type QueuePostPaymentEmailOutboxInput = {
  orderId: string;
  paymentId: string;
  fulfillmentEmailDraft: PostPaymentFulfillmentEmailDraft | null;
  fulfillmentAccessReady: boolean;
  fulfillmentReason: string;
};

export type QueuePostPaymentEmailOutboxResult = {
  ok: boolean;
  reason: string;
  queuedCount: number;
  skippedCount: number;
};

function normalize(value: unknown) {
  return String(value || "").trim();
}

function toNumber(value: unknown) {
  const numeric = Number(value || 0);
  return Number.isFinite(numeric) ? numeric : 0;
}

function shortOrderId(orderId: string) {
  return normalize(orderId).slice(0, 8).toUpperCase();
}

export function buildManualTransferReference(orderId: string) {
  return `ZAM-${shortOrderId(orderId)}`;
}

function formatAmount(amount: unknown, currency: unknown) {
  const numeric = toNumber(amount);
  const suffix = normalize(currency || "PLN").toUpperCase();
  return `${numeric.toFixed(2)} ${suffix}`;
}

async function loadOrderEmailRow(orderId: string): Promise<OrderEmailRow | null> {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase || !orderId) return null;

  const { data, error } = await supabase
    .from("orders")
    .select("id, customer_name, customer_email, total_gross, status")
    .eq("id", orderId)
    .maybeSingle();

  if (error || !data) return null;
  return data as OrderEmailRow;
}

async function loadPaidPaymentEmailRow(orderId: string, paymentId: string): Promise<PaymentEmailRow | null> {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase || !orderId || !paymentId) return null;

  const { data, error } = await supabase
    .from("order_payments")
    .select("id, order_id, provider, status, amount_gross, currency, stripe_checkout_session_id, stripe_payment_intent_id, paid_at")
    .eq("id", paymentId)
    .eq("order_id", orderId)
    .eq("status", "paid")
    .maybeSingle();

  if (error || !data) return null;
  return data as PaymentEmailRow;
}

function buildPaymentConfirmationDraft(input: {
  order: OrderEmailRow;
  payment: PaymentEmailRow;
}) {
  const orderRef = buildManualTransferReference(input.order.id);
  const name = normalize(input.order.customer_name) || "Dzień dobry";
  const amount = formatAmount(input.payment.amount_gross || input.order.total_gross, input.payment.currency || "PLN");

  return {
    subject: `Potwierdzenie płatności ${orderRef}`,
    body: `${name},\n\nPotwierdzamy płatność za zamówienie ${orderRef}.\n\nKwota: ${amount}\nStatus: opłacone\n\nDostęp do plików zostanie wysłany osobną wiadomością, jeśli pliki są gotowe do automatycznego wydania.\n\nTo jest zapis email outbox fake-provider. Realna wysyłka e-mail zostanie podłączona w kolejnym etapie.`
  };
}

async function upsertOutboxEmail(input: {
  order: OrderEmailRow;
  payment: PaymentEmailRow;
  emailType: EmailOutboxType;
  status: EmailOutboxStatus;
  subject: string;
  bodyText: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return { ok: false, reason: "missing_service_role" };

  const recipientEmail = normalize(input.order.customer_email);
  if (!recipientEmail) return { ok: false, reason: "missing_recipient_email" };

  const idempotencyKey = `${input.order.id}:${input.payment.id}:${input.emailType}`;
  const now = new Date().toISOString();
  const provider = getConfiguredTransactionalEmailProvider();
  const usesResend = provider === "resend";

  const { error } = await supabase.from("email_outbox").upsert({
    order_id: input.order.id,
    payment_id: input.payment.id,
    email_type: input.emailType,
    status: input.status,
    provider,
    recipient_email: recipientEmail,
    recipient_name: normalize(input.order.customer_name) || null,
    subject: input.subject,
    body_text: input.bodyText,
    body_html: null,
    idempotency_key: idempotencyKey,
    metadata: {
      ...EMAIL_OUTBOX_FAKE_PROVIDER_CONTRACT,
      ...(usesResend ? EMAIL_OUTBOX_RESEND_PROVIDER_CONTRACT : {}),
      ...input.metadata,
      provider,
      noRealEmailSend: !usesResend,
      deliveryModel: "secure_download_panel_link_no_attachments"
    },
    queued_at: input.status === "queued" ? now : null,
    sent_at: null,
    failed_at: null,
    retry_after: null,
    last_error: null,
    updated_at: now
  }, { onConflict: "idempotency_key" });

  if (error) return { ok: false, reason: error.message || "email_outbox_upsert_failed" };
  return { ok: true, reason: `email_outbox_${input.status}_${input.emailType}` };
}

export async function queuePostPaymentEmailOutboxForPaidOrder(
  input: QueuePostPaymentEmailOutboxInput
): Promise<QueuePostPaymentEmailOutboxResult> {
  const orderId = normalize(input.orderId);
  const paymentId = normalize(input.paymentId);

  if (!orderId || !paymentId) {
    return { ok: false, reason: "missing_order_or_payment_id", queuedCount: 0, skippedCount: 0 };
  }

  const order = await loadOrderEmailRow(orderId);
  const payment = await loadPaidPaymentEmailRow(orderId, paymentId);

  if (!order) return { ok: false, reason: "order_not_found", queuedCount: 0, skippedCount: 0 };
  if (!payment) {
    // No outbox rows without paid payment. This is the hard production guard.
    return { ok: false, reason: "payment_not_paid_no_email_outbox", queuedCount: 0, skippedCount: 0 };
  }

  let queuedCount = 0;
  let skippedCount = 0;
  const paymentDraft = buildPaymentConfirmationDraft({ order, payment });

  const paymentResult = await upsertOutboxEmail({
    order,
    payment,
    emailType: "payment_confirmation",
    status: "queued",
    subject: paymentDraft.subject,
    bodyText: paymentDraft.body,
    metadata: {
      orderReference: buildManualTransferReference(order.id),
      paymentProvider: payment.provider,
      paymentStatus: payment.status,
      paidAt: payment.paid_at
    }
  });
  if (paymentResult.ok) queuedCount += 1;

  if (input.fulfillmentAccessReady && input.fulfillmentEmailDraft) {
    const filesResult = await upsertOutboxEmail({
      order,
      payment,
      emailType: "project_files_access",
      status: "queued",
      subject: input.fulfillmentEmailDraft.subject,
      bodyText: input.fulfillmentEmailDraft.body,
      metadata: {
        orderReference: buildManualTransferReference(order.id),
        accessUrl: input.fulfillmentEmailDraft.accessUrl,
        fulfillmentReason: input.fulfillmentReason
      }
    });
    if (filesResult.ok) queuedCount += 1;
  } else {
    const filesResult = await upsertOutboxEmail({
      order,
      payment,
      emailType: "project_files_access",
      status: "skipped",
      subject: `Dostęp do plików ${buildManualTransferReference(order.id)} wymaga sprawdzenia`,
      bodyText: `Dostęp do plików dla ${buildManualTransferReference(order.id)} nie został zakolejkowany, bo fulfillment wymaga sprawdzenia. Powód: ${normalize(input.fulfillmentReason) || "unknown"}.`,
      metadata: {
        orderReference: buildManualTransferReference(order.id),
        fulfillmentAccessReady: false,
        fulfillmentReason: input.fulfillmentReason || "unknown"
      }
    });
    if (filesResult.ok) skippedCount += 1;
  }

  const dispatch = queuedCount > 0
    ? await dispatchQueuedTransactionalEmailOutboxForOrder({ orderId })
    : { ok: true, reason: "no_queued_email_outbox_rows", sentCount: 0, failedCount: 0, skippedCount: 0 };

  const failedSend = dispatch.failedCount > 0;
  const dispatched = dispatch.sentCount > 0;
  return {
    ok: (queuedCount > 0 || skippedCount > 0) && !failedSend,
    reason: failedSend ? "email_outbox_resend_dispatch_failed:" + dispatch.reason : dispatched ? "email_outbox_resend_dispatched" : "email_outbox_recorded",
    queuedCount,
    skippedCount
  };
}


type EmailOutboxDispatchRow = {
  id: string;
  order_id: string;
  payment_id: string | null;
  email_type: EmailOutboxType;
  status: EmailOutboxStatus;
  provider: string;
  recipient_email: string;
  subject: string;
  body_text: string;
  body_html: string | null;
  idempotency_key: string;
  metadata: Record<string, unknown> | null;
  attempt_count: number | null;
};

async function loadQueuedResendOutboxRows(orderId: string): Promise<EmailOutboxDispatchRow[]> {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase || !orderId) return [];

  const { data, error } = await supabase
    .from("email_outbox")
    .select("id, order_id, payment_id, email_type, status, provider, recipient_email, subject, body_text, body_html, idempotency_key, metadata, attempt_count")
    .eq("order_id", orderId)
    .eq("provider", "resend")
    .in("status", ["queued", "retry_pending"])
    .order("created_at", { ascending: true })
    .limit(10);

  if (error || !data) return [];
  return data as EmailOutboxDispatchRow[];
}

async function emailOutboxRowHasPaidPayment(row: EmailOutboxDispatchRow) {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase || !row.order_id || !row.payment_id) return false;

  const { data, error } = await supabase
    .from("order_payments")
    .select("id")
    .eq("id", row.payment_id)
    .eq("order_id", row.order_id)
    .eq("status", "paid")
    .maybeSingle();

  return !error && Boolean(data?.id);
}

async function updateOutboxRowAsSent(row: EmailOutboxDispatchRow, providerMessageId: string) {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return;
  const now = new Date().toISOString();

  await supabase.from("email_outbox").update({
    status: "sent",
    provider: "resend",
    sent_at: now,
    failed_at: null,
    retry_after: null,
    last_error: null,
    attempt_count: Number(row.attempt_count || 0) + 1,
    metadata: {
      ...(row.metadata || {}),
      ...EMAIL_OUTBOX_RESEND_PROVIDER_CONTRACT,
      ...RESEND_RUNTIME_EMAIL_PROVIDER_CONTRACT,
      resendEmailId: providerMessageId,
      providerMessageId,
      noAttachments: true,
      deliveryModel: "secure_download_panel_link_no_attachments",
      sentAt: now
    },
    updated_at: now
  }).eq("id", row.id);
}

async function updateOutboxRowAsFailed(row: EmailOutboxDispatchRow, errorMessage: string) {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return;
  const now = new Date().toISOString();
  const retryAfter = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  await supabase.from("email_outbox").update({
    status: "failed",
    provider: "resend",
    failed_at: now,
    retry_after: retryAfter,
    last_error: errorMessage.slice(0, 1000),
    attempt_count: Number(row.attempt_count || 0) + 1,
    metadata: {
      ...(row.metadata || {}),
      ...EMAIL_OUTBOX_RESEND_PROVIDER_CONTRACT,
      resendLastError: errorMessage.slice(0, 1000),
      noAttachments: true,
      deliveryModel: "secure_download_panel_link_no_attachments"
    },
    updated_at: now
  }).eq("id", row.id);
}

async function updateOutboxRowAsSkipped(row: EmailOutboxDispatchRow, reason: string) {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return;
  const now = new Date().toISOString();

  await supabase.from("email_outbox").update({
    status: "skipped",
    last_error: reason,
    metadata: {
      ...(row.metadata || {}),
      skippedBy: "ETAP42B_RESEND_RUNTIME_INTEGRATION",
      skipReason: reason,
      noAttachments: true,
      deliveryModel: "secure_download_panel_link_no_attachments"
    },
    updated_at: now
  }).eq("id", row.id);
}

export async function dispatchQueuedTransactionalEmailOutboxForOrder(input: { orderId: string }): Promise<DispatchTransactionalEmailOutboxResult> {
  const orderId = normalize(input.orderId);
  if (!orderId) return { ok: false, reason: "missing_order_id", sentCount: 0, failedCount: 0, skippedCount: 0 };

  if (getConfiguredTransactionalEmailProvider() !== "resend") {
    return { ok: true, reason: "resend_provider_not_configured_fake_noop_kept", sentCount: 0, failedCount: 0, skippedCount: 0 };
  }

  const rows = await loadQueuedResendOutboxRows(orderId);
  let sentCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  for (const row of rows) {
    const hasPaidPayment = await emailOutboxRowHasPaidPayment(row);
    if (!hasPaidPayment) {
      await updateOutboxRowAsSkipped(row, "payment_not_paid_no_resend_send");
      skippedCount += 1;
      continue;
    }

    const result = await sendTransactionalEmailViaConfiguredProvider({
      to: row.recipient_email,
      subject: row.subject,
      text: row.body_text,
      html: row.body_html || undefined,
      idempotencyKey: row.idempotency_key,
      emailType: row.email_type,
      orderId: row.order_id,
      paymentId: row.payment_id || ""
    });

    if (result.ok) {
      await updateOutboxRowAsSent(row, result.providerMessageId);
      sentCount += 1;
    } else {
      await updateOutboxRowAsFailed(row, result.error || result.reason);
      failedCount += 1;
    }
  }

  return {
    ok: failedCount === 0,
    reason: failedCount > 0 ? "resend_dispatch_failed" : sentCount > 0 ? "resend_dispatch_sent" : "no_resend_rows_to_dispatch",
    sentCount,
    failedCount,
    skippedCount
  };
}
