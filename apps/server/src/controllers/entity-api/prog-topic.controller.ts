import { Body, Controller, Get, Header, Post, Query } from '@nestjs/common';
import { DataSourceType } from '../../core';
import { ProgTopicServices } from '../../services/use-cases/prog-topic/prog-topic-services.service';
import { CreateProgTopicDto, UserEntity } from '@snip-man/entities';
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
        console.log(dto);
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
      findByUserId(@Query('userId') userId: Pick<UserEntity, 'id'>) {
        return this.service.findAllForUser(userId);
      }
    }

    return EndpointController;
  }
}
