export type DbSource = 'postgres' | 'mongo';

/**
 * Db-parameterized API endpoints.
 */
export enum ApiEndpoint {
  PopulateDatabase = '/populate',
  FindAllUsers = '/$db/user',
  FindProgTopicsByUserId = '/$db/prog-topic/find-by-userid',
  CreateProgTopic = '/$db/prog-topic',
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
