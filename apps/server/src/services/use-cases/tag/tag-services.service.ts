import { Injectable } from '@nestjs/common';
import { IBaseDataServices } from '../../../core';

@Injectable()
export class TagServices {
  constructor(private readonly dataServices: IBaseDataServices) {}

  findAll() {
    return this.dataServices.tags.findAll();
  }
}
