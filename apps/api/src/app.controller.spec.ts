import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AnalysisService } from './modules/analysis/analysis.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AnalysisService,
          useValue: {
            analyze: jest.fn(),
            getHistory: jest.fn(),
            getAnalysisById: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
