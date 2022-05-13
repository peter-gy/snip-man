import { Injectable } from '@nestjs/common';
import { PrismaClient as PrismaPostgresClient } from '@prisma/postgres-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
/**
 * Prisma client for the `postgres` `DataSourceType`,
 * pre-configured with the connection URL.
 *
 * Used by `MongoDataServices` to implement
 * the `IBaseDataServices` interface for `postgres`.
 */
export class PrismaPostgresService extends PrismaPostgresClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL_POSTGRES'),
        },
      },
    });
  }
}
