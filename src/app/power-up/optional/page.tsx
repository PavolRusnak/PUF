"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePowerUp, Station } from "@/lib/PowerUpContext";
import StepNavigation from "@/components/StepNavigation";
import Image from "next/image";

export default function OptionalStep() {
  const [state] = usePowerUp();
  const router = useRouter();
  const [stations, setStations] = useState<Station[]>(() => {
    if (!state.site) return [];
    const allStations: Station[] = [];
    state.site.panels.forEach(panel =>
      panel.circuits.forEach(circuit =>
        circuit.stations.forEach(station => allStations.push(station))
      )
    );
    return allStations;
  });

  const steps = [
    { id: "panels", title: "Panel & Circuits", description: "Configuration", completed: true, current: false },
    { id: "optional", title: "Optional", description: "Stalls & Images", completed: false, current: true },
    { id: "finish", title: "Finish", description: "Submit", completed: false, current: false },
  ];

  const updateStation = (stationId: string, updates: Partial<Station>) => {
    setStations(prev => prev.map(s => s.id === stationId ? { ...s, ...updates } : s));
  };

  const handleImageUpload = (stationId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              const station = stations.find(s => s.id === stationId);
              if (station) {
                updateStation(stationId, { 
                  images: [...(station.images || []), ...newImages] 
                });
              }
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (stationId: string, imageIndex: number) => {
    const station = stations.find(s => s.id === stationId);
    if (station && station.images) {
      const newImages = station.images.filter((_, i) => i !== imageIndex);
      updateStation(stationId, { images: newImages.length > 0 ? newImages : undefined });
    }
  };

  if (!state.site) {
    router.push("/power-up");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-hc-dark-blue to-hc-navy text-white px-4 py-3">
        <h1 className="text-xl font-bold text-center">Hypercharge Power-Up Form</h1>
      </div>
      <StepNavigation steps={steps} />
      
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-hc-dark-blue mb-2">Optional Configuration</h2>
          <p className="text-hc-grey">Add stalls and images for each station (optional)</p>
        </div>

        <div className="space-y-4">
          {stations.map((station) => (
            <div key={station.id} className="bg-white border border-hc-light-blue rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`h-3 w-3 rounded-full ${station.online ? "bg-green-500" : "bg-hc-grey"}`}></span>
                  <span className="font-semibold text-hc-dark-blue">{station.id}</span>
                </div>
                <span className="text-xs text-hc-grey">
                  {station.online ? "Online" : "Offline"}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-hc-dark-blue mb-1">
                    Stall (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., S1, A1, Stall 1, etc."
                    value={station.stall || ""}
                    onChange={(e) => updateStation(station.id, { stall: e.target.value || undefined })}
                    className="w-full border border-hc-light-blue rounded p-2 text-hc-grey focus:ring-2 focus:ring-hc-orange focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-hc-dark-blue mb-1">
                    Images (Optional)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(station.id, e)}
                    className="w-full border border-hc-light-blue rounded p-2"
                  />
                  {station.images && station.images.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {station.images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image}
                            alt={`Station ${station.id} image ${index + 1}`}
                            width={200}
                            height={96}
                            className="w-full h-24 object-cover rounded"
                          />
                          <button
                            onClick={() => removeImage(station.id, index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => router.push("/power-up/site")}
            className="flex-1 bg-hc-beige text-hc-grey py-3 rounded-lg font-semibold hover:bg-hc-beige/80 transition-all"
          >
            Back
          </button>
          <button
            onClick={() => router.push("/power-up/finish")}
            className="flex-1 bg-hc-orange text-white py-3 rounded-lg font-semibold hover:bg-hc-orange/90 transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 