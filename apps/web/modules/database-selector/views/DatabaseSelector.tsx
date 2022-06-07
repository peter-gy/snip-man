import { ReactElement } from 'react';
import { Button } from '@geist-ui/core';
import { SiMongodb, SiPostgresql } from 'react-icons/si';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';
import DashedContainer from '../../components/DashedContainer';
import { MongoIcon, PostgresIcon } from '../../components/DatabaseIcons';

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
    <DashedContainer title="Database Selection">
      <div className="flex justify-between items-center space-x-5">
        <Button
          onClick={selectPostgres}
          width={1.5}
          height={1.75}
          icon={<PostgresIcon />}
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
          icon={<MongoIcon />}
        >
          <p className="font-bold text-xl">
            NoSQL{' '}
            {databaseSource === 'mongo' ? <span className="ml-2">🚀</span> : ''}
          </p>
        </Button>
      </div>
    </DashedContainer>
  );
}

export default DatabaseSelector;
