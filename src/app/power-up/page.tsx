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
    { id: "start", title: "Start", description: "Station ID", completed: false, current: true },
    { id: "panels", title: "Panel & Circuits", description: "Configuration", completed: false, current: false },
    { id: "optional", title: "Optional", description: "Stalls & Images", completed: false, current: false },
    { id: "finish", title: "Finish", description: "Submit", completed: false, current: false },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const site = await fetchSite(id || "1234");
      const hasAssigned = site.panels.some((p) => p.circuits.some((c) => c.stations.length));
      dispatch({ type: "init", payload: { site, mode: hasAssigned ? "UPDATE" : "NEW" } });
      router.push("/power-up/site");
    } catch {
      setError("Failed to fetch site data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-hc-dark-blue to-hc-navy text-white px-4 py-3">
        <h1 className="text-xl font-bold text-center">Hypercharge Power-Up Form</h1>
      </div>
      <StepNavigation steps={steps} />
      
      <div className="flex-1 p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Enter Station ID</h2>
          <p className="text-gray-600">Enter the station ID to begin configuration</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="stationId" className="block text-sm font-medium text-gray-700 mb-2">
              Station ID
            </label>
            <div className="relative">
              <input
                id="stationId"
                type="text"
                required
                className="w-full border border-hc-light-blue rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-hc-orange focus:border-transparent transition-all"
                placeholder="Example: 1234"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-hc-orange text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-hc-orange/90 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
} 