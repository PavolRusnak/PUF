import { Station } from "@/lib/PowerUpContext";

export default function StationEditor({
  station,
}: {
  station: Station;
}) {
  return (
    <div className="p-3 bg-white border border-hc-light-blue rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`h-3 w-3 rounded-full ${station.online ? "bg-green-500" : "bg-hc-grey"}`}></span>
          <span className="font-medium text-hc-dark-blue">{station.id}</span>
          {station.stall && (
            <span className="text-sm text-hc-grey">({station.stall})</span>
          )}
        </div>
        <div className="text-xs text-hc-grey">
          {station.online ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
} 