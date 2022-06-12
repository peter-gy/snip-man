import { IReportService } from '../../../core/reports/report-service.abstract';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ProgLanguageEntity, TagEntity } from '@snip-man/entities';
import { PrismaPostgresService } from './prisma-postgres.service';

@Injectable()
export class ReportService implements IReportService {
  constructor(private readonly prisma: PrismaPostgresService) {}

  findMostDominantLanguagesByTag(
    tag: Partial<TagEntity>
  ): Promise<ProgLanguageEntity[]> {
    console.log('postgres - findMostDominantLanguagesByTag');
    throw NotImplementedException;
  }

  async findUsersActiveInSpecificLanguage(
    progLanguage: Partial<ProgLanguageEntity>
  ): Promise<string[]> {
    const { id: progLanguageId } = progLanguage;
    const result: { user_email: string }[] = await this.prisma.$queryRaw`
      WITH report_result AS (
        SELECT "user".email AS user_email
        FROM prog_topic
               JOIN "user" ON "user".id = prog_topic.user_id
               JOIN prog_snippet ON prog_snippet.prog_topic_id = prog_topic.id AND
                                    prog_snippet.prog_language_id = ${progLanguageId} AND
                                    prog_snippet.created_at BETWEEN (now() - INTERVAL '1 month') AND now()
               JOIN prog_language ON prog_language.id = prog_snippet.prog_language_id
        GROUP BY user_email
        HAVING COUNT(prog_snippet.id) >= 3
      )
      SELECT user_email
      FROM report_result
      ORDER BY user_email;
    `;
    return result.map(({ user_email }) => user_email);
  }
}
