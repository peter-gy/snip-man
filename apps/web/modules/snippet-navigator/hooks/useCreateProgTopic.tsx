import { useMutation, useQueryClient } from 'react-query';
import {
  ApiEndpoint,
  constructApiEndpoint,
  DbSource,
} from '../../api/types/endpoint.type';
import { baseFetch } from '../../api/utils/api.util';
import { CreateProgTopicDto, ProgTopicEntity } from '@snip-man/entities';
import { useDatabaseSource } from '../../snip-man-state/context/SnipManContext';

function createProgTopic(dbSource: DbSource, progTopicDto: CreateProgTopicDto) {
  return baseFetch<ProgTopicEntity>(
    constructApiEndpoint(ApiEndpoint.CreateProgTopic, dbSource),
    {
      method: 'POST',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      body: progTopicDto,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
}

function useCreateProgTopic() {
  const dbSource = useDatabaseSource();
  const queryClient = useQueryClient();
  return useMutation(
    ApiEndpoint.CreateProgTopic,
    (progTopicDto: CreateProgTopicDto) =>
      createProgTopic(dbSource, progTopicDto),
    {
      // Automatically updates the prog topic viewer
      onSuccess: () =>
        queryClient.refetchQueries(ApiEndpoint.FindProgTopicsByUserId),
    }
  );
}

export default useCreateProgTopic;
