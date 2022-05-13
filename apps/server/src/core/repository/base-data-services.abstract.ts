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
  abstract users: IBaseRepository<UserEntity>;
  abstract progTopics: IBaseRepository<ProgTopicEntity>;
  abstract tags: IBaseRepository<TagEntity>;
  abstract progSnippets: IBaseRepositoryWeak<
    ProgSnippetEntity,
    ProgTopicEntity
  >;
  abstract progLanguages: IBaseRepository<ProgLanguageEntity>;
}
