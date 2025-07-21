import { Station } from "@/lib/PowerUpContext";

export default function StationEditor({
  station,
}: {
  station: Station;
}) {
  return (
    <div className="p-3 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`h-3 w-3 rounded-full ${station.online ? "bg-green-500" : "bg-gray-400"}`}></span>
          <span className="font-medium text-gray-900">{station.id}</span>
          {station.stall && (
            <span className="text-sm text-gray-500">({station.stall})</span>
          )}
        </div>
        <div className="text-xs text-gray-400">
          {station.online ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
} 