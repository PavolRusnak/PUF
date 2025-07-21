"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitPowerUp } from "@/lib/submitPowerUp";
import StepNavigation from "@/components/StepNavigation";
import { useToast } from "@/lib/toast";

export default function Finish() {
  const router = useRouter();
  const { push: showToast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const steps = [
    { id: "panels", title: "Panel & Circuits", description: "Configuration", completed: true, current: false },
    { id: "optional", title: "Optional", description: "Stalls & Images", completed: true, current: false },
    { id: "finish", title: "Finish", description: "Submit", completed: false, current: true },
  ];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitPowerUp({});
      showToast("Power Up submitted successfully!");
      router.push("/power-up/success");
    } catch (error) {
      showToast("Failed to submit form. Please try again.");
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
        <form onSubmit={onSubmit} className="space-y-4">
          <h2 className="text-hc-dark-blue text-xl font-semibold">Finish Site Setup</h2>
          <input required placeholder="Full Name" className="w-full border border-hc-light-blue p-3 rounded-lg focus:ring-2 focus:ring-hc-orange focus:border-transparent" />
          <input required type="email" placeholder="Email" className="w-full border border-hc-light-blue p-3 rounded-lg focus:ring-2 focus:ring-hc-orange focus:border-transparent" />
          <input required placeholder="Phone" className="w-full border border-hc-light-blue p-3 rounded-lg focus:ring-2 focus:ring-hc-orange focus:border-transparent" />
          <textarea placeholder="Notes (optional)" className="w-full border border-hc-light-blue p-3 rounded-lg focus:ring-2 focus:ring-hc-orange focus:border-transparent" rows={3} />
          
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => router.push("/power-up/optional")}
              className="flex-1 bg-hc-beige text-hc-grey py-3 rounded-lg font-semibold hover:bg-hc-beige/80 transition-all"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-hc-orange text-white py-3 rounded-lg font-semibold hover:bg-hc-orange/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 