import { DynamicModule, Module } from '@nestjs/common';
import { UserServices } from './user-services.service';
import { DataSourceType } from '../../../core';
import { DataServicesModule } from '../../data-services/data-services.module';

@Module({})
export class UserServicesModule {
  static register(dataSourceType: DataSourceType): DynamicModule {
    return {
      module: UserServicesModule,
      imports: [DataServicesModule.register(dataSourceType)],
      providers: [UserServices],
      exports: [UserServices],
    };
  }
}
