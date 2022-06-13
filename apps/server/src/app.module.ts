import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from './config/configuration';
import { EntityApiModule } from './controllers/entity-api/entity-api.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './core/controller/all-exceptions.filter';
import { TransformInterceptor } from './core/controller/transform.interceptor';
import { TagApiModule } from './api/postgres/tag-api/tag-api.module';
import { MiscApiModule } from './controllers/misc-api/misc-api.module';
import { AppLoggerMiddleware } from './core/middleware/app-logger.middleware';
import { ReportApiModule } from './controllers/report-api/report-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    EntityApiModule.register('mongo'),
    EntityApiModule.register('postgres'),
    ReportApiModule.register('mongo'),
    ReportApiModule.register('postgres'),
    TagApiModule,
    MiscApiModule,
  ],
  // Register global exception filter
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
