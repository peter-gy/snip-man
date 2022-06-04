import { ReactElement } from 'react';
import { Button } from '@geist-ui/core';
import { SiMongodb, SiPostgresql } from 'react-icons/si';

function DatabaseSelector(): ReactElement {
  return (
    <div className="p-4 border-2 border-black border-dashed rounded-lg flex flex-col items-center">
      <h2 className="text-xl">Database Selection</h2>
      <div className="flex justify-between items-center space-x-5">
        <Button
          width={1.5}
          height={1.75}
          icon={<SiPostgresql fill="#32638c" />}
        >
          <p className="font-bold text-xl">SQL</p>
        </Button>
        <Button width={1.5} height={1.75} icon={<SiMongodb fill="#0f914e" />}>
          <p className="font-bold text-xl">NoSQL</p>
        </Button>
      </div>
    </div>
  );
}

export default DatabaseSelector;
