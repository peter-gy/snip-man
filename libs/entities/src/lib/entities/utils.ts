import { ProgTopicEntity } from './prog-topic.entity';
import { ProgSnippetEntity } from './prog-snippet.entity';

export type ProgSnippetPreview = Pick<ProgSnippetEntity, 'id' | 'headline'>;

export type ProgTopicWithSnippetPreviews = ProgTopicEntity & {
  progSnippetPreviews: ProgSnippetPreview[];
};
