import { IBaseRepository } from '../../../../core';
import { TagEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaPostgresService } from '../prisma-postgres.service';

@Injectable()
export class TagRepository implements IBaseRepository<TagEntity> {
  constructor(private readonly prisma: PrismaPostgresService) {}

  create(item: Partial<TagEntity>): Promise<TagEntity> {
    return Promise.resolve(undefined);
  }

  find(id: Pick<TagEntity, 'id'>): Promise<TagEntity | null> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<TagEntity[]> {
    return Promise.resolve([]);
  }

  update(
    id: Pick<TagEntity, 'id'>,
    item: Partial<TagEntity>
  ): Promise<TagEntity> {
    return Promise.resolve(undefined);
  }
}
