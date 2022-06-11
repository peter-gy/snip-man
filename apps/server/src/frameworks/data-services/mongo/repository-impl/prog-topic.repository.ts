import { IProgTopicRepository } from '../../../../core';
import {
  ProgTopicEntity,
  ProgTopicWithSnippets,
  UserEntity,
} from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class ProgTopicRepository implements IProgTopicRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<ProgTopicEntity>): Promise<ProgTopicEntity> {
    return Promise.resolve(undefined);
  }

  findUnique<A extends keyof ProgTopicEntity>(
    by: keyof ProgTopicEntity,
    attribute: Pick<ProgTopicEntity, A>
  ): Promise<ProgTopicEntity | null> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<ProgTopicEntity[]> {
    return Promise.resolve([]);
  }

  update(id: string, item: Partial<ProgTopicEntity>): Promise<ProgTopicEntity> {
    return Promise.resolve(undefined);
  }

  findAllForUser(userId: string): Promise<ProgTopicWithSnippets[]> {
    return Promise.resolve([]);
  }
}
