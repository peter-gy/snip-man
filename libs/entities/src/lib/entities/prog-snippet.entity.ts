import { BaseEntity } from './base.entity';

export class ProgSnippetEntity extends BaseEntity {
  headline: string;
  content: string;
  lastModified: Date;
  createdAt: Date;
  progLanguageId: string;
}
