import { IBaseRepository } from '../../../../core';
import { ProgTopicEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaPostgresService } from '../prisma-postgres.service';

@Injectable()
export class ProgTopicRepository implements IBaseRepository<ProgTopicEntity> {
  constructor(private readonly prisma: PrismaPostgresService) {}

  create(item: Partial<ProgTopicEntity>): Promise<ProgTopicEntity> {
    return this.prisma.progTopic.create({
      data: {
        userId: item.userId,
        parentId: item.parentId,
        name: item.name,
        description: item.description,
      },
    });
  }

  findUnique<A extends keyof ProgTopicEntity>(
    by: keyof ProgTopicEntity,
    attribute: Pick<ProgTopicEntity, A>
  ): Promise<ProgTopicEntity | null> {
    return this.prisma.progTopic.findUnique({
      where: { [by]: attribute },
    });
  }

  findAll(): Promise<ProgTopicEntity[]> {
    return this.prisma.progTopic.findMany();
  }

  update(
    id: Pick<ProgTopicEntity, 'id'>,
    item: Partial<ProgTopicEntity>
  ): Promise<ProgTopicEntity> {
    return this.prisma.progTopic.update({
      where: { id: id as unknown as string },
      data: {
        userId: item.userId,
        parentId: item.parentId,
        name: item.name,
        description: item.description,
      },
    });
  }
}
