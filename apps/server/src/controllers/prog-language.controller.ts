import { Controller, Get } from '@nestjs/common';
import { DataSourceType } from '../core';
import { ProgLanguageServices } from '../services/use-cases/prog-language/prog-language-services.services';
import { ApiOperation } from '@nestjs/swagger';

export class ProgLanguageApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    const openApiTag = 'Programming Language';

    @Controller(`${dataSourceType}/prog-language`)
    class EndpointController {
      constructor(private readonly service: ProgLanguageServices) {}

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Retrieve all programming languages',
      })
      @Get()
      findAll() {
        return this.service.findAll();
      }
    }

    return EndpointController;
  }
}
