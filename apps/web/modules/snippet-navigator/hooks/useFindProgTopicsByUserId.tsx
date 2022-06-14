import {
  ApiEndpoint,
  constructApiEndpoint,
  DbSource,
} from '../../api/types/endpoint.type';
import { baseFetch } from '../../api/utils/api.util';
import { ProgTopicWithSnippetPreviews } from '@snip-man/entities';
import { useDatabaseSource } from '../../snip-man-state/context/SnipManContext';
import { useQuery } from 'react-query';

function findProgTopicsByUserId(dbSource: DbSource, userId: string) {
  return baseFetch<ProgTopicWithSnippetPreviews[]>(
    constructApiEndpoint(ApiEndpoint.FindProgTopicsByUserId, dbSource),
    {
      method: 'GET',
    },
    { userId }
  );
}

function useFindProgTopicsByUserId(userId: string) {
  const dbSource = useDatabaseSource();
  return useQuery(ApiEndpoint.FindProgTopicsByUserId, () =>
    findProgTopicsByUserId(dbSource, userId)
  );
}

export default useFindProgTopicsByUserId;
