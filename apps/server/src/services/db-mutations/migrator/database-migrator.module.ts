import { Module } from '@nestjs/common';
import { PostgresDataServicesModule } from '../../../frameworks/data-services/postgres/postgres-data-services.module';
import { MongoDataServicesModule } from '../../../frameworks/data-services/mongo/mongo-data-services.module';
import { DatabaseMigratorService } from './database-migrator.service';

@Module({
  imports: [PostgresDataServicesModule, MongoDataServicesModule],
  providers: [DatabaseMigratorService],
  exports: [DatabaseMigratorService],
})
export class DatabaseMigratorModule {}
