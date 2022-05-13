import { Module } from '@nestjs/common';
import { ProgLanguageApiController } from './prog-language-api.controller';

@Module({
  controllers: [ProgLanguageApiController],
})
export class ProgLanguageApiModule {}
