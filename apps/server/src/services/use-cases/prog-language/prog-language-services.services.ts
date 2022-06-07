import { Injectable, NotImplementedException } from '@nestjs/common';
import { IBaseDataServices, IBaseRepository } from '../../../core';
import {
  CreateProgLanguageDto,
  ProgLanguageEntity,
  UpdateProgLanguageDto,
} from '@snip-man/entities';

@Injectable()
export class ProgLanguageServices {
  constructor(private readonly dataServices: IBaseDataServices) {}

  /**
   * Creates a new programming language
   * @param dto data transfer object passed from the outside world
   */
  create(dto: CreateProgLanguageDto) {
    return this.dataServices.progLanguages.create(dto);
  }

  /**
   * Retrieves all programming languages from the database
   */
  findAll() {
    return this.dataServices.progLanguages.findAll();
  }

  /**
   * Updates a programming language
   * @param id the id of the programming language to update
   * @param dto the data transfer object containing the updated attributes
   */
  update(id: Pick<ProgLanguageEntity, 'id'>, dto: UpdateProgLanguageDto) {
    throw NotImplementedException;
  }
}
