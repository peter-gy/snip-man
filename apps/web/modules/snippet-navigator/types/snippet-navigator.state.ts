import {
  ProgSnippetEntity,
  ProgTopicEntity,
  ProgTopicWithSnippets,
} from '@snip-man/entities';

export type SnippetNavigatorState = {
  /**
   * All topics of the current user.
   */
  topics: ProgTopicWithSnippets[];

  /**
   * Currently selected topic.
   * Null if there is no selection.
   */
  selectedTopic?: ProgTopicEntity;

  /**
   * Currently selected snippet.
   * Null if there is no selection.
   */
  selectedSnippet?: ProgSnippetEntity;
};
