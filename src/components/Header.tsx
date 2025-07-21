import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-hypercharge-blue to-hypercharge-blue-light text-white">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-hypercharge-orange rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
} 