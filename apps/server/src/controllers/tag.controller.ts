import { Controller, Get } from '@nestjs/common';
import { DataSourceType } from '../core';
import { TagServices } from '../services/use-cases/tag/tag-services.service';

export class TagApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    @Controller(`${dataSourceType}/tag`)
    class EndpointController {
      constructor(private readonly service: TagServices) {}

      @Get()
      findAll() {
        return this.service.findAll();
      }
    }

    return EndpointController;
  }
}
