import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceType } from '../core';
import { UserServicesModule } from '../services/use-cases/user/user-services.module';
import { UserApiControllerBuilder } from "./user-api.controller";

@Module({})
export class ApiModule {
  static register(dataSourceType: DataSourceType): DynamicModule {
    return {
      module: ApiModule,
      imports: [UserServicesModule.register(dataSourceType)],
      controllers: [UserApiControllerBuilder.build(dataSourceType)],
    };
  }
}
