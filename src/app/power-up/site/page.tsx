"use client";
import { usePowerUp, Station } from "@/lib/PowerUpContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import PanelDrawer from "@/components/PanelDrawer";
import CircuitDrawer from "@/components/CircuitDrawer";
import StationEditor from "@/components/StationEditor";
import StepNavigation from "@/components/StepNavigation";
import { UnassignedModal } from "@/components/UnassignedModal";
import { useToast } from "@/lib/toast";

export default function SiteSummary() {
  const [state, dispatch] = usePowerUp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { push: showToast } = useToast();
  const [panelDrawerOpen, setPanelDrawerOpen] = useState(false);
  const [editingPanelIdx, setEditingPanelIdx] = useState<number | null>(null);
  const [circuitDrawerOpen, setCircuitDrawerOpen] = useState(false);
  const [editingCircuit, setEditingCircuit] = useState<{ panelIdx: number; circuitIdx: number | null } | null>(null);
  const [showUnassignedModal, setShowUnassignedModal] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!state.site) return null;
  const { name, address, panels } = state.site;

  const steps = [
    { id: "panels", title: "Panel & Circuits", description: "Configuration", completed: false, current: true },
    { id: "optional", title: "Optional", description: "Stalls & Images", completed: false, current: false },
    { id: "finish", title: "Contact", description: "Submit", completed: false, current: false },
  ];

  function handleAddPanel() {
    setEditingPanelIdx(null);
    setPanelDrawerOpen(true);
  }
  
  function handleEditPanel(idx: number) {
    setEditingPanelIdx(idx);
    setPanelDrawerOpen(true);
  }
  
  function handleSavePanel(panel: { id: string; location: string }) {
    const newPanels = [...panels];
    if (editingPanelIdx === null) {
      newPanels.push({ ...panel, circuits: [] });
    } else {
      newPanels[editingPanelIdx] = { ...newPanels[editingPanelIdx], ...panel };
    }
    dispatch({ type: "setPanels", panels: newPanels });
    setPanelDrawerOpen(false);
  }

  function handleAddCircuit(panelIdx: number) {
    setEditingCircuit({ panelIdx, circuitIdx: null });
    setCircuitDrawerOpen(true);
  }
  
  function handleEditCircuit(panelIdx: number, circuitIdx: number) {
    setEditingCircuit({ panelIdx, circuitIdx });
    setCircuitDrawerOpen(true);
  }
  
  function handleSaveCircuit(circuit: { id: string; breaker: number; continuous: number; stations: Station[] }) {
    if (!editingCircuit) return;
    const newPanels = [...panels];
    const panel = { ...newPanels[editingCircuit.panelIdx] };
    const circuits = [...panel.circuits];
    if (editingCircuit.circuitIdx === null) {
      circuits.push(circuit);
    } else {
      circuits[editingCircuit.circuitIdx] = circuit;
    }
    panel.circuits = circuits;
    newPanels[editingCircuit.panelIdx] = panel;
    dispatch({ type: "setPanels", panels: newPanels });
    setCircuitDrawerOpen(false);
  }

  function handleContinueToOptional() {
    if (!state.site) return;
    const total = state.site.stations.length;
    const assigned = panels.flatMap(p => p.circuits.flatMap(c => c.stations)).length;
    
    if (assigned < total) {
      setShowUnassignedModal(true);
    } else {
      router.push("/power-up/optional");
    }
  }

  function handleContinueAnyway() {
    setShowUnassignedModal(false);
    router.push("/power-up/optional");
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
            <h1 className="text-lg font-semibold">{name}</h1>
            <p className="text-xs text-hc-beige">{address}</p>
          </div>
        </div>
      </div>
      <div className="fixed top-16 left-0 right-0 z-10">
        <StepNavigation steps={steps} />
      </div>
      
      <div className="pt-32 pb-20 p-4">
        <div className="space-y-6">
          {panels.length === 0 && (
            <button 
              onClick={handleAddPanel}
              className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center hover:shadow-md hover:border-hc-orange/30 transition-all transform hover:scale-[1.02] group"
            >
              <div className="w-20 h-20 bg-hc-orange rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No panels configured</h3>
              <p className="text-gray-500">Add your first panel to get started</p>
            </button>
          )}
          
          {panels.map((p, pi) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-hc-dark-blue to-hc-navy text-white px-4 py-0.5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {p.id || <span className="text-hc-beige italic">Enter panel name</span>}
                    </h3>
                  </div>
                  <button 
                    className="bg-hc-orange hover:bg-hc-orange/90 text-white font-medium text-sm px-3 py-1 rounded-lg transition-all"
                    onClick={() => handleEditPanel(pi)}
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-6">
                {p.circuits.map((c, ci) => (
                  <div key={c.id} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-hc-orange rounded flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-hc-dark-blue text-sm">
                          {c.id || <span className="text-hc-grey italic">Enter circuit name</span>}
                        </h4>
                      </div>
                      <button 
                        className="text-hc-orange hover:text-hc-orange/80 font-medium text-xs px-2 py-1 rounded hover:bg-hc-orange/10 transition-all"
                        onClick={() => handleEditCircuit(pi, ci)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-xs text-hc-grey mb-2">
                      <span className="font-medium">Breaker:</span> {c.breaker ? `${c.breaker}A` : <span className="text-hc-grey italic">Enter breaker size</span>} • 
                      <span className="font-medium ml-2">Continuous:</span> {c.continuous ? `${c.continuous}A` : <span className="text-hc-grey italic">Enter continuous size</span>}
                    </div>
                    {c.stations.map((s) => (
                      <div key={s.id} className="mb-1">
                        <StationEditor station={s} />
                      </div>
                    ))}
                  </div>
                ))}
                
                <button 
                  className="w-full bg-hc-orange text-white py-2 px-4 rounded-lg font-medium hover:bg-hc-orange/90 transition-all"
                  onClick={() => handleAddCircuit(pi)}
                >
                  Add Circuit
                </button>
              </div>
            </div>
          ))}
          
          <button 
            className="w-full bg-hc-navy text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-hc-navy/90 transition-all"
            onClick={handleAddPanel}
          >
            Add Additional Panel
          </button>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          className="w-full bg-hc-orange text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-hc-orange/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleContinueToOptional}
          disabled={loading}
        >
          Next
        </button>
      </div>
      
      <PanelDrawer
        open={panelDrawerOpen}
        onClose={() => setPanelDrawerOpen(false)}
        onSave={handleSavePanel}
        initialPanel={editingPanelIdx !== null ? panels[editingPanelIdx] : undefined}
      />
      <CircuitDrawer
        open={circuitDrawerOpen}
        onClose={() => setCircuitDrawerOpen(false)}
        onSave={handleSaveCircuit}
        initialCircuit={editingCircuit ? (editingCircuit.circuitIdx !== null ? panels[editingCircuit.panelIdx].circuits[editingCircuit.circuitIdx] : undefined) : undefined}
      />
      
      {showUnassignedModal && (
        <UnassignedModal
          onClose={() => setShowUnassignedModal(false)}
          onContinue={handleContinueAnyway}
        />
      )}
    </div>
  );
} 