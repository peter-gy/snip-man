import {
  ApiEndpoint,
  constructApiEndpoint,
  DbSource,
} from '../../../api/types/endpoint.type';
import { baseFetch } from '../../../api/utils/api.util';
import { useDatabaseSource } from '../../../snip-man-state/context/SnipManContext';
import { useMutation } from 'react-query';
import { ProgLanguageEntity } from '@snip-man/entities';

function getLanguageUsersReport(
  dbSource: DbSource,
  progLanguage: Partial<ProgLanguageEntity>
) {
  return baseFetch<string[]>(
    constructApiEndpoint(ApiEndpoint.ReportLanguageUsers, dbSource),
    {
      method: 'GET',
    },
    { progLanguage: JSON.stringify(progLanguage) }
  );
}

function useLanguageUsersReport() {
  const dbSource = useDatabaseSource();
  return useMutation(
    ApiEndpoint.ReportLanguageUsers,
    (progLanguage: Partial<ProgLanguageEntity>) =>
      getLanguageUsersReport(dbSource, progLanguage)
  );
}

export default useLanguageUsersReport;
