import { DataSourceType, IBaseDataServices } from '../../core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
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
      @Post('language-users')
      findUsersActiveInSpecificLanguage(
        @Body() progLanguage: ProgLanguageEntity
      ) {
        return this.dataServices.reportService.findUsersActiveInSpecificLanguage(
          progLanguage
        );
      }

      @ApiOperation({
        tags: [openApiTag],
        summary: 'Find most dominant languages by tags',
      })
      @Post('language-dominance')
      findMostDominantLanguagesByTag(@Body() tag: TagEntity) {
        return this.dataServices.reportService.findMostDominantLanguagesByTag(
          tag
        );
      }
    }

    return EndpointController;
  }
}
