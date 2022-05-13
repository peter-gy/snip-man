import { Module } from '@nestjs/common';
import { TagApiController } from './tag-api.controller';

@Module({
  controllers: [TagApiController],
})
export class TagApiModule {}
