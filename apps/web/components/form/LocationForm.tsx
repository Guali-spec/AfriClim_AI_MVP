"use client";

import { useState } from "react";

interface Props {
  onAnalyze: (country: string, city: string, zone?: string) => void;
  loading: boolean;
}


export default function LocationForm({ onAnalyze, loading }: Props) {

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("urban");

  return (
    <div className="bg-white/80 backdrop-blur border border-white/60 p-6 rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Localiser une zone
          </h2>
          <p className="text-sm text-slate-500">
            Renseigne le lieu pour obtenir une analyse fiable.
          </p>
        </div>
        <div className="hidden md:block text-xs uppercase tracking-widest text-slate-400">
          CFA
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Pays"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-slate-200 rounded-xl p-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />

        <input
          type="text"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-slate-200 rounded-xl p-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />

        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="border border-slate-200 rounded-xl p-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <option value="urban">Zone urbaine</option>
          <option value="periurban">Zone periurbaine</option>
          <option value="rural">Zone rurale</option>
        </select>

        <button
          disabled={loading}
          onClick={() => onAnalyze(country, city, zone)}
          className={`rounded-xl font-semibold transition p-3 ${
            loading
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_10px_24px_rgba(16,185,129,0.35)]"
          }`}
        >
          {loading ? "Analyse en cours..." : "Lancer l'analyse"}
        </button>
      </div>
    </div>
  );
}
