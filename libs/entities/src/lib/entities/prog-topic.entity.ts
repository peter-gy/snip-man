import { BaseEntity } from './base.entity';

export class ProgTopicEntity extends BaseEntity {
  userId: string;
  parentId?: string;
  name: string;
  description: string;
}
