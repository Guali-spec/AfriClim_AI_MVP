import { Analysis } from '@prisma/client';

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
}

export interface RiskResult {
  score: number;
  level: string;
}

export interface ImpactResult {
  minLoss: number;
  maxLoss: number;
}

export interface RecommendationsResult {
  items: string[];
}

export interface AnalyzeResult {
  id: number;
  risk: RiskResult;
  weather: WeatherData;
  impact: ImpactResult;
  recommendations: RecommendationsResult;
}

export interface HistoryResult {
  data: Analysis[];
  total: number;
  page: number;
  limit: number;
}
