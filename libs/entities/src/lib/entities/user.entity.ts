import { BaseEntity } from './base.entity';

export class UserEntity extends BaseEntity {
  username: string;
  password: string;
  email: string;
}
