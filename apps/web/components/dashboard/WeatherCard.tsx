import { WeatherData } from "@/lib/types";

interface Props {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Weather Conditions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Temperature</p>
          <p className="text-2xl font-bold text-gray-800">
            {weather.temperature}°C
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Rainfall</p>
          <p className="text-2xl font-bold text-gray-800">
            {weather.rainfall} mm
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Humidity</p>
          <p className="text-2xl font-bold text-gray-800">
            {weather.humidity}%
          </p>
        </div>
      </div>
    </div>
  );
}
