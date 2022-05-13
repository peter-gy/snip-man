import { Injectable } from '@nestjs/common';
import { PrismaClient as PrismaMongoClient } from '@prisma/mongo-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
/**
 * Prisma client for the `mongo` `DataSourceType`,
 * pre-configured with the connection URL.
 *
 * Used by `MongoDataServices` to implement
 * the `IBaseDataServices` interface for `mongo`.
 */
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
