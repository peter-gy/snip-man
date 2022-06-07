import { IProgSnippetRepository } from '../../../../core';
import { ProgSnippetEntity, ProgTopicEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaPostgresService } from '../prisma-postgres.service';

@Injectable()
export class ProgSnippetRepository implements IProgSnippetRepository {
  constructor(private readonly prisma: PrismaPostgresService) {}

  create(
    parentId: Pick<ProgTopicEntity, 'id'>,
    item: Partial<ProgSnippetEntity>
  ): Promise<ProgSnippetEntity> {
    return this.prisma.progSnippet.create({
      data: {
        content: item.content,
        headline: item.headline,
        progTopicId: parentId as unknown as string,
        progLanguageId: item.progLanguageId,
      },
    });
  }

  findUnique<A extends keyof ProgSnippetEntity>(
    parentId: Pick<ProgTopicEntity, 'id'>,
    by: keyof ProgSnippetEntity,
    attribute: Pick<ProgSnippetEntity, A>
  ): Promise<ProgSnippetEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(parentId: Pick<ProgTopicEntity, 'id'>): Promise<ProgSnippetEntity[]> {
    return Promise.resolve([]);
  }

  update(
    parentId: Pick<ProgTopicEntity, 'id'>,
    id: Pick<ProgSnippetEntity, 'id'>,
    item: Partial<ProgSnippetEntity>
  ): Promise<ProgSnippetEntity> {
    return Promise.resolve(undefined);
  }
}
