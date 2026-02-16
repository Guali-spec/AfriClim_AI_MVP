import { RecommendationResult } from "@/lib/types";

interface Props {
  recommendations: RecommendationResult;
}

export default function RecommendationCard({ recommendations }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur border border-white/60 p-6 rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-1">
      <h2 className="text-xl font-semibold mb-6 text-slate-900">
        Recommandations IA
      </h2>

      <ul className="space-y-4">
        {recommendations.items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100"
          >
            <span className="text-emerald-600 font-bold">OK</span>
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
