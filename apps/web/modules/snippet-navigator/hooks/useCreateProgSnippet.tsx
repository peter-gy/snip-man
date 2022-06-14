import { CreateProgSnippetDto, ProgSnippetEntity } from '@snip-man/entities';
import { useMutation, useQueryClient } from 'react-query';
import {
  ApiEndpoint,
  constructApiEndpoint,
  DbSource,
} from '../../api/types/endpoint.type';
import { baseFetch } from '../../api/utils/api.util';
import { useDatabaseSource } from '../../snip-man-state/context/SnipManContext';

function createProgSnippet(
  dbSource: DbSource,
  progSnippetDto: CreateProgSnippetDto
) {
  return baseFetch<ProgSnippetEntity>(
    constructApiEndpoint(ApiEndpoint.CreateProgSnippet, dbSource),
    {
      method: 'POST',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      body: progSnippetDto,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
}

function useCreateProgSnippet() {
  const dbSource = useDatabaseSource();
  const queryClient = useQueryClient();

  return useMutation(
    ApiEndpoint.CreateProgSnippet,
    (progSnippetDto: CreateProgSnippetDto) =>
      createProgSnippet(dbSource, progSnippetDto),
    {
      // Automatically updates the prog topic viewer
      onSuccess: () =>
        queryClient.refetchQueries(ApiEndpoint.FindProgTopicsByUserId),
    }
  );
}

export default useCreateProgSnippet;
