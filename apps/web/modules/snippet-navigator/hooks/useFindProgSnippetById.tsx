import {
  ApiEndpoint,
  constructApiEndpoint,
  DbSource,
} from '../../api/types/endpoint.type';
import { baseFetch } from '../../api/utils/api.util';
import { ProgSnippetEntity } from '@snip-man/entities';
import { useDatabaseSource } from '../../snip-man-state/context/SnipManContext';
import { useQuery } from 'react-query';

function findProgSnippetById(dbSource: DbSource, id: string) {
  return baseFetch<ProgSnippetEntity>(
    constructApiEndpoint(ApiEndpoint.FindProgSnippetById, dbSource),
    {
      method: 'GET',
    },
    { id }
  );
}

function useFindProgSnippetById(id: string) {
  const dbSource = useDatabaseSource();
  return useQuery(`${ApiEndpoint.FindProgSnippetById}?id=${id}`, () =>
    findProgSnippetById(dbSource, id)
  );
}

export default useFindProgSnippetById;
