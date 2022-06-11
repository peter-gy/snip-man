import { IProgTopicRepository } from '../../../../core';
import { ProgTopicEntity, ProgTopicWithSnippets } from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaPostgresService } from '../prisma-postgres.service';

@Injectable()
export class ProgTopicRepository implements IProgTopicRepository {
  constructor(private readonly prisma: PrismaPostgresService) {}

  create(item: Partial<ProgTopicEntity>): Promise<ProgTopicEntity> {
    return this.prisma.progTopic
      .create({
        include: { tags: { include: { tag: true } } },
        data: {
          userId: item.userId,
          parentId: item.parentId,
          name: item.name,
          description: item.description,
        },
      })
      .then((r) => ({
        ...r,
        tagIds: r.tags.map((t) => t.tagId),
        tags: r.tags.map(({ tag }) => tag),
      }));
  }

  async findUnique<A extends keyof ProgTopicEntity>(
    by: keyof ProgTopicEntity,
    attribute: Pick<ProgTopicEntity, A>
  ): Promise<ProgTopicEntity | null> {
    throw NotImplementedException;
  }

  findAll(): Promise<ProgTopicEntity[]> {
    return this.prisma.progTopic
      .findMany({ include: { tags: { include: { tag: true } } } })
      .then((r) =>
        r.map((t) => ({
          ...t,
          tagIds: t.tags.map((t) => t.tagId),
          tags: t.tags.map(({ tag }) => tag),
        }))
      );
  }

  async update(
    id: string,
    item: Partial<ProgTopicEntity>
  ): Promise<ProgTopicEntity> {
    const progTopicId = id;
    for (const tag of item.tags) {
      if (!tag.id) {
        throw new Error('Tag id is required');
      }
      const tagId = tag.id as string;
      await this.prisma.tagsOnProgTopics.upsert({
        where: { tagId_progTopicId: { tagId, progTopicId } },
        create: { tagId, progTopicId },
        update: { tagId, progTopicId },
      });
    }
    return this.prisma.progTopic
      .update({
        include: { tags: { include: { tag: true } } },
        where: { id: id as unknown as string },
        data: {
          userId: item.userId,
          parentId: item.parentId,
          name: item.name,
          description: item.description,
        },
      })
      .then((r) => ({
        ...r,
        tagIds: r.tags.map((t) => t.tagId),
        tags: r.tags.map(({ tag }) => tag),
      }));
  }

  findAllForUser(userId: string): Promise<ProgTopicWithSnippets[]> {
    return this.prisma.progTopic
      .findMany({
        include: {
          tags: { include: { tag: true } },
          progSnippets: { include: { progTopic: true, progLanguage: true } },
        },
        where: { userId: userId as unknown as string },
      })
      .then((r) =>
        r.map((t) => ({
          ...t,
          tags: t.tags.map(({ tag }) => tag),
        }))
      );
  }
}
