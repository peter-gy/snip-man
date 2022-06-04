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

  public generateProgSnippet(
    progTopicId: string,
    progLanguageId: string
  ): CreateProgSnippetDto {
    return {
      progTopicId: progTopicId,
      progLanguageId: progLanguageId,
      headline: faker.git.commitMessage(),
      content: faker.lorem.paragraphs(2),
      createdAt: faker.date.past(),
      lastModified: faker.date.recent(),
    };
  }

  languages = [
    { name: 'C#', version: '1.0' },
    { name: 'C', version: '1.0' },
    { name: 'C++', version: '1.0' },
    { name: 'Clojure', version: '1.0' },
    { name: 'CoffeeScript', version: '1.0' },
    { name: 'Elixir', version: '1.0' },
    { name: 'Elm', version: '1.0' },
    { name: 'Erlang', version: '1.0' },
    { name: 'F#', version: '1.0' },
    { name: 'Go', version: '1.0' },
    { name: 'Haskell', version: '1.0' },
    { name: 'Java', version: '1.0' },
    { name: 'JavaScript', version: '1.0' },
    { name: 'Kotlin', version: '1.0' },
    { name: 'Lua', version: '1.0' },
    { name: 'Perl', version: '1.0' },
    { name: 'PHP', version: '1.0' },
    { name: 'Python', version: '1.0' },
    { name: 'Ruby', version: '1.0' },
    { name: 'Rust', version: '1.0' },
    { name: 'Scala', version: '1.0' },
    { name: 'Swift', version: '1.0' },
    { name: 'TypeScript', version: '1.0' },
  ];
  idx = 0;

  public generateProgLanguage(): CreateProgLanguageDto {
    if (this.idx >= this.languages.length) {
      this.idx = 0;
    }
    return this.languages[this.idx++];
  }
}
