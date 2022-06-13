import { useMutation, useQueryClient } from 'react-query';
import {
  ApiEndpoint,
  constructApiEndpoint,
} from '../../api/types/endpoint.type';
import { baseFetch, EmptyObject } from '../../api/utils/api.util';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';

function populateDatabase() {
  return baseFetch<EmptyObject>(ApiEndpoint.PopulateDatabase, {
    method: 'POST',
  });
}

function usePopulateDatabase() {
  const queryClient = useQueryClient();
  const { dispatch } = useSnipManState();
  return useMutation(ApiEndpoint.PopulateDatabase, populateDatabase, {
    // Automatically updates the user selector dropdown
    onSuccess: async () => {
      dispatch({ type: 'setUser', data: null });
      await queryClient.refetchQueries(
        constructApiEndpoint(ApiEndpoint.FindAllUsers, 'postgres')
      );
    },
  });
}

export default usePopulateDatabase;
