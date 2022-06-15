import { Injectable } from '@nestjs/common';
import { ProgLanguageEntity, TagEntity } from '@snip-man/entities';
import { IReportService } from '../../../core/reports/report-service.abstract';
import { PrismaPostgresService } from './prisma-postgres.service';

@Injectable()
export class ReportService implements IReportService {
  constructor(private readonly prisma: PrismaPostgresService) { }

  async findMostDominantLanguagesByTag(
    tag: Partial<TagEntity>
  ): Promise<{ name: string, version: string, length: number }[]> {
    const { id: tagId } = tag;
    const result: { name: string, version: string, length: number }[] = await this.prisma.$queryRaw`
   WITH x AS (SELECT prog_language_id, LENGTH(content) as len
              FROM prog_snippet
              WHERE prog_topic_id IN 
                (SELECT \"progTopicId\"
                FROM tags_on_prog_topics
                WHERE \"tagId\" = ${tagId}))
    SELECT name, version, SUM(len) as length
    FROM x
      JOIN prog_language ON prog_language.id = x.prog_language_id
    GROUP BY prog_language_id, name, version
    ORDER BY length DESC
    LIMIT 10`;
    return result;
  }

  async findUsersActiveInSpecificLanguage(
    progLanguage: Partial<ProgLanguageEntity>
  ): Promise<string[]> {
    const { id: progLanguageId } = progLanguage;
    const result: { user_email: string }[] = await this.prisma.$queryRaw`
      WITH relevant_snippets AS (SELECT id, prog_topic_id
                                 FROM prog_snippet
                                 WHERE prog_language_id = ${progLanguageId}
                                   AND created_at BETWEEN (now() - INTERVAL '1 month') AND now()),
           report_result AS (SELECT "user".email AS user_email
                             FROM prog_topic
                                    JOIN "user" ON "user".id = prog_topic.user_id
                                    JOIN relevant_snippets ON relevant_snippets.prog_topic_id = prog_topic.id
                             GROUP BY user_email
                             HAVING COUNT(relevant_snippets.id) >= 3)
      SELECT user_email
      FROM report_result
      ORDER BY user_email;
    `;
    return result.map(({ user_email }) => user_email);
  }
}
