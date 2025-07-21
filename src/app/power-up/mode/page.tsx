"use client";
import { useRouter } from "next/navigation";
import { usePowerUp } from "@/lib/PowerUpContext";

export default function ChooseMode() {
  const router = useRouter();
  const [{ mode }] = usePowerUp();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-hc-dark-blue to-hc-navy text-white px-4 py-3">
        <h1 className="text-xl font-bold text-center">Hypercharge Power-Up Form</h1>
      </div>
      
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 w-full max-w-md">
          <div className="text-center">
            <h2 className="text-hc-dark-blue text-xl font-semibold mb-2">
              This site already has a Power Up Form
            </h2>
            <p className="text-hc-grey text-sm">
              What would you like to do?
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              className="w-full bg-hc-orange text-white py-4 rounded-lg font-semibold hover:bg-hc-orange/90 transition-all"
              onClick={() => router.push("/power-up/site?kind=new")}
            >
              Start New Setup
            </button>
            <button
              className="w-full border-2 border-hc-orange text-hc-orange py-4 rounded-lg font-semibold hover:bg-hc-orange hover:text-white transition-all"
              onClick={() => router.push("/power-up/site?kind=update")}
            >
              Update Existing Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 