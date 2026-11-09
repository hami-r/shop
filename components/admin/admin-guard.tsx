"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { getSupabaseBrowser } from "@/lib/supabase";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<"checking" | "authenticated" | "redirecting">(
    pathname === "/admin/login" ? "authenticated" : "checking"
  );

  useEffect(() => {
    let active = true;

    if (pathname === "/admin/login") {
      setStatus("authenticated");
      return;
    }

    setStatus("checking");
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setStatus("redirecting");
      router.replace("/admin/login");
      return;
    }

    const timeout = window.setTimeout(() => {
      if (!active) return;
      setStatus("redirecting");
      router.replace("/admin/login");
    }, 3000);

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        window.clearTimeout(timeout);
        if (data.session) {
          setStatus("authenticated");
          return;
        }
        setStatus("redirecting");
        router.replace("/admin/login");
      })
      .catch(() => {
        if (!active) return;
        window.clearTimeout(timeout);
        setStatus("redirecting");
        router.replace("/admin/login");
      });

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [pathname, router]);

  if (status !== "authenticated") {
    return (
      <div className="flex animate-fade-in items-center gap-3 px-5 py-16 text-stone md:px-16" role="status">
        <Spinner />
        {status === "checking" ? "Checking admin session…" : "Redirecting to admin login…"}
      </div>
    );
  }
  return <div className="animate-page-in">{children}</div>;
}

export function AdminNav() {
  const router = useRouter();
  async function signOut() {
    const supabase = getSupabaseBrowser();
    await supabase?.auth.signOut();
    router.push("/admin/login");
  }
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-outline-variant pb-5">
      <Link className="label text-primary" href="/admin">Dashboard</Link>
      <Link className="label text-primary" href="/admin/products">Products</Link>
      <Link className="label text-primary" href="/admin/categories">Categories</Link>
      <Link className="label text-primary" href="/admin/messages">Messages</Link>
      <button className="label text-secondary" onClick={signOut}>Sign out</button>
    </div>
  );
}
