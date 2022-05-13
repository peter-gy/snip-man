import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceType } from '../../../core';
import { DataServicesModule } from '../../data-services/data-services.module';
import { ProgLanguageServices } from './prog-language-services.services';

@Module({})
export class ProgLanguageServicesModule {
  static register(dataSourceType: DataSourceType): DynamicModule {
    return {
      module: ProgLanguageServicesModule,
      imports: [DataServicesModule.register(dataSourceType)],
      providers: [ProgLanguageServices],
      exports: [ProgLanguageServices],
    };
  }
}
