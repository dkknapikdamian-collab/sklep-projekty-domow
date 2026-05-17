import { NextResponse } from "next/server";
import { createSignedFileRedirectForAccess } from "@/lib/fulfillment/post-payment-fulfillment";

export const dynamic = "force-dynamic";

type DownloadRouteContext = {
  params: Promise<{ token: string; fileId: string }>;
};

export async function GET(_request: Request, context: DownloadRouteContext) {
  const params = await context.params;
  const token = String(params.token || "").trim();
  const fileId = String(params.fileId || "").trim();

  const result = await createSignedFileRedirectForAccess({ token, fileId });

  if (!result.ok || !result.redirectUrl) {
    return NextResponse.json(
      { ok: false, reason: result.reason || "access_denied" },
      { status: result.reason === "file_not_found" ? 404 : 403 }
    );
  }

  return NextResponse.redirect(result.redirectUrl, { status: 302 });
}
