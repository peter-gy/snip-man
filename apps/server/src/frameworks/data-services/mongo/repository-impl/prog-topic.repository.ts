import { IBaseRepository } from '../../../../core';
import { ProgTopicEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class ProgTopicRepository implements IBaseRepository<ProgTopicEntity> {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<ProgTopicEntity>): Promise<ProgTopicEntity> {
    return Promise.resolve(undefined);
  }

  find(id: Pick<ProgTopicEntity, 'id'>): Promise<ProgTopicEntity | null> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<ProgTopicEntity[]> {
    return Promise.resolve([]);
  }

  update(
    id: Pick<ProgTopicEntity, 'id'>,
    item: Partial<ProgTopicEntity>
  ): Promise<ProgTopicEntity> {
    return Promise.resolve(undefined);
  }
}
