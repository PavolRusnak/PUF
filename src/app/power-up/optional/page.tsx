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
    { id: "finish", title: "Contact", description: "Submit", completed: false, current: false },
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
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-r from-hc-dark-blue to-hc-navy text-white px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-hc-orange rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold">{state.site?.name}</h1>
            <p className="text-xs text-hc-beige">{state.site?.address}</p>
          </div>
        </div>
      </div>
      <div className="fixed top-16 left-0 right-0 z-10">
        <StepNavigation steps={steps} />
      </div>
      
      <div className="pt-32 pb-20 p-4">
        <div className="space-y-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-hc-dark-blue mb-2">Optional Configuration</h2>
            <p className="text-hc-grey">Add stalls and images for each station (optional)</p>
          </div>

          <div className="space-y-3">
            {stations.map((station) => (
              <div key={station.id} className="bg-white border border-hc-light-blue rounded-lg p-3">
                              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className={`h-2 w-2 rounded-full ${station.online ? "bg-green-500" : "bg-hc-grey"}`}></span>
                  <span className="font-semibold text-hc-dark-blue text-sm">{station.id}</span>
                </div>
                
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Stall"
                    value={station.stall || ""}
                    onChange={(e) => updateStation(station.id, { stall: e.target.value || undefined })}
                    className="w-full border border-hc-light-blue rounded p-1.5 text-xs text-hc-grey focus:ring-1 focus:ring-hc-orange focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-hc-grey whitespace-nowrap">Image</span>
                  <label className="w-8 h-8 bg-hc-orange hover:bg-hc-orange/90 text-white rounded flex items-center justify-center cursor-pointer transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(station.id, e)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
                
                {station.images && station.images.length > 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-1">
                    {station.images.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={image}
                          alt={`Station ${station.id} image ${index + 1}`}
                          width={100}
                          height={48}
                          className="w-full h-12 object-cover rounded"
                        />
                        <button
                          onClick={() => removeImage(station.id, index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
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