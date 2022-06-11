import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DataSourceType } from '../../core';
import { ProgTopicServices } from '../../services/use-cases/prog-topic/prog-topic-services.service';
import { CreateProgTopicDto } from '@snip-man/entities';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

export class ProgTopicApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    const openApiTag = 'Programming Topic';

    @Controller(`${dataSourceType}/prog-topic`)
    class EndpointController {
      constructor(private readonly service: ProgTopicServices) {}

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Create a new programming topic',
      })
      @Post()
      create(@Body() dto: CreateProgTopicDto) {
        return this.service.create(dto);
      }

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Retrieve all programming topics',
      })
      @Get()
      findAll() {
        return this.service.findAll();
      }

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Retrieve all programming topics belonging to a given user',
      })
      @ApiQuery({
        name: 'userId',
        required: true,
        description: 'The id of the user',
      })
      @Get('find-by-userid')
      findByUserId(@Query('userId') userId: string) {
        return this.service.findAllForUser(userId);
      }
    }

    return EndpointController;
  }
}
