import axios from 'axios';
import { WeatherService } from './weather.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService', () => {
  it('returns weather data from API', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        main: { temp: 12.5, humidity: 55 },
        rain: { '1h': 3 },
      },
    } as any);

    const configService = {
      get: jest.fn().mockReturnValue('test-key'),
    } as any;

    const service = new WeatherService(configService);

    const result = await service.getWeather('Paris');

    expect(result).toEqual({
      temperature: 12.5,
      humidity: 55,
      rainfall: 3,
    });
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  it('returns fallback on API error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('network'));

    const configService = {
      get: jest.fn().mockReturnValue('test-key'),
    } as any;

    const service = new WeatherService(configService);

    const result = await service.getWeather('Paris');
    expect(result).toEqual({
      temperature: 30,
      humidity: 60,
      rainfall: 0,
    });
  });
});
