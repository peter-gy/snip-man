import {
  DataSourceType,
  IBaseDataServices,
  IBaseRepository,
  IBaseRepositoryWeak,
} from '../../../core';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  ProgLanguageEntity,
  ProgSnippetEntity,
  ProgTopicEntity,
  TagEntity,
  UserEntity,
} from '@snip-man/entities';
import {
  ProgLanguageRepository,
  ProgSnippetRepository,
  ProgTopicRepository,
  TagRepository,
  UserRepository,
} from './repository-impl';

@Injectable()
export class PostgresDataServices
  implements IBaseDataServices, OnApplicationBootstrap
{
  dataSourceType: DataSourceType = 'postgres';
  users: IBaseRepository<UserEntity>;
  progTopics: IBaseRepository<ProgTopicEntity>;
  tags: IBaseRepository<TagEntity>;
  progSnippets: IBaseRepositoryWeak<ProgSnippetEntity, ProgTopicEntity>;
  progLanguages: IBaseRepository<ProgLanguageEntity>;

  constructor(
    private readonly _users: UserRepository,
    private readonly _progTopics: ProgTopicRepository,
    private readonly _tags: TagRepository,
    private readonly _progSnippets: ProgSnippetRepository,
    private readonly _progLanguages: ProgLanguageRepository
  ) {}

  onApplicationBootstrap() {
    this.users = this._users;
    this.progTopics = this._progTopics;
    this.tags = this._tags;
    this.progSnippets = this._progSnippets;
    this.progLanguages = this._progLanguages;
  }
}
