import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WeatherData } from '../analysis/analysis.types';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(private readonly configService: ConfigService) {}

  async getWeather(city: string): Promise<WeatherData> {
    const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY')?.trim();

    if (!apiKey) {
      throw new InternalServerErrorException(
        'OPENWEATHER_API_KEY is not defined in environment variables.',
      );
    }

    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric',
          },
          timeout: 5000,
        },
      );

      const data = response.data;

      return {
        temperature: data.main?.temp ?? 0,
        humidity: data.main?.humidity ?? 0,
        rainfall: data.rain?.['1h'] ?? 0,
      };
    } catch (error: any) {
      this.logger.warn(
        `Weather API error: ${error.response?.status ?? 'unknown'}`,
      );

      // Fallback meteo pour eviter crash du MVP
      return {
        temperature: 30,
        humidity: 60,
        rainfall: 0,
      };
    }
  }
}
