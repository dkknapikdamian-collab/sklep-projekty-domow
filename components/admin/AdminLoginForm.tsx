"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, LogIn, ShieldAlert } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentReason = params.get("reason");
    if (currentReason) setReason(currentReason);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!supabase) {
      setError("Brak konfiguracji Supabase. Uzupełnij env.");
      return;
    }

    setPending(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setPending(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  if (!supabase) {
    return (
      <div className="admin-login-card">
        <ShieldAlert size={34} />
        <h1>Brak konfiguracji Supabase</h1>
        <p>Uzupełnij NEXT_PUBLIC_SUPABASE_URL oraz NEXT_PUBLIC_SUPABASE_ANON_KEY lokalnie albo przez Vercel env.</p>
      </div>
    );
  }

  return (
    <form className="admin-login-card" onSubmit={handleSubmit}>
      <LockKeyhole size={36} />
      <h1>Logowanie admina</h1>
      <p>Ten ekran używa Supabase Auth. Dostęp do panelu wymaga konta z rolą admin w tabeli profiles.</p>

      {reason === "not_admin" && (
        <div className="admin-login-warning">
          Konto jest zalogowane, ale nie ma roli admin.
        </div>
      )}

      {reason === "not_logged_in" && (
        <div className="admin-login-warning">
          Zaloguj się, żeby wejść do panelu.
        </div>
      )}

      <label>
        E-mail
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>

      <label>
        Hasło
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </label>

      {error && <div className="admin-login-error">{error}</div>}

      <button type="submit" disabled={pending}>
        <LogIn size={18} />
        {pending ? "Logowanie..." : "Zaloguj"}
      </button>
    </form>
  );
}
