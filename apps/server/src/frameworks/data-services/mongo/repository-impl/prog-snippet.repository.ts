import { IBaseRepositoryWeak } from '../../../../core';
import { ProgSnippetEntity, ProgTopicEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class ProgSnippetRepository
  implements IBaseRepositoryWeak<ProgSnippetEntity, ProgTopicEntity>
{
  constructor(private readonly prisma: PrismaMongoService) {}

  create(
    parentId: Pick<ProgTopicEntity, 'id'>,
    item: Partial<ProgSnippetEntity>
  ): Promise<ProgSnippetEntity> {
    return Promise.resolve(undefined);
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
