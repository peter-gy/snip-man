import { Module } from '@nestjs/common';
import { DatabasePopulator } from '../../../core/populator/database-populator.abstract';
import { DatabasePopulatorService } from './database-populator.service';
import { DataGenerator } from '../../../core/populator/data-generator.abstract';
import { FakeDataGeneratorService } from './fake-data-generator.service';

@Module({
  providers: [
    {
      provide: DatabasePopulator,
      useClass: DatabasePopulatorService,
    },
    {
      provide: DataGenerator,
      useClass: FakeDataGeneratorService,
    },
    {
      // seed for FakeDataGeneratorService
      provide: Number,
      useValue: 42,
    },
  ],
  exports: [DatabasePopulator],
})
export class DatabasePopulatorModule {}
