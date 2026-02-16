import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RiskService } from './modules/risk/risk.service';
import { WeatherService } from './modules/weather/weather.service';
import { RecommendationService } from './modules/recommendation/recommendation.service';
import { PrismaService } from './prisma/prisma.service';
import { AnalysisService } from './modules/analysis/analysis.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(process.cwd(), 'apps/api/.env'),
        path.resolve(process.cwd(), '.env'),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    RiskService,
    WeatherService,
    RecommendationService,
    AnalysisService,
  ],
})
export class AppModule {}
