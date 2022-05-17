import { faker } from '@faker-js/faker';
import {
  CreateProgLanguageDto,
  CreateProgSnippetDto,
  CreateProgTopicDto,
  CreateTagDto,
  CreateUserDto,
} from '@snip-man/entities';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataGenerator } from '../../../core/populator/data-generator.abstract';

@Injectable()
export class FakeDataGeneratorService
  implements DataGenerator, OnApplicationBootstrap
{
  constructor(private readonly seed: number) {}

  onApplicationBootstrap() {
    faker.seed(this.seed);
  }

  public generateUser(): CreateUserDto {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    };
  }

  public generateProgTopic(
    userId: string,
    parentId?: string
  ): CreateProgTopicDto {
    return {
      userId: userId,
      parentId: parentId,
      name: faker.hacker.verb(),
      description: faker.hacker.phrase(),
    };
  }

  public generateTag(): CreateTagDto {
    return {
      name: faker.hacker.noun(),
      color: faker.internet.color(),
    };
  }

  public generateProgSnippet(progTopicId: string): CreateProgSnippetDto {
    return {
      progTopicId: progTopicId,
      headline: faker.git.commitMessage(),
      content: faker.lorem.paragraphs(2),
      createdAt: faker.date.past(),
      lastModified: faker.date.recent(),
    };
  }

  public generateProgLanguage(): CreateProgLanguageDto {
    return {
      name: faker.hacker.noun(),
      version: faker.hacker.abbreviation(),
    };
  }
}
