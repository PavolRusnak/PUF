"use client";
import Link from "next/link";

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hc-dark-blue via-hc-navy to-hc-dark-blue flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-hc-dark-blue mb-2">Success!</h1>
        <p className="text-hc-grey mb-6">Your Power Up form has been submitted.</p>
        <Link 
          href="/power-up" 
          className="inline-block bg-hc-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-hc-orange/90 transition-all"
        >
          Submit Another
        </Link>
      </div>
    </div>
  );
} 