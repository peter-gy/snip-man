import { BaseEntity } from '@snip-man/entities';

/**
 * Base interface defining supported database operations in a db-agnostic way.
 *
 * `T` denotes the concrete `BaseEntity` whose table/collection shall be accessed.
 */
export abstract class IBaseRepository<T extends BaseEntity> {
  /**
   * Retrieves all entities from the database.
   */
  abstract findAll(): Promise<T[]>;

  /**
   * Retrieves a single entity from the database by id.
   *
   * @param id The id of the entity to retrieve.
   */
  abstract find(id: Pick<T, 'id'>): Promise<T | null>;

  /**
   * Creates a new entity in the database.
   *
   * @param item The entity to create.
   */
  abstract create(item: Partial<T>): Promise<T>;

  /**
   * Updates an existing entity in the database.
   *
   * @param id: The id of the entity to update.
   * @param item The entity with updated values.
   */
  abstract update(id: Pick<T, 'id'>, item: Partial<T>): Promise<T>;
}

/**
 * Base interface defining supported database operations in a db-agnostic way,
 * for weak entities.
 *
 * `Weak` denotes the concrete `BaseEntity` whose table/collection shall be accessed.
 * `Weak` cannot be uniquely identified by its attributes alone; therefore,
 * it must use a foreign key in conjunction with its attributes to create a primary key.
 * The foreign key is the id of the `Strong` `BaseEntity`.
 */
export abstract class IBaseRepositoryWeak<
  Weak extends BaseEntity,
  Strong extends BaseEntity
> {
  /**
   * Retrieves all weak entities from the database linked to the entity with `parentId`.
   * @param parentId The id of the `Strong` `BaseEntity` whose weak entities shall be retrieved.
   */
  abstract findAll(parentId: Pick<Strong, 'id'>): Promise<Weak[]>;

  /**
   * Retrieves a single weak entity from the database by id.
   *
   * @param parentId The id of the `Strong` `BaseEntity` whose weak entities shall be retrieved.
   * @param id The id of the weak entity to retrieve.
   */
  abstract find(
    parentId: Pick<Strong, 'id'>,
    id: Pick<Weak, 'id'>
  ): Promise<Weak | null>;

  /**
   * Creates a new weak entity in the database.
   *
   * @param parentId The id of the `Strong` `BaseEntity` whose weak entities shall be retrieved.
   * @param item The weak entity to create.
   */
  abstract create(
    parentId: Pick<Strong, 'id'>,
    item: Partial<Weak>
  ): Promise<Weak>;

  /**
   * Updates an existing weak entity in the database.
   *
   * @param parentId The id of the `Strong` `BaseEntity` whose weak entities shall be retrieved.
   * @param id The id of the weak entity to update.
   * @param item The weak entity with updated values.
   */
  abstract update(
    parentId: Pick<Strong, 'id'>,
    id: Pick<Weak, 'id'>,
    item: Partial<Weak>
  ): Promise<Weak>;
}
