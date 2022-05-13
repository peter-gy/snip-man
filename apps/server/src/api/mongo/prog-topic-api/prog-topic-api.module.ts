import { Module } from '@nestjs/common';
import { ProgTopicApiController } from './prog-topic-api.controller';

@Module({
  controllers: [ProgTopicApiController],
})
export class ProgTopicApiModule {}
