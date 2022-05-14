import { BaseEntity } from './base.entity';
import { TagEntity } from './tag.entity';
import { Relationship } from './utils';
import { ProgSnippetEntity } from './prog-snippet.entity';

export class ProgTopicEntity extends BaseEntity {
  userId: string;
  parentId?: string;
  name: string;
  description: string;
  tags: TagEntity[];
  // progSnippets: Relationship<ProgSnippetEntity>[];
}
