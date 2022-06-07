import {
  ApiEndpoint,
  constructApiEndpoint,
  DbSource,
} from '../../../api/types/endpoint.type';
import { baseFetch } from '../../../api/utils/api.util';
import { useDatabaseSource } from '../../../snip-man-state/context/SnipManContext';
import { useMutation, useQuery } from 'react-query';

function getLanguageUsersReport(dbSource: DbSource, progLanguageId: string) {
  return baseFetch<string[]>(
    constructApiEndpoint(ApiEndpoint.ReportLanguageUsers, dbSource),
    {
      method: 'GET',
    },
    { progLanguageId }
  );
}

function useLanguageUsersReport() {
  const dbSource = useDatabaseSource();
  return useMutation(
    ApiEndpoint.ReportLanguageUsers,
    (progLanguageId: string) => getLanguageUsersReport(dbSource, progLanguageId)
  );
}

export default useLanguageUsersReport;
