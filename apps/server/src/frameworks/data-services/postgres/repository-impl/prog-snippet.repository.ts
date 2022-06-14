import { Injectable } from '@nestjs/common';
import { ProgSnippetEntity } from '@snip-man/entities';
import { IProgSnippetRepository } from '../../../../core';
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
    return this.prisma.progSnippet.findFirst({
      where: { [by]: attribute },
      include: { progLanguage: true },
    });
  }

  findAll(parentId: string): Promise<ProgSnippetEntity[]> {
    return this.prisma.progSnippet.findMany({
      include: { progLanguage: true },
      where: { progTopicId: parentId },
    });
  }

  update(
    parentId: string,
    id: string,
    item: Partial<ProgSnippetEntity>
  ): Promise<ProgSnippetEntity> {
    return Promise.resolve(undefined);
  }

  async clear(): Promise<void> {
    await this.prisma.progSnippet.deleteMany({});
  }
}
