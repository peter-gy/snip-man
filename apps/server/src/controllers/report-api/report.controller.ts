import { DataSourceType, IBaseDataServices } from '../../core';
import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProgLanguageEntity, TagEntity } from '@snip-man/entities';

export class ReportApiControllerBuilder {
  static build(dataSourceType: DataSourceType) {
    const openApiTag = 'Report';

    @Controller(`${dataSourceType}/report`)
    class EndpointController {
      constructor(private readonly dataServices: IBaseDataServices) {}

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Find users active in specific languages',
      })
      @ApiQuery({
        name: 'progLanguageId',
        required: true,
        description: 'The id of the programming language',
      })
      @Get('language-users')
      findUsersActiveInSpecificLanguage(
        @Query('progLanguageId') progLanguageId: Pick<ProgLanguageEntity, 'id'>
      ) {
        return this.dataServices.reportService.findUsersActiveInSpecificLanguage(
          progLanguageId
        );
      }

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Find most dominant languages by tags',
      })
      @ApiQuery({
        name: 'tagId',
        required: true,
        description: 'The id of the tag',
      })
      @Get('language-dominance')
      findMostDominantLanguagesByTag(
        @Query('tagId') tagId: Pick<TagEntity, 'id'>
      ) {
        return this.dataServices.reportService.findMostDominantLanguagesByTag(
          tagId
        );
      }
    }

    return EndpointController;
  }
}
