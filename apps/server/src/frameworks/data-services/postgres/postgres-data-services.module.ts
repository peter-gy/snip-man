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
import { ReportService } from './report-service.service';

@Module({
  providers: [
    PrismaPostgresService,
    ProgLanguageRepository,
    ProgSnippetRepository,
    ProgTopicRepository,
    TagRepository,
    UserRepository,
    ReportService,
    {
      // providing as the base interface, so that it can be injected without knowing the implementation
      provide: IBaseDataServices,
      useClass: PostgresDataServices,
    },
  ],
  // Only expose the facade
  exports: [IBaseDataServices],
})
export class PostgresDataServicesModule {}
