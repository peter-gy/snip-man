import { Button, Collapse } from '@geist-ui/core';
import { ReactElement } from 'react';
import DatabaseSelector from './DatabaseSelector';
import PopulateDatabaseButton from './PopulateDatabaseButton';
import StartAppButton from './StartAppButton';

function HomeContent(): ReactElement {
  return (
    <div className="p-2 flex flex-col justify-center items-center space-y-6">
      <h2>Application Preferences</h2>
      <div className="grow flex flex-col space-y-10">
        <DatabaseSelector />
        <div className="flex justify-between">
          <PopulateDatabaseButton />
          <StartAppButton />
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
