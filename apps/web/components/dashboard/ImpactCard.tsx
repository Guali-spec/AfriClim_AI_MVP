import { ImpactEstimate } from "@/lib/types";

interface Props {
  impact: ImpactEstimate;
}

export default function ImpactCard({ impact }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Estimated Economic Impact
      </h2>

      <div className="bg-red-50 p-6 rounded-lg text-center">
        <p className="text-gray-500 text-sm mb-2">
          Potential Financial Loss
        </p>

        <p className="text-2xl font-bold text-red-600">
          ${impact.minLoss.toLocaleString()} – ${impact.maxLoss.toLocaleString()}
        </p>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        *Estimation based on current climate exposure model.
      </p>
    </div>
  );
}
