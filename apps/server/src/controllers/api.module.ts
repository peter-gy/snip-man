import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceType } from '../core';
import { UserServicesModule } from '../services/use-cases/user/user-services.module';
import { UserApiControllerBuilder } from './user.controller';
import { ProgLanguageServicesModule } from '../services/use-cases/prog-language/prog-language-services.module';
import { ProgSnippetServicesModule } from '../services/use-cases/prog-snippet/prog-snippet-services.module';
import { ProgTopicServicesModule } from '../services/use-cases/prog-topic/prog-topic-services.module';
import { TagServicesModule } from '../services/use-cases/tag/tag-services.module';
import { ProgLanguageApiControllerBuilder } from './prog-language.controller';
import { ProgSnippetApiControllerBuilder } from './prog-snippet.controller';
import { ProgTopicApiControllerBuilder } from './prog-topic.controller';
import { TagApiControllerBuilder } from './tag.controller';

@Module({})
/**
 * This module is responsible for exposing the API endpoints via controllers
 * which import entity-related use-case services.
 *
 * The module itself is dynamic, so that the same controllers can be re-used
 * for `mongo` and `postgres` `DataSourceType`s.
 */
export class ApiModule {
  /**
   * Returns a dynamic module which exposes the API endpoints via controllers
   * for the specified `dataSourceType`.
   *
   * @param dataSourceType the `DataSourceType` for which the controllers are built,
   *                       defining the underlying database to be used.
   */
  static register(dataSourceType: DataSourceType): DynamicModule {
    return {
      module: ApiModule,
      // Importing one use-case service module per controller
      imports: [
        ProgLanguageServicesModule.register(dataSourceType),
        ProgSnippetServicesModule.register(dataSourceType),
        ProgTopicServicesModule.register(dataSourceType),
        TagServicesModule.register(dataSourceType),
        UserServicesModule.register(dataSourceType),
      ],
      // Building controllers dynamically based on the `dataSourceType`
      controllers: [
        ProgLanguageApiControllerBuilder.build(dataSourceType),
        ProgSnippetApiControllerBuilder.build(dataSourceType),
        ProgTopicApiControllerBuilder.build(dataSourceType),
        TagApiControllerBuilder.build(dataSourceType),
        UserApiControllerBuilder.build(dataSourceType),
      ],
    };
  }
}
