import {
  Button,
  Dot,
  Input,
  Loading,
  Modal,
  Text,
  Textarea,
  useModal,
  useToasts,
} from '@geist-ui/core';
import {
  CreateProgSnippetDto,
  ProgLanguageEntity,
  ProgSnippetEntity,
} from '@snip-man/entities';
import { useState } from 'react';
import { BsCodeSquare } from 'react-icons/bs';
import ProgLanguageSelector from '../../prog-language-selector/views/ProgLanguageSelector';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';
import { useSnippetNavigatorState } from '../context/SnippetNavigatorContext';
import useCreateProgSnippet from '../hooks/useCreateProgSnippet';

function CreateSnippetButton() {
  const { mutate: createProgSnippet, isLoading } = useCreateProgSnippet();
  const { setVisible, bindings: modalBindings } = useModal();
  const { setToast } = useToasts();
  const {
    state: { selectedTopic },
    dispatch,
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
  const [snippetLang, setSnippetLang] = useState<
    ProgLanguageEntity | undefined
  >(undefined);

  // TODO lang version

  function onNewSnippet() {
    if (!selectedTopic) {
      setToast({
        text: 'Please select a topic first!',
        delay: 3000,
        type: 'warning',
      });
      return;
    }
    setSnippetContent(undefined);
    setSnippetHeadline(undefined);
    setSnippetLang(undefined);
    setVisible(true);
  }

  function onModalCancel() {
    setVisible(false);
  }

  function onSaveSnippet() {
    setDidSubmit(true);
    if (!snippetHeadline || !snippetContent || !snippetLang || !user) return;
    const dto: CreateProgSnippetDto = {
      progTopicId: selectedTopic?.id || null,
      headline: snippetHeadline || '',
      content: snippetContent || '',
      progLanguage: {
        id: snippetLang?.id,
        name: snippetLang?.name,
        version: snippetLang?.version,
      },
    };
    const entity: ProgSnippetEntity = {
      id: '',
      headline: snippetHeadline || '',
      content: snippetContent || '',
      createdAt: new Date(Date.now()),
      lastModified: undefined,
      progLanguage: {
        id: snippetLang?.id,
        name: snippetLang?.name,
        version: snippetLang?.version,
      },
    };

    createProgSnippet(dto);
    setDidSubmit(false);
    setVisible(false);
    dispatch({
      type: 'setSelectedSnippet',
      data: entity,
    });
    // TODO show snippet
  }

  return (
    selectedTopic && (
      <>
        <Button onClick={onNewSnippet} type="success-light">
          New Snippet{' '}
          <span className="ml-4">
            <BsCodeSquare size={24} />
          </span>
        </Button>
        <Modal {...modalBindings} width={1.5} height={36}>
          <Modal.Title>New Snippet</Modal.Title>
          <Modal.Subtitle>🤓 Be efficient!</Modal.Subtitle>
          <Modal.Content>
            <div className="flex flex-col justify-center items-center space-y-5">
              <div>
                Topic:{' '}
                {selectedTopic ? (
                  <span className="font-bold underline">
                    {selectedTopic.name}
                  </span>
                ) : (
                  'None'
                )}
              </div>
              <Input
                label="name"
                placeholder="Factorial"
                width={30}
                onChange={(e) => setSnippetHeadline(e.target.value)}
              ></Input>
              <ProgLanguageSelector
                width={30}
                onChange={(e) => setSnippetLang(e)}
              />
              <Textarea
                placeholder="Type your snippet here"
                width={30}
                height={13}
                onChange={(e) => setSnippetContent(e.target.value)}
              ></Textarea>
              {didSubmit &&
                (!snippetContent || !snippetHeadline || !snippetLang) && (
                  <Dot type="error" className="text-sm text-gray-500">
                    <Text small> No fields can be empty.</Text>
                  </Dot>
                )}
              {isLoading && <Loading>Loading</Loading>}
            </div>
          </Modal.Content>
          <Modal.Action passive onClick={onModalCancel}>
            Cancel
          </Modal.Action>
          <Modal.Action onClick={onSaveSnippet}>Save Snippet</Modal.Action>
        </Modal>
      </>
    )
  );
}

export default CreateSnippetButton;
