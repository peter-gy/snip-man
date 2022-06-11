import { ITagRepository } from '../../../../core';
import { TagEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaPostgresService } from '../prisma-postgres.service';

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(private readonly prisma: PrismaPostgresService) {}

  create(item: Partial<TagEntity>): Promise<TagEntity> {
    return this.prisma.tag.create({
      data: {
        name: item.name,
        color: item.color,
      },
    });
  }

  findUnique<A extends keyof TagEntity>(
    by: keyof TagEntity,
    attribute: Pick<TagEntity, A>
  ): Promise<TagEntity | null> {
    return this.prisma.tag.findUnique({
      where: { [by]: attribute },
    });
  }

  findAll(): Promise<TagEntity[]> {
    return this.prisma.tag.findMany();
  }

  update(id: string, item: Partial<TagEntity>): Promise<TagEntity> {
    const promise = this.prisma.tag.update({
      where: { id: id as unknown as string },
      data: {
        name: item.name,
        color: item.color,
      },
    });
    return Promise.resolve(promise);
  }
}
