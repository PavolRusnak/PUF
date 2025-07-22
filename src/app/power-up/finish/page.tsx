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
    { id: "finish", title: "Contact", description: "Submit", completed: false, current: true },
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
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-r from-hc-dark-blue to-hc-navy text-white px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-hc-orange rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Hypercharge North Vancouver</h1>
            <p className="text-xs text-hc-beige">456 Lonsdale Ave, North Vancouver, BC</p>
          </div>
        </div>
      </div>
      <div className="fixed top-16 left-0 right-0 z-10">
        <StepNavigation steps={steps} />
      </div>
      
      <div className="pt-32 pb-20 p-6">
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-hc-dark-blue mb-2">Contact Information</h2>
            <p className="text-hc-grey">Provide your contact details to complete the setup</p>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <input required placeholder="Full Name" className="w-full border border-hc-light-blue p-3 rounded-lg focus:ring-2 focus:ring-hc-orange focus:border-transparent" />
            <input required type="email" placeholder="Email" className="w-full border border-hc-light-blue p-3 rounded-lg focus:ring-2 focus:ring-hc-orange focus:border-transparent" />
            <input required placeholder="Phone" className="w-full border border-hc-light-blue p-3 rounded-lg focus:ring-2 focus:ring-hc-orange focus:border-transparent" />
            <textarea placeholder="Notes (optional)" className="w-full border border-hc-light-blue p-3 rounded-lg focus:ring-2 focus:ring-hc-orange focus:border-transparent" rows={3} />
          </form>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
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
            onClick={onSubmit}
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
      </div>
    </div>
  );
} 