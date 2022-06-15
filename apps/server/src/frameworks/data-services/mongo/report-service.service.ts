import { Injectable } from '@nestjs/common';
import { ProgLanguageEntity, TagEntity } from '@snip-man/entities';
import { IReportService } from '../../../core/reports/report-service.abstract';
import { PrismaMongoService } from './prisma-mongo.service';

@Injectable()
export class ReportService implements IReportService {
  constructor(private readonly prisma: PrismaMongoService) { }

  async findMostDominantLanguagesByTag(
    tag: Partial<TagEntity>
  ): Promise<{ name: string, version: string, length: number }[]> {
    const tagName = tag.name;

    const result = await this.prisma.progTopic.aggregateRaw({
      pipeline: [

        {
          '$match': {
            'tags': {
              '$elemMatch': {
                'name': tagName
              }
            }
          }
        }, {
          '$project': {
            'prog_snippet_ids': 1
          }
        }, {
          '$lookup': {
            'from': 'prog_snippet',
            'localField': 'prog_snippet_ids',
            'foreignField': '_id',
            'as': 'prog_snippet_docs'
          }
        }, {
          '$project': {
            '_id': 0,
            'prog_snippet_docs': 1
          }
        }, {
          '$unwind': '$prog_snippet_docs'
        }, {
          '$project': {
            'id': '$prog_snippet_docs._id',
            'content': '$prog_snippet_docs.content',
            'lang': '$prog_snippet_docs.prog_language',
            'len': {
              '$strLenCP': '$prog_snippet_docs.content'
            }
          }
        }, {
          '$group': {
            '_id': '$lang',
            'length': {
              '$sum': '$len'
            }
          }
        }, {
          '$project': {
            '_id': 0,
            'name': '$_id.name',
            'version': '$_id.version',
            'length': 1
          }
        }, {
          '$sort': {
            'length': -1
          }
        },
        {
          '$limit': 10
        }
      ]

    });


    const castedResult = result as unknown as { name: string, version: string, length: number }[];
    return castedResult;
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
