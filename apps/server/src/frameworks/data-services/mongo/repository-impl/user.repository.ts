import { IBaseRepository } from '../../../../core';
import { UserEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class UserRepository implements IBaseRepository<UserEntity> {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<UserEntity>): Promise<UserEntity> {
    return Promise.resolve(undefined);
  }

  find(id: Pick<UserEntity, 'id'>): Promise<UserEntity | null> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<UserEntity[]> {
    console.log('mongo findAll');
    return Promise.resolve([]);
  }

  update(
    id: Pick<UserEntity, 'id'>,
    item: Partial<UserEntity>
  ): Promise<UserEntity> {
    return Promise.resolve(undefined);
  }
}
