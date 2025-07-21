import { useState, useEffect } from "react";

export default function PanelDrawer({
  open,
  onClose,
  onSave,
  initialPanel,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (panel: { id: string; location: string }) => void;
  initialPanel?: { id: string; location: string };
}) {
  const [id, setId] = useState(initialPanel?.id || "");
  const [location, setLocation] = useState(initialPanel?.location || "");

  useEffect(() => {
    if (open) {
      setId(initialPanel?.id || "");
      setLocation(initialPanel?.location || "");
    }
  }, [open, initialPanel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{initialPanel ? "Edit Panel" : "Add Panel"}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave({ id, location });
          }}
          className="space-y-4"
        >
          <input
            required
            className="w-full border rounded p-2"
            placeholder="e.g., EV Panel 1"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <input
            required
            className="w-full border rounded p-2"
            placeholder="e.g., Electrical Room on P1"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded bg-hc-beige text-hc-grey hover:bg-hc-beige/80">Cancel</button>
            <button type="submit" className="flex-1 py-2 rounded bg-hc-orange text-white hover:bg-hc-orange/90">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
} 