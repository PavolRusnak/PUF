import { useState } from "react";
import { Station } from "@/lib/PowerUpContext";

export default function StationEditor({
  station,
  onUpdate,
}: {
  station: Station;
  onUpdate: (station: Station) => void;
}) {
  const [stall, setStall] = useState(station.stall || "");
  const [images, setImages] = useState<string[]>(station.images || []);

  const handleSave = () => {
    onUpdate({
      ...station,
      stall: stall || undefined,
      images: images.length > 0 ? images : undefined,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setImages([...images, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 p-4 border rounded">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{station.id}</h3>
        <span className={`h-2 w-2 rounded-full ${station.online ? "bg-green-500" : "bg-gray-400"}`}></span>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Stall</label>
        <input
          type="text"
          placeholder="e.g., S1, A1, etc."
          value={stall}
          onChange={(e) => setStall(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border rounded p-2"
        />
        {images.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Station ${station.id} image ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark"
      >
        Save Changes
      </button>
    </div>
  );
} 