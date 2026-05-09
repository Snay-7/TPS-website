"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin-client";

type Stats = {
  newToday: number;
  hotLeads: number;
  pendingReplies: number;
  totalLeads: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ newToday: 0, hotLeads: 0, pendingReplies: 0, totalLeads: 0 });
  const [hotLeads, setHotLeads] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const supabase = createAdminClient();

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const [newTodayRes, hotLeadsRes, totalRes] = await Promise.all([
        supabase.from("leads_properties").select("id", { count: "exact", head: true }).gte("created_at", startOfToday.toISOString()),
        supabase.from("leads_properties").select("*").gte("ai_score", 80).eq("status", "new").order("ai_score", { ascending: false }).limit(5),
        supabase.from("leads_properties").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        newToday: newTodayRes.count || 0,
        hotLeads: hotLeadsRes.data?.length || 0,
        pendingReplies: 0,
        totalLeads: totalRes.count || 0,
      });
      setHotLeads(hotLeadsRes.data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">TPS Lead Engine — Real-time overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="New Today" value={stats.newToday} color="blue" />
        <StatCard label="Hot Leads" value={stats.hotLeads} color="yellow" />
        <StatCard label="Replies Pending" value={stats.pendingReplies} color="green" />
        <StatCard label="Total Leads" value={stats.totalLeads} color="navy" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-navy">⚡ Hot Leads Needing Action</h2>
          <Link href="/admin/leads" className="text-sm text-brand-blue hover:underline">View all →</Link>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm py-8 text-center">Loading...</p>
        ) : hotLeads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">No hot leads yet.</p>
            <p className="text-xs text-gray-400">Once your scrapers start finding properties, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {hotLeads.map((lead) => (
              <Link
                key={String(lead.id)}
                href={`/admin/leads/${lead.id}`}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-brand-blue hover:bg-cream transition-colors"
              >
                <div>
                  <div className="font-semibold text-navy">{String(lead.property_address || "Unknown address")}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {String(lead.borough || "—")} • {String(lead.bedrooms || "?")} bed • {lead.days_on_market ? `${lead.days_on_market} days listed` : "New"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-brand-yellow text-navy px-3 py-1 rounded-full text-xs font-bold inline-block">
                    Score {String(lead.ai_score)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    yellow: "bg-brand-yellow/10 text-amber-700 border-brand-yellow/30",
    green: "bg-brand-green/10 text-brand-green border-brand-green/20",
    navy: "bg-navy/10 text-navy border-navy/20",
  };
  return (
    <div className={`bg-white rounded-2xl border ${colors[color]} p-5`}>
      <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{label}</div>
      <div className="text-3xl font-bold text-navy">{value}</div>
    </div>
  );
}