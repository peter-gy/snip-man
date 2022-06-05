import {
  ApiEndpoint,
  BaseResponse,
  constructApiEndpoint,
  DbSource,
} from '../../api/types/endpoint.type';
import { UserEntity } from '@snip-man/entities';
import { baseFetch } from '../../api/utils/api.util';
import { useDatabaseSource } from '../../snip-man-state/context/SnipManContext';
import { useQuery } from 'react-query';

function findAllUsers(dbSource: DbSource) {
  return baseFetch<UserEntity[]>(
    constructApiEndpoint(ApiEndpoint.FindAllUsers, dbSource),
    {
      method: 'GET',
    }
  );
}

function useAppUsers() {
  const dbSource = useDatabaseSource();
  return useQuery('app-users', () => findAllUsers(dbSource));
}

export default useAppUsers;
