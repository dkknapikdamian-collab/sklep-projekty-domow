import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getHomepageHeroContent } from "@/lib/site-content";
import { AdminHomepageContentForm } from "@/components/admin/AdminHomepageContentForm";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  const hero = await getHomepageHeroContent();

  return (
    <>
      <AdminHeader />
      <main className="admin-shell">
        <section className="admin-page-head">
          <div>
            <span>ADMIN / STRONA GLOWNA</span>
            <h1>Strona glowna</h1>
            <p>Zarzadzaj trescia hero, banerem i CTA bez edycji kodu.</p>
          </div>
          <Link href="/admin" className="admin-secondary-button">Powrot do admina</Link>
        </section>

        <AdminHomepageContentForm hero={hero} />
      </main>
    </>
  );
}
