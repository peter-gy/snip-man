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
   * Finds a single entity by a given unique property.
   *
   * @param by the name of the unique property to search by.
   * @param attribute the property to use in the query.
   */
  abstract findUnique<A extends keyof T>(
    by: keyof T,
    attribute: Pick<T, A>
  ): Promise<T | null>;

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
  abstract update(id: T['id'], item: Partial<T>): Promise<T>;
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
  abstract findAll(parentId: Strong['id']): Promise<Weak[]>;

  /**
   * Finds a single weak entity by a given unique property.
   *
   * @param parentId The id of the `Strong` `BaseEntity` whose weak entities shall be retrieved.
   * @param by the name of the unique property to search by.
   * @param attribute the property to use in the query.
   */
  abstract findUnique<A extends keyof Weak>(
    parentId: Strong['id'],
    by: keyof Weak,
    attribute: Pick<Weak, A>
  ): Promise<Weak | null>;

  /**
   * Creates a new weak entity in the database.
   *
   * @param parentId The id of the `Strong` `BaseEntity` whose weak entities shall be retrieved.
   * @param item The weak entity to create.
   */
  abstract create(parentId: Strong['id'], item: Partial<Weak>): Promise<Weak>;

  /**
   * Updates an existing weak entity in the database.
   *
   * @param parentId The id of the `Strong` `BaseEntity` whose weak entities shall be retrieved.
   * @param id The id of the weak entity to update.
   * @param item The weak entity with updated values.
   */
  abstract update(
    parentId: Strong['id'],
    id: Weak['id'],
    item: Partial<Weak>
  ): Promise<Weak>;
}
