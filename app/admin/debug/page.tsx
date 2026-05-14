import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAdminDebugDiagnostics, type AdminDebugCheck, type AdminDebugStatus } from "@/lib/admin/debug-diagnostics";
import { AlertTriangle, CheckCircle2, Database, HardDrive, Image as ImageIcon, ListChecks, ShieldAlert, Wrench } from "lucide-react";

export const dynamic = "force-dynamic";

function statusLabel(status: AdminDebugStatus) {
  if (status === "ok") return "OK";
  if (status === "warning") return "UWAGA";
  if (status === "error") return "BLAD";
  return "INFO";
}

function statusIcon(status: AdminDebugStatus) {
  if (status === "ok") return <CheckCircle2 size={18} />;
  if (status === "error") return <ShieldAlert size={18} />;
  if (status === "warning") return <AlertTriangle size={18} />;
  return <Wrench size={18} />;
}

function CheckRow({ check }: { check: AdminDebugCheck }) {
  return (
    <li className={`admin-debug-row admin-debug-${check.status}`}>
      <span className="admin-debug-row-icon">{statusIcon(check.status)}</span>
      <span className="admin-debug-row-main">
        <strong>{check.label}</strong>
        {check.detail ? <small>{check.detail}</small> : null}
      </span>
      <em>{check.value}</em>
    </li>
  );
}

function CheckSection({
  title,
  subtitle,
  icon,
  checks
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  checks: AdminDebugCheck[];
}) {
  return (
    <section className="admin-debug-card">
      <div className="admin-debug-card-head">
        <span className="admin-debug-card-icon">{icon}</span>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      <ul className="admin-debug-list">
        {checks.map((check) => (
          <CheckRow key={check.key} check={check} />
        ))}
      </ul>
    </section>
  );
}

export default async function AdminDebugPage() {
  const diagnostics = await getAdminDebugDiagnostics();

  return (
    <>
      <AdminHeader />
      <main className="admin-shell admin-debug-v26" data-admin-debug-v26="true">
        <section className={`admin-debug-hero admin-debug-${diagnostics.overallStatus}`}>
          <span>ADMIN / DEBUG V26</span>
          <h1>Panel diagnostyczny sklepu</h1>
          <p>
            Ten ekran pokazuje szybki stan konfiguracji, tabel, Storage, banera i publicznych projektow.
            Nie pokazuje sekretow ani wartosci kluczy.
          </p>
          <div className="admin-debug-hero-status">
            {statusIcon(diagnostics.overallStatus)}
            <strong>{statusLabel(diagnostics.overallStatus)}</strong>
            <small>Wygenerowano: {new Date(diagnostics.generatedAt).toLocaleString("pl-PL")}</small>
          </div>
        </section>

        <section className="admin-debug-metrics">
          <div>
            <span>Projekty</span>
            <strong>{diagnostics.counts.projects}</strong>
          </div>
          <div>
            <span>Active</span>
            <strong>{diagnostics.counts.activeProjects}</strong>
          </div>
          <div>
            <span>Braki active</span>
            <strong>{diagnostics.counts.activeIncompleteProjects}</strong>
          </div>
          <div>
            <span>Media rows</span>
            <strong>{diagnostics.counts.mediaRows}</strong>
          </div>
          <div>
            <span>Room rows</span>
            <strong>{diagnostics.counts.roomRows}</strong>
          </div>
          <div>
            <span>Problemy</span>
            <strong>{diagnostics.counts.issueCount}</strong>
          </div>
        </section>

        {diagnostics.issues.length > 0 ? (
          <section className="admin-debug-card admin-debug-priority">
            <div className="admin-debug-card-head">
              <span className="admin-debug-card-icon"><AlertTriangle size={22} /></span>
              <div>
                <h2>Najpierw popraw</h2>
                <p>Lista rzeczy, ktore najpewniej widac potem jako puste obrazki, zera albo brak publikacji.</p>
              </div>
            </div>
            <ol className="admin-debug-issues">
              {diagnostics.issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ol>
          </section>
        ) : (
          <section className="admin-debug-card admin-debug-clean">
            <div className="admin-debug-card-head">
              <span className="admin-debug-card-icon"><CheckCircle2 size={22} /></span>
              <div>
                <h2>Brak wykrytych problemow</h2>
                <p>Konfiguracja, baza, Storage i publiczne dane wygladaja poprawnie.</p>
              </div>
            </div>
          </section>
        )}

        <section className="admin-debug-grid">
          <CheckSection
            title="Env"
            subtitle="Czy aplikacja widzi wymagane zmienne."
            icon={<Wrench size={22} />}
            checks={diagnostics.env}
          />
          <CheckSection
            title="Storage"
            subtitle="Czy istnieja buckety dla banera, mediow i plikow prywatnych."
            icon={<HardDrive size={22} />}
            checks={diagnostics.storage}
          />
          <CheckSection
            title="Tabele"
            subtitle="Czy podstawowe tabele odpowiadaja."
            icon={<Database size={22} />}
            checks={diagnostics.tables}
          />
          <CheckSection
            title="Strona glowna"
            subtitle="Czy hero i baner sa zapisane w site_content."
            icon={<ImageIcon size={22} />}
            checks={diagnostics.homepage}
          />
          <CheckSection
            title="Katalog publiczny"
            subtitle="Czy active projekty maja dane potrzebne do publikacji."
            icon={<ListChecks size={22} />}
            checks={diagnostics.publicProjects}
          />
        </section>

        {diagnostics.projectWarnings.length > 0 ? (
          <section className="admin-debug-card">
            <div className="admin-debug-card-head">
              <span className="admin-debug-card-icon"><ListChecks size={22} /></span>
              <div>
                <h2>Aktywne projekty z brakami</h2>
                <p>Te projekty sa publiczne, ale moga pokazywac placeholdery, zera albo niepelna karte.</p>
              </div>
            </div>
            <div className="admin-debug-project-table">
              {diagnostics.projectWarnings.map((project) => (
                <article key={`${project.code}-${project.slug}`}>
                  <div>
                    <strong>{project.code}</strong>
                    <span>{project.name}</span>
                    <small>{project.slug || "brak slug"}</small>
                  </div>
                  <p>{project.warnings.join(", ")}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
