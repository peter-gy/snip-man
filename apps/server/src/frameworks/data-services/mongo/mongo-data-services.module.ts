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

@Module({
  providers: [
    MongoDataServices,
    PrismaMongoService,
    ProgLanguageRepository,
    ProgSnippetRepository,
    ProgTopicRepository,
    TagRepository,
    UserRepository,
  ],
  // Only expose the facade
  exports: [MongoDataServices],
})
export class MongoDataServicesModule {}
