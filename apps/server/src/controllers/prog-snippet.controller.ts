import { Controller, Get, Param } from '@nestjs/common';
import { DataSourceType } from '../core';
import { ProgSnippetServices } from '../services/use-cases/prog-snippet/prog-snippet-services.service';
import { ProgTopicEntity } from '@snip-man/entities';

export class ProgSnippetApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    @Controller(`${dataSourceType}/prog-snippet`)
    class EndpointController {
      constructor(private readonly service: ProgSnippetServices) {}

      @Get(':parentId')
      findAll(@Param('parentId') parentId: Pick<ProgTopicEntity, 'id'>) {
        return this.service.findAll(parentId);
      }
    }

    return EndpointController;
  }
}
