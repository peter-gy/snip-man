import {
  CreateProgLanguageDto,
  CreateProgSnippetDto,
  CreateProgTopicDto,
  CreateTagDto,
  CreateUserDto,
} from '@snip-man/entities';

/**
 * Interface for data generation.
 */
export abstract class DataGenerator {
  /**
   * @return a generated `CreateUserDto`
   */
  abstract generateUser(): CreateUserDto;

  /**
   * @param userId id of the user authoring the topic
   * @param parentId id of the parent topic, if any
   * @return a generated `CreateProgTopicDto`
   */
  abstract generateProgTopic(
    userId: string,
    parentId?: string
  ): CreateProgTopicDto;

  /**
   * @return a generated `CreateTagDto`
   */
  abstract generateTag(): CreateTagDto;

  /**
   * @param progTopicId id of the topic containing the snippet
   * @param progLanguageId id of the programming language of the snippet
   * @return a generated `CreateProgSnippetDto`
   */
  abstract generateProgSnippet(
    progTopicId: string,
    progLanguageId: string
  ): CreateProgSnippetDto;

  /**
   * @return a generated `CreateProgLanguageDto`
   */
  abstract generateProgLanguage(): CreateProgLanguageDto;
}
