import { Station } from "@/lib/PowerUpContext";

export default function StationEditor({
  station,
}: {
  station: Station;
}) {
  return (
    <div className="px-2 py-1 bg-white border border-hc-light-blue rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`h-2 w-2 rounded-full ${station.online ? "bg-green-500" : "bg-hc-grey"}`}></span>
          <span className="font-medium text-hc-dark-blue text-sm">{station.id}</span>
          {station.stall && (
            <span className="text-xs text-hc-grey">({station.stall})</span>
          )}
        </div>
        <div className="text-xs text-hc-grey">
          {station.online ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
} 