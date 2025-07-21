"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSite } from "@/lib/mockApi";
import { usePowerUp } from "@/lib/PowerUpContext";

export default function StationEntry() {
  const [id, setId] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const [, dispatch] = usePowerUp();

  async function go(e: React.FormEvent) {
    e.preventDefault();
    try {
      const site = await fetchSite(id || "HC-00001");
      const hasAssigned = site.panels.some((p) => p.circuits.some((c) => c.stations.length));
      dispatch({ type: "init", payload: { site, mode: hasAssigned ? "UPDATE" : "NEW" } });
      router.push("/power-up/site");
    } catch {
      setErr("Lookup failed");
    }
  }

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-brand text-xl font-semibold mb-4 text-center">Enter Station ID</h1>
      <form onSubmit={go} className="space-y-4">
        <input
          required
          className="w-full border rounded p-2"
          placeholder="Example: HC-00001"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-brand text-white py-2 rounded">Continue</button>
      </form>
    </div>
  );
} 