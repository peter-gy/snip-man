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
    const result = await this.prisma.progSnippet.aggregateRaw({
      pipeline: [
        {
          $project: {
            prog_language_name: '$prog_language.name',
            created_at: 1,
            prog_topic_id: 1,
            prog_snippet_created_at: {
              $convert: { input: '$created_at', to: 'string' },
            },
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$prog_language_name', progLanguageName] },
                {
                  $gte: [
                    '$prog_snippet_created_at',
                    new Date(
                      new Date().getTime() - 1000 * 86400 * 30
                    ).toISOString(),
                  ],
                },
                {
                  $lte: ['$prog_snippet_created_at', new Date().toISOString()],
                },
              ],
            },
          },
        },
        {
          $project: {
            prog_topic_id: 1,
          },
        },
        {
          $lookup: {
            from: 'prog_topic',
            localField: 'prog_topic_id',
            foreignField: '_id',
            as: 'prog_topic',
          },
        },
        {
          $unwind: '$prog_topic',
        },
        {
          $group: {
            _id: '$prog_topic.user_id',
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: '_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $project: {
            _id: 0,
            email: '$user.email',
          },
        },
        {
          $sort: {
            email: 1,
          },
        },
      ],
    });
    const castedResult = result as unknown as { email: string }[];
    return castedResult.map(({ email }) => email);
  }
}
