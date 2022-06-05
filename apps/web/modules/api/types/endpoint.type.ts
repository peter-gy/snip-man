export type DbSource = 'postgres' | 'mongo';

/**
 * Db-parameterized API endpoints.
 */
export enum ApiEndpoint {
  PopulateDatabase = '/populate',
  FindAllProgLanguages = '/$db/prog-language',
  FindAllUsers = '/$db/users/find-all',
}

/**
 * Constructs endpoint strings dynamically for a specific database source.
 * @param endpoint The endpoint to construct.
 * @param dbSource The database source to use.
 */
export function constructApiEndpoint(
  endpoint: ApiEndpoint,
  dbSource: DbSource
): string {
  return endpoint.replace(/\$db/, dbSource);
}

export interface BaseResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
