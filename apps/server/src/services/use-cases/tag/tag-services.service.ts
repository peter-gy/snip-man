import { Injectable } from '@nestjs/common';
import { IBaseDataServices, IBaseRepository } from '../../../core';
import { CreateTagDto, TagEntity, UpdateTagDto } from '@snip-man/entities';

@Injectable()
export class TagServices {
  repo: IBaseRepository<TagEntity>;

  constructor(private readonly dataServices: IBaseDataServices) {
    this.repo = dataServices.tags;
  }

  /**
   * Creates a new tag
   * @param dto data transfer object passed from the outside world
   */
  create(dto: CreateTagDto) {
    return this.repo.create(dto);
  }

  /**
   * Retrieves all tags from the database
   */
  findAll() {
    return this.dataServices.tags.findAll();
  }

  /**
   * Updates a tag
   * @param id the id of the tag
   * @param dto data transfer object containing the updated attributes
   */
  update(id: Pick<TagEntity, 'id'>, dto: UpdateTagDto) {
    return this.repo.update(id, dto);
  }
}
