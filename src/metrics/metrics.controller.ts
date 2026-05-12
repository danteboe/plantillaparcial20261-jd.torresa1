import { Controller, Get, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { EngagementQueryDto } from './dto/engagement-query.dto';
import { CpmQueryDto } from './dto/cpm-query.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('engagement')
  engagement(@Query() query: EngagementQueryDto) {
    return this.metricsService.engagement(query);
  }

  @Get('cpm')
  cpm(@Query() query: CpmQueryDto) {
    return this.metricsService.cpm(query);
  }
}
