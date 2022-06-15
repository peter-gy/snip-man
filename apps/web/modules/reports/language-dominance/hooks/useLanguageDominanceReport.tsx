import { TagEntity } from '@snip-man/entities';
import { useMutation } from 'react-query';
import {
  ApiEndpoint,
  constructApiEndpoint,
  DbSource,
} from '../../../api/types/endpoint.type';
import { baseFetch } from '../../../api/utils/api.util';
import { useDatabaseSource } from '../../../snip-man-state/context/SnipManContext';

function getLanguageDominanceReport(
  dbSource: DbSource,
  tag: Partial<TagEntity>
) {
  return baseFetch<{ name: string; version: string; length: number }[]>(
    constructApiEndpoint(ApiEndpoint.ReportLanguageDominance, dbSource),
    {
      method: 'GET',
    },
    { tag: JSON.stringify(tag) }
  );
}

function useLanguageUsersReport() {
  const dbSource = useDatabaseSource();
  return useMutation(
    ApiEndpoint.ReportLanguageDominance,
    (tag: Partial<TagEntity>) => getLanguageDominanceReport(dbSource, tag)
  );
}

export default useLanguageUsersReport;
