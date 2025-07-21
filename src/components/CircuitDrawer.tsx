import { useState, useEffect } from "react";
import { Station, usePowerUp } from "@/lib/PowerUpContext";
import StationSelector from "./StationSelector";

export default function CircuitDrawer({
  open,
  onClose,
  onSave,
  initialCircuit,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (circuit: { id: string; breaker: number; continuous: number; stations: Station[] }) => void;
  initialCircuit?: { id: string; breaker: number; continuous: number; stations: Station[] };
}) {
  const [state] = usePowerUp();
  const [id, setId] = useState(initialCircuit?.id || "");
  const [breaker, setBreaker] = useState("");
  const [continuous, setContinuous] = useState("");
  const [stations, setStations] = useState<Station[]>(initialCircuit?.stations || []);

  useEffect(() => {
    if (breaker && !isNaN(Number(breaker)) && Number(breaker) > 0) {
      const continuousValue = Math.floor(Number(breaker) * 0.8);
      setContinuous(continuousValue.toString());
    }
  }, [breaker]);

  useEffect(() => {
    if (open && initialCircuit) {
      setId(initialCircuit.id);
      setBreaker(initialCircuit.breaker.toString());
      setContinuous(initialCircuit.continuous.toString());
      setStations(initialCircuit.stations);
    } else if (open) {
      setId("");
      setBreaker("");
      setContinuous("");
      setStations([]);
    }
  }, [open, initialCircuit]);

  if (!open) return null;

  function handleSelectStation(station: Station) {
    if (stations.some(s => s.id === station.id)) {
      setStations(stations.filter(s => s.id !== station.id));
    } else {
      // Check if station is already assigned to any circuit
      const isAlreadyAssigned = state.site?.panels.some(panel =>
        panel.circuits.some(circuit =>
          circuit.stations.some(s => s.id === station.id)
        )
      );
      
      if (isAlreadyAssigned) {
        alert(`Station ${station.id} is already assigned to another circuit.`);
        return;
      }
      
      setStations([...stations, station]);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{initialCircuit ? "Edit Circuit" : "Add Circuit"}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            const breakerNum = typeof breaker === 'string' ? parseInt(breaker) || 0 : breaker;
            const continuousNum = typeof continuous === 'string' ? parseInt(continuous) || 0 : continuous;
            onSave({ id, breaker: breakerNum, continuous: continuousNum, stations });
          }}
          className="space-y-4"
        >
          <input
            required
            className="w-full border rounded p-2"
            placeholder="e.g., Circuit 1/3"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Breaker Size (A)</label>
            <input
              required
              type="number"
              className="w-full border rounded p-2"
              placeholder="e.g., 40"
              value={breaker}
              min={1}
              onChange={e => setBreaker(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Continuous Current (A) - Auto-calculated</label>
            <input
              type="number"
              className="w-full border rounded p-2 bg-gray-50 cursor-not-allowed"
              placeholder="e.g., 32"
              value={continuous}
              min={1}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stations</label>
            <StationSelector
              selected={stations}
              onSelect={handleSelectStation}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded bg-hc-beige text-hc-grey hover:bg-hc-beige/80">Cancel</button>
            <button type="submit" className="flex-1 py-2 rounded bg-hc-orange text-white hover:bg-hc-orange/90">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
} 