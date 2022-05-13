import { Injectable } from '@nestjs/common';
import { IBaseDataServices } from '../../../core';

@Injectable()
export class ProgTopicServices {
  constructor(private readonly dataServices: IBaseDataServices) {}

  findAll() {
    return this.dataServices.progTopics.findAll();
  }
}
