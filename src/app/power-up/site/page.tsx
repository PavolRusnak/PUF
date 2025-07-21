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
    { id: "finish", title: "Finish", description: "Submit", completed: false, current: false },
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
      <div className="bg-gradient-to-r from-hc-dark-blue to-hc-navy text-white px-4 py-4">
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
      <StepNavigation steps={steps} />
      
      <div className="max-w-4xl mx-auto p-4">
        
        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {panels.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No panels configured</h3>
              <p className="text-gray-500">Add your first panel to get started</p>
            </div>
          )}
          
                    {panels.map((p, pi) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-hc-navy rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-hc-dark-blue">
                      {p.id || <span className="text-hc-grey italic">Enter panel name</span>}
                    </h3>
                    <p className="text-sm text-hc-grey">{p.location || "No location specified"}</p>
                  </div>
                </div>
                <button 
                  className="text-hc-orange hover:text-hc-orange/80 font-medium text-sm px-3 py-1 rounded-lg hover:bg-hc-orange/10 transition-all"
                  onClick={() => handleEditPanel(pi)}
                >
                  Edit
                </button>
              </div>
              
              {p.circuits.map((c, ci) => (
                <div key={c.id} className="ml-6 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-hc-orange rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 14H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-hc-dark-blue">
                        {c.id || <span className="text-hc-grey italic">Enter circuit name</span>}
                      </h4>
                    </div>
                    <button 
                      className="text-hc-orange hover:text-hc-orange/80 font-medium text-sm px-2 py-1 rounded hover:bg-hc-orange/10 transition-all"
                      onClick={() => handleEditCircuit(pi, ci)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-sm text-hc-grey mb-3">
                    <span className="font-medium">Breaker:</span> {c.breaker ? `${c.breaker}A` : <span className="text-hc-grey italic">Enter breaker size</span>} • 
                    <span className="font-medium ml-2">Continuous:</span> {c.continuous ? `${c.continuous}A` : <span className="text-hc-grey italic">Enter continuous size</span>}
                  </div>
                                  {c.stations.map((s) => (
                  <div key={s.id} className="mb-2">
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
          ))}
          
          <div className="space-y-4">
            <button 
              className="w-full bg-hc-navy text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-hc-navy/90 transition-all"
              onClick={handleAddPanel}
            >
              Add Panel
            </button>
            
            <button
              className="w-full bg-hc-orange text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-hc-orange/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleContinueToOptional}
              disabled={loading}
            >
              Next
            </button>
          </div>
        </div>
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