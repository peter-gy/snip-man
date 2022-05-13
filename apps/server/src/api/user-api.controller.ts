import { Controller, Get } from '@nestjs/common';
import { UserServices } from '../services/use-cases/user/user-services.service';
import { DataSourceType } from '../core';

export class UserApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    @Controller(`${dataSourceType}/users`)
    class UserApiController {
      constructor(private readonly service: UserServices) {}

      @Get()
      async getAll() {
        return this.service.getAllUsers();
      }
    }

    return UserApiController;
  }
}
