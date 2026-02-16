"use client";

import { useState } from "react";
import RiskCard from "@/components/dashboard/RiskCard";
import WeatherCard from "@/components/dashboard/WeatherCard";
import ImpactCard from "@/components/dashboard/ImpactCard";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import LocationForm from "@/components/form/LocationForm";
import Spinner from "@/components/ui/Spinner";
import { analyzeLocation } from "@/lib/api";
import {
  mockRisk,
  mockWeather,
  mockImpact,
  mockRecommendations,
} from "@/lib/mock-data";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [risk, setRisk] = useState(mockRisk);
  const [weather, setWeather] = useState(mockWeather);
  const [impact, setImpact] = useState(mockImpact);
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (
    country: string,
    city: string,
    zone?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const data = await analyzeLocation(country, city, zone);

      setRisk(data.risk);
      setWeather(data.weather);
      setImpact(data.impact);
      setRecommendations(data.recommendations);
    } catch (err: any) {
      setError(err?.message ?? "Erreur pendant l'analyse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <header className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-emerald-600">
              Africlim AI
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-slate-900">
              Tableau de bord du risque climatique, clair et actionnable.
            </h1>
            <p className="text-slate-600">
              Analyse en temps reel, recommandations contextualisees et
              estimation des pertes en franc CFA.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="px-3 py-1 rounded-full bg-white/80 border border-slate-200">
                Meteo en temps reel
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 border border-slate-200">
                IA pour la resilience
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 border border-slate-200">
                FCFA
              </span>
            </div>
          </div>
          <div className="bg-white/70 border border-white/60 rounded-3xl p-6 shadow-[0_30px_90px_rgba(15,23,42,0.15)]">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <p className="text-xs uppercase tracking-widest text-emerald-700">
                  Score
                </p>
                <p className="text-3xl font-bold text-emerald-800">
                  {risk.score}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Zone
                </p>
                <p className="text-lg font-semibold text-slate-800">
                  Analyse locale
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
                <p className="text-xs uppercase tracking-widest text-amber-700">
                  Pluie
                </p>
                <p className="text-2xl font-bold text-amber-800">
                  {weather.rainfall} mm
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
                <p className="text-xs uppercase tracking-widest text-rose-700">
                  Humidite
                </p>
                <p className="text-2xl font-bold text-rose-800">
                  {weather.humidity}%
                </p>
              </div>
            </div>
          </div>
        </header>

        <LocationForm onAnalyze={handleAnalyze} loading={loading} />

        {loading && (
          <div className="flex flex-col items-center gap-2 text-emerald-700 font-semibold">
            <Spinner />
            <p>Analyse des donnees climatiques...</p>
          </div>
        )}
        {error && (
          <div className="bg-rose-50 text-rose-700 border border-rose-100 p-4 rounded-2xl">
            {error}
          </div>
        )}

        <RiskCard risk={risk} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <WeatherCard weather={weather} />
          <ImpactCard impact={impact} />
        </div>

        <RecommendationCard recommendations={recommendations} />
      </div>
    </main>
  );
}
