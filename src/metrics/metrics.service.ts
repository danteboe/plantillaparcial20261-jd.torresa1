import { Injectable } from '@nestjs/common';
import { EngagementQueryDto } from './dto/engagement-query.dto';
import { CpmQueryDto } from './dto/cpm-query.dto';

@Injectable()
export class MetricsService {
  engagement(query: EngagementQueryDto) {
    const rate = ((query.likes + query.comments) / query.followers) * 100;
    return { rate };
  }

  cpm(query: CpmQueryDto) {
    const cpm = (query.cost / query.impressions) * 1000;
    return { cpm };
  }
}
