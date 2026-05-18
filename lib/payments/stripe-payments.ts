import { createHmac, timingSafeEqual } from "crypto";
import { ensurePostPaymentFulfillmentAccessForOrder } from "@/lib/fulfillment/post-payment-fulfillment";
import { queuePostPaymentEmailOutboxForPaidOrder } from "@/lib/email/email-outbox";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export const STRIPE_REAL_PAYMENTS_CONTRACT = {
  stage: "ETAP39A_STRIPE_REAL_PAYMENTS",
  provider: "stripe",
  webhookIsSourceOfTruth: true,
  paidStatusRequiredForFulfillment: true,
  successPageIsNotSourceOfTruth: true,
  noRealEmailSendInThisStage: true,
  fulfillmentAfterPaid: true
} as const;

export type StripeCheckoutCreateResult = {
  ok: boolean;
  reason: string;
  checkoutUrl: string;
  checkoutSessionId: string;
};

type StripeCheckoutInput = {
  orderId: string;
  amountGross: number;
  customerEmail: string;
  customerName: string;
  currency?: string;
  siteUrl?: string;
};

type StripeWebhookResult = {
  ok: boolean;
  reason: string;
  eventType?: string;
  orderId?: string;
  paymentId?: string;
};

function normalize(value: unknown) {
  return String(value || "").trim();
}

function stripeSecretKey() {
  return normalize(process.env.STRIPE_SECRET_KEY);
}

function stripeWebhookSecret() {
  return normalize(process.env.STRIPE_WEBHOOK_SECRET);
}

function getSiteUrl(siteUrl = "") {
  const value = normalize(siteUrl || process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL);
  return value.replace(/\/$/, "");
}

function toStripeAmount(amountGross: number) {
  const amount = Math.round(Number(amountGross || 0) * 100);
  return Number.isFinite(amount) && amount > 0 ? amount : 0;
}

function toAmountGrossFromStripeAmount(value: unknown) {
  const numeric = Number(value || 0);
  return Number.isFinite(numeric) ? numeric / 100 : 0;
}

function metadataForStripe(orderId: string) {
  return {
    order_id: orderId,
    stage: STRIPE_REAL_PAYMENTS_CONTRACT.stage,
    webhook_is_source_of_truth: "true"
  };
}

async function recordCheckoutCreated(input: {
  orderId: string;
  amountGross: number;
  currency: string;
  sessionId: string;
  paymentIntentId: string | null;
  checkoutUrl: string;
}) {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return;

  const { error } = await supabase.from("order_payments").upsert({
    order_id: input.orderId,
    provider: "stripe",
    status: "checkout_created",
    amount_gross: input.amountGross,
    currency: input.currency,
    stripe_checkout_session_id: input.sessionId,
    stripe_payment_intent_id: input.paymentIntentId,
    idempotency_key: `stripe_checkout_session:${input.sessionId}`,
    metadata: {
      ...STRIPE_REAL_PAYMENTS_CONTRACT,
      checkoutUrlCreated: true,
      checkoutUrl: input.checkoutUrl
    },
    updated_at: new Date().toISOString()
  }, { onConflict: "stripe_checkout_session_id" });

  if (error) {
    console.error("Failed to record Stripe checkout session", error);
  }
}

export async function createStripeCheckoutForOrder(input: StripeCheckoutInput): Promise<StripeCheckoutCreateResult> {
  const key = stripeSecretKey();
  const siteUrl = getSiteUrl(input.siteUrl);
  const amount = toStripeAmount(input.amountGross);
  const currency = normalize(input.currency || "pln").toLowerCase();

  if (!key) {
    return { ok: false, reason: "STRIPE_PROVIDER_NOT_CONFIGURED", checkoutUrl: "", checkoutSessionId: "" };
  }
  if (!siteUrl) {
    return { ok: false, reason: "NEXT_PUBLIC_APP_URL_NOT_CONFIGURED", checkoutUrl: "", checkoutSessionId: "" };
  }
  if (!input.orderId || amount <= 0) {
    return { ok: false, reason: "INVALID_ORDER_OR_AMOUNT", checkoutUrl: "", checkoutSessionId: "" };
  }

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("client_reference_id", input.orderId);
  params.set("customer_email", input.customerEmail);
  params.set("success_url", `${siteUrl}/zamowienie/status?session_id={CHECKOUT_SESSION_ID}`);
  params.set("cancel_url", `${siteUrl}/koszyk?payment=cancelled`);
  params.set("line_items[0][price_data][currency]", currency);
  params.set("line_items[0][price_data][unit_amount]", String(amount));
  params.set("line_items[0][price_data][product_data][name]", `Zamówienie projektu #${input.orderId.slice(0, 8)}`);
  params.set("line_items[0][quantity]", "1");

  for (const [keyName, value] of Object.entries(metadataForStripe(input.orderId))) {
    params.set(`metadata[${keyName}]`, value);
    params.set(`payment_intent_data[metadata][${keyName}]`, value);
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });

  const data = await response.json().catch(() => ({} as Record<string, unknown>));
  if (!response.ok) {
    const message = typeof data === "object" && data && "error" in data
      ? JSON.stringify((data as { error?: unknown }).error)
      : response.statusText;
    return { ok: false, reason: `STRIPE_CHECKOUT_CREATE_FAILED: ${message}`, checkoutUrl: "", checkoutSessionId: "" };
  }

  const sessionId = normalize((data as { id?: unknown }).id);
  const checkoutUrl = normalize((data as { url?: unknown }).url);
  const paymentIntentId = normalize((data as { payment_intent?: unknown }).payment_intent) || null;

  if (!sessionId || !checkoutUrl) {
    return { ok: false, reason: "STRIPE_CHECKOUT_SESSION_MISSING_URL", checkoutUrl: "", checkoutSessionId: sessionId };
  }

  await recordCheckoutCreated({
    orderId: input.orderId,
    amountGross: input.amountGross,
    currency,
    sessionId,
    paymentIntentId,
    checkoutUrl
  });

  return { ok: true, reason: "stripe_checkout_created", checkoutUrl, checkoutSessionId: sessionId };
}

function parseStripeSignature(header: string) {
  const parts = header.split(",").map((part) => part.trim());
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2) || "";
  const signatures = parts.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3)).filter(Boolean);
  return { timestamp, signatures };
}

export function verifyStripeWebhookSignature(rawBody: string, signatureHeader: string | null) {
  const secret = stripeWebhookSecret();
  if (!secret) return { ok: false, reason: "STRIPE_WEBHOOK_SECRET_NOT_CONFIGURED" };
  if (!signatureHeader) return { ok: false, reason: "STRIPE_SIGNATURE_HEADER_MISSING" };

  const { timestamp, signatures } = parseStripeSignature(signatureHeader);
  if (!timestamp || signatures.length === 0) return { ok: false, reason: "STRIPE_SIGNATURE_MALFORMED" };

  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`, "utf8").digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  const matched = signatures.some((signature) => {
    const signatureBuffer = Buffer.from(signature, "hex");
    return signatureBuffer.length === expectedBuffer.length && timingSafeEqual(signatureBuffer, expectedBuffer);
  });

  return matched ? { ok: true, reason: "stripe_signature_verified" } : { ok: false, reason: "STRIPE_SIGNATURE_INVALID" };
}

function getSessionOrderId(session: Record<string, unknown>) {
  const metadata = typeof session.metadata === "object" && session.metadata ? session.metadata as Record<string, unknown> : {};
  return normalize(metadata.order_id || session.client_reference_id);
}

function getSessionPaymentIntentId(session: Record<string, unknown>) {
  return normalize(session.payment_intent) || null;
}

async function insertPaymentEvent(event: Record<string, unknown>) {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return { ok: false, reason: "missing_service_role", eventRowId: "" };

  const eventId = normalize(event.id);
  const eventType = normalize(event.type);
  const { data, error } = await supabase
    .from("payment_events")
    .insert({
      provider: "stripe",
      stripe_event_id: eventId,
      event_type: eventType,
      payload: event,
      processing_result: "received",
      created_at: new Date().toISOString()
    })
    .select("id")
    .single();

  if (error) {
    if (String(error.code || "").includes("23505") || String(error.message || "").toLowerCase().includes("duplicate")) {
      return { ok: true, reason: "duplicate_event_ignored", eventRowId: "" };
    }
    return { ok: false, reason: error.message || "payment_event_insert_failed", eventRowId: "" };
  }

  return { ok: true, reason: "payment_event_recorded", eventRowId: normalize(data?.id) };
}

async function finishPaymentEvent(input: {
  eventRowId: string;
  orderId: string;
  paymentId: string;
  processingResult: string;
}) {
  if (!input.eventRowId) return;
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return;

  await supabase
    .from("payment_events")
    .update({
      order_id: input.orderId || null,
      payment_id: input.paymentId || null,
      processed_at: new Date().toISOString(),
      processing_result: input.processingResult
    })
    .eq("id", input.eventRowId);
}

async function markOrderPaymentConfirmed(orderId: string) {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase || !orderId) return;

  await supabase.from("order_fulfillment_checklist").upsert({
    order_id: orderId,
    payment_confirmed: true,
    updated_at: new Date().toISOString()
  }, { onConflict: "order_id" });
}

async function recordStripePaymentFromSession(session: Record<string, unknown>, status: "paid" | "failed" | "expired") {
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return { ok: false, reason: "missing_service_role", orderId: "", paymentId: "" };

  const orderId = getSessionOrderId(session);
  const sessionId = normalize(session.id);
  const paymentIntentId = getSessionPaymentIntentId(session);
  const currency = normalize(session.currency || "pln").toLowerCase();
  const amountGross = toAmountGrossFromStripeAmount(session.amount_total);

  if (!orderId || !sessionId) {
    return { ok: false, reason: "stripe_session_missing_order_id_or_session_id", orderId, paymentId: "" };
  }

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("order_payments")
    .upsert({
      order_id: orderId,
      provider: "stripe",
      status,
      amount_gross: amountGross,
      currency,
      stripe_checkout_session_id: sessionId,
      stripe_payment_intent_id: paymentIntentId,
      idempotency_key: `stripe_checkout_session:${sessionId}`,
      metadata: {
        ...STRIPE_REAL_PAYMENTS_CONTRACT,
        stripePaymentStatus: normalize(session.payment_status),
        stripeCheckoutStatus: normalize(session.status)
      },
      updated_at: now,
      paid_at: status === "paid" ? now : null,
      failed_at: status === "failed" ? now : null
    }, { onConflict: "stripe_checkout_session_id" })
    .select("id")
    .single();

  if (error || !data) {
    return { ok: false, reason: error?.message || "order_payment_upsert_failed", orderId, paymentId: "" };
  }

  if (status === "paid") {
    await markOrderPaymentConfirmed(orderId);
    const fulfillment = await ensurePostPaymentFulfillmentAccessForOrder({ orderId });
    await queuePostPaymentEmailOutboxForPaidOrder({
      orderId,
      paymentId: normalize(data.id),
      fulfillmentEmailDraft: fulfillment.emailDraft,
      fulfillmentAccessReady: fulfillment.ok,
      fulfillmentReason: fulfillment.reason
    });
  }

  return { ok: true, reason: `stripe_payment_${status}`, orderId, paymentId: normalize(data.id) };
}

export async function handleStripeWebhook(input: {
  rawBody: string;
  signatureHeader: string | null;
}): Promise<StripeWebhookResult> {
  const signature = verifyStripeWebhookSignature(input.rawBody, input.signatureHeader);
  if (!signature.ok) return { ok: false, reason: signature.reason };

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(input.rawBody) as Record<string, unknown>;
  } catch {
    return { ok: false, reason: "STRIPE_WEBHOOK_JSON_INVALID" };
  }

  const eventType = normalize(event.type);
  const eventRecord = await insertPaymentEvent(event);
  if (!eventRecord.ok) return { ok: false, reason: eventRecord.reason, eventType };
  if (eventRecord.reason === "duplicate_event_ignored") return { ok: true, reason: "duplicate_event_ignored", eventType };

  const data = typeof event.data === "object" && event.data ? event.data as Record<string, unknown> : {};
  const session = typeof data.object === "object" && data.object ? data.object as Record<string, unknown> : {};

  let result = { ok: true, reason: "event_recorded_no_payment_state_change", orderId: "", paymentId: "" };

  if (eventType === "checkout.session.completed" || eventType === "checkout.session.async_payment_succeeded") {
    result = await recordStripePaymentFromSession(session, "paid");
  }

  if (eventType === "checkout.session.async_payment_failed") {
    result = await recordStripePaymentFromSession(session, "failed");
  }

  if (eventType === "checkout.session.expired") {
    result = await recordStripePaymentFromSession(session, "expired");
  }

  await finishPaymentEvent({
    eventRowId: eventRecord.eventRowId,
    orderId: result.orderId,
    paymentId: result.paymentId,
    processingResult: result.reason
  });

  return { ok: result.ok, reason: result.reason, eventType, orderId: result.orderId, paymentId: result.paymentId };
}


