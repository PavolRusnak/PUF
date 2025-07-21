"use client";

import { ReactNode } from "react";
import { PowerUpProvider } from "@/lib/PowerUpContext";

export default function PowerUpLayout({ children }: { children: ReactNode }) {
  return (
    <PowerUpProvider>
      <div className="w-full max-w-md px-4 py-10">{children}</div>
    </PowerUpProvider>
  );
} 