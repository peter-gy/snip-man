import {
  ApiEndpoint,
  BaseResponse,
  constructApiEndpoint,
  DbSource,
} from '../../api/types/endpoint.type';
import { UserEntity } from '@snip-man/entities';
import { baseFetch } from '../../api/utils/api.util';

function findAllUsers(dbSource: DbSource) {
  return baseFetch<BaseResponse<UserEntity[]>>(
    constructApiEndpoint(ApiEndpoint.FindAllUsers, dbSource),
    {
      method: 'GET',
    }
  );
}
