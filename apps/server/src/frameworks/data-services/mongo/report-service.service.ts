import { IReportService } from '../../../core/reports/report-service.abstract';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ProgLanguageEntity, TagEntity } from '@snip-man/entities';
import { PrismaMongoService } from './prisma-mongo.service';

@Injectable()
export class ReportService implements IReportService {
  constructor(private readonly prisma: PrismaMongoService) {}

  findMostDominantLanguagesByTag(
    tag: Partial<TagEntity>
  ): Promise<ProgLanguageEntity[]> {
    console.log('mongo - findMostDominantLanguagesByTag');
    throw NotImplementedException;
  }

  findUsersActiveInSpecificLanguage(
    progLanguage: Partial<ProgLanguageEntity>
  ): Promise<string[]> {
    console.log('mongo - findUsersActiveInSpecificLanguage');
    throw NotImplementedException;
  }
}
