import { Controller, Get, Param } from '@nestjs/common';
import { DataSourceType } from '../../core';
import { ProgSnippetServices } from '../../services/use-cases/prog-snippet/prog-snippet-services.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

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
      @ApiParam({
        name: 'parentId',
        description:
          'ID of the parent topic from which snippets should be returned',
      })
      @Get(':parentId')
      findAll(@Param('parentId') parentId: string) {
        return this.service.findAll(parentId);
      }
    }

    return EndpointController;
  }
}
