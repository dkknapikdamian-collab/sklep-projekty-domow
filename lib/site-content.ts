import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export type HomepageHeroContent = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl?: string;
  imageBucket?: string;
  imagePath?: string;
  imageAlt: string;
  isActive: boolean;
  updatedAt?: string;
};

export const defaultHomepageHero: HomepageHeroContent = {
  title: "Znajdz projekt swojego wymarzonego domu",
  subtitle: "Gotowe projekty domow jednorodzinnych dopasowane do Twoich potrzeb.",
  ctaLabel: "Zobacz projekty",
  ctaHref: "/projekty",
  imageUrl: undefined,
  imageBucket: undefined,
  imagePath: undefined,
  imageAlt: "Baner strony glownej",
  isActive: true,
  updatedAt: undefined
};

type SiteContentRow = {
  key: string;
  title: string | null;
  subtitle: string | null;
  cta_label: string | null;
  cta_href: string | null;
  image_bucket: string | null;
  image_path: string | null;
  image_public_url: string | null;
  alt: string | null;
  is_active: boolean | null;
  updated_at: string | null;
};

function mapHero(row: SiteContentRow | null): HomepageHeroContent {
  if (!row) return defaultHomepageHero;

  return {
    title: row.title?.trim() || defaultHomepageHero.title,
    subtitle: row.subtitle?.trim() || defaultHomepageHero.subtitle,
    ctaLabel: row.cta_label?.trim() || defaultHomepageHero.ctaLabel,
    ctaHref: row.cta_href?.trim() || defaultHomepageHero.ctaHref,
    imageUrl: row.image_public_url || undefined,
    imageBucket: row.image_bucket || undefined,
    imagePath: row.image_path || undefined,
    imageAlt: row.alt?.trim() || defaultHomepageHero.imageAlt,
    isActive: row.is_active !== false,
    updatedAt: row.updated_at || undefined
  };
}

export async function getHomepageHeroContent(): Promise<HomepageHeroContent> {
  // V27/V29: public SSR reads use service role on the server only.
  // This avoids anon/RLS drift where admin writes succeed but public reads fall back to defaults.
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return defaultHomepageHero;

  const { data, error } = await supabase
    .from("site_content")
    .select("key, title, subtitle, cta_label, cta_href, image_bucket, image_path, image_public_url, alt, is_active, updated_at")
    .eq("key", "homepage_hero")
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Failed to load homepage hero content", error);
    return defaultHomepageHero;
  }

  return mapHero((data || null) as SiteContentRow | null);
}
