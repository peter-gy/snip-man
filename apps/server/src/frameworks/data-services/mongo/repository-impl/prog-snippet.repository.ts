import { IProgSnippetRepository } from '../../../../core';
import { ProgSnippetEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class ProgSnippetRepository implements IProgSnippetRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(
    parentId: string,
    item: Partial<ProgSnippetEntity>
  ): Promise<ProgSnippetEntity> {
    if (!item.userEmail) {
      throw new Error('User email is required for MongoDB');
    }
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
        userEmail: item.userEmail,
      },
    });
  }

  findUnique<A extends keyof ProgSnippetEntity>(
    parentId: string,
    by: keyof ProgSnippetEntity,
    attribute: Pick<ProgSnippetEntity, A>
  ): Promise<ProgSnippetEntity> {
    return this.prisma.progSnippet.findFirst({ where: { [by]: attribute } });
  }

  findAll(parentId: string): Promise<ProgSnippetEntity[]> {
    return this.prisma.progSnippet.findMany();
  }

  update(
    parentId: string,
    id: string,
    item: Partial<ProgSnippetEntity>
  ): Promise<ProgSnippetEntity> {
    return this.prisma.progSnippet.update({
      where: { id },
      data: {
        progTopicId: parentId,
        headline: item.headline,
        content: item.content,
        createdAt: item.createdAt,
        lastModified: new Date(),
        progLanguage: {
          name: item.progLanguage.name,
          version: item.progLanguage.version,
        },
      },
    });
  }

  async clear(): Promise<void> {
    await this.prisma.progSnippet.deleteMany({});
  }
}
