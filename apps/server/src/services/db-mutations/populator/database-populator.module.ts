import { Module } from '@nestjs/common';
import { DatabasePopulator } from '../../../core/populator/database-populator.abstract';
import { DatabasePopulatorService } from './database-populator.service';
import { DataGenerator } from '../../../core/populator/data-generator.abstract';
import { FakeDataGeneratorService } from './fake-data-generator.service';
import { PostgresDataServicesModule } from '../../../frameworks/data-services/postgres/postgres-data-services.module';

@Module({
  imports: [PostgresDataServicesModule],
  providers: [
    {
      provide: DataGenerator,
      useClass: FakeDataGeneratorService,
    },
    {
      // seed for Faker
      provide: Number,
      useValue: Math.random(),
    },
    {
      provide: DatabasePopulator,
      useClass: DatabasePopulatorService,
    },
  ],
  exports: [DatabasePopulator],
})
export class DatabasePopulatorModule {}
