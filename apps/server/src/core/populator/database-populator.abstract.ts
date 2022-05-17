/**
 * Interface for a database populator.
 */
export abstract class DatabasePopulator {
  /**
   * Populates the database.
   */
  abstract populate(): Promise<void>;
}
