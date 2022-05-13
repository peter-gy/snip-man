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

export type DataSourceType = 'postgres' | 'mongo';

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
