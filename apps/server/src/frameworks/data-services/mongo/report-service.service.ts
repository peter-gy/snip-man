import { IReportService } from '../../../core/reports/report-service.abstract';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ProgLanguageEntity, TagEntity } from '@snip-man/entities';
import { PrismaMongoService } from './prisma-mongo.service';

@Injectable()
export class ReportService implements IReportService {
  constructor(private readonly prisma: PrismaMongoService) {}

  findMostDominantLanguagesByTag(
    tagId: Pick<TagEntity, 'id'>
  ): Promise<ProgLanguageEntity[]> {
    console.log('mongo - findMostDominantLanguagesByTag');
    throw NotImplementedException;
  }

  findUsersActiveInSpecificLanguage(
    progLanguageId: Pick<ProgLanguageEntity, 'id'>
  ): Promise<string[]> {
    console.log('mongo - findUsersActiveInSpecificLanguage');
    throw NotImplementedException;
  }
}
