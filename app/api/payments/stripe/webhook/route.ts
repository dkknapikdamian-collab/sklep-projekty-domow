import { NextRequest, NextResponse } from "next/server";
import { handleStripeWebhook } from "@/lib/payments/stripe-payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signatureHeader = request.headers.get("stripe-signature");
  const result = await handleStripeWebhook({ rawBody, signatureHeader });

  return NextResponse.json(result, {
    status: result.ok ? 200 : 400
  });
}
