import "./globals.css";
import { ReactNode } from "react";
import { ToastProvider } from "@/lib/toast";
import { PowerUpProvider } from "@/lib/PowerUpContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { title: "Power Up" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <ToastProvider>
          <PowerUpProvider>
            {children}
          </PowerUpProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
