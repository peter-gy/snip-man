import { Injectable, Logger } from '@nestjs/common';
import { PostgresDataServices } from '../../../frameworks/data-services/postgres/postgres-data-services.service';
import { MongoDataServices } from '../../../frameworks/data-services/mongo/mongo-data-services.service';
import { ProgTopicEntity } from '@snip-man/entities';

@Injectable()
export class DatabaseMigratorService {
  constructor(
    private readonly postgres: PostgresDataServices,
    private readonly mongo: MongoDataServices
  ) {}

  async migrate() {
    // Clear all data first
    Logger.debug('Clearing all data from Mongo before migrating...');
    await this.mongo.clear();

    const postgresLanguages = await this.postgres.progLanguages.findAll();
    Logger.debug(
      `Migrating ${postgresLanguages.length} languages from Postgres to Mongo`
    );
    for (const language of postgresLanguages) {
      await this.mongo.progLanguages.create(language);
    }

    const postgresUsers = await this.postgres.users.findAll();
    Logger.debug(
      `Migrating ${postgresUsers.length} users from Postgres to Mongo`
    );
    // Key: postgres user id, value: mongo user id
    const userIdMap = new Map<string, string>();
    for (const postgresUser of postgresUsers) {
      const mongoUser = await this.mongo.users.create(postgresUser);
      Logger.debug(`Migrated user ${postgresUser.id} -> ${mongoUser.id}`);
      userIdMap.set(postgresUser.id, mongoUser.id);
    }
    const postgresTopics = await this.postgres.progTopics.findAll();
    Logger.debug(
      `Migrating ${postgresTopics.length} topics from Postgres to Mongo`
    );
    // Key: postgres topic id, value: mongo topic id
    const topicIdMap = new Map<string, string>();
    for (const postgresTopic of postgresTopics) {
      const mongoUserId = userIdMap.get(postgresTopic.userId);
      const topicDto: ProgTopicEntity = {
        ...postgresTopic,
        userId: mongoUserId,
        parentId: undefined,
      };
      const mongoTopic = await this.mongo.progTopics.create(topicDto);
      Logger.debug(`Migrated topic ${postgresTopic.id} -> ${mongoTopic.id}`);
      topicIdMap.set(postgresTopic.id, mongoTopic.id);
    }
    // Sync parentIds
    for (const postgresTopic of postgresTopics) {
      if (postgresTopic.parentId) {
        const mongoParentId = topicIdMap.get(postgresTopic.parentId);
        const mongoTopicId = topicIdMap.get(postgresTopic.id);
        if (!(mongoParentId && mongoTopicId)) {
          throw new Error('Could not find migration id mapping');
        }
        Logger.debug(
          `Attaching topic ${mongoTopicId} to parent ${mongoParentId}`
        );
        await this.mongo.progTopics.update(mongoTopicId, {
          parentId: mongoParentId,
        });
      }
    }
    // Embed topic ids to user
    const postgresTopicsByUserPostgresUserId = groupBy<ProgTopicEntity, string>(
      postgresTopics,
      ({ userId }) => userId
    );
    for (const postgresUserId of Object.keys(
      postgresTopicsByUserPostgresUserId
    )) {
      const mongoProgTopicIds = postgresTopicsByUserPostgresUserId[
        postgresUserId
      ].map(({ id }) => topicIdMap.get(id));
      const mongoUserId = userIdMap.get(postgresUserId);
      if (!mongoUserId) {
        throw new Error('Could not find migration id mapping');
      }
      await this.mongo.users.update(mongoUserId, {
        progTopicIds: mongoProgTopicIds,
      });
    }

    // Migrate tags
    const postgresTags = await this.postgres.tags.findAll();
    Logger.debug(
      `Migrating ${postgresTags.length} tags from Postgres to Mongo`
    );
    for (const tag of postgresTags) {
      await this.mongo.tags.create(tag);
    }

    // Migrate snippets
    for (const postgresTopic of postgresTopics) {
      const postgresTopicId = postgresTopic.id;
      const mongoTopicId = topicIdMap.get(postgresTopicId);
      const postgresSnippets = await this.postgres.progSnippets.findAll(
        postgresTopicId
      );
      Logger.debug(
        `Migrating ${postgresSnippets.length} snippets of
        Postgres topic ${postgresTopicId} into Mongo topic ${mongoTopicId}`
      );
      // Embed snippet ids to topic
      const mongoSnippetIds: string[] = [];
      const { email } = postgresUsers.find(
        ({ id }) => id === postgresTopic.userId
      );
      for (const postgresSnippet of postgresSnippets) {
        // Attach user email to snippet
        const mongoSnippet = { ...postgresSnippet, userEmail: email };
        const { id } = await this.mongo.progSnippets.create(
          mongoTopicId,
          mongoSnippet
        );
        mongoSnippetIds.push(id);
      }
      await this.mongo.progTopics.update(mongoTopicId, {
        progSnippetIds: mongoSnippetIds,
      });
    }
  }
}

function groupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K) {
  return list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);
}
