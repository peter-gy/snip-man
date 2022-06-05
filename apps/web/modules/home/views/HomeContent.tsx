import { ReactElement } from 'react';
import DatabaseSelector from '../../database-selector/views/DatabaseSelector';
import PopulateDatabaseButton from '../../populate-database/views/PopulateDatabaseButton';
import StartAppButton from './StartAppButton';
import UserSelector from '../../user-selector/views/UserSelector';

function HomeContent(): ReactElement {
  return (
    <>
      <div className="py-5 p-2 flex flex-col justify-center items-center space-y-6">
        <h2 className="text-2xl">Application Preferences</h2>
        <div className="grow flex flex-col space-y-10 max-h-[50vh] overflow-scroll">
          <UserSelector />
          <DatabaseSelector />
          <div className="flex justify-between">
            <PopulateDatabaseButton />
            <StartAppButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeContent;
