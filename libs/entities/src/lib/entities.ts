export interface BaseEntity {
  id: string;
}

export interface IUser extends BaseEntity {
  username: string;
  password: string;
  email: string;
}

export interface IProgTopic extends BaseEntity {
  name: string;
  description: string;
  tags: ITag[];
}

export interface ITag extends BaseEntity {
  name: string;
  color: string;
}

export interface IProgSnippet extends BaseEntity {
  headline: string;
  content: string;
  lastModified: Date;
  createdAt: Date;
  progLanguage: IProgLanguage;
}

export interface IProgLanguage extends BaseEntity {
  name: string;
  version: string;
}
