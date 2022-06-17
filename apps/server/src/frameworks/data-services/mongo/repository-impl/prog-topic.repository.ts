import { IProgTopicRepository } from '../../../../core';
import {
  ProgTopicEntity,
  ProgTopicWithSnippetPreviews,
} from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class ProgTopicRepository implements IProgTopicRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  async create(item: Partial<ProgTopicEntity>): Promise<ProgTopicEntity> {
    const topic = await this.prisma.progTopic.create({
      data: {
        parentId: item.parentId,
        userId: item.userId,
        name: item.name,
        description: item.description,
        tags: item.tags?.map((tag) => ({ name: tag.name, color: tag.color })),
        progSnippetIds: [],
      },
    });
    // Embedded document update
    const { id, userId } = topic;
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        progTopicIds: {
          push: id,
        },
      },
    });

    return topic;
  }

  findUnique<A extends keyof ProgTopicEntity>(
    by: keyof ProgTopicEntity,
    attribute: Pick<ProgTopicEntity, A>
  ): Promise<ProgTopicEntity | null> {
    throw NotImplementedException;
  }

  findAll(): Promise<ProgTopicEntity[]> {
    return this.prisma.progTopic.findMany();
  }

  update(id: string, item: Partial<ProgTopicEntity>): Promise<ProgTopicEntity> {
    return this.prisma.progTopic.update({
      where: { id },
      data: {
        parentId: item.parentId,
        userId: item.userId,
        name: item.name,
        description: item.description,
        tags: item.tags?.map((tag) => ({ name: tag.name, color: tag.color })),
        progSnippetIds: item.progSnippetIds,
      },
    });
  }

  findAllForUser(userId: string): Promise<ProgTopicWithSnippetPreviews[]> {
    return this.prisma.user
      .findFirst({
        where: { id: userId },
        select: {
          progTopics_ProgTopicSide: {
            include: {
              progSnippets_ProgSnippetSide: {
                select: { id: true, headline: true },
              },
            },
          },
        },
      })
      .then(({ progTopics_ProgTopicSide }) =>
        progTopics_ProgTopicSide.map((item) => ({
          ...item,
          progSnippetPreviews: item.progSnippets_ProgSnippetSide,
          progSnippets_ProgSnippetSide: undefined,
        }))
      );
  }

  async clear(): Promise<void> {
    await this.prisma.progTopic.deleteMany({});
  }
}
