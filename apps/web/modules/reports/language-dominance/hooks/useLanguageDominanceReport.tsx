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
  // TODO implement
  console.log('NOT IMPLEMENTED');
  return baseFetch<string[]>(
    constructApiEndpoint(ApiEndpoint.ReportLanguageUsers, dbSource),
    {
      method: 'GET',
    },
    { progLanguage: JSON.stringify(tag) }
  );
}

function useLanguageUsersReport() {
  const dbSource = useDatabaseSource();
  return useMutation(
    ApiEndpoint.ReportLanguageUsers,
    (tag: Partial<TagEntity>) => getLanguageDominanceReport(dbSource, tag)
  );
}

export default useLanguageUsersReport;
