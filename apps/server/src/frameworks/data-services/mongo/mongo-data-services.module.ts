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

@Module({
  providers: [
    PrismaMongoService,
    ProgLanguageRepository,
    ProgSnippetRepository,
    ProgTopicRepository,
    TagRepository,
    UserRepository,
    {
      provide: IBaseDataServices,
      useClass: MongoDataServices,
    },
  ],
  // Only expose the facade
  exports: [IBaseDataServices],
})
export class MongoDataServicesModule {}
