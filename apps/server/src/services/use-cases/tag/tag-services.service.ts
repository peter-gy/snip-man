import { Injectable } from '@nestjs/common';
import { IBaseDataServices } from '../../../core';
import { CreateTagDto, TagEntity, UpdateTagDto } from '@snip-man/entities';

@Injectable()
export class TagServices {
  constructor(private readonly dataServices: IBaseDataServices) {}

  /**
   * Creates a new tag
   * @param dto data transfer object passed from the outside world
   */
  create(dto: CreateTagDto) {
    return this.dataServices.tags.create(dto);
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
  update(id: string, dto: UpdateTagDto) {
    return this.dataServices.tags.update(id, dto);
  }

  /**
   * Finds a tag by id
   * @param id the id of the tag
   */
  findById(id: string): Promise<TagEntity> {
    return this.dataServices.tags.findUnique(
      'id',
      id as unknown as Pick<TagEntity, 'id'>
    );
  }
}
