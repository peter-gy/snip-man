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

@Module({
  providers: [
    PostgresDataServices,
    PrismaPostgresService,
    ProgLanguageRepository,
    ProgSnippetRepository,
    ProgTopicRepository,
    TagRepository,
    UserRepository,
  ],
  // Only expose the facade
  exports: [PostgresDataServices],
})
export class PostgresDataServicesModule {}
