import { Injectable } from '@nestjs/common';
import { PrismaClient as PrismaMongoClient } from '@prisma/mongo-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaMongoService extends PrismaMongoClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL_MONGO'),
        },
      },
    });
  }
}
