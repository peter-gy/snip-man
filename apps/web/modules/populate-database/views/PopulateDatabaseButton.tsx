import { ReactElement } from 'react';
import { Button } from '@geist-ui/core';
import { FiDatabase } from 'react-icons/fi';
import usePopulateDatabase from '../hooks/usePopulateDatabase';

function PopulateDatabaseButton(): ReactElement {
  const { mutate, isLoading } = usePopulateDatabase();

  async function populateDatabase() {
    mutate();
  }

  return (
    <>
      <Button
        type="warning"
        width={1.5}
        height={1.5}
        icon={<FiDatabase />}
        onClick={populateDatabase}
        loading={isLoading}
      >
        <span className="text-lg">Initialise Database</span>
      </Button>
    </>
  );
}

export default PopulateDatabaseButton;
