import { Injectable } from '@nestjs/common';
import { IBaseDataServices } from '../../../core';
import { CreateUserDto, UpdateUserDto, UserEntity } from '@snip-man/entities';

@Injectable()
export class UserServices {
  constructor(private readonly dataServices: IBaseDataServices) {}

  /**
   * Creates a new user
   * @param dto data transfer object passed from the outside world
   */
  create(dto: CreateUserDto) {
    return this.dataServices.users.create(dto);
  }

  /**
   * Retrieves all users
   */
  findAll() {
    return this.dataServices.users.findAll();
  }

  /**
   * Retrieves a user by username
   *
   * @param username the username of the user
   */
  findByUsername(username: Pick<UserEntity, 'username'>) {
    return this.dataServices.users.findUnique<'username'>('username', username);
  }

  /**
   * Retrieves a user by email
   *
   * @param email the email of the user
   */
  findByEmail(email: Pick<UserEntity, 'email'>) {
    return this.dataServices.users.findUnique<'email'>('email', email);
  }

  /**
   * Updates a user
   * @param id the id of the user
   * @param dto data transfer object containing the updated attributes
   */
  update(id: Pick<UserEntity, 'id'>, dto: UpdateUserDto) {
    return this.dataServices.users.update(id, dto);
  }
}
