import { ReactElement } from 'react';
import DatabaseSelector from '../../database-selector/views/DatabaseSelector';
import PopulateDatabaseButton from '../../populate-database/views/PopulateDatabaseButton';
import StartAppButton from './StartAppButton';
import UserSelector from '../../user-selector/views/UserSelector';

function HomeContent(): ReactElement {
  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <h2 className="text-2xl">Application Preferences</h2>
      <div className="max-w-[75vw] flex flex-col space-y-10 max-h-[65vh] overflow-scroll">
        <UserSelector />
        <DatabaseSelector />
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 justify-between">
          <PopulateDatabaseButton />
          <StartAppButton />
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
