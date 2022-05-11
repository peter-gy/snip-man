import { BaseEntity } from './base.entity';
import { TagEntity } from './tag.entity';

export class ProgTopicEntity extends BaseEntity {
  name: string;
  description: string;
  tags: TagEntity[];
}
