import { Controller, Get, Param } from '@nestjs/common';
import { DataSourceType } from '../../core';
import { ProgSnippetServices } from '../../services/use-cases/prog-snippet/prog-snippet-services.service';
import { ProgTopicEntity } from '@snip-man/entities';
import { ApiOperation } from '@nestjs/swagger';

export class ProgSnippetApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    const openApiTag = 'Snippet';

    @Controller(`${dataSourceType}/prog-snippet`)
    class EndpointController {
      constructor(private readonly service: ProgSnippetServices) {}

      @ApiOperation({
        tags: [openApiTag],
        description: 'Retrieve all snippets',
      })
      @Get(':parentId')
      findAll(@Param('parentId') parentId: Pick<ProgTopicEntity, 'id'>) {
        return this.service.findAll(parentId);
      }
    }

    return EndpointController;
  }
}
