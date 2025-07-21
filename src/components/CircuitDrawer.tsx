import { useState, useEffect } from "react";
import { Station } from "@/lib/PowerUpContext";
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
  const [id, setId] = useState(initialCircuit?.id || "");
  const [breaker, setBreaker] = useState(initialCircuit?.breaker || 40);
  const [continuous, setContinuous] = useState(initialCircuit?.continuous || 32);
  const [stations, setStations] = useState<Station[]>(initialCircuit?.stations || []);

  useEffect(() => {
    setContinuous(Math.floor(breaker * 0.8));
  }, [breaker]);

  useEffect(() => {
    if (open && initialCircuit) {
      setId(initialCircuit.id);
      setBreaker(initialCircuit.breaker);
      setContinuous(initialCircuit.continuous);
      setStations(initialCircuit.stations);
    } else if (open) {
      setId("");
      setBreaker(40);
      setContinuous(32);
      setStations([]);
    }
  }, [open, initialCircuit]);

  if (!open) return null;

  function handleSelectStation(station: Station) {
    if (stations.some(s => s.id === station.id)) {
      setStations(stations.filter(s => s.id !== station.id));
    } else {
      setStations([...stations, station]);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md bg-white rounded-t-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{initialCircuit ? "Edit Circuit" : "Add Circuit"}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave({ id, breaker, continuous, stations });
          }}
          className="space-y-4"
        >
          <input
            required
            className="w-full border rounded p-2"
            placeholder="Circuit ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <input
            required
            type="number"
            className="w-full border rounded p-2"
            placeholder="Breaker (A)"
            value={breaker}
            min={1}
            onChange={e => setBreaker(Number(e.target.value))}
          />
          <input
            readOnly
            className="w-full border rounded p-2 bg-gray-100"
            placeholder="Continuous (A)"
            value={continuous}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stations</label>
            <StationSelector
              selected={stations}
              onSelect={handleSelectStation}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
            <button type="submit" className="flex-1 py-2 rounded bg-brand text-white hover:bg-brand-dark">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
} 