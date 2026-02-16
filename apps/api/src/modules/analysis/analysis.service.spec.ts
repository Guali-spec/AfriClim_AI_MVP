import { AnalysisService } from './analysis.service';

describe('AnalysisService', () => {
  const prisma = {
    analysis: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
    },
  } as any;

  const riskService = {
    calculateScore: jest.fn(),
  } as any;

  const weatherService = {
    getWeather: jest.fn(),
  } as any;

  const recommendationService = {
    generateRecommendations: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('analyzes and stores data', async () => {
    weatherService.getWeather.mockResolvedValue({
      temperature: 20,
      humidity: 50,
      rainfall: 2,
    });
    riskService.calculateScore.mockReturnValue({ score: 60, level: 'MODERATE' });
    recommendationService.generateRecommendations.mockResolvedValue({
      items: ['a', 'b', 'c', 'd'],
    });
    prisma.analysis.create.mockResolvedValue({ id: 1 });

    const service = new AnalysisService(
      prisma,
      riskService,
      weatherService,
      recommendationService,
    );

    const result = await service.analyze('FR', 'Paris', 'urban');

    expect(result.id).toBe(1);
    expect(prisma.analysis.create).toHaveBeenCalled();
  });

  it('returns paginated history', async () => {
    prisma.analysis.findMany.mockResolvedValue([{ id: 1 }]);
    prisma.analysis.count.mockResolvedValue(10);

    const service = new AnalysisService(
      prisma,
      riskService,
      weatherService,
      recommendationService,
    );

    const result = await service.getHistory(1, 5);

    expect(result).toEqual({
      data: [{ id: 1 }],
      total: 10,
      page: 1,
      limit: 5,
    });
  });
});
