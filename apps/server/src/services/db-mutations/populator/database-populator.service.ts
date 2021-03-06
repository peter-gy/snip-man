import { Injectable, Logger } from '@nestjs/common';
import { IBaseDataServices } from '../../../core';
import { DataGenerator } from '../../../core/populator/data-generator.abstract';
import { DatabasePopulator } from '../../../core/populator/database-populator.abstract';

function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => i + start);
}

function randomArrayElement<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

const NUM_USERS = 3;
const NUM_LANGUAGES = 25;
const NUM_TAGS = 8;
const NUM_TOPICS_PER_USER = 5;
const NUM_SNIPPETS_PER_TOPIC = 3;
const NUM_TAGS_PER_TOPIC = 4;

@Injectable()
export class DatabasePopulatorService implements DatabasePopulator {
  constructor(
    private readonly generator: DataGenerator,
    private readonly dataServices: IBaseDataServices
  ) {}

  async populate(): Promise<void> {
    // Clear all data first
    Logger.debug('Clearing all data from Postgres before populating...');
    await this.dataServices.clear();

    // Generate random user-selector
    const userIds = await this.generateUsers();
    Logger.debug(`Generated ${userIds.length} users`);

    // Generate languages
    const languageIds = await this.generateProgLanguages();
    Logger.debug(`Generated ${languageIds.length} languages`);

    // Generate tags
    const tagIds = await this.generateTags();
    Logger.debug(`Generated ${tagIds.length} tags`);

    // Generate random data for each user
    for (const userId of userIds) {
      const progTopicIds = await this.generateTopicsForUser(userId);
      Logger.debug(
        `Generated ${progTopicIds.length} topics for user ${userId}`
      );
      for (const progTopicId of progTopicIds) {
        const progSnippetIds = await this.generateSnippetsForTopic(
          progTopicId,
          languageIds
        );
        Logger.debug(
          `Generated ${progSnippetIds.length} snippets for topic ${progTopicId}`
        );
        // Assign random tags to topic
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const randomTagIds = range(0, NUM_TAGS_PER_TOPIC).map((_) =>
          randomArrayElement(tagIds)
        );
        await this.dataServices.progTopics.update(progTopicId, {
          tags: randomTagIds.map((id) => ({ id })),
        });
      }
    }
  }

  private async generateUsers(): Promise<string[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userDtos = range(0, NUM_USERS).map((_) =>
      this.generator.generateUser()
    );
    const userPromises = userDtos.map((dto) =>
      this.dataServices.users.create(dto)
    );
    return (await Promise.all(userPromises)).map(({ id }) => id);
  }

  private async generateProgLanguages(): Promise<string[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const languageDtos = range(0, NUM_LANGUAGES).map((_) =>
      this.generator.generateProgLanguage()
    );
    const languagePromises = languageDtos.map((dto) =>
      this.dataServices.progLanguages.create(dto)
    );
    return (await Promise.all(languagePromises)).map(({ id }) => id);
  }

  private async generateTags(): Promise<string[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tagDtos = range(0, NUM_TAGS).map((_) => this.generator.generateTag());
    const tagPromises = tagDtos.map((dto) =>
      this.dataServices.tags.create(dto)
    );
    return (await Promise.all(tagPromises)).map(({ id }) => id);
  }

  private async generateTopicsForUser(userId: string): Promise<string[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parentTopicDtos = range(0, NUM_TOPICS_PER_USER).map((_) =>
      this.generator.generateProgTopic(userId)
    );
    const parentTopicPromises = parentTopicDtos.map((dto) =>
      this.dataServices.progTopics.create(dto)
    );
    const parentTopicIds = (await Promise.all(parentTopicPromises)).map(
      ({ id }) => id
    );
    // Create one nested topic per parent topic
    const childTopicDtos = parentTopicIds.map((parentId) =>
      this.generator.generateProgTopic(userId, parentId)
    );
    const childTopicPromises = childTopicDtos.map((dto) =>
      this.dataServices.progTopics.create(dto)
    );
    const childTopicIds = (await Promise.all(childTopicPromises)).map(
      ({ id }) => id
    );
    // Return all topic ids
    return [...parentTopicIds, ...childTopicIds];
  }

  private async generateSnippetsForTopic(
    topicId: string,
    languageIds: string[]
  ): Promise<{ id: string; parentId: string }[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const snippetDtos = range(0, NUM_SNIPPETS_PER_TOPIC).map((_, idx) =>
      this.generator.generateProgSnippet(
        topicId,
        languageIds[Math.floor(Math.random() * NUM_LANGUAGES)]
      )
    );

    const snippetPromises = snippetDtos.map((dto) =>
      this.dataServices.progSnippets.create(topicId, dto)
    );
    const snippetIds = (await Promise.all(snippetPromises)).map(({ id }) => id);
    return snippetIds.map((id) => ({ id, parentId: topicId }));
  }
}
