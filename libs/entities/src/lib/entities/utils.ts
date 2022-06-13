import { ProgTopicEntity } from './prog-topic.entity';
import { ProgSnippetEntity } from './prog-snippet.entity';

export type ProgTopicWithSnippets = ProgTopicEntity & {
  progSnippets: ProgSnippetEntity[];
};
