"use client";
import Link from "next/link";

export default function Success() {
  return (
    <div className="bg-white rounded shadow p-8 text-center space-y-4">
      <p className="text-5xl">✅</p>
      <p className="text-brand text-lg font-semibold">Submission received.</p>
      <Link href="/power-up" className="inline-block bg-brand text-white py-2 px-4 rounded">
        Start Another
      </Link>
    </div>
  );
} 