"use client";
import { usePowerUp, Station } from "@/lib/PowerUpContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PanelDrawer from "@/components/PanelDrawer";
import CircuitDrawer from "@/components/CircuitDrawer";
import StationEditor from "@/components/StationEditor";

export default function SiteSummary() {
  const [state, dispatch] = usePowerUp();
  const router = useRouter();
  const [panelDrawerOpen, setPanelDrawerOpen] = useState(false);
  const [editingPanelIdx, setEditingPanelIdx] = useState<number | null>(null);
  const [circuitDrawerOpen, setCircuitDrawerOpen] = useState(false);
  const [editingCircuit, setEditingCircuit] = useState<{ panelIdx: number; circuitIdx: number | null } | null>(null);

  if (!state.site) return null;
  const { name, address, panels } = state.site;

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
    <div className="bg-white rounded shadow">
      <header className="bg-brand text-white p-3 rounded-t text-sm font-semibold">
        {name} — {address}
      </header>
      <div className="p-4 space-y-4">
        {panels.length === 0 && (
          <p className="text-gray-600 text-sm">No panels configured yet.</p>
        )}
        {panels.map((p, pi) => (
          <div key={p.id} className="border rounded p-3 space-y-2">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Panel: {p.id} <span className="text-xs text-gray-500 ml-3">{p.location}</span></div>
              <button className="text-xs text-brand underline" onClick={() => handleEditPanel(pi)}>Edit</button>
            </div>
            {p.circuits.map((c, ci) => (
              <div key={c.id} className="ml-4">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Circuit: {c.id}</div>
                  <button className="text-xs text-brand underline" onClick={() => handleEditCircuit(pi, ci)}>Edit</button>
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  Breaker: {c.breaker}A, Continuous: {c.continuous}A
                </div>
                {c.stations.map((s) => (
                  <div key={s.id} className="ml-4">
                    <StationEditor
                      station={s}
                      onUpdate={(updatedStation) => {
                        const newPanels = [...panels];
                        const panel = { ...newPanels[pi] };
                        const circuits = [...panel.circuits];
                        const circuit = { ...circuits[ci] };
                        const stations = [...circuit.stations];
                        const stationIndex = stations.findIndex(st => st.id === s.id);
                        if (stationIndex !== -1) {
                          stations[stationIndex] = updatedStation;
                          circuit.stations = stations;
                          circuits[ci] = circuit;
                          panel.circuits = circuits;
                          newPanels[pi] = panel;
                          dispatch({ type: "setPanels", panels: newPanels });
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
            <button className="mt-2 text-xs bg-brand text-white px-2 py-1 rounded" onClick={() => handleAddCircuit(pi)}>Add Circuit</button>
          </div>
        ))}
        <button className="w-full bg-brand text-white py-2 rounded" onClick={handleAddPanel}>Add Panel</button>
        <button
          className="w-full bg-brand text-white py-2 rounded"
          onClick={() => router.push("/power-up/finish")}
        >
          Finish Site Setup
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
    </div>
  );
} 