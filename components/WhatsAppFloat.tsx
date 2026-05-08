"use client";
import { useState, useEffect } from "react";

const WHATSAPP_URL = "https://chat.whatsapp.com/LNmC6iFAlAT0b6C3fwX9fM?mode=gi_t";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 max-w-xs animate-fade-up">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="font-display font-bold text-navy text-lg leading-tight">Daily Deals on WhatsApp</div>
            <button onClick={() => setExpanded(false)} className="text-gray-400 hover:text-gray-700 -mr-1 -mt-1" aria-label="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">Daily property deals, market insights, and expert tips, straight to your phone. Free to join.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] hover:bg-[#1eb558] text-white text-center py-3 rounded-lg font-semibold text-sm transition-colors">Join Free Community</a>
        </div>
      ) : null}
      <button onClick={() => setExpanded(!expanded)} className="bg-[#25D366] hover:bg-[#1eb558] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110" aria-label="WhatsApp community">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.297-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>
      </button>
    </div>
  );
}
