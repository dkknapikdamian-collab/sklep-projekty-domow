import type { PostPaymentFulfillmentEmailDraft } from "@/lib/fulfillment/post-payment-fulfillment";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export const EMAIL_OUTBOX_FAKE_PROVIDER_CONTRACT = {
  stage: "ETAP41A_EMAIL_OUTBOX_FAKE_PROVIDER",
  provider: "fake_noop",
  noRealEmailSend: true,
  paidRequired: true,
  idempotencyKey: "order_id + payment_id + email_type",
  emailTypes: ["payment_confirmation", "project_files_access"],
  statuses: ["queued", "sent", "failed", "retry_pending", "skipped"]
} as const;

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

  const { error } = await supabase.from("email_outbox").upsert({
    order_id: input.order.id,
    payment_id: input.payment.id,
    email_type: input.emailType,
    status: input.status,
    provider: EMAIL_OUTBOX_FAKE_PROVIDER_CONTRACT.provider,
    recipient_email: recipientEmail,
    recipient_name: normalize(input.order.customer_name) || null,
    subject: input.subject,
    body_text: input.bodyText,
    body_html: null,
    idempotency_key: idempotencyKey,
    metadata: {
      ...EMAIL_OUTBOX_FAKE_PROVIDER_CONTRACT,
      ...input.metadata,
      noRealEmailSend: true
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

  return { ok: queuedCount > 0 || skippedCount > 0, reason: "email_outbox_fake_provider_recorded", queuedCount, skippedCount };
}
