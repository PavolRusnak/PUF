"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSite } from "@/lib/mockApi";
import { usePowerUp } from "@/lib/PowerUpContext";
import StepNavigation from "@/components/StepNavigation";

export default function StationEntry() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [, dispatch] = usePowerUp();

  const steps = [
    { id: "panels", title: "Panel & Circuits", description: "Configuration", completed: false, current: true },
    { id: "optional", title: "Optional", description: "Stalls & Images", completed: false, current: false },
    { id: "finish", title: "Contact", description: "Submit", completed: false, current: false },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const site = await fetchSite(id || "1234");
      const hasAssigned = site.panels.some((p) => p.circuits.some((c) => c.stations.length));
      dispatch({ type: "init", payload: { site, mode: hasAssigned ? "UPDATE" : "NEW" } });
      
      if (hasAssigned) {
        router.push("/power-up/mode");
      } else {
        router.push("/power-up/site");
      }
    } catch {
      setError("Failed to fetch site data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hc-dark-blue via-hc-navy to-hc-dark-blue">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <img 
                src="/Logo.png" 
                alt="Hypercharge Networks" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">Power Up</h1>
            <p className="text-hc-beige text-lg mb-2">Hypercharge Networks</p>
            <p className="text-hc-beige/80 text-sm">Enter station ID to begin configuration</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="stationId" className="block text-sm font-semibold text-hc-dark-blue mb-3">
                  Station ID
                </label>
                <div className="relative">
                  <input
                    id="stationId"
                    type="text"
                    required
                    className="w-full border-2 border-hc-light-blue rounded-xl px-4 py-4 text-lg focus:ring-2 focus:ring-hc-orange focus:border-hc-orange transition-all bg-white/80"
                    placeholder="e.g., 1234"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-hc-grey" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-hc-orange to-hc-orange/90 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 