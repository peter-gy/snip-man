import { IUserRepository } from '../../../../core';
import { UserEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<UserEntity>): Promise<UserEntity> {
    return Promise.resolve(undefined);
  }

  findUnique<A extends keyof UserEntity>(
    by: keyof UserEntity,
    attribute: Pick<UserEntity, A>
  ): Promise<UserEntity | null> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<UserEntity[]> {
    return Promise.resolve([]);
  }

  update(
    id: Pick<UserEntity, 'id'>,
    item: Partial<UserEntity>
  ): Promise<UserEntity> {
    return Promise.resolve(undefined);
  }
}
