import { useMutation } from 'react-query';
import { populateDatabase } from '../../api/utils/api.util';

function usePopulateDatabase() {
  return useMutation('populate-database', populateDatabase);
}

export default usePopulateDatabase;
