import { IUserRepository } from '../../../../core';
import { UserEntity } from '@snip-man/entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaMongoService } from '../prisma-mongo.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaMongoService) {}

  create(item: Partial<UserEntity>): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        username: item.username,
        email: item.email,
        password: item.password,
      },
    });
  }

  findUnique<A extends keyof UserEntity>(
    by: keyof UserEntity,
    attribute: Pick<UserEntity, A>
  ): Promise<UserEntity | null> {
    throw NotImplementedException;
  }

  findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  update(id: string, item: Partial<UserEntity>): Promise<UserEntity> {
    throw NotImplementedException;
  }

  async clear(): Promise<void> {
    await this.prisma.user.deleteMany({});
  }
}
