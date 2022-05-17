import { DatabasePopulator } from '../../../core/populator/database-populator.abstract';
import { Injectable } from '@nestjs/common';
import { DataGenerator } from '../../../core/populator/data-generator.abstract';

@Injectable()
export class DatabasePopulatorService implements DatabasePopulator {
  constructor(private readonly generator: DataGenerator) {}

  populate(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
