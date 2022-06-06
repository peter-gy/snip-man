import { ProgSnippetEntity, ProgTopicEntity } from '@snip-man/entities';

export type SnippetNavigatorState = {
  /**
   * All topics of the current user.
   */
  topics: ProgTopicEntity[];

  /**
   * Currently selected topic.
   * Null if there is no selection.
   */
  selectedTopic?: ProgTopicEntity;

  /**
   * Snippets of the currently selected topic.
   * Null if there is no selection.
   */
  snippets?: ProgSnippetEntity[];
};
