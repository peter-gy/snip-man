import { Module } from '@nestjs/common';
import { PrismaMongoService } from './prisma-mongo.service';
import {
  ProgLanguageRepository,
  ProgSnippetRepository,
  ProgTopicRepository,
  TagRepository,
  UserRepository,
} from './repository-impl';
import { MongoDataServices } from './mongo-data-services.service';
import { IBaseDataServices } from '../../../core';
import { ReportService } from './report-service.service';

@Module({
  providers: [
    PrismaMongoService,
    ProgLanguageRepository,
    ProgSnippetRepository,
    ProgTopicRepository,
    TagRepository,
    UserRepository,
    ReportService,
    {
      // providing as the base interface, so that it can be injected without knowing the implementation
      provide: IBaseDataServices,
      useClass: MongoDataServices,
    },
    MongoDataServices,
  ],
  // Only expose the facade
  exports: [IBaseDataServices, MongoDataServices],
})
export class MongoDataServicesModule {}
