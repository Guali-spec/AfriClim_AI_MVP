"use client";

import { useState } from "react";
import { usePaginatedHistory } from "@/hooks/usePaginatedHistory";

export default function HistoryPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, loading, error } = usePaginatedHistory(page, limit);

  const total = data?.total ?? 0;
  const maxPage = Math.max(1, Math.ceil(total / limit));

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">
              Historique
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
              Analyses recentes
            </h1>
            <p className="text-slate-600 mt-2">
              Visualise les analyses precedentes et suis l'evolution du risque.
            </p>
          </div>
          <div className="text-sm text-slate-600 bg-white/70 border border-white/60 rounded-2xl px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            Total: <span className="font-semibold">{total}</span>
          </div>
        </header>

        <div className="bg-white/80 backdrop-blur border border-white/60 p-4 rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
          {loading && (
            <div className="text-emerald-700 font-semibold">Chargement...</div>
          )}
          {error && (
            <div className="text-rose-700 font-semibold">{error}</div>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b">
                    <th className="py-3 pr-4">Ville</th>
                    <th className="py-3 pr-4">Pays</th>
                    <th className="py-3 pr-4">Risque</th>
                    <th className="py-3 pr-4">Score</th>
                    <th className="py-3 pr-4">Temp</th>
                    <th className="py-3 pr-4">Humidite</th>
                    <th className="py-3 pr-4">Pluie</th>
                    <th className="py-3 pr-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item) => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-3 pr-4">{item.city}</td>
                      <td className="py-3 pr-4">{item.country}</td>
                      <td className="py-3 pr-4">{item.riskLevel}</td>
                      <td className="py-3 pr-4">{item.riskScore}</td>
                      <td className="py-3 pr-4">
                        {Math.round(item.temperature)} C
                      </td>
                      <td className="py-3 pr-4">{item.humidity}%</td>
                      <td className="py-3 pr-4">{item.rainfall} mm</td>
                      <td className="py-3 pr-4">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {data?.data?.length === 0 && (
                    <tr>
                      <td className="py-6 text-slate-500" colSpan={8}>
                        Aucun resultat.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Precedent
          </button>
          <div className="text-sm text-slate-600">
            Page {page} / {maxPage}
          </div>
          <button
            className="px-4 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50"
            disabled={page >= maxPage}
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
          >
            Suivant
          </button>
        </div>
      </div>
    </main>
  );
}
