import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceType } from '../../../core';
import { DataServicesModule } from '../../data-services/data-services.module';
import { TagServices } from './tag-services.service';

@Module({})
export class TagServicesModule {
  static register(dataSourceType: DataSourceType): DynamicModule {
    return {
      module: TagServicesModule,
      imports: [DataServicesModule.register(dataSourceType)],
      providers: [TagServices],
      exports: [TagServices],
    };
  }
}
