import { Injectable } from '@nestjs/common';
import { IBaseDataServices } from '../../../core';
import { ProgTopicEntity } from '@snip-man/entities';

@Injectable()
export class ProgSnippetServices {
  constructor(private readonly dataServices: IBaseDataServices) {}

  findAll(parentId: Pick<ProgTopicEntity, 'id'>) {
    return this.dataServices.progSnippets.findAll(parentId);
  }
}
