import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from './lib/config/configuration';
import { validationSchema } from './lib/config/validation';
import { PrismaMongoModule } from './lib/prisma/prisma-mongo/prisma-mongo.module';
import { PrismaPostgresModule } from './lib/prisma/prisma-postgres/prisma-postgres.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    PrismaMongoModule,
    PrismaPostgresModule,
  ],
})
export class AppModule {}
