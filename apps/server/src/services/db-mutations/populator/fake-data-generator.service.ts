import { faker } from '@faker-js/faker';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  CreateProgLanguageDto,
  CreateProgSnippetDto,
  CreateProgTopicDto,
  CreateTagDto,
  CreateUserDto
} from '@snip-man/entities';
import { progLanguages } from '../../../assets/data';
import { DataGenerator } from '../../../core/populator/data-generator.abstract';

@Injectable()
export class FakeDataGeneratorService
  implements DataGenerator, OnApplicationBootstrap {
  onApplicationBootstrap() {
    // faker.seed(42);
  }

  public generateUser(): CreateUserDto {
    const email = faker.internet.email();
    return {
      email: email,
      username: email.split('@')[0],
      password: faker.internet.password(),
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
      tags: [],
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
    const mockSnippet = 'useEffect(() => {\n    Prism.highlightAll();\n}, []);';
    return {
      progTopicId: progTopicId,
      progLanguage: { id: progLanguageId },
      headline: faker.git.commitMessage(),
      content: mockSnippet,
      createdAt: faker.date.past(),
      lastModified: faker.date.recent(),
    };
  }

  idx = 0;

  public generateProgLanguage(): CreateProgLanguageDto {
    if (this.idx >= progLanguages.length) {
      this.idx = 0;
    }
    return progLanguages[this.idx++];
  }
}
