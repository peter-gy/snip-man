import { Module } from '@nestjs/common';
import { PopulatorController } from './populator.controller';
import { DatabasePopulatorModule } from '../../services/db-mutations/populator/database-populator.module';
import { DatabaseMigratorModule } from '../../services/db-mutations/migrator/database-migrator.module';
import { MigratorController } from './migrator.controller';
import { HealthController } from './health.controller';

@Module({
  imports: [DatabasePopulatorModule, DatabaseMigratorModule],
  controllers: [PopulatorController, MigratorController, HealthController],
})
export class MiscApiModule {}
