import { Module } from '@nestjs/common';
import { ProgSnippetApiController } from './prog-snippet-api.controller';

@Module({
  controllers: [ProgSnippetApiController],
})
export class ProgSnippetApiModule {}
