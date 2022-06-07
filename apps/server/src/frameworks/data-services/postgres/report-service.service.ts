import { IReportService } from '../../../core/reports/report-service.abstract';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ProgLanguageEntity, TagEntity, UserEntity } from '@snip-man/entities';
import { PrismaPostgresService } from './prisma-postgres.service';

@Injectable()
export class ReportService implements IReportService {
  constructor(private readonly prisma: PrismaPostgresService) {}

  findMostDominantLanguagesByTag(
    tag: TagEntity
  ): Promise<ProgLanguageEntity[]> {
    console.log('postgres - findMostDominantLanguagesByTag');
    throw NotImplementedException;
  }

  findUsersActiveInSpecificLanguage(
    progLanguage: ProgLanguageEntity
  ): Promise<UserEntity[]> {
    console.log('postgres - findUsersActiveInSpecificLanguage');
    throw NotImplementedException;
  }
}
