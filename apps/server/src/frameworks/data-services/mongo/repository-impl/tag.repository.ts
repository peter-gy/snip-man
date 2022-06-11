import { ITagRepository } from '../../../../core';
import { TagEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<TagEntity>): Promise<TagEntity> {
    return Promise.resolve(undefined);
  }

  findUnique<A extends keyof TagEntity>(
    by: keyof TagEntity,
    attribute: Pick<TagEntity, A>
  ): Promise<TagEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<TagEntity[]> {
    return Promise.resolve([]);
  }

  update(id: string, item: Partial<TagEntity>): Promise<TagEntity> {
    return Promise.resolve(undefined);
  }
}
