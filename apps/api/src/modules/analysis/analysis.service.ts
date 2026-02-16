import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RiskService } from '../risk/risk.service';
import { WeatherService } from '../weather/weather.service';
import { RecommendationService } from '../recommendation/recommendation.service';
import { AnalyzeResult, HistoryResult } from './analysis.types';

@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly riskService: RiskService,
    private readonly weatherService: WeatherService,
    private readonly recommendationService: RecommendationService,
  ) {}

  async analyze(
    country: string,
    city: string,
    zone: string | undefined,
  ): Promise<AnalyzeResult> {
    try {
      const weather = await this.weatherService.getWeather(city);

      const risk = this.riskService.calculateScore(weather);

      const exposureByZone: Record<string, number> = {
        urban: 10_000_000_000,
        periurban: 3_000_000_000,
        rural: 1_000_000_000,
      };
      const vulnerabilityByZone: Record<string, number> = {
        urban: 0.35,
        periurban: 0.5,
        rural: 0.65,
      };
      const zoneKey = (zone ?? 'urban').toLowerCase();
      const exposure = exposureByZone[zoneKey] ?? exposureByZone.urban;
      const vulnerability =
        vulnerabilityByZone[zoneKey] ?? vulnerabilityByZone.urban;
      const hazard = Math.max(0, Math.min(1, risk.score / 100));
      const expectedLoss = exposure * hazard * vulnerability;

      const impact = {
        minLoss: Math.round(expectedLoss * 0.7),
        maxLoss: Math.round(expectedLoss * 1.3),
      };

      const recommendations =
        await this.recommendationService.generateRecommendations({
          city,
          temperature: weather.temperature,
          rainfall: weather.rainfall,
          humidity: weather.humidity,
          score: risk.score,
          level: risk.level,
        });

      const saved = await this.prisma.analysis.create({
        data: {
          city,
          country,
          temperature: weather.temperature,
          rainfall: weather.rainfall,
          humidity: weather.humidity,
          riskScore: risk.score,
          riskLevel: risk.level,
          minLoss: impact.minLoss,
          maxLoss: impact.maxLoss,
          recommendations: recommendations.items,
        },
      });

      return {
        id: saved.id,
        risk,
        weather,
        impact,
        recommendations,
      };
    } catch (error) {
      this.logger.error('Analyze failed', error as Error);
      throw new InternalServerErrorException('Analyze failed.');
    }
  }

  async getHistory(page: number, limit: number): Promise<HistoryResult> {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.analysis.findMany({
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        this.prisma.analysis.count(),
      ]);

      return {
        data,
        total,
        page,
        limit,
      };
    } catch (error) {
      this.logger.error('History fetch failed', error as Error);
      throw new InternalServerErrorException('History fetch failed.');
    }
  }

  async getAnalysisById(id: number) {
    const analysis = await this.prisma.analysis.findUnique({
      where: { id },
    });
    if (!analysis) {
      throw new NotFoundException('Analysis not found.');
    }
    return analysis;
  }
}
