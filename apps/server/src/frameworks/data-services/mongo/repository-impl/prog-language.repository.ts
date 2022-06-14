import { IProgLanguageRepository } from '../../../../core';
import { ProgLanguageEntity } from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class ProgLanguageRepository implements IProgLanguageRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<ProgLanguageEntity>): Promise<ProgLanguageEntity> {
    return this.prisma.progLanguageDocument.create({
      data: {
        name: item.name,
        version: item.version,
      },
    });
  }

  findUnique<A extends keyof ProgLanguageEntity>(
    by: keyof ProgLanguageEntity,
    attribute: Pick<ProgLanguageEntity, A>
  ): Promise<ProgLanguageEntity> {
    throw NotImplementedException;
  }

  async findAll(): Promise<ProgLanguageEntity[]> {
    return this.prisma.progLanguageDocument.findMany({
      orderBy: { name: 'asc' },
    });
  }

  update(
    id: string,
    item: Partial<ProgLanguageEntity>
  ): Promise<ProgLanguageEntity> {
    throw NotImplementedException;
  }

  async clear(): Promise<void> {
    this.prisma.progLanguageDocument.deleteMany();
  }
}
