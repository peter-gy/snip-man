import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import {
  CreateProgSnippetDto,
  ProgSnippetEntity,
  ProgTopicEntity,
  UpdateProgSnippetDto,
} from '@snip-man/entities';
import { IBaseDataServices } from '../../../core';

@Injectable()
export class ProgSnippetServices {
  constructor(private readonly dataServices: IBaseDataServices) {}

  /**
   * Create a new snippet
   * @param dto data transfer object passed from the outside world
   */
  async create(dto: CreateProgSnippetDto) {
    const { progTopicId, ...item } = dto;
    return this.dataServices.progSnippets.create(progTopicId, item);
  }

  /**
   * Retrieves a programming snippet by the id of its enclosing topic
   * and the id of the snippet itself
   * @param parentId the id of the topic
   * @param id the id of the snippet
   */
  find(parentId: string, id: string) {
    return this.dataServices.progSnippets.findUnique<'id'>(parentId, 'id', {
      id,
    });
  }

  /**
   * Retrieves all snippets from the database for a given topic
   * @param parentId the id of the topic to which the snippet belongs
   */
  findAll(parentId: string) {
    return this.dataServices.progSnippets.findAll(parentId);
  }

  /**
   * Updates a programming snippet
   * @param parentId the id of the topic to which the snippet belongs
   * @param id the id of the snippet
   * @param dto the data transfer object containing the updated attributes
   */
  update(
    parentId: Pick<ProgTopicEntity, 'id'>,
    id: Pick<ProgSnippetEntity, 'id'>,
    dto: UpdateProgSnippetDto
  ) {
    throw NotImplementedException;
  }

  /**
   * Finds a snippet by id
   * @param id the id of the snippet
   */
  findById(id: string): Promise<ProgSnippetEntity> {
    Logger.log(id);
    return this.dataServices.progSnippets.findUnique(
      'placeholder', // no need for parent id here
      'id',
      id as unknown as Pick<ProgSnippetEntity, 'id'>
    );
  }
}
