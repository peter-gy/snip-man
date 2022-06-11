import { useMutation, useQueryClient } from 'react-query';
import {
  ApiEndpoint,
  constructApiEndpoint,
} from '../../api/types/endpoint.type';
import { baseFetch, EmptyObject } from '../../api/utils/api.util';

function migrateDatabase() {
  return baseFetch<EmptyObject>(ApiEndpoint.MigrateDatabase, {
    method: 'POST',
  });
}

function useMigrateDatabase() {
  const queryClient = useQueryClient();
  return useMutation(ApiEndpoint.MigrateDatabase, migrateDatabase, {
    // Automatically updates the user selector dropdown
    onSuccess: () =>
      queryClient.refetchQueries(
        constructApiEndpoint(ApiEndpoint.FindAllUsers, 'mongo')
      ),
  });
}

export default useMigrateDatabase;
