import { BaseEntity } from './base.entity';
import { TagEntity } from './tag.entity';

export class ProgTopicEntity extends BaseEntity {
  userId: string;
  parentId?: string;
  name: string;
  description: string;
  tagIds: string[] = [];
  tags?: TagEntity[];
}
