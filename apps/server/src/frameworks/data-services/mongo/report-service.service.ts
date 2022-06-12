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
    const result = await this.prisma.user.aggregateRaw({
      pipeline: [
        {
          $project: {
            email: 1,
          },
        },
        {
          $lookup: {
            from: 'prog_topic',
            localField: '_id',
            foreignField: 'user_id',
            as: 'prog_topic',
          },
        },
        {
          $unwind: '$prog_topic',
        },
        {
          $project: {
            email: 1,
            prog_topic_id: '$prog_topic._id',
          },
        },
        {
          $lookup: {
            from: 'prog_snippet',
            localField: 'prog_topic_id',
            foreignField: 'prog_topic_id',
            as: 'prog_snippet',
          },
        },
        {
          $unwind: '$prog_snippet',
        },
        {
          $project: {
            email: 1,
            prog_snippet_language_name: '$prog_snippet.prog_language.name',
            prog_snippet_created_at: {
              $convert: { input: '$prog_snippet.created_at', to: 'string' },
            },
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$prog_snippet_language_name', progLanguageName] },
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
          $group: {
            _id: '$email',
            count: { $sum: 1 },
          },
        },
        {
          $match: {
            count: { $gte: 3 },
          },
        },
        {
          $project: {
            _id: 1,
          },
        },
      ],
    });
    const castedResult = result as unknown as { _id: string }[];
    return castedResult.map(({ _id: email }) => email);
  }
}
