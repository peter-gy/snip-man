import { Injectable } from '@nestjs/common';
import { IBaseDataServices } from '../../../core';

@Injectable()
export class ProgLanguageServices {
  constructor(private readonly dataServices: IBaseDataServices) {}

  findAll() {
    return this.dataServices.progLanguages.findAll();
  }
}
