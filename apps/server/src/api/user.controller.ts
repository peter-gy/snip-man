import { Controller, Get } from '@nestjs/common';
import { UserServices } from '../services/use-cases/user/user-services.service';
import { DataSourceType } from '../core';

export class UserApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    @Controller(`${dataSourceType}/users`)
    class EndpointController {
      constructor(private readonly service: UserServices) {}

      @Get()
      findAll() {
        return this.service.findAll();
      }
    }

    return EndpointController;
  }
}
