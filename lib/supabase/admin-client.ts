"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin-client";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createAdminClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (!data.session) {
      setError("Login succeeded but no session created. Please try again.");
      setLoading(false);
      return;
    }

    // Verify the user is in the admins table before redirecting
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("email")
      .eq("user_id", data.session.user.id)
      .single();

    if (adminError || !admin) {
      setError("Access denied. Your account is not authorized for admin access.");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    // Wait briefly to ensure cookies are written
    await new Promise(resolve => setTimeout(resolve, 200));

    // Use window.location for a hard navigation (forces fresh server-side check)
    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-dark to-navy flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-navy text-white px-6 py-3 rounded-xl mb-4">
            <span className="text-2xl font-bold tracking-wider">TPS</span>
          </div>
          <h1 className="text-2xl font-bold text-navy mb-2">Admin Login</h1>
          <p className="text-gray-500 text-sm">The Property Source Group</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              placeholder="contact@thepropertysourcegroup.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white py-3 rounded-lg font-bold hover:bg-navy-dark disabled:opacity-50 transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Restricted access. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}