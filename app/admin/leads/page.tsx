"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin-client";

type Lead = {
  id: string;
  property_address: string | null;
  postcode: string | null;
  borough: string | null;
  bedrooms: number | null;
  property_type: string | null;
  listed_rent: number | null;
  days_on_market: number | null;
  ai_score: number | null;
  status: string | null;
  created_at: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterBorough, setFilterBorough] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadLeads() {
      const supabase = createAdminClient();
      let query = supabase.from("leads_properties").select("*").order("ai_score", { ascending: false, nullsFirst: false });

      if (filterStatus !== "all") query = query.eq("status", filterStatus);
      if (filterBorough !== "all") query = query.eq("borough", filterBorough);
      if (search) query = query.ilike("property_address", `%${search}%`);

      const { data } = await query.limit(100);
      setLeads(data || []);
      setLoading(false);
    }
    loadLeads();
  }, [filterStatus, filterBorough, search]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-1">Leads</h1>
        <p className="text-gray-500 text-sm">{leads.length} leads — sorted by AI score</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue text-sm"
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue text-sm">
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="replied">Replied</option>
          <option value="meeting">Meeting</option>
          <option value="deal">Deal</option>
          <option value="dead">Dead</option>
        </select>
        <select value={filterBorough} onChange={(e) => setFilterBorough(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue text-sm">
          <option value="all">All boroughs</option>
          <option value="Camden">Camden</option>
          <option value="Hackney">Hackney</option>
          <option value="Lambeth">Lambeth</option>
          <option value="Southwark">Southwark</option>
          <option value="Tower Hamlets">Tower Hamlets</option>
          <option value="Westminster">Westminster</option>
          <option value="Islington">Islington</option>
          <option value="Lewisham">Lewisham</option>
          <option value="Wandsworth">Wandsworth</option>
          <option value="Newham">Newham</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <p className="text-gray-500 text-sm py-12 text-center">Loading leads...</p>
        ) : leads.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-2">No leads yet.</p>
            <p className="text-xs text-gray-400">Set up your scrapers to start finding properties.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-cream border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Score</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Property</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Borough</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Days</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Rent</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-cream cursor-pointer">
                  <td className="px-4 py-3">
                    <ScoreBadge score={lead.ai_score} />
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="text-navy font-medium hover:underline text-sm">
                      {lead.property_address || "Unknown"}
                    </Link>
                    <div className="text-xs text-gray-500">{lead.bedrooms || "?"} bed {lead.property_type || ""}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{lead.borough || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{lead.days_on_market || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{lead.listed_rent ? `£${lead.listed_rent}` : "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <span className="text-xs text-gray-400">—</span>;
  if (score >= 85) return <span className="bg-brand-yellow text-navy text-xs font-bold px-2 py-1 rounded">⚡ {score}</span>;
  if (score >= 70) return <span className="bg-brand-green/20 text-brand-green text-xs font-bold px-2 py-1 rounded">{score}</span>;
  return <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{score}</span>;
}

function StatusBadge({ status }: { status: string | null }) {
  const config: Record<string, { bg: string; text: string }> = {
    new: { bg: "bg-blue-50", text: "text-blue-700" },
    contacted: { bg: "bg-yellow-50", text: "text-yellow-700" },
    replied: { bg: "bg-green-50", text: "text-green-700" },
    meeting: { bg: "bg-purple-50", text: "text-purple-700" },
    deal: { bg: "bg-emerald-50", text: "text-emerald-700" },
    dead: { bg: "bg-gray-100", text: "text-gray-500" },
  };
  const c = config[status || "new"] || config.new;
  return <span className={`${c.bg} ${c.text} text-xs font-medium px-2 py-1 rounded capitalize`}>{status || "new"}</span>;
}