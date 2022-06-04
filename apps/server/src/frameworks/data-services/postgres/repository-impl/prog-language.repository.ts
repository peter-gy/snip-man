import { IBaseRepository } from '../../../../core';
import { ProgLanguageEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaPostgresService } from '../prisma-postgres.service';

@Injectable()
export class ProgLanguageRepository
  implements IBaseRepository<ProgLanguageEntity>
{
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
    return this.prisma.progLanguage.findMany();
  }

  update(
    id: Pick<ProgLanguageEntity, 'id'>,
    item: Partial<ProgLanguageEntity>
  ): Promise<ProgLanguageEntity> {
    const promise = this.prisma.progLanguage.update({
      where: { id: id as unknown as string },
      data: {
        name: item.name,
        version: item.version,
      },
    });
    return Promise.resolve(promise);
  }
}
