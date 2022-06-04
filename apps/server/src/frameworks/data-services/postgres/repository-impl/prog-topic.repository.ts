import { IBaseRepository } from '../../../../core';
import { ProgTopicEntity } from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaPostgresService } from '../prisma-postgres.service';

@Injectable()
export class ProgTopicRepository implements IBaseRepository<ProgTopicEntity> {
  constructor(private readonly prisma: PrismaPostgresService) {}

  create(item: Partial<ProgTopicEntity>): Promise<ProgTopicEntity> {
    return this.prisma.progTopic
      .create({
        include: {
          tags: true,
        },
        data: {
          userId: item.userId,
          parentId: item.parentId,
          name: item.name,
          description: item.description,
        },
      })
      .then((r) => ({ ...r, tagIds: r.tags.map((t) => t.tagId) }));
  }

  async findUnique<A extends keyof ProgTopicEntity>(
    by: keyof ProgTopicEntity,
    attribute: Pick<ProgTopicEntity, A>
  ): Promise<ProgTopicEntity | null> {
    throw NotImplementedException;
  }

  findAll(): Promise<ProgTopicEntity[]> {
    return this.prisma.progTopic
      .findMany({ include: { tags: true } })
      .then((r) =>
        r.map((t) => ({ ...t, tagIds: t.tags.map((t) => t.tagId) }))
      );
  }

  async update(
    id: Pick<ProgTopicEntity, 'id'>,
    item: Partial<ProgTopicEntity>
  ): Promise<ProgTopicEntity> {
    const progTopicId = id as unknown as string;
    for (const tagId of item.tagIds) {
      await this.prisma.tagsOnProgTopics.upsert({
        where: { tagId_progTopicId: { tagId, progTopicId } },
        create: { tagId, progTopicId },
        update: { tagId, progTopicId },
      });
    }
    return this.prisma.progTopic
      .update({
        include: { tags: true },
        where: { id: id as unknown as string },
        data: {
          userId: item.userId,
          parentId: item.parentId,
          name: item.name,
          description: item.description,
        },
      })
      .then((r) => ({ ...r, tagIds: r.tags.map((t) => t.tagId) }));
  }
}
