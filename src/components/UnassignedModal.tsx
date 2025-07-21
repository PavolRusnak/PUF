"use client";
import { usePowerUp } from "@/lib/PowerUpContext";

export function UnassignedModal({ onClose, onContinue }: { onClose: () => void; onContinue: () => void }) {
  const [{ site }] = usePowerUp();
  if (!site) return null;

  const total = site.stations.length;
  const assigned = site.panels.flatMap(p => p.circuits.flatMap(c => c.stations)).length;
  const missing = total - assigned;
  if (missing === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white rounded-t sm:rounded shadow-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold text-hc-dark-blue">Un-assigned stations</h2>
        <p className="text-sm text-hc-grey">
          Only <strong>{assigned}/{total}</strong> stations are assigned.
          Do you want to return and complete them?
        </p>
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 border border-hc-light-blue text-hc-grey rounded-lg py-3 font-medium hover:bg-hc-beige transition-all"
          >
            Back
          </button>
          <button 
            onClick={onContinue} 
            className="flex-1 bg-hc-orange text-white rounded-lg py-3 font-medium hover:bg-hc-orange/90 transition-all"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </div>
  );
} 