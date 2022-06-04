import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { ProgTopicEntity } from '@snip-man/entities';
import { DataSourceType } from '../../core';
import { ProgSnippetServices } from '../../services/use-cases/prog-snippet/prog-snippet-services.service';

export class ProgSnippetApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    const openApiTag = 'Snippet';

    @Controller(`${dataSourceType}/prog-snippet`)
    class EndpointController {
      constructor(private readonly service: ProgSnippetServices) { }

      @ApiOperation({
        tags: [openApiTag],
        description: 'Retrieve all snippets',
      })
      @ApiParam({
        name: 'parentId',
        required: true,
        description: 'The id of the topic to find snippets for',
      })
      @Get(':parentId')
      findAll(@Param('parentId') parentId: Pick<ProgTopicEntity, 'id'>) {
        return this.service.findAll(parentId);
      }
    }

    return EndpointController;
  }
}
