import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DatabaseMigratorService } from '../../services/db-mutations/migrator/database-migrator.service';

@Controller('migrate')
export class MigratorController {
  constructor(private readonly migratorService: DatabaseMigratorService) {}

  @ApiOperation({
    tags: ['High-level DB Ops'],
    summary: 'Migrate from Postgres to Mongo',
  })
  @Post()
  migrate(): Promise<void> {
    return this.migratorService.migrate();
  }
}
