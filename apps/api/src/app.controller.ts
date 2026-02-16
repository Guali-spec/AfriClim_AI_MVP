import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AnalysisService } from './modules/analysis/analysis.service';
import { AnalyzeQueryDto } from './modules/analysis/dto/analyze-query.dto';
import { HistoryQueryDto } from './modules/analysis/dto/history-query.dto';

@Controller()
export class AppController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('analyze')
  async analyze(@Query() query: AnalyzeQueryDto) {
    return this.analysisService.analyze(
      query.country,
      query.city,
      query.zone,
    );
  }

  @Get('history')
  async history(@Query() query: HistoryQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.analysisService.getHistory(page, limit);
  }

  @Get('analysis/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.analysisService.getAnalysisById(id);
  }
}
