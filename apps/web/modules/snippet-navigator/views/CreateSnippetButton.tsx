import { Button, Dot, Input, Loading, Modal, useModal } from '@geist-ui/core';
import { CreateProgSnippetDto } from '@snip-man/entities';
import { useState } from 'react';
import { BsFolderPlus } from 'react-icons/bs';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';
import { useSnippetNavigatorState } from '../context/SnippetNavigatorContext';
import useCreateProgSnippet from '../hooks/useCreateProgSnippet';

function CreateSnippetButton() {
  const { mutate: createProgSnippet, isLoading } = useCreateProgSnippet();
  const { setVisible, bindings: modalBindings } = useModal();
  const {
    state: { selectedTopic },
  } = useSnippetNavigatorState();
  const {
    state: { user },
  } = useSnipManState();

  const [didSubmit, setDidSubmit] = useState(false);
  const [snippetHeadline, setSnippetHeadline] = useState<string | undefined>(
    undefined
  );
  const [snippetContent, setSnippetContent] = useState<string | undefined>(
    undefined
  );

  function onNewSnippet() {
    setVisible(true);
  }

  function onModalCancel() {
    setVisible(false);
  }

  function onSaveSnippet() {
    setDidSubmit(true);
    if (!snippetHeadline || !user) return;
    const dto: CreateProgSnippetDto = {
      // TODO: null? can it happen that no topic is selected?
      progTopicId: selectedTopic?.id || null,
      headline: snippetHeadline || '',
      content: snippetContent || '',
      // TODO: dropdown for language
      progLanguage: { id: 'cl4cxpg1u0045kssoz68kzfp3' },
    };
    createProgSnippet(dto);
    setDidSubmit(false);
    setVisible(false);
  }

  return (
    <>
      <Button onClick={onNewSnippet} type="success-light">
        New Snippet{' '}
        <span className="ml-4">
          <BsFolderPlus size={24} />
        </span>
      </Button>
      <Modal {...modalBindings} width={1.5} height={25}>
        <Modal.Title>New Snippet</Modal.Title>
        <Modal.Subtitle>🚀 Create something new!</Modal.Subtitle>
        <Modal.Content>
          <div className="flex flex-col justify-center items-center space-y-5">
            {/* <p>
               Parent:{' '}
               {selectedTopic ? (
                 <span className="font-bold underline">
                   {selectedTopic.name}
                 </span>
               ) : (
                 'None'
               )}
             </p> */}
            <Input
              label="name"
              placeholder="NestJS & Swagger"
              width={30}
              onChange={(e) => setSnippetHeadline(e.target.value)}
            >
              {didSubmit && !snippetHeadline && (
                <Dot type="error" className="text-sm text-gray-500">
                  The headline of the snippet cannot be empty.
                </Dot>
              )}
            </Input>
            <Input
              label="description"
              placeholder="Integration of OpenAPI standards with NestJS"
              width={30}
              onChange={(e) => setSnippetContent(e.target.value)}
            />
            {isLoading && <Loading>Loading</Loading>}
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={onModalCancel}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={onSaveSnippet}>Save Snippet</Modal.Action>
      </Modal>
    </>
  );
}

export default CreateSnippetButton;
