"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createAdminClient } from "@/lib/supabase/admin-client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    const supabase = createAdminClient();

    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      const { data: admin } = await supabase
        .from("admins")
        .select("email, role")
        .eq("user_id", user.id)
        .single();

      if (!admin) {
        router.push("/admin/login");
        return;
      }

      setUserEmail(admin.email);
      setChecking(false);
    }

    checkAuth();
  }, [isLoginPage, router]);

  async function handleLogout() {
    const supabase = createAdminClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-navy">Checking access...</div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/admin/leads", label: "Leads", icon: "🎯" },
  ];

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-white text-navy px-3 py-1 rounded-lg font-bold text-lg">TPS</div>
            <span className="text-xs text-white/60 uppercase tracking-wider">Admin</span>
          </div>
          <p className="text-xs text-white/50 mt-2 truncate">{userEmail}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="block text-xs text-white/50 hover:text-white/80 mb-3"
          >
            ← Back to public site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-white/70 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}