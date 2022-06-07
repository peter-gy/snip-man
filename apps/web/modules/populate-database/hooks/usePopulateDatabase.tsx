import { useMutation, useQueryClient } from 'react-query';
import { ApiEndpoint } from '../../api/types/endpoint.type';
import { baseFetch, EmptyObject } from '../../api/utils/api.util';

function populateDatabase() {
  return baseFetch<EmptyObject>(ApiEndpoint.PopulateDatabase, {
    method: 'POST',
  });
}

function usePopulateDatabase() {
  const queryClient = useQueryClient();
  return useMutation(ApiEndpoint.PopulateDatabase, populateDatabase, {
    // Automatically updates the user selector dropdown
    onSuccess: () => queryClient.refetchQueries(ApiEndpoint.FindAllUsers),
  });
}

export default usePopulateDatabase;
