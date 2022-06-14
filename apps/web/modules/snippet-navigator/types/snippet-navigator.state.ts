import {
  ProgSnippetEntity,
  ProgSnippetPreview,
  ProgTopicEntity,
  ProgTopicWithSnippetPreviews,
} from '@snip-man/entities';

export type SnippetNavigatorState = {
  /**
   * All topics of the current user.
   */
  topics: ProgTopicWithSnippetPreviews[];

  /**
   * Currently selected topic.
   * Null if there is no selection.
   */
  selectedTopic?: ProgTopicEntity;

  /**
   * Currently selected snippet preview.
   * Null if there is no selection.
   */
  selectedSnippetPreview?: ProgSnippetPreview;

  /**
   * Selected snippet, will be fetched automatically upon `selectedSnippetPreview` change.
   */
  selectedSnippet?: ProgSnippetEntity;
};
