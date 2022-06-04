import { ReactElement } from 'react';
import { Button } from '@geist-ui/core';
import { FiDatabase } from 'react-icons/fi';

function PopulateDatabaseButton(): ReactElement {
  return (
    <Button type="warning" width={1.5} height={1.5} icon={<FiDatabase />}>
      <span className="text-lg">Populate Database</span>
    </Button>
  );
}

export default PopulateDatabaseButton;
