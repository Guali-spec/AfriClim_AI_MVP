import { RecommendationResult } from "@/lib/types";

interface Props {
  recommendations: RecommendationResult;
}

export default function RecommendationCard({ recommendations }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        AI Recommendations
      </h2>

      <ul className="space-y-4">
        {recommendations.items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg"
          >
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
