import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceType } from '../../../core';
import { DataServicesModule } from '../../data-services/data-services.module';
import { ProgSnippetServices } from './prog-snippet-services.service';

@Module({})
export class ProgSnippetServicesModule {
  static register(dataSourceType: DataSourceType): DynamicModule {
    return {
      module: ProgSnippetServicesModule,
      imports: [DataServicesModule.register(dataSourceType)],
      providers: [ProgSnippetServices],
      exports: [ProgSnippetServices],
    };
  }
}
