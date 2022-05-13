import { Injectable } from '@nestjs/common';
import { IBaseDataServices } from '../../../core';

@Injectable()
export class UserServices {
  constructor(private readonly dataServices: IBaseDataServices) {}

  getAllUsers() {
    return this.dataServices.users.findAll();
  }
}
