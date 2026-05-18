export const RESEND_RUNTIME_EMAIL_PROVIDER_CONTRACT = {
  stage: "ETAP42B_RESEND_RUNTIME_INTEGRATION",
  provider: "resend",
  sendsTransactionalEmails: true,
  sendsAttachments: false,
  noAttachments: true,
  secureDownloadPanelLinkOnly: true,
  paidRequiredForProjectFilesAccess: true,
  idempotencyHeader: "Idempotency-Key",
  endpoint: "https://api.resend.com/emails",
  requiredEnv: ["EMAIL_PROVIDER", "RESEND_API_KEY", "EMAIL_FROM", "EMAIL_REPLY_TO"]
} as const;

export type TransactionalEmailProviderName = "fake_noop" | "resend";

export type SendTransactionalEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  idempotencyKey: string;
  emailType: string;
  orderId: string;
  paymentId: string;
};

export type SendTransactionalEmailResult = {
  ok: boolean;
  provider: TransactionalEmailProviderName;
  providerMessageId: string;
  reason: string;
  error: string;
};

function normalize(value: unknown) {
  return String(value || "").trim();
}

function env(name: string) {
  return normalize(process.env[name]);
}

function configuredProviderName() {
  return normalize(process.env.EMAIL_PROVIDER).toLowerCase();
}

export function getTransactionalEmailProviderConfigStatus() {
  const requestedProvider = configuredProviderName();
  const apiKey = env("RESEND_API_KEY");
  const from = env("EMAIL_FROM");
  const replyTo = env("EMAIL_REPLY_TO");

  return {
    requestedProvider,
    provider: requestedProvider === "resend" && apiKey && from ? "resend" as const : "fake_noop" as const,
    hasResendApiKey: Boolean(apiKey),
    hasEmailFrom: Boolean(from),
    hasEmailReplyTo: Boolean(replyTo),
    from,
    replyTo
  };
}

export function getConfiguredTransactionalEmailProvider(): TransactionalEmailProviderName {
  return getTransactionalEmailProviderConfigStatus().provider;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function transactionalEmailTextToHtml(text: string) {
  const paragraphs = normalize(text)
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => "<p>" + escapeHtml(part).replace(/\n/g, "<br />") + "</p>")
    .join("\n");

  return "<!doctype html><html lang=\"pl\"><body style=\"font-family:Arial,sans-serif;line-height:1.5;color:#1f2937\">" + paragraphs + "</body></html>";
}

function safeIdempotencyKey(value: string) {
  return normalize(value).slice(0, 256) || "email-" + Date.now();
}

export async function sendTransactionalEmailViaConfiguredProvider(
  input: SendTransactionalEmailInput
): Promise<SendTransactionalEmailResult> {
  const config = getTransactionalEmailProviderConfigStatus();

  if (config.provider !== "resend") {
    return {
      ok: false,
      provider: "fake_noop",
      providerMessageId: "",
      reason: "transactional_email_provider_not_configured",
      error: "EMAIL_PROVIDER=resend, RESEND_API_KEY and EMAIL_FROM are required"
    };
  }

  const apiKey = env("RESEND_API_KEY");
  const payload: Record<string, unknown> = {
    from: config.from,
    to: [normalize(input.to)],
    subject: normalize(input.subject),
    text: input.text,
    html: input.html || transactionalEmailTextToHtml(input.text),
    tags: [
      { name: "stage", value: RESEND_RUNTIME_EMAIL_PROVIDER_CONTRACT.stage },
      { name: "email_type", value: normalize(input.emailType).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 256) },
      { name: "order_id", value: normalize(input.orderId).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 256) }
    ]
  };

  if (config.replyTo) payload.reply_to = config.replyTo;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
      "Idempotency-Key": safeIdempotencyKey(input.idempotencyKey)
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({} as Record<string, unknown>));
  if (!response.ok) {
    const error = typeof data === "object" && data ? JSON.stringify(data) : response.statusText;
    return { ok: false, provider: "resend", providerMessageId: "", reason: "resend_send_failed", error };
  }

  const providerMessageId = normalize((data as { id?: unknown }).id);
  return {
    ok: Boolean(providerMessageId),
    provider: "resend",
    providerMessageId,
    reason: providerMessageId ? "resend_email_sent" : "resend_response_missing_id",
    error: providerMessageId ? "" : JSON.stringify(data)
  };
}
