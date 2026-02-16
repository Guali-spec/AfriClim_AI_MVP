import { RiskService } from './risk.service';

describe('RiskService', () => {
  const service = new RiskService();

  it('calculates LOW risk', () => {
    const result = service.calculateScore({
      temperature: 10,
      rainfall: 0,
      humidity: 20,
    });
    expect(result.level).toBe('LOW');
    expect(result.score).toBeGreaterThanOrEqual(0);
  });

  it('calculates MODERATE risk', () => {
    const result = service.calculateScore({
      temperature: 25,
      rainfall: 10,
      humidity: 60,
    });
    expect(['MODERATE', 'HIGH']).toContain(result.level);
  });

  it('calculates HIGH risk', () => {
    const result = service.calculateScore({
      temperature: 40,
      rainfall: 30,
      humidity: 100,
    });
    expect(result.level).toBe('HIGH');
    expect(result.score).toBe(100);
  });
});
