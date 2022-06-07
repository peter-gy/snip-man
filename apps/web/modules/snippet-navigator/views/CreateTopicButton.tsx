import { Button } from '@geist-ui/core';
import { BsFolderPlus } from 'react-icons/bs';

function CreateTopicButton() {
  return (
    <Button type="success-light">
      New Topic{' '}
      <span className="ml-4">
        <BsFolderPlus size={24} />
      </span>
    </Button>
  );
}

export default CreateTopicButton;
