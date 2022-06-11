import { IProgSnippetRepository } from '../../../../core';
import { ProgSnippetEntity } from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class ProgSnippetRepository implements IProgSnippetRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(
    parentId: string,
    item: Partial<ProgSnippetEntity>
  ): Promise<ProgSnippetEntity> {
    return this.prisma.progSnippet.create({
      data: {
        progTopicId: parentId,
        headline: item.headline,
        content: item.content,
        createdAt: item.createdAt,
        lastModified: item.lastModified,
        progLanguage: {
          name: item.progLanguage.name,
          version: item.progLanguage.version,
        },
      },
    });
  }

  findUnique<A extends keyof ProgSnippetEntity>(
    parentId: string,
    by: keyof ProgSnippetEntity,
    attribute: Pick<ProgSnippetEntity, A>
  ): Promise<ProgSnippetEntity> {
    throw NotImplementedException;
  }

  findAll(parentId: string): Promise<ProgSnippetEntity[]> {
    throw NotImplementedException;
  }

  update(
    parentId: string,
    id: string,
    item: Partial<ProgSnippetEntity>
  ): Promise<ProgSnippetEntity> {
    throw NotImplementedException;
  }
}
