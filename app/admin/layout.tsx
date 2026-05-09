"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createAdminClient } from "@/lib/supabase/admin-client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState("");

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    const supabase = createAdminClient();
    supabase.auth.getUser().then((res: { data: { user: { email?: string } | null } }) => {
      const user = res.data.user;
     if (user?.email) setUserEmail(user.email);
    });
  }, [isLoginPage]);

  async function handleLogout() {
    const supabase = createAdminClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  if (isLoginPage) return <>{children}</>;

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 12.5V19a1.5 1.5 0 001.5 1.5h3.5V14H8a.5.5 0 01-.5-.5v-1A.5.5 0 018 12h.5V5.5L4.146 9.854a.5.5 0 00-.146.354v2.292z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20.5 12.5V19a1.5 1.5 0 01-1.5 1.5h-3.5V14h.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-.5V5.5l4.354 4.354a.5.5 0 01.146.354v2.292z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 20.5h6V12a.5.5 0 00-.5-.5h-5a.5.5 0 00-.5.5v8.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 3.5L8.5 7h7L12 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      href: "/admin/leads",
      label: "Leads",
      icon: (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 3v4a1 1 0 001 1h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      href: "#",
      label: "Outreach",
      disabled: true,
      icon: (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 12L5 4l16 8-16 8 1.5-8m0 0H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      href: "#",
      label: "Settings",
      disabled: true,
      icon: (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19.5 12c0-.6-.05-1.18-.15-1.74l1.96-1.53-2-3.46-2.31.93a7.51 7.51 0 00-3-1.74L13.5 2h-3l-.5 2.46a7.5 7.5 0 00-3 1.74l-2.31-.93-2 3.46 1.96 1.53c-.1.56-.15 1.14-.15 1.74s.05 1.18.15 1.74L2.69 15.27l2 3.46 2.31-.93a7.51 7.51 0 003 1.74L10.5 22h3l.5-2.46a7.5 7.5 0 003-1.74l2.31.93 2-3.46-1.96-1.53c.1-.56.15-1.14.15-1.74z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cream flex">
      <aside className="w-64 bg-navy text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-white text-navy px-3 py-1 rounded-lg font-bold text-lg">TPS</div>
            <span className="text-xs text-white/60 uppercase tracking-wider">Admin</span>
          </div>
          <p className="text-xs text-white/50 mt-2 truncate">{userEmail || "Loading..."}</p>
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
          <Link href="/" className="block text-xs text-white/50 hover:text-white/80 mb-3">
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

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}