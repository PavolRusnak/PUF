"use client";
import { useRouter } from "next/navigation";
import { submitPowerUp } from "@/lib/submitPowerUp";

export default function Finish() {
  const router = useRouter();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitPowerUp({});
    router.push("/power-up/success");
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded shadow p-6 space-y-4">
      <h2 className="text-brand text-xl font-semibold">Finish Site Setup</h2>
      <input required placeholder="Full Name" className="w-full border p-2 rounded" />
      <input required type="email" placeholder="Email" className="w-full border p-2 rounded" />
      <input required placeholder="Phone" className="w-full border p-2 rounded" />
      <textarea placeholder="Notes (optional)" className="w-full border p-2 rounded" />
      <button className="w-full bg-brand text-white py-2 rounded">Submit</button>
    </form>
  );
} 