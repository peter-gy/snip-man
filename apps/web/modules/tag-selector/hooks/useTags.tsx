import { ProgLanguageEntity } from '@snip-man/entities';
import { useQuery } from 'react-query';
import {
  ApiEndpoint,
  constructApiEndpoint,
  DbSource,
} from '../../api/types/endpoint.type';
import { baseFetch } from '../../api/utils/api.util';
import { useDatabaseSource } from '../../snip-man-state/context/SnipManContext';

function findAllTags(dbSource: DbSource) {
  return baseFetch<ProgLanguageEntity[]>(
    constructApiEndpoint(ApiEndpoint.FindAllTags, dbSource),
    {
      method: 'GET',
    }
  );
}

function useTags() {
  const dbSource = useDatabaseSource();
  return useQuery(ApiEndpoint.FindAllTags, () => findAllTags(dbSource));
}

export default useTags;
