import { ITagRepository } from '../../../../core';
import { TagEntity } from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<TagEntity>): Promise<TagEntity> {
    return this.prisma.tagDocument.create({
      data: {
        name: item.name,
        color: item.color,
      },
    });
  }

  findUnique<A extends keyof TagEntity>(
    by: keyof TagEntity,
    attribute: Pick<TagEntity, A>
  ): Promise<TagEntity> {
    throw NotImplementedException;
  }

  async findAll(): Promise<TagEntity[]> {
    return this.prisma.tagDocument.findMany();
  }

  update(id: string, item: Partial<TagEntity>): Promise<TagEntity> {
    throw NotImplementedException;
  }

  async clear(): Promise<void> {
    this.prisma.tagDocument.deleteMany();
  }
}
