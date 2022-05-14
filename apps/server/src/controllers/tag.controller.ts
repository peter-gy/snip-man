import { Controller, Get } from '@nestjs/common';
import { DataSourceType } from '../core';
import { TagServices } from '../services/use-cases/tag/tag-services.service';
import { ApiOperation } from '@nestjs/swagger';

export class TagApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    const openApiTag = 'Tag';

    @Controller(`${dataSourceType}/tag`)
    class EndpointController {
      constructor(private readonly service: TagServices) {}

      @ApiOperation({
        summary: 'Retrieve all tags',
        tags: [openApiTag],
      })
      @Get()
      findAll() {
        return this.service.findAll();
      }
    }

    return EndpointController;
  }
}
