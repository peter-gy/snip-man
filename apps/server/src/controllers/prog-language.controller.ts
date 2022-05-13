import { Controller, Get } from '@nestjs/common';
import { DataSourceType } from '../core';
import { ProgLanguageServices } from '../services/use-cases/prog-language/prog-language-services.services';

export class ProgLanguageApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    @Controller(`${dataSourceType}/prog-language`)
    class EndpointController {
      constructor(private readonly service: ProgLanguageServices) {}

      @Get()
      findAll() {
        return this.service.findAll();
      }
    }

    return EndpointController;
  }
}
