import { WeatherData, RiskResult, ImpactEstimate, RecommendationResult } from "./types";

export const mockWeather: WeatherData = {
  temperature: 34,
  rainfall: 22,
  humidity: 75,
};

export const mockRisk: RiskResult = {
  score: 78,
  level: "HIGH",
};

export const mockImpact: ImpactEstimate = {
  minLoss: 150000,
  maxLoss: 300000,
};

export const mockRecommendations: RecommendationResult = {
  items: [
    "Reinforce drainage systems",
    "Prepare emergency response teams",
    "Inform local communities",
  ],
};
