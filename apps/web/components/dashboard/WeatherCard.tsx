import { WeatherData } from "@/lib/types";

interface Props {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur border border-white/60 p-6 rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-1">
      <h2 className="text-xl font-semibold mb-6 text-slate-900">
        Conditions meteo
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
          <p className="text-slate-500 text-xs uppercase tracking-widest">
            Temperature
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {Math.round(weather.temperature)} C
          </p>
        </div>

        <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
          <p className="text-slate-500 text-xs uppercase tracking-widest">
            Pluie
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {weather.rainfall} mm
          </p>
        </div>

        <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
          <p className="text-slate-500 text-xs uppercase tracking-widest">
            Humidite
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {weather.humidity}%
          </p>
        </div>
      </div>
    </div>
  );
}
