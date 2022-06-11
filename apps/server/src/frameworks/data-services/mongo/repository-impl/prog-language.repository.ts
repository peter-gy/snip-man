import { IProgLanguageRepository } from '../../../../core';
import { ProgLanguageEntity } from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class ProgLanguageRepository implements IProgLanguageRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<ProgLanguageEntity>): Promise<ProgLanguageEntity> {
    throw NotImplementedException;
  }

  findUnique<A extends keyof ProgLanguageEntity>(
    by: keyof ProgLanguageEntity,
    attribute: Pick<ProgLanguageEntity, A>
  ): Promise<ProgLanguageEntity> {
    throw NotImplementedException;
  }

  async findAll(): Promise<ProgLanguageEntity[]> {
    const languages = await this.prisma.progSnippet
      .findMany()
      .then((res) => res.map((item) => item.progLanguage));
    // remove duplicates
    const uniqueLanguages: ProgLanguageEntity[] = [];
    for (const language of languages) {
      const exists =
        uniqueLanguages.find(
          (item) =>
            item.version === language.version && item.name === language.name
        ) !== undefined;
      if (!exists) {
        uniqueLanguages.push({ ...language, id: '' });
      }
    }
    return uniqueLanguages.map((item) => ({ id: '', ...item }));
  }

  update(
    id: string,
    item: Partial<ProgLanguageEntity>
  ): Promise<ProgLanguageEntity> {
    throw NotImplementedException;
  }

  async clear(): Promise<void> {
    // Embedded
  }
}
