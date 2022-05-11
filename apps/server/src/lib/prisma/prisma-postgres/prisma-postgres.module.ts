import { Module } from '@nestjs/common';
import { PrismaPostgresService } from './prisma-postgres.service';

@Module({
  providers: [PrismaPostgresService],
  exports: [PrismaPostgresService],
})
export class PrismaPostgresModule {}
