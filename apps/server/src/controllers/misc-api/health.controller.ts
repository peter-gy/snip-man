import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  @ApiOperation({
    tags: ['Health'],
    summary: 'Server health check',
  })
  @Get()
  health(): Promise<void> {
    return Promise.resolve();
  }
}
