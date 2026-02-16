export interface WeatherData {
  temperature: number;
  rainfall: number;
  humidity: number;
}

export interface RiskResult {
  score: number;
  level: string;
}

export interface ImpactEstimate {
  minLoss: number;
  maxLoss: number;
}

export interface RecommendationResult {
  items: string[];
}

export interface Analysis {
  id: number;
  city: string;
  country: string;
  temperature: number;
  rainfall: number;
  humidity: number;
  riskScore: number;
  riskLevel: string;
  minLoss: number;
  maxLoss: number;
  recommendations: string[] | unknown;
  createdAt: string;
}

export interface HistoryResponse {
  data: Analysis[];
  total: number;
  page: number;
  limit: number;
}
