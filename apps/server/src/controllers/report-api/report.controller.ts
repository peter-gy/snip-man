import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProgLanguageEntity, TagEntity } from '@snip-man/entities';
import { DataSourceType, IBaseDataServices } from '../../core';

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
        name: 'progLanguage',
        required: true,
        description:
          'The id of the language to query by in case of RDBMS ' +
          'and the actual values in case of NoSQL. ' +
          'Always needs to be a stringified JSON object.',
      })
      @Get('language-users')
      findUsersActiveInSpecificLanguage(
        @Query('progLanguage') progLanguage: string
      ) {
        return this.dataServices.reportService.findUsersActiveInSpecificLanguage(
          JSON.parse(progLanguage) as Partial<ProgLanguageEntity>
        );
      }

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Find most dominant languages by tags',
      })
      @ApiQuery({
        name: 'tag',
        required: true,
        description:
          'The id of the tag to query by in case of RDBMS ' +
          'and the actual values in case of NoSQL. ' +
          'Always needs to be a stringified JSON object.',
      })
      @Get('language-dominance')
      findMostDominantLanguagesByTag(@Query('tag') tag: string) {
        return this.dataServices.reportService.findMostDominantLanguagesByTag(
          JSON.parse(tag) as Partial<TagEntity>
        );
      }
    }

    return EndpointController;
  }
}
