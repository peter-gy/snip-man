import {
  DataSourceType,
  IBaseDataServices,
  IProgLanguageRepository,
  IProgSnippetRepository,
  IProgTopicRepository,
  ITagRepository,
  IUserRepository,
} from '../../../core';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  ProgLanguageRepository,
  ProgSnippetRepository,
  ProgTopicRepository,
  TagRepository,
  UserRepository,
} from './repository-impl';
import { IReportService } from '../../../core/reports/report-service.abstract';
import { ReportService } from './report-service.service';

@Injectable()
export class PostgresDataServices
  implements IBaseDataServices, OnApplicationBootstrap
{
  dataSourceType: DataSourceType = 'postgres';
  users: IUserRepository;
  progTopics: IProgTopicRepository;
  tags: ITagRepository;
  progSnippets: IProgSnippetRepository;
  progLanguages: IProgLanguageRepository;
  reportService: IReportService;

  constructor(
    private readonly _users: UserRepository,
    private readonly _progTopics: ProgTopicRepository,
    private readonly _tags: TagRepository,
    private readonly _progSnippets: ProgSnippetRepository,
    private readonly _progLanguages: ProgLanguageRepository,
    private readonly _reportService: ReportService
  ) {}

  onApplicationBootstrap() {
    this.users = this._users;
    this.progTopics = this._progTopics;
    this.tags = this._tags;
    this.progSnippets = this._progSnippets;
    this.progLanguages = this._progLanguages;
    this.reportService = this._reportService;
  }
}
