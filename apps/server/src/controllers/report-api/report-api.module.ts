import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceType } from '../../core';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { ReportApiControllerBuilder } from './report.controller';

@Module({})
export class ReportApiModule {
  static register(dataSourceType: DataSourceType): DynamicModule {
    return {
      module: ReportApiModule,
      imports: [DataServicesModule.register(dataSourceType)],
      controllers: [ReportApiControllerBuilder.build(dataSourceType)],
    };
  }
}
