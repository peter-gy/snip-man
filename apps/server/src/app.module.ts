import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { PostgresApiModule } from './api/postgres/postgres-api.module';
import { MongoApiModule } from './api/mongo/mongo-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    MongoApiModule,
    PostgresApiModule,
  ],
})
export class AppModule {}
