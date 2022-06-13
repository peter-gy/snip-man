import { Module } from '@nestjs/common';
import { PopulatorController } from './populator.controller';
import { DatabasePopulatorModule } from '../../services/db-mutations/populator/database-populator.module';
import { DatabaseMigratorModule } from '../../services/db-mutations/migrator/database-migrator.module';
import { MigratorController } from './migrator.controller';

@Module({
  imports: [DatabasePopulatorModule, DatabaseMigratorModule],
  controllers: [PopulatorController, MigratorController],
})
export class MiscApiModule {}
