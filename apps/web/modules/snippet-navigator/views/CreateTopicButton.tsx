import { Button, Dot, Input, Loading, Modal, useModal } from '@geist-ui/core';
import { BsFolderPlus } from 'react-icons/bs';
import { useSnippetNavigatorState } from '../context/SnippetNavigatorContext';
import { useState } from 'react';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';
import useCreateProgTopic from '../hooks/useCreateProgTopic';
import { CreateProgTopicDto } from '@snip-man/entities';

function CreateTopicButton() {
  const { mutate: createProgTopic, isLoading } = useCreateProgTopic();
  const { setVisible, bindings: modalBindings } = useModal();
  const {
    state: { selectedTopic },
  } = useSnippetNavigatorState();
  const {
    state: { user },
  } = useSnipManState();

  const [didSubmit, setDidSubmit] = useState(false);
  const [topicName, setTopicName] = useState<string | undefined>(undefined);
  const [topicDescription, setTopicDescription] = useState<string | undefined>(
    undefined
  );
  function onNewTopic() {
    setVisible(true);
  }
  function onModalCancel() {
    setVisible(false);
  }
  function onSaveTopic() {
    setDidSubmit(true);
    if (!topicName || !user) return;
    const dto: CreateProgTopicDto = {
      userId: user.id,
      name: topicName,
      description: topicDescription || '',
      parentId: selectedTopic?.id || null,
      tagIds: [],
    };
    createProgTopic(dto);
  }
  return (
    <>
      <Button onClick={onNewTopic} type="success-light">
        New Topic{' '}
        <span className="ml-4">
          <BsFolderPlus size={24} />
        </span>
      </Button>
      <Modal {...modalBindings} width={1.5} height={25}>
        <Modal.Title>New Topic</Modal.Title>
        <Modal.Subtitle>🚀 Create something new!</Modal.Subtitle>
        <Modal.Content>
          <div className="flex flex-col justify-center items-center space-y-5">
            <p>
              Parent:{' '}
              {selectedTopic ? (
                <span className="font-bold underline">
                  {selectedTopic.name}
                </span>
              ) : (
                'None'
              )}
            </p>
            <Input
              label="name"
              placeholder="NestJS & Swagger"
              width={30}
              onChange={(e) => setTopicName(e.target.value)}
            >
              {didSubmit && !topicName && (
                <Dot type="error" className="text-sm text-gray-500">
                  The name of the topic cannot be empty.
                </Dot>
              )}
            </Input>
            <Input
              label="description"
              placeholder="Integration of OpenAPI standards with NestJS"
              width={30}
              onChange={(e) => setTopicDescription(e.target.value)}
            />
            {isLoading && <Loading>Loading</Loading>}
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={onModalCancel}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={onSaveTopic}>Save Topic</Modal.Action>
      </Modal>
    </>
  );
}

export default CreateTopicButton;
