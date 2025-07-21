"use client";

import { ReactNode } from "react";
import { PowerUpProvider } from "@/lib/PowerUpContext";

export default function PowerUpLayout({ children }: { children: ReactNode }) {
  return (
    <PowerUpProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
          {children}
        </div>
      </div>
    </PowerUpProvider>
  );
} 