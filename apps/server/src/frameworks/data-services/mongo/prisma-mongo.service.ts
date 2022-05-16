import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient as PrismaMongoClient } from '@prisma/mongo-client';
import { ConfigService } from '@nestjs/config';

// Source: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#event-types
type QueryEvent = {
  timestamp: Date;
  query: string; // Query sent to the database
  target: string;
};

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
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', (event: QueryEvent) => {
      Logger.debug(`Query: ${event.query}`);
    });
  }
}
