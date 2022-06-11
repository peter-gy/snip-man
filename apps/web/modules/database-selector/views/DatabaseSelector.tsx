import { ReactElement } from 'react';
import { Button, Loading, Modal, useModal } from '@geist-ui/core';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';
import DashedContainer from '../../components/DashedContainer';
import { MongoIcon, PostgresIcon } from '../../components/DatabaseIcons';
import useMigrateDatabase from '../hooks/useDatabaseMigration';

function DatabaseSelector(): ReactElement {
  const {
    state: { databaseSource },
    dispatch,
  } = useSnipManState();

  const { setVisible, bindings } = useModal();
  const { mutate, isLoading } = useMigrateDatabase();

  function selectPostgres() {
    dispatch({ type: 'setDatabaseSource', data: 'postgres' });
    dispatch({ type: 'setUser', data: null });
  }

  function selectMongo() {
    if (databaseSource === 'mongo') return;
    setVisible(true);
  }

  function mongoSelectionConfirmed() {
    dispatch({ type: 'setDatabaseSource', data: 'mongo' });
    dispatch({ type: 'setUser', data: null });
    mutate();
    setVisible(false);
  }

  return (
    <>
      <DashedContainer title="Database Selection">
        <div className="flex flex-col space-y-1.5 sm:flex-row sm:space-y-0 sm:space-x-4 justify-between items-center">
          <Button
            onClick={selectPostgres}
            width={1.25}
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
            width={1.25}
            height={1.75}
            icon={<MongoIcon />}
            disabled={isLoading}
            loading={isLoading}
          >
            <p className="font-bold text-xl">
              NoSQL{' '}
              {databaseSource === 'mongo' ? (
                <span className="ml-2">🚀</span>
              ) : (
                ''
              )}
            </p>
          </Button>
        </div>
      </DashedContainer>
      <Modal {...bindings}>
        <Modal.Title>Migration</Modal.Title>
        <Modal.Subtitle>
          Are you sure you want to migrate to MongoDB?
        </Modal.Subtitle>
        <Modal.Content>
          <p>
            You are about to migrate from Postgres to NoSQL. All current data in
            the Mongo database will be lost. Data will be replaced with the
            contents of the Postgres database.
          </p>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={mongoSelectionConfirmed}>Ok</Modal.Action>
      </Modal>
    </>
  );
}

export default DatabaseSelector;
