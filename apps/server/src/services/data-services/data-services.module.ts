import { DynamicModule, Module } from '@nestjs/common';
import { PostgresDataServicesModule } from '../../frameworks/data-services/postgres/postgres-data-services.module';
import { MongoDataServicesModule } from '../../frameworks/data-services/mongo/mongo-data-services.module';
import { DataSourceType } from '../../core';

@Module({})
export class DataServicesModule {
  static register(type: DataSourceType): DynamicModule {
    const dataServiceModule = dataServiceModuleByDataSourceType(type);
    return {
      module: DataServicesModule,
      imports: [dataServiceModule],
      exports: [dataServiceModule],
    };
  }
}

function dataServiceModuleByDataSourceType(type: DataSourceType) {
  switch (type) {
    case 'postgres':
      return PostgresDataServicesModule;
    case 'mongo':
      return MongoDataServicesModule;
  }
}
