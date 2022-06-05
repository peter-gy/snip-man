import { useMutation } from 'react-query';
import { ApiEndpoint, BaseResponse } from '../../api/types/endpoint.type';
import { baseFetch, EmptyObject } from '../../api/utils/api.util';

function populateDatabase() {
  return baseFetch<BaseResponse<EmptyObject>>(ApiEndpoint.PopulateDatabase, {
    method: 'POST',
  });
}

function usePopulateDatabase() {
  return useMutation('populate-database', populateDatabase);
}

export default usePopulateDatabase;
