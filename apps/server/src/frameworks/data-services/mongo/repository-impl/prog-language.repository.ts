import { IProgLanguageRepository } from '../../../../core';
import { ProgLanguageEntity } from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';
import { progLanguages } from '../../../../assets/data';

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
    return progLanguages
      .map((item) => ({
        id: '',
        name: item.name,
        version: item.version,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
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
