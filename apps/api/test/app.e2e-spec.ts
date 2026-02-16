import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { WeatherService } from './../src/modules/weather/weather.service';
import { RecommendationService } from './../src/modules/recommendation/recommendation.service';
import { PrismaService } from './../src/prisma/prisma.service';

describe('App (e2e)', () => {
  let app: INestApplication;
  let store: any[] = [];

  const prismaMock = {
    analysis: {
      create: jest.fn(async ({ data }) => {
        const item = { id: store.length + 1, createdAt: new Date(), ...data };
        store.unshift(item);
        return item;
      }),
      findMany: jest.fn(async ({ skip, take }) => {
        return store.slice(skip, skip + take);
      }),
      count: jest.fn(async () => store.length),
      findUnique: jest.fn(async ({ where }) => {
        return store.find((x) => x.id === where.id) ?? null;
      }),
    },
  };

  beforeEach(async () => {
    store = [];
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(WeatherService)
      .useValue({
        getWeather: jest.fn().mockResolvedValue({
          temperature: 20,
          humidity: 50,
          rainfall: 2,
        }),
      })
      .overrideProvider(RecommendationService)
      .useValue({
        generateRecommendations: jest.fn().mockResolvedValue({
          items: ['a', 'b', 'c', 'd'],
        }),
      })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /analyze returns analysis', async () => {
    const res = await request(app.getHttpServer())
      .get('/analyze')
      .query({ country: 'FR', city: 'Paris', zone: 'urban' })
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('risk');
    expect(res.body).toHaveProperty('weather');
    expect(res.body).toHaveProperty('impact');
    expect(res.body).toHaveProperty('recommendations');
  });

  it('GET /history returns paginated data', async () => {
    await request(app.getHttpServer())
      .get('/analyze')
      .query({ country: 'FR', city: 'Paris', zone: 'urban' })
      .expect(200);

    const res = await request(app.getHttpServer())
      .get('/history')
      .query({ page: 1, limit: 10 })
      .expect(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        total: 1,
        page: 1,
        limit: 10,
      }),
    );
  });
});
