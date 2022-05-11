import { Module } from '@nestjs/common';
import { PrismaMongoService } from './prisma-mongo.service';

@Module({
  providers: [PrismaMongoService],
})
export class MongoDataServicesModule {}
