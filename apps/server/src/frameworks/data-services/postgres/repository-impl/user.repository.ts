import { IUserRepository } from '../../../../core';
import { UserEntity } from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { PrismaPostgresService } from '../prisma-postgres.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaPostgresService) {}

  create(item: Partial<UserEntity>): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        email: item.email,
        password: item.password,
        username: item.username,
      },
    });
  }

  findUnique<A extends keyof UserEntity>(
    by: keyof UserEntity,
    attribute: Pick<UserEntity, A>
  ): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { [by]: attribute },
    });
  }

  findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  update(
    id: Pick<UserEntity, 'id'>,
    item: Partial<UserEntity>
  ): Promise<UserEntity> {
    const promise = this.prisma.user.update({
      where: { id: id as unknown as string },
      data: {
        email: item.email,
        password: item.password,
        username: item.username,
      },
    });
    return Promise.resolve(promise);
  }
}
