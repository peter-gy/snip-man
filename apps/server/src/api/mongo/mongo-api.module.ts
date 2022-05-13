import { Module } from '@nestjs/common';
import { UserApiModule } from './user-api/user-api.module';
import { ProgLanguageApiModule } from './prog-language-api/prog-language-api.module';
import { ProgSnippetApiModule } from './prog-snippet-api/prog-snippet-api.module';
import { ProgTopicApiModule } from './prog-topic-api/prog-topic-api.module';
import { TagApiModule } from './tag-api/tag-api.module';

@Module({
  imports: [
    ProgLanguageApiModule,
    ProgSnippetApiModule,
    ProgTopicApiModule,
    TagApiModule,
    UserApiModule,
  ],
})
export class MongoApiModule {}
