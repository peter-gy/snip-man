import { Injectable } from '@nestjs/common';
import { IBaseDataServices } from '../../../core';
import {
  CreateProgTopicDto,
  ProgTopicEntity,
  UpdateProgTopicDto,
} from '@snip-man/entities';

@Injectable()
export class ProgTopicServices {
  constructor(private readonly dataServices: IBaseDataServices) {}

  /**
   * Creates a new programming topic
   * @param dto data transfer object passed from the outside world
   */
  create(dto: CreateProgTopicDto) {
    return this.dataServices.progTopics.create(dto);
  }

  /**
   * Retrieves all programming topics from the database
   */
  findAll() {
    return this.dataServices.progTopics.findAll();
  }

  /**
   * Updates a programming topic
   * @param id the id of the programming topic to update
   * @param dto the data transfer object containing the updated attributes
   */
  update(id: Pick<ProgTopicEntity, 'id'>, dto: UpdateProgTopicDto) {
    return this.dataServices.progTopics.update(id, dto);
  }
}
