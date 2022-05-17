import { Module } from '@nestjs/common';
import { PopulatorController } from './populator.controller';
import { DatabasePopulatorModule } from '../../services/db-mutations/populator/database-populator.module';

@Module({
  imports: [DatabasePopulatorModule],
  controllers: [PopulatorController],
})
export class MiscApiModule {}
