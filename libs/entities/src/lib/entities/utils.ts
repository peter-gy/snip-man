import { ProgTopicEntity } from './prog-topic.entity';

export type ProgTopicWithSnippetPreviews = ProgTopicEntity & {
  progSnippetPreviews: { id: string; headline: string }[];
};
