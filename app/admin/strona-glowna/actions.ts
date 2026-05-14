"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/admin";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export type HomepageContentState = {
  ok: boolean;
  message: string;
};

function str(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function isRealFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0 && value.name !== "";
}

export async function updateHomepageHeroAction(
  _prevState: HomepageContentState,
  formData: FormData
): Promise<HomepageContentState> {
  const admin = await getAdminSession();

  if (!admin.ok) {
    return { ok: false, message: `Brak dostepu admina: ${admin.reason}` };
  }

  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) {
    return { ok: false, message: "Brak SUPABASE_SERVICE_ROLE_KEY albo env Supabase." };
  }

  const title = str(formData, "title");
  const subtitle = str(formData, "subtitle");
  const ctaLabel = str(formData, "ctaLabel");
  const ctaHref = str(formData, "ctaHref") || "/projekty";
  const imageAlt = str(formData, "imageAlt") || "Baner strony glownej";
  const isActive = str(formData, "isActive") !== "hidden";

  if (!title || !subtitle || !ctaLabel) {
    return { ok: false, message: "Uzupelnij tytul, podtytul i tekst przycisku CTA." };
  }

  let imagePath: string | null = null;
  let imagePublicUrl: string | null = null;

  const heroFile = formData.get("heroFile");

  if (isRealFile(heroFile)) {
    const safeName = heroFile.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
    const datedName = `${new Date().toISOString().slice(0, 10)}-${safeName}`;
    imagePath = `homepage/hero/${datedName}`;

    const { error: uploadError } = await supabase.storage.from("site-media").upload(imagePath, heroFile, {
      upsert: true,
      contentType: heroFile.type || "image/jpeg"
    });

    if (uploadError) {
      return { ok: false, message: `Nie udalo sie wrzucic baneru: ${uploadError.message}` };
    }

    const { data: publicUrlData } = supabase.storage.from("site-media").getPublicUrl(imagePath);
    imagePublicUrl = publicUrlData.publicUrl || null;
  }

  const now = new Date().toISOString();

  const payload: Record<string, unknown> = {
    key: "homepage_hero",
    title,
    subtitle,
    cta_label: ctaLabel,
    cta_href: ctaHref,
    alt: imageAlt,
    is_active: isActive,
    updated_at: now
  };

  if (imagePath) {
    payload.image_bucket = "site-media";
    payload.image_path = imagePath;
    payload.image_public_url = imagePublicUrl;
  }

  const { error } = await supabase
    .from("site_content")
    .upsert(payload, { onConflict: "key" });

  if (error) {
    return { ok: false, message: `Nie udalo sie zapisac tresci strony glownej: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/strona-glowna");

  return { ok: true, message: "Zapisano tresc strony glownej." };
}
