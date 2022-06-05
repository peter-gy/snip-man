import { ReactElement } from 'react';
import { Button } from '@geist-ui/core';
import { SiMongodb, SiPostgresql } from 'react-icons/si';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';

function DatabaseSelector(): ReactElement {
  const {
    state: { databaseSource },
    dispatch,
  } = useSnipManState();
  function selectPostgres() {
    dispatch({ type: 'setDatabaseSource', data: 'postgres' });
  }
  function selectMongo() {
    dispatch({ type: 'setDatabaseSource', data: 'mongo' });
  }
  return (
    <div className="p-4 border-2 border-black border-dashed rounded-lg flex flex-col items-center">
      <h2 className="text-xl">Database Selection</h2>
      <div className="flex justify-between items-center space-x-5">
        <Button
          onClick={selectPostgres}
          width={1.5}
          height={1.75}
          icon={<SiPostgresql fill="#32638c" />}
        >
          <p className="font-bold text-xl">
            SQL{' '}
            {databaseSource === 'postgres' ? (
              <span className="ml-2">🚀</span>
            ) : (
              ''
            )}
          </p>
        </Button>
        <Button
          onClick={selectMongo}
          width={1.5}
          height={1.75}
          icon={<SiMongodb fill="#0f914e" />}
        >
          <p className="font-bold text-xl">
            NoSQL{' '}
            {databaseSource === 'mongo' ? <span className="ml-2">🚀</span> : ''}
          </p>
        </Button>
      </div>
    </div>
  );
}

export default DatabaseSelector;
