import { ReactElement } from 'react';
import { Button } from '@geist-ui/core';
import { FiDatabase } from 'react-icons/fi';
import usePopulateDatabase from '../hooks/usePopulateDatabase';
import { useQueryClient } from 'react-query';

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
        <span className="text-lg">Populate Database</span>
      </Button>
    </>
  );
}

export default PopulateDatabaseButton;
