import { IProgSnippetRepository } from '../../../../core';
import { ProgSnippetEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaPostgresService } from '../prisma-postgres.service';

@Injectable()
export class ProgSnippetRepository implements IProgSnippetRepository {
  constructor(private readonly prisma: PrismaPostgresService) {}

  create(
    parentId: string,
    item: Partial<ProgSnippetEntity>
  ): Promise<ProgSnippetEntity> {
    if (!item.progLanguage.id) {
      throw new Error('Prog language id is required');
    }
    return this.prisma.progSnippet.create({
      include: { progLanguage: true },
      data: {
        content: item.content,
        headline: item.headline,
        progTopicId: parentId,
        progLanguageId: item.progLanguage.id,
      },
    });
  }

  findUnique<A extends keyof ProgSnippetEntity>(
    parentId: string,
    by: keyof ProgSnippetEntity,
    attribute: Pick<ProgSnippetEntity, A>
  ): Promise<ProgSnippetEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(parentId: string): Promise<ProgSnippetEntity[]> {
    return Promise.resolve([]);
  }

  update(
    parentId: string,
    id: string,
    item: Partial<ProgSnippetEntity>
  ): Promise<ProgSnippetEntity> {
    return Promise.resolve(undefined);
  }
}
