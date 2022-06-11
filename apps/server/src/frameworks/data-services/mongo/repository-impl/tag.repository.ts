import { ITagRepository } from '../../../../core';
import { TagEntity } from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<TagEntity>): Promise<TagEntity> {
    throw NotImplementedException;
  }

  findUnique<A extends keyof TagEntity>(
    by: keyof TagEntity,
    attribute: Pick<TagEntity, A>
  ): Promise<TagEntity> {
    throw NotImplementedException;
  }

  async findAll(): Promise<TagEntity[]> {
    const tagsNested = await this.prisma.progTopic
      .findMany({ select: { tags: true } })
      .then((res) =>
        res.map((item) =>
          item.tags.map((tag) => ({
            id: '',
            name: tag.name,
            color: tag.color,
          }))
        )
      );
    // flatten
    const tags = tagsNested.reduce((acc, curr) => acc.concat(curr), []);
    // remove duplicates
    return tags.filter((item, index) => tags.indexOf(item) === index);
  }

  update(id: string, item: Partial<TagEntity>): Promise<TagEntity> {
    throw NotImplementedException;
  }
}
