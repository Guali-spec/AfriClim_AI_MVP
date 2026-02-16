"use client";

import { useState } from "react";

interface Props {
  onAnalyze: (country: string, city: string) => void;
  loading: boolean;
}


export default function LocationForm({ onAnalyze, loading }: Props) {

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Select Location
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-lg p-3"
        />

        <button
  disabled={loading}
  onClick={() => onAnalyze(country, city)}
  className={`rounded-lg font-semibold transition p-3 ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 text-white"
  }`}
>
  {loading ? "Analyzing..." : "Analyze"}
</button>

      </div>
    </div>
  );
}
