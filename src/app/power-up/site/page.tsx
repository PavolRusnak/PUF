"use client";
import { usePowerUp, Station } from "@/lib/PowerUpContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PanelDrawer from "@/components/PanelDrawer";
import CircuitDrawer from "@/components/CircuitDrawer";
import StationEditor from "@/components/StationEditor";
import StepNavigation from "@/components/StepNavigation";

export default function SiteSummary() {
  const [state, dispatch] = usePowerUp();
  const router = useRouter();
  const [panelDrawerOpen, setPanelDrawerOpen] = useState(false);
  const [editingPanelIdx, setEditingPanelIdx] = useState<number | null>(null);
  const [circuitDrawerOpen, setCircuitDrawerOpen] = useState(false);
  const [editingCircuit, setEditingCircuit] = useState<{ panelIdx: number; circuitIdx: number | null } | null>(null);

  if (!state.site) return null;
  const { name, address, panels } = state.site;

  const steps = [
    { id: "start", title: "Start", description: "Station ID", completed: true, current: false },
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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-hc-dark-blue to-hc-navy text-white px-4 py-3">
        <h1 className="text-xl font-bold text-center">Hypercharge Power-Up Form</h1>
      </div>
      <StepNavigation steps={steps} />
      
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4 p-3 bg-hc-beige rounded-lg border border-hc-light-blue">
          <div>
            <h2 className="text-lg font-semibold text-hc-dark-blue">{name}</h2>
            <p className="text-sm text-hc-grey">{address}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {panels.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium">No panels configured yet</p>
              <p className="text-gray-400 text-sm mt-1">Add your first panel to get started</p>
            </div>
          )}
          
          {panels.map((p, pi) => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Panel: {p.id || "Unnamed Panel"}</h3>
                  <p className="text-sm text-gray-500">{p.location || "No location specified"}</p>
                </div>
                              <button 
                className="text-hc-orange hover:text-hc-orange font-medium text-sm"
                onClick={() => handleEditPanel(pi)}
              >
                Edit
              </button>
              </div>
              
              {p.circuits.map((c, ci) => (
                <div key={c.id} className="ml-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">Circuit: {c.id || "Unnamed Circuit"}</h4>
                                      <button 
                    className="text-hc-orange hover:text-hc-orange font-medium text-sm"
                    onClick={() => handleEditCircuit(pi, ci)}
                  >
                    Edit
                  </button>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Breaker: {c.breaker}A, Continuous: {c.continuous}A
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
            className="w-full bg-hc-orange text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-hc-orange/90 transition-all"
            onClick={() => router.push("/power-up/finish")}
          >
            Finish Site Setup
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
    </div>
  );
} 