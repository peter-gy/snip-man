import { Controller, Get } from '@nestjs/common';
import { DataSourceType } from '../core';
import { ProgTopicServices } from '../services/use-cases/prog-topic/prog-topic-services.service';

export class ProgTopicApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    @Controller(`${dataSourceType}/prog-topic`)
    class EndpointController {
      constructor(private readonly service: ProgTopicServices) {}

      @Get()
      findAll() {
        return this.service.findAll();
      }
    }

    return EndpointController;
  }
}
