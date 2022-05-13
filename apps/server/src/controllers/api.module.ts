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
export class ApiModule {
  static register(dataSourceType: DataSourceType): DynamicModule {
    return {
      module: ApiModule,
      imports: [
        ProgLanguageServicesModule.register(dataSourceType),
        ProgSnippetServicesModule.register(dataSourceType),
        ProgTopicServicesModule.register(dataSourceType),
        TagServicesModule.register(dataSourceType),
        UserServicesModule.register(dataSourceType),
      ],
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
