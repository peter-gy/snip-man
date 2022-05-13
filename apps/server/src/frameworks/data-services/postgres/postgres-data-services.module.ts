import { Module } from '@nestjs/common';
import { PrismaPostgresService } from './prisma-postgres.service';
import {
  ProgLanguageRepository,
  ProgSnippetRepository,
  ProgTopicRepository,
  TagRepository,
  UserRepository,
} from './repository-impl';
import { PostgresDataServices } from './postgres-data-services.service';
import { IBaseDataServices } from '../../../core';

@Module({
  providers: [
    PrismaPostgresService,
    ProgLanguageRepository,
    ProgSnippetRepository,
    ProgTopicRepository,
    TagRepository,
    UserRepository,
    {
      provide: IBaseDataServices,
      useClass: PostgresDataServices,
    },
  ],
  // Only expose the facade
  exports: [IBaseDataServices],
})
export class PostgresDataServicesModule {}
