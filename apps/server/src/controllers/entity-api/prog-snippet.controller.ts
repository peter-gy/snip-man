import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { DataSourceType } from '../../core';
import { ProgSnippetServices } from '../../services/use-cases/prog-snippet/prog-snippet-services.service';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

export class ProgSnippetApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    const openApiTag = 'Snippet';

    @Controller(`${dataSourceType}/prog-snippet`)
    class EndpointController {
      constructor(private readonly service: ProgSnippetServices) {}

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Retrieve a snippet by id',
      })
      @ApiQuery({
        name: 'id',
        required: true,
        description: 'The id of the snippet',
      })
      @Get('find-by-id')
      findById(@Query('id') id: string) {
        return this.service.findById(id);
      }
    }

    return EndpointController;
  }
}
