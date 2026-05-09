"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin-client";

type Lead = {
  id: string;
  source: string | null;
  source_url: string | null;
  property_address: string | null;
  postcode: string | null;
  borough: string | null;
  bedrooms: number | null;
  property_type: string | null;
  listed_rent: number | null;
  days_on_market: number | null;
  is_reduced: boolean | null;
  vacant_signal: boolean | null;
  ai_score: number | null;
  ai_reasoning: string | null;
  ai_suggested_strategy: string | null;
  status: string | null;
  created_at: string;
  raw_data: Record<string, unknown> | null;
};

type Landlord = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  is_company: boolean | null;
  company_name: string | null;
};

type Note = {
  id: string;
  note: string;
  added_by: string | null;
  created_at: string;
};

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [landlord, setLandlord] = useState<Landlord | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    async function loadLead() {
      const supabase = createAdminClient();
      const [leadRes, landlordRes, notesRes] = await Promise.all([
        supabase.from("leads_properties").select("*").eq("id", leadId).single(),
        supabase.from("leads_landlords").select("*").eq("property_id", leadId).maybeSingle(),
        supabase.from("leads_notes").select("*").eq("property_id", leadId).order("created_at", { ascending: false }),
      ]);
      setLead(leadRes.data);
      setLandlord(landlordRes.data);
      setNotes(notesRes.data || []);
      setLoading(false);
    }
    loadLead();
  }, [leadId]);

  async function updateStatus(newStatus: string) {
    if (!lead) return;
    setUpdatingStatus(true);
    const supabase = createAdminClient();
    await supabase.from("leads_properties").update({ status: newStatus }).eq("id", lead.id);
    setLead({ ...lead, status: newStatus });
    setUpdatingStatus(false);
  }

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSavingNote(true);
    const supabase = createAdminClient();
    const userRes = await supabase.auth.getUser();
    const userEmail = userRes.data.user?.email || "admin";
    const insertRes = await supabase
      .from("leads_notes")
      .insert({ property_id: leadId, note: newNote.trim(), added_by: userEmail })
      .select()
      .single();
    if (insertRes.data) {
      setNotes([insertRes.data, ...notes]);
      setNewNote("");
    }
    setSavingNote(false);
  }

  if (loading) {
    return <div className="p-8 text-gray-500">Loading lead...</div>;
  }

  if (!lead) {
    return (
      <div className="p-8">
        <p className="text-gray-500 mb-4">Lead not found.</p>
        <Link href="/admin/leads" className="text-brand-blue hover:underline">Back to leads</Link>
      </div>
    );
  }

  const score = lead.ai_score || 0;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link href="/admin/leads" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy mb-4">
        Back to leads
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy mb-1">{lead.property_address || "Unknown address"}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
              <span>{lead.borough || "-"}</span>
              <span>|</span>
              <span>{lead.bedrooms || "?"} bed {lead.property_type || ""}</span>
              {lead.days_on_market ? (
                <>
                  <span>|</span>
                  <span>{lead.days_on_market} days listed</span>
                </>
              ) : null}
              {lead.is_reduced ? (
                <>
                  <span>|</span>
                  <span className="text-red-600 font-medium">Price reduced</span>
                </>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ScoreBadge score={score} />
            <select
              value={lead.status || "new"}
              disabled={updatingStatus}
              onChange={(e) => updateStatus(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-brand-blue bg-white"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="replied">Replied</option>
              <option value="meeting">Meeting</option>
              <option value="deal">Deal</option>
              <option value="dead">Dead</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Section title="AI Analysis">
            {lead.ai_reasoning ? (
              <>
                <p className="text-gray-700 leading-relaxed mb-4">{lead.ai_reasoning}</p>
                {lead.ai_suggested_strategy ? (
                  <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                    Suggested strategy: {lead.ai_suggested_strategy}
                  </div>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-gray-400 italic">AI analysis pending. Run the scoring engine to generate insights.</p>
            )}
          </Section>

          <Section title="Property Details">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <DetailRow label="Source" value={lead.source} />
              <DetailRow label="Postcode" value={lead.postcode} />
              <DetailRow label="Bedrooms" value={lead.bedrooms ? String(lead.bedrooms) : null} />
              <DetailRow label="Type" value={lead.property_type} />
              <DetailRow label="Listed rent" value={lead.listed_rent ? "GBP " + lead.listed_rent + "/mo" : null} />
              <DetailRow label="Days on market" value={lead.days_on_market ? String(lead.days_on_market) : null} />
            </div>
            {lead.source_url ? (
              <a href={lead.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-blue text-sm hover:underline mt-4">
                View original listing
              </a>
            ) : null}
          </Section>

          <Section title={"Notes (" + notes.length + ")"}>
            <form onSubmit={addNote} className="mb-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
              <button
                type="submit"
                disabled={savingNote || !newNote.trim()}
                className="mt-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy-dark disabled:opacity-50"
              >
                {savingNote ? "Saving..." : "Add note"}
              </button>
            </form>

            <div className="space-y-3">
              {notes.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No notes yet.</p>
              ) : (
                notes.map((n) => (
                  <div key={n.id} className="bg-cream rounded-lg p-3">
                    <p className="text-sm text-gray-700">{n.note}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                      <span>{n.added_by || "-"}</span>
                      <span>|</span>
                      <span>{new Date(n.created_at).toLocaleString("en-GB")}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Landlord">
            {landlord ? (
              <div className="space-y-3 text-sm">
                <DetailRow label="Name" value={landlord.full_name} />
                <DetailRow label="Email" value={landlord.email} />
                <DetailRow label="Phone" value={landlord.phone} />
                {landlord.is_company ? <DetailRow label="Company" value={landlord.company_name} /> : null}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No landlord contact details yet.</p>
            )}
          </Section>

          <Section title="Outreach">
            <p className="text-sm text-gray-400 italic">Outreach automation coming soon.</p>
            <button disabled className="mt-3 w-full bg-gray-100 text-gray-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
              Generate AI outreach (soon)
            </button>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">{title}</h2>
      {children}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-navy font-medium">{value || "-"}</div>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  if (score === 0) return <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-lg">Unscored</span>;
  if (score >= 85) return <span className="bg-brand-yellow text-navy text-xs font-bold px-3 py-1.5 rounded-lg">Score {score}</span>;
  if (score >= 70) return <span className="bg-brand-green/15 text-brand-green text-xs font-bold px-3 py-1.5 rounded-lg">Score {score}</span>;
  return <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg">Score {score}</span>;
}
