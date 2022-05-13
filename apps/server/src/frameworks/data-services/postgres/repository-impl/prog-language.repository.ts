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
    return Promise.resolve(undefined);
  }

  find(id: Pick<ProgLanguageEntity, 'id'>): Promise<ProgLanguageEntity | null> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<ProgLanguageEntity[]> {
    return Promise.resolve([]);
  }

  update(
    id: Pick<ProgLanguageEntity, 'id'>,
    item: Partial<ProgLanguageEntity>
  ): Promise<ProgLanguageEntity> {
    return Promise.resolve(undefined);
  }
}
