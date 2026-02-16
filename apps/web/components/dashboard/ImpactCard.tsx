import { ImpactEstimate } from "@/lib/types";

interface Props {
  impact: ImpactEstimate;
}

export default function ImpactCard({ impact }: Props) {
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-white/80 backdrop-blur border border-white/60 p-6 rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-1">
      <h2 className="text-xl font-semibold mb-4 text-slate-900">
        Impact economique estime
      </h2>

      <div className="bg-rose-50/70 p-6 rounded-2xl text-center border border-rose-100">
        <p className="text-slate-500 text-sm mb-2">
          Pertes financieres potentielles (FCFA)
        </p>

        <p className="text-2xl font-black text-rose-600 tracking-tight">
          {formatter.format(impact.minLoss)} - {formatter.format(impact.maxLoss)}
        </p>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Estimation basee sur l'exposition, l'alea et la vulnerabilite.
      </p>
    </div>
  );
}
