"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Toast = { id: number; msg: string };

interface ToastContextType {
  toasts: Toast[];
  push: (msg: string) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = (msg: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    // Auto-dismiss after 3 seconds
    setTimeout(() => dismiss(id), 3000);
  };

  const dismiss = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, push, dismiss }}>
      {children}
      <ToastHost />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function ToastHost() {
  const { toasts, dismiss } = useToast();
  
  return (
    <div className="fixed top-4 inset-x-0 flex flex-col items-center z-[60] space-y-2">
      {toasts.map(t => (
        <div 
          key={t.id} 
          className="bg-hc-orange text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer hover:bg-hc-orange/90 transition-all"
          onClick={() => dismiss(t.id)}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
} 