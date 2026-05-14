import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import { getSupabaseServerEnv } from "@/lib/supabase/env";

export type AdminDebugStatus = "ok" | "warning" | "error" | "neutral";

export type AdminDebugCheck = {
  key: string;
  label: string;
  status: AdminDebugStatus;
  value: string;
  detail?: string;
};

export type AdminDebugProjectWarning = {
  code: string;
  name: string;
  slug: string;
  status: string;
  warnings: string[];
};

export type AdminDebugDiagnostics = {
  generatedAt: string;
  overallStatus: AdminDebugStatus;
  counts: {
    projects: number;
    activeProjects: number;
    activeIncompleteProjects: number;
    mediaRows: number;
    roomRows: number;
    issueCount: number;
  };
  env: AdminDebugCheck[];
  storage: AdminDebugCheck[];
  tables: AdminDebugCheck[];
  homepage: AdminDebugCheck[];
  publicProjects: AdminDebugCheck[];
  projectWarnings: AdminDebugProjectWarning[];
  issues: string[];
};

const requiredBuckets = ["site-media", "project-media", "project-private-files"];

const requiredTables = [
  "profiles",
  "projects",
  "project_media",
  "project_files",
  "project_rooms",
  "project_variants",
  "project_addons",
  "site_content"
];

function okCheck(key: string, label: string, value = "OK", detail?: string): AdminDebugCheck {
  return { key, label, status: "ok", value, detail };
}

function warnCheck(key: string, label: string, value = "UWAGA", detail?: string): AdminDebugCheck {
  return { key, label, status: "warning", value, detail };
}

function errorCheck(key: string, label: string, value = "BLAD", detail?: string): AdminDebugCheck {
  return { key, label, status: "error", value, detail };
}

function neutralCheck(key: string, label: string, value = "-", detail?: string): AdminDebugCheck {
  return { key, label, status: "neutral", value, detail };
}

function toNumber(value: unknown) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function countByProjectId(rows: Array<{ project_id?: string | null }>) {
  const map = new Map<string, number>();
  for (const row of rows || []) {
    const key = String(row.project_id || "");
    if (!key) continue;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return map;
}

async function tableCount(supabase: any, table: string): Promise<AdminDebugCheck> {
  try {
    const { count, error } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });

    if (error) {
      return errorCheck(`table:${table}`, table, "BRAK / BLAD", error.message);
    }

    return okCheck(`table:${table}`, table, `${count ?? 0} rekordow`);
  } catch (error) {
    return errorCheck(`table:${table}`, table, "BLAD", error instanceof Error ? error.message : String(error));
  }
}

export async function getAdminDebugDiagnostics(): Promise<AdminDebugDiagnostics> {
  const generatedAt = new Date().toISOString();
  const issues: string[] = [];

  const env = getSupabaseServerEnv();
  const envChecks: AdminDebugCheck[] = [
    process.env.NEXT_PUBLIC_SUPABASE_URL
      ? okCheck("env:NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL", "ustawione", "Publiczny URL Supabase jest widoczny dla aplikacji.")
      : errorCheck("env:NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL", "PUSTE", "Bez tego admin i klient Supabase nie wystartuja."),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? okCheck("env:NEXT_PUBLIC_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "ustawione", "Klucz anon jest obecny. Wartosc nie jest pokazywana.")
      : errorCheck("env:NEXT_PUBLIC_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "PUSTE", "Bez tego logowanie Supabase Auth nie zadziala."),
    process.env.SUPABASE_SERVICE_ROLE_KEY
      ? okCheck("env:SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SERVICE_ROLE_KEY", "ustawione", "Klucz server-only jest obecny. Wartosc nie jest pokazywana.")
      : warnCheck("env:SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SERVICE_ROLE_KEY", "PUSTE", "Panel moze dzialac czesciowo, ale audyty i zapisy server-only beda ograniczone.")
  ];

  for (const check of envChecks) {
    if (check.status === "error" || check.status === "warning") {
      issues.push(`${check.label}: ${check.detail || check.value}`);
    }
  }

  const fallback: AdminDebugDiagnostics = {
    generatedAt,
    overallStatus: "error",
    counts: {
      projects: 0,
      activeProjects: 0,
      activeIncompleteProjects: 0,
      mediaRows: 0,
      roomRows: 0,
      issueCount: issues.length
    },
    env: envChecks,
    storage: requiredBuckets.map((bucket) => neutralCheck(`bucket:${bucket}`, bucket, "nie sprawdzono", "Brak klienta service role.")),
    tables: requiredTables.map((table) => neutralCheck(`table:${table}`, table, "nie sprawdzono", "Brak klienta service role.")),
    homepage: [neutralCheck("homepage:hero", "Hero strony glownej", "nie sprawdzono")],
    publicProjects: [neutralCheck("projects:active", "Publiczne projekty", "nie sprawdzono")],
    projectWarnings: [],
    issues
  };

  if (!env) {
    fallback.issues.push("Brakuje publicznych zmiennych Supabase.");
    fallback.counts.issueCount = fallback.issues.length;
    return fallback;
  }

  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) {
    fallback.issues.push("Brakuje SUPABASE_SERVICE_ROLE_KEY dla diagnostyki server-only.");
    fallback.counts.issueCount = fallback.issues.length;
    return fallback;
  }

  const storageChecks: AdminDebugCheck[] = [];
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      storageChecks.push(errorCheck("storage:list", "Supabase Storage", "BLAD", error.message));
      issues.push(`Storage: ${error.message}`);
    } else {
      for (const bucketName of requiredBuckets) {
        const bucket = (buckets || []).find((item: any) => item.name === bucketName);
        if (bucket) {
          storageChecks.push(okCheck(`bucket:${bucketName}`, bucketName, "istnieje", bucket.public ? "Bucket publiczny." : "Bucket prywatny."));
        } else {
          storageChecks.push(errorCheck(`bucket:${bucketName}`, bucketName, "BRAK", `Utworz bucket ${bucketName} w Supabase Storage.`));
          issues.push(`Brak bucketu Storage: ${bucketName}`);
        }
      }
    }
  } catch (error) {
    storageChecks.push(errorCheck("storage:list", "Supabase Storage", "BLAD", error instanceof Error ? error.message : String(error)));
    issues.push("Nie udalo sie odczytac bucketow Storage.");
  }

  const tableChecks = await Promise.all(requiredTables.map((table) => tableCount(supabase, table)));
  for (const check of tableChecks) {
    if (check.status === "error") {
      issues.push(`Tabela ${check.label}: ${check.detail || check.value}`);
    }
  }

  const homepageChecks: AdminDebugCheck[] = [];
  try {
    const { data: hero, error } = await supabase
      .from("site_content")
      .select("key,title,image_bucket,image_path,image_public_url,is_active,updated_at")
      .eq("key", "homepage_hero")
      .maybeSingle();

    if (error) {
      homepageChecks.push(errorCheck("homepage:hero", "Hero strony glownej", "BLAD", error.message));
      issues.push(`Hero strony glownej: ${error.message}`);
    } else if (!hero) {
      homepageChecks.push(errorCheck("homepage:hero", "Hero strony glownej", "BRAK", "Brakuje rekordu site_content key=homepage_hero."));
      issues.push("Brakuje rekordu homepage_hero w site_content.");
    } else {
      homepageChecks.push(okCheck("homepage:row", "Rekord homepage_hero", "istnieje", String(hero.updated_at || "")));

      if (hero.is_active) {
        homepageChecks.push(okCheck("homepage:active", "Status hero", "aktywny"));
      } else {
        homepageChecks.push(warnCheck("homepage:active", "Status hero", "ukryty", "Hero nie bedzie aktywne publicznie."));
        issues.push("Hero strony glownej jest ukryte.");
      }

      if (hero.image_public_url) {
        homepageChecks.push(okCheck("homepage:image", "Obraz hero", "podpiety", String(hero.image_public_url)));
      } else {
        homepageChecks.push(warnCheck("homepage:image", "Obraz hero", "BRAK", "Tekst jest zapisany, ale nie ma image_public_url."));
        issues.push("Hero strony glownej nie ma zapisanego image_public_url.");
      }
    }
  } catch (error) {
    homepageChecks.push(errorCheck("homepage:hero", "Hero strony glownej", "BLAD", error instanceof Error ? error.message : String(error)));
    issues.push("Nie udalo sie sprawdzic hero strony glownej.");
  }

  let projects: any[] = [];
  let mediaRows: any[] = [];
  let roomRows: any[] = [];
  const publicProjectChecks: AdminDebugCheck[] = [];
  const projectWarnings: AdminDebugProjectWarning[] = [];

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("id,code,slug,name,status,price_gross,usable_area,rooms_count,updated_at")
      .order("updated_at", { ascending: false })
      .limit(100);

    if (error) {
      publicProjectChecks.push(errorCheck("projects:list", "Projekty", "BLAD", error.message));
      issues.push(`Projekty: ${error.message}`);
    } else {
      projects = data || [];
      const ids = projects.map((project) => project.id).filter(Boolean);

      if (ids.length) {
        const [{ data: mediaData }, { data: roomsData }] = await Promise.all([
          supabase.from("project_media").select("project_id").in("project_id", ids),
          supabase.from("project_rooms").select("project_id").in("project_id", ids)
        ]);

        mediaRows = mediaData || [];
        roomRows = roomsData || [];
      }

      const mediaCount = countByProjectId(mediaRows);
      const roomCount = countByProjectId(roomRows);
      const activeProjects = projects.filter((project) => project.status === "active");

      for (const project of activeProjects) {
        const warnings: string[] = [];
        const projectMediaCount = mediaCount.get(project.id) || 0;
        const projectRoomCount = roomCount.get(project.id) || 0;

        if (!project.slug) warnings.push("brak slug");
        if (toNumber(project.price_gross) <= 0) warnings.push("cena 0");
        if (toNumber(project.usable_area) <= 0) warnings.push("powierzchnia 0");
        if (toNumber(project.rooms_count) <= 0) warnings.push("liczba pokoi 0");
        if (projectMediaCount === 0) warnings.push("brak mediow");
        if (projectRoomCount === 0) warnings.push("brak pomieszczen");

        if (warnings.length) {
          projectWarnings.push({
            code: String(project.code || "(brak kodu)"),
            name: String(project.name || "(brak nazwy)"),
            slug: String(project.slug || ""),
            status: String(project.status || ""),
            warnings
          });
        }
      }

      publicProjectChecks.push(okCheck("projects:total", "Wszystkie projekty", String(projects.length)));
      if (activeProjects.length > 0) {
        publicProjectChecks.push(okCheck("projects:active", "Publiczne projekty active", String(activeProjects.length)));
      } else {
        publicProjectChecks.push(warnCheck("projects:active", "Publiczne projekty active", "0", "Katalog publiczny bedzie pusty."));
        issues.push("Brak projektow active.");
      }

      if (projectWarnings.length > 0) {
        publicProjectChecks.push(warnCheck("projects:incomplete", "Aktywne projekty z brakami", String(projectWarnings.length), "Te rekordy beda publicznie wygladac jak placeholdery albo 0."));
        issues.push(`${projectWarnings.length} aktywnych projektow ma braki danych lub mediow.`);
      } else {
        publicProjectChecks.push(okCheck("projects:incomplete", "Aktywne projekty z brakami", "0"));
      }
    }
  } catch (error) {
    publicProjectChecks.push(errorCheck("projects:list", "Projekty", "BLAD", error instanceof Error ? error.message : String(error)));
    issues.push("Nie udalo sie sprawdzic projektow.");
  }

  const errorCount = [
    ...envChecks,
    ...storageChecks,
    ...tableChecks,
    ...homepageChecks,
    ...publicProjectChecks
  ].filter((check) => check.status === "error").length;

  const warningCount = [
    ...envChecks,
    ...storageChecks,
    ...tableChecks,
    ...homepageChecks,
    ...publicProjectChecks
  ].filter((check) => check.status === "warning").length;

  const overallStatus: AdminDebugStatus = errorCount > 0 ? "error" : warningCount > 0 ? "warning" : "ok";

  return {
    generatedAt,
    overallStatus,
    counts: {
      projects: projects.length,
      activeProjects: projects.filter((project) => project.status === "active").length,
      activeIncompleteProjects: projectWarnings.length,
      mediaRows: mediaRows.length,
      roomRows: roomRows.length,
      issueCount: issues.length
    },
    env: envChecks,
    storage: storageChecks,
    tables: tableChecks,
    homepage: homepageChecks,
    publicProjects: publicProjectChecks,
    projectWarnings,
    issues
  };
}
