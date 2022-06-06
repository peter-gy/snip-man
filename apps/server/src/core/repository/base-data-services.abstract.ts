import {
  IBaseRepository,
  IBaseRepositoryWeak,
} from './base-repository.abstract';
import {
  ProgLanguageEntity,
  ProgSnippetEntity,
  ProgTopicEntity,
  TagEntity,
  UserEntity,
} from '@snip-man/entities';
import { User } from '@geist-ui/core';

/**
 * Possible types of the database underlying the application.
 */
export type DataSourceType = 'postgres' | 'mongo';

/**
 * Base interface defining a facade for the supported data services.
 *
 * Needed to decouple the actual implementation details of the db-access logic
 * and the actual app business logic.
 */
export abstract class IBaseDataServices {
  abstract dataSourceType: DataSourceType;
  abstract users: IUserRepository;
  abstract progTopics: IProgTopicRepository;
  abstract tags: ITagRepository;
  abstract progSnippets: IProgSnippetRepository;
  abstract progLanguages: IProgLanguageRepository;
}

export abstract class IUserRepository extends IBaseRepository<UserEntity> {}

export abstract class IProgTopicRepository extends IBaseRepository<ProgTopicEntity> {
  /**
   * Retrieves all topics belonging to the specified user.
   * @param userId id of the user whose topics should be retrieved
   */
  abstract findAllForUser(
    userId: Pick<UserEntity, 'id'>
  ): Promise<ProgTopicEntity[]>;
}

export abstract class ITagRepository extends IBaseRepository<TagEntity> {}

export abstract class IProgSnippetRepository extends IBaseRepositoryWeak<
  ProgSnippetEntity,
  ProgTopicEntity
> {}

export abstract class IProgLanguageRepository extends IBaseRepository<ProgLanguageEntity> {}
