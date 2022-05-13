import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceType } from '../../../core';
import { DataServicesModule } from '../../data-services/data-services.module';
import { ProgTopicServices } from './prog-topic-services.service';

@Module({})
export class ProgTopicServicesModule {
  static register(dataSourceType: DataSourceType): DynamicModule {
    return {
      module: ProgTopicServicesModule,
      imports: [DataServicesModule.register(dataSourceType)],
      providers: [ProgTopicServices],
      exports: [ProgTopicServices],
    };
  }
}
