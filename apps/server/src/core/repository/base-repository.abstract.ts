import { BaseEntity } from '@snip-man/entities';

export abstract class IBaseRepository<T extends BaseEntity> {
  abstract findAll(): Promise<T[]>;

  abstract find(id: Pick<T, 'id'>): Promise<T | null>;

  abstract create(item: Partial<T>): Promise<T>;

  abstract update(id: Pick<T, 'id'>, item: Partial<T>): Promise<T>;
}

export abstract class IBaseRepositoryWeak<
  Weak extends BaseEntity,
  Strong extends BaseEntity
> {
  abstract findAll(parentId: Pick<Strong, 'id'>): Promise<Weak[]>;

  abstract find(
    parentId: Pick<Strong, 'id'>,
    id: Pick<Weak, 'id'>
  ): Promise<Weak | null>;

  abstract create(
    parentId: Pick<Strong, 'id'>,
    item: Partial<Weak>
  ): Promise<Weak>;

  abstract update(
    parentId: Pick<Strong, 'id'>,
    id: Pick<Weak, 'id'>,
    item: Partial<Weak>
  ): Promise<Weak>;
}
