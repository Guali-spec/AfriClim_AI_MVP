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
        return "bg-green-100 text-green-600 border-green-200";
      case "MODERATE":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "HIGH":
        return "bg-red-100 text-red-600 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-8">
      <div className="flex flex-col md:flex-row gap-12 items-center">

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
              stroke="red"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-black text-slate-900">
              {risk.score}
            </span>
            <span className="text-slate-400 text-xs uppercase">
              Score / 100
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-6">
          <div
            className={`px-4 py-2 rounded-full text-sm font-bold border inline-flex items-center gap-2 ${getLevelColor()}`}
          >
            {risk.level} Risk Level
          </div>

          <p className="text-slate-600">
            This score reflects the current climate exposure based on temperature,
            rainfall, and humidity analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
