import { BaseEntity } from './base.entity';
import { ProgLanguageEntity } from './prog-language.entity';

export class ProgSnippetEntity extends BaseEntity {
  headline: string;
  content: string;
  lastModified: Date;
  createdAt: Date;
  progLanguageId: string;
}
