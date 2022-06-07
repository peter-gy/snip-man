import {
  ApiEndpoint,
  constructApiEndpoint,
  DbSource,
} from '../../api/types/endpoint.type';
import { ProgLanguageEntity } from '@snip-man/entities';
import { baseFetch } from '../../api/utils/api.util';
import { useDatabaseSource } from '../../snip-man-state/context/SnipManContext';
import { useQuery } from 'react-query';

function findAllProgrammingLanguages(dbSource: DbSource) {
  return baseFetch<ProgLanguageEntity[]>(
    constructApiEndpoint(ApiEndpoint.FindAllProgLanguages, dbSource),
    {
      method: 'GET',
    }
  );
}

function useProgLanguages() {
  const dbSource = useDatabaseSource();
  return useQuery(ApiEndpoint.FindAllProgLanguages, () =>
    findAllProgrammingLanguages(dbSource)
  );
}

export default useProgLanguages;
