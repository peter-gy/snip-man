import { Injectable } from '@nestjs/common';
import { PrismaClient as PrismaPostgresClient } from '@prisma/postgres-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
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
