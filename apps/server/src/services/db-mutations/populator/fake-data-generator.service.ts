import { Faker, faker } from '@faker-js/faker';
import {
  CreateProgLanguageDto,
  CreateProgSnippetDto,
  CreateProgTopicDto,
  CreateTagDto,
  CreateUserDto,
} from '@snip-man/entities';
import { Injectable } from '@nestjs/common';
import { DataGenerator } from '../../../core/populator/data-generator.abstract';

@Injectable()
export class FakeDataGeneratorService implements DataGenerator {
  fk: Faker;

  constructor(seed?: number) {
    this.fk = faker;
    this.fk.seed(seed);
  }

  public generateUser(): CreateUserDto {
    return {
      email: this.fk.internet.email(),
      password: this.fk.internet.password(),
      username: this.fk.internet.userName(),
    };
  }

  public generateProgTopic(
    userId: string,
    parentId?: string
  ): CreateProgTopicDto {
    return {
      userId: userId,
      parentId: parentId,
      name: this.fk.hacker.verb(),
      description: this.fk.hacker.phrase(),
    };
  }

  public generateTag(): CreateTagDto {
    return {
      name: this.fk.hacker.noun(),
      color: this.fk.internet.color(),
    };
  }

  public generateProgSnippet(progTopicId: string): CreateProgSnippetDto {
    return {
      progTopicId: progTopicId,
      headline: this.fk.git.commitMessage(),
      content: this.fk.lorem.paragraphs(2),
      createdAt: this.fk.date.past(),
      lastModified: this.fk.date.recent(),
    };
  }

  public generateProgLanguage(): CreateProgLanguageDto {
    return {
      name: this.fk.hacker.noun(),
      version: this.fk.hacker.abbreviation(),
    };
  }
}
