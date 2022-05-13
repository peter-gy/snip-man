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

  find(
    parentId: Pick<ProgTopicEntity, 'id'>,
    id: Pick<ProgSnippetEntity, 'id'>
  ): Promise<ProgSnippetEntity | null> {
    return Promise.resolve(undefined);
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
