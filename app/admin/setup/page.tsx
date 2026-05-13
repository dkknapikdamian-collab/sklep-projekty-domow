import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function AdminSetupPage() {
  return (
    <main className="admin-auth-page">
      <section className="admin-login-card wide">
        <ShieldAlert size={36} />
        <h1>Supabase setup wymagany</h1>
        <p>
          Panel admina jest juz przygotowany pod Supabase Auth, ale brakuje konfiguracji env albo profilu admina.
        </p>

        <div className="admin-setup-list">
          <h2>Minimalne kroki</h2>
          <ol>
            <li>Dodaj env: NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY.</li>
            <li>W Supabase SQL uruchom migracje z folderu supabase/migrations.</li>
            <li>Utworz konto uzytkownika w Supabase Auth.</li>
            <li>Dodaj rekord do profiles z role = admin.</li>
            <li>Wejdz ponownie na /admin/login.</li>
          </ol>
        </div>

        <Link href="/admin/login" className="admin-login-link">Przejdz do logowania</Link>
      </section>
    </main>
  );
}
