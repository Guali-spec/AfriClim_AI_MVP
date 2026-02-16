import { Injectable } from '@nestjs/common';

@Injectable()
export class RiskService {

  calculateScore(weather: {
    temperature: number;
    rainfall: number;
    humidity: number;
  }) {

    const tempScore = Math.min((weather.temperature / 40) * 100, 100);
    const rainScore = Math.min((weather.rainfall / 30) * 100, 100);
    const humidityScore = Math.min((weather.humidity / 100) * 100, 100);

    const finalScore =
      rainScore * 0.45 +
      humidityScore * 0.35 +
      tempScore * 0.20;

    let level = "LOW";

    if (finalScore >= 70) level = "HIGH";
    else if (finalScore >= 40) level = "MODERATE";

    return {
      score: Math.round(finalScore),
      level,
    };
  }
}
