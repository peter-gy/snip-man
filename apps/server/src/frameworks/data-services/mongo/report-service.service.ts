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

  async findUsersActiveInSpecificLanguage(
    progLanguage: Partial<ProgLanguageEntity>
  ): Promise<string[]> {
    const progLanguageName = progLanguage.name as string;
    const oneMonthAgo = new Date(
      new Date().getTime() - 1000 * 86400 * 30
    ).toISOString();
    const now = new Date().toISOString();
    const result = await this.prisma.progSnippet.aggregateRaw({
      pipeline: [
        {
          // Keep only the relevant fields, get the creation date as ISO string
          $project: {
            _id: 1,
            prog_language_name: '$prog_language.name',
            prog_snippet_created_at: {
              $convert: { input: '$created_at', to: 'string' },
            },
            user_email: 1,
          },
        },
        // Keep only the relevant snippets
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$prog_language_name', progLanguageName] },
                {
                  $gte: ['$prog_snippet_created_at', oneMonthAgo],
                },
                {
                  $lte: ['$prog_snippet_created_at', now],
                },
              ],
            },
          },
        },
        // Group by email, assign it to doc _id, as it is unique at this stage
        {
          $group: {
            _id: '$user_email',
            count: { $sum: 1 },
          },
        },
        // Keep only those emails where the snippet count is at least 3
        {
          $match: {
            $expr: {
              $gte: ['$count', 3],
            },
          },
        },
        // Keep only the email field, without the count
        {
          $project: {
            _id: 0,
            email: '$_id',
          },
        },
        // Sort by email
        {
          $sort: { email: 1 },
        },
      ],
    });
    const castedResult = result as unknown as { email: string }[];
    return castedResult.map(({ email }) => email);
  }
}
