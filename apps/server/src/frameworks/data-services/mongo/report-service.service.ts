import { IReportService } from '../../../core/reports/report-service.abstract';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ProgLanguageEntity, TagEntity, UserEntity } from '@snip-man/entities';
import { PrismaMongoService } from './prisma-mongo.service';

@Injectable()
export class ReportService implements IReportService {
  constructor(private readonly prisma: PrismaMongoService) {}

  findMostDominantLanguagesByTag(
    tag: TagEntity
  ): Promise<ProgLanguageEntity[]> {
    console.log('mongo - findMostDominantLanguagesByTag');
    throw NotImplementedException;
  }

  findUsersActiveInSpecificLanguage(
    progLanguage: ProgLanguageEntity
  ): Promise<UserEntity[]> {
    console.log('mongo - findUsersActiveInSpecificLanguage');
    throw NotImplementedException;
  }
}
