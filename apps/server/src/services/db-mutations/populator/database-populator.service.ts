import { DatabasePopulator } from '../../../core/populator/database-populator.abstract';
import { Injectable, Logger } from '@nestjs/common';
import { DataGenerator } from '../../../core/populator/data-generator.abstract';
import { IBaseDataServices } from '../../../core';

function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => i + start);
}

@Injectable()
export class DatabasePopulatorService implements DatabasePopulator {
  constructor(
    private readonly generator: DataGenerator,
    private readonly dataServices: IBaseDataServices
  ) {}

  async populate(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userDtos = range(0, 10).map((_) => this.generator.generateUser());
    const userPromises = userDtos.map((dto) =>
      this.dataServices.users.create(dto)
    );
    const userIds = (await Promise.all(userPromises)).map(({ id }) => id);
    Logger.debug(`Generated ${userIds.length} users`);
  }
}
