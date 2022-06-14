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
  // TODO api endpoint
  console.log('NOT IMPLEMENTED');
  return baseFetch<ProgLanguageEntity[]>(
    constructApiEndpoint(ApiEndpoint.FindAllProgLanguages, dbSource),
    {
      method: 'GET',
    }
  );
}

function useTags() {
  const dbSource = useDatabaseSource();
  // TODO api endpoint
  return useQuery(ApiEndpoint.FindAllProgLanguages, () =>
    findAllTags(dbSource)
  );
}

export default useTags;
