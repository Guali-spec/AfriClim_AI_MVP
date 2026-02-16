export type RiskLevel = "LOW" | "MODERATE" | "HIGH";

export interface WeatherData {
  temperature: number;
  rainfall: number;
  humidity: number;
}

export interface RiskResult {
  score: number;
  level: RiskLevel;
}

export interface ImpactEstimate {
  minLoss: number;
  maxLoss: number;
}

export interface RecommendationResult {
  items: string[];
}
