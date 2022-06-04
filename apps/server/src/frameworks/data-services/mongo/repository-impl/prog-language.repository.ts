import { IBaseRepository } from '../../../../core';
import { ProgLanguageEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class ProgLanguageRepository
  implements IBaseRepository<ProgLanguageEntity>
{
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<ProgLanguageEntity>): Promise<ProgLanguageEntity> {
    return Promise.resolve(undefined);
  }

  findUnique<A extends keyof ProgLanguageEntity>(
    by: keyof ProgLanguageEntity,
    attribute: Pick<ProgLanguageEntity, A>
  ): Promise<ProgLanguageEntity> {
    throw new Error('Method not implemented.');
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
