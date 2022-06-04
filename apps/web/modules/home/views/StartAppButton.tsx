import { ReactElement } from 'react';
import { Button } from '@geist-ui/core';
import { VscDebugStart } from 'react-icons/vsc';

function StartAppButton(): ReactElement {
  return (
    <Button type="success" width={1} height={1.5} iconRight={<VscDebugStart />}>
      <span className="text-lg">Proceed</span>
    </Button>
  );
}

export default StartAppButton;
