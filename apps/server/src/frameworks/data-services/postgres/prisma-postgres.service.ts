import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient as PrismaPostgresClient } from "@prisma/postgres-client";
import { ConfigService } from "@nestjs/config";

// Source: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#event-types
type QueryEvent = {
  timestamp: Date
  query: string // Query sent to the database
  params: string // Query parameters
  duration: number // Time elapsed (in milliseconds) between client issuing query and database responding - not only time taken to run query
  target: string
}

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
          url: config.get("DATABASE_URL_POSTGRES")
        }
      },
      log: [{
        emit: "event",
        level: "query"
      }]
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on("query", (event: QueryEvent) => {
      Logger.debug(`Query: ${event.query}`);
      Logger.debug(`Params: ${event.params}`);
    });
  }
}
