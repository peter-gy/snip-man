import { IProgTopicRepository } from '../../../../core';
import { ProgTopicEntity, ProgTopicWithSnippets } from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class ProgTopicRepository implements IProgTopicRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<ProgTopicEntity>): Promise<ProgTopicEntity> {
    return this.prisma.progTopic.create({
      data: {
        parentId: item.parentId,
        userId: item.userId,
        name: item.name,
        description: item.description,
        tags: item.tags?.map((tag) => ({ name: tag.name, color: tag.color })),
      },
    });
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

  async findAllForUser(userId: string): Promise<ProgTopicWithSnippets[]> {
    const r = await this.prisma.user.findFirst({
      where: { id: userId },
      select: {
        progTopicCreatedByUser: { include: { progTopicHasProgSnippets: true } },
      },
    });
    console.log(r);
    return Promise.resolve([]);
  }

  async clear(): Promise<void> {
    await this.prisma.progTopic.deleteMany({});
  }
}
