"use client";

import { useState } from "react";
import RiskCard from "@/components/dashboard/RiskCard";
import WeatherCard from "@/components/dashboard/WeatherCard";
import ImpactCard from "@/components/dashboard/ImpactCard";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import LocationForm from "@/components/form/LocationForm";
import Spinner from "@/components/ui/Spinner";

import {
  mockRisk,
  mockWeather,
  mockImpact,
  mockRecommendations,
} from "@/lib/mock-data";

export default function Home() {

  // ✅ Hooks ici
  const [loading, setLoading] = useState(false);
  const [risk, setRisk] = useState(mockRisk);
  const [weather, setWeather] = useState(mockWeather);
  const [impact, setImpact] = useState(mockImpact);
  const [recommendations, setRecommendations] = useState(mockRecommendations);

  const handleAnalyze = (country: string, city: string) => {
    setLoading(true);

    setTimeout(() => {
      setRisk(mockRisk);
      setWeather(mockWeather);
      setImpact(mockImpact);
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1000);
  };


 
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10 space-y-8">

        <header>
          <h1 className="text-3xl font-bold text-gray-800">
            AfriClim AI – Climate Risk Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Localized climate risk assessment powered by AI.
          </p>
        </header>
        <LocationForm onAnalyze={handleAnalyze} loading={loading} />

         {loading && (
  <div className="flex flex-col items-center gap-2 text-blue-600 font-semibold">
    <Spinner />
    <p>Analyzing climate data...</p>
  </div>
)}


        <RiskCard risk={mockRisk} />
       

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <WeatherCard weather={mockWeather} />
        <ImpactCard impact={mockImpact} />
        </div>
        <RecommendationCard recommendations={mockRecommendations} />


      </div>
    </main>
  );
}
