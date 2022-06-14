import { Injectable } from '@nestjs/common';
import { ProgLanguageEntity } from '@snip-man/entities';
import { IProgLanguageRepository } from '../../../../core';
import { PrismaPostgresService } from '../prisma-postgres.service';

@Injectable()
export class ProgLanguageRepository implements IProgLanguageRepository {
  constructor(private readonly prisma: PrismaPostgresService) {}

  create(item: Partial<ProgLanguageEntity>): Promise<ProgLanguageEntity> {
    return this.prisma.progLanguage.create({
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
    return this.prisma.progLanguage.findUnique({
      where: { [by]: attribute },
    });
  }

  findAll(): Promise<ProgLanguageEntity[]> {
    return this.prisma.progLanguage.findMany({ orderBy: { name: 'asc' } });
  }

  update(
    id: string,
    item: Partial<ProgLanguageEntity>
  ): Promise<ProgLanguageEntity> {
    const promise = this.prisma.progLanguage.update({
      where: { id: id },
      data: {
        name: item.name,
        version: item.version,
      },
    });
    return Promise.resolve(promise);
  }

  async clear(): Promise<void> {
    await this.prisma.progLanguage.deleteMany({});
  }
}
