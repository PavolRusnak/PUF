import { useState, useMemo } from "react";
import { usePowerUp } from "@/lib/PowerUpContext";
import { Station } from "@/lib/PowerUpContext";

export default function StationSelector({
  selected,
  onSelect,
}: {
  selected: Station[];
  onSelect: (station: Station) => void;
}) {
  const [state] = usePowerUp();
  const [query, setQuery] = useState("");

  // Gather all stations from site (including unassigned)
  const allSiteStationIds = state.site?.stations || [];
  // Gather all assigned stations
  const assignedStations: Station[] = useMemo(() => {
    if (!state.site) return [];
    const stations: Station[] = [];
    state.site.panels.forEach(panel =>
      panel.circuits.forEach(circuit =>
        circuit.stations.forEach(station => stations.push(station))
      )
    );
    return stations;
  }, [state.site]);

  // Build a map of stationId -> Station (from assigned or selected)
  const stationMap: Record<string, Station> = {};
  assignedStations.forEach(s => { stationMap[s.id] = s; });
  selected.forEach(s => { stationMap[s.id] = s; });

  // Compose the full list of stations (assigned or not)
  const allStations: Station[] = allSiteStationIds.map(id => stationMap[id] || { id });

  // Filter by search
  const filtered = useMemo(() => {
    return allStations.filter(s => s.id.toLowerCase().includes(query.toLowerCase()));
  }, [allStations, query]);

  // Assignment status
  function getAssignmentStatus(station: Station) {
    if (selected.some(s => s.id === station.id)) return "Selected";
    if (assignedStations.some(s => s.id === station.id)) return "Assigned";
    return "Available";
  }

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search Station ID..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full mb-2 px-3 py-2 border rounded"
      />
      <div className="border rounded divide-y bg-white max-h-48 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="py-4 px-4 text-gray-400 text-center">No stations found</div>
        )}
        {filtered.map(station => {
          const status = getAssignmentStatus(station);
          return (
            <div
              key={station.id}
              className={`flex items-center justify-between py-2 px-4 cursor-pointer hover:bg-gray-100 ${
                status === "Selected" ? "bg-blue-50 font-semibold" : ""
              }`}
              onClick={() => onSelect(station)}
            >
              <span className="font-mono">{station.id}</span>
              <span className={`ml-2 text-xs px-2 py-1 rounded ${
                status === "Selected"
                  ? "bg-blue-200 text-blue-800"
                  : status === "Assigned"
                  ? "bg-gray-200 text-gray-600"
                  : "bg-green-100 text-green-700"
              }`}>
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 