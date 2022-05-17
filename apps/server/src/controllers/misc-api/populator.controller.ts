import { Controller, Post } from '@nestjs/common';
import { DatabasePopulator } from '../../core/populator/database-populator.abstract';
import { ApiOperation } from '@nestjs/swagger';

@Controller('populate')
export class PopulatorController {
  constructor(private readonly populatorService: DatabasePopulator) {}

  @ApiOperation({
    tags: ['High-level DB Ops'],
    summary: 'Populate the Postgres instance with data',
  })
  @Post()
  populate(): Promise<void> {
    return this.populatorService.populate();
  }
}
