import "./globals.css";
import { ReactNode } from "react";
import { ToastProvider } from "@/lib/toast";

export const metadata = { title: "Power Up" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
