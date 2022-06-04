import { Injectable } from '@nestjs/common';
import { IBaseDataServices, IBaseRepository } from '../../../core';
import {
  CreateProgLanguageDto,
  ProgLanguageEntity,
  UpdateProgLanguageDto,
} from '@snip-man/entities';

@Injectable()
export class ProgLanguageServices {
  repo: IBaseRepository<ProgLanguageEntity>;

  constructor(private readonly dataServices: IBaseDataServices) {
    this.repo = dataServices.progLanguages;
  }

  /**
   * Creates a new programming language
   * @param dto data transfer object passed from the outside world
   */
  create(dto: CreateProgLanguageDto) {
    return this.repo.create(dto);
  }

  /**
   * Retrieves all programming languages from the database
   */
  findAll() {
    return this.repo.findAll();
  }

  /**
   * Updates a programming language
   * @param id the id of the programming language to update
   * @param dto the data transfer object containing the updated attributes
   */
  update(id: Pick<ProgLanguageEntity, 'id'>, dto: UpdateProgLanguageDto) {
    return this.repo.update(id, dto);
  }
}
