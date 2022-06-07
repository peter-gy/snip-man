import { UserEntity } from '@snip-man/entities';

export type SnipManState = {
  user?: UserEntity;
  databaseSource: 'postgres' | 'mongo';
};
