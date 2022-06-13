import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateProgSnippetDto } from '@snip-man/entities';
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
        description:
          'ID of the parent topic from which snippets should be returned',
      })
      @Get(':parentId')
      findAll(@Param('parentId') parentId: string) {
        return this.service.findAll(parentId);
      }

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Create a new programming snippet',
      })
      @Post()
      create(@Body() dto: CreateProgSnippetDto) {
        return this.service.create(dto);
      }

    }

    return EndpointController;
  }
}
