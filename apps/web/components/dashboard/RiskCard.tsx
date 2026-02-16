"use client";

import { RiskResult } from "@/lib/types";

interface Props {
  risk: RiskResult;
}

export default function RiskCard({ risk }: Props) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (risk.score / 100) * circumference;

  const getLevelColor = () => {
    switch (risk.level) {
      case "LOW":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "MODERATE":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "HIGH":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur border border-white/60 rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] p-8 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-col md:flex-row gap-10 items-center">

        {/* Gauge */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-200"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={`transition-all duration-700 ${
                risk.level === "HIGH"
                  ? "text-rose-500"
                  : risk.level === "MODERATE"
                  ? "text-amber-500"
                  : "text-emerald-500"
              }`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-black text-slate-900">
              {risk.score}
            </span>
            <span className="text-slate-400 text-xs uppercase tracking-widest">
              Score sur 100
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-6">
          <div
            className={`px-4 py-2 rounded-full text-sm font-bold border inline-flex items-center gap-2 ${getLevelColor()}`}
          >
            Niveau de risque {risk.level}
          </div>

          <p className="text-slate-600">
            Ce score synthetise la temperature, la pluviometrie et l'humidite pour
            estimer l'exposition climatique actuelle.
          </p>
        </div>
      </div>
    </div>
  );
}
