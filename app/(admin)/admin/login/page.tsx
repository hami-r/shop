"use client";

import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { getSupabaseBrowser } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setError("Add Supabase env vars to enable admin login.");
      setBusy(false);
      return;
    }
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setBusy(false);
      return;
    }
    const check = await fetch("/api/admin/session", { cache: "no-store" }).then((res) => res.json()).catch(() => null);
    if (!check?.admin) {
      await supabase.auth.signOut();
      setError("This account is not an admin. Add its email to ADMIN_EMAILS in your Netlify environment variables.");
      setBusy(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <section className="grid min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_32%),linear-gradient(135deg,#fcf9f8_0%,#f0eded_100%)] px-5 py-8 md:px-16">
      <div className="mx-auto grid w-full max-w-boutique items-center gap-8 lg:grid-cols-[1fr_440px]">
        <div className="hidden lg:block">
          <p className="label text-secondary">Al Miaraj Admin</p>
          <h1 className="mt-4 max-w-xl font-display text-6xl font-semibold leading-tight text-primary">
            Shop admin for products and enquiries.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-on-surface-variant">
            Manage products, availability, and customer messages from one protected dashboard.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary shadow-boutique">
            <ShieldCheck className="text-secondary" size={18} />
            Supabase Auth protected
          </div>
        </div>

        <form onSubmit={login} className="grid gap-5 rounded-3xl bg-white/90 p-6 shadow-boutique ring-1 ring-white md:p-8">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-white">
            <LockKeyhole size={22} />
          </div>
          <div>
            <p className="label text-secondary">Admin Login</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary">Sign in to Al Miaraj</h2>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">
              Use the email and password you created in Supabase Authentication.
            </p>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-primary">
            Email
            <input
              className="input"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-primary">
            Password
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <p className="rounded-2xl bg-error/10 p-3 text-sm font-semibold text-error">{error}</p> : null}
          <button className="btn-primary w-full" disabled={!email || !password || busy} aria-busy={busy}>
            {busy ? <Spinner /> : null}
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}
