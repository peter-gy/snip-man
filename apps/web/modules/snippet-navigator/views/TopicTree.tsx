import { Tree } from '@geist-ui/core';
import { useSnippetNavigatorState } from '../context/SnippetNavigatorContext';
import { fileTreeFromTopicsWithSnippets } from '../utils/tree-file.util';
import { useEffect } from 'react';
import { ProgSnippetEntity, ProgTopicEntity } from '@snip-man/entities';

function TopicTree() {
  const {
    state: { topics, selectedTopic, selectedSnippet },
    dispatch,
  } = useSnippetNavigatorState();

  // Handle state mutation on tree item click
  useEffect(() => {
    function handleTopicClicked(topic: ProgTopicEntity) {
      dispatch({ type: 'setSelectedTopic', data: topic });
    }

    function handleSnippetClicked(snippet: ProgSnippetEntity) {
      dispatch({ type: 'setSelectedSnippet', data: snippet });
    }

    const folders = Array.from(document.getElementsByClassName('folder'));
    function onFolderClicked(e: Event) {
      const target = e.target as HTMLElement;
      const nameWasClicked = target.classList.contains('name');
      if (!nameWasClicked) return;
      // The topic as an object is stored to the 'extra' attribute as a JSON string.
      const topicJson = target.getElementsByClassName('extra')[0].textContent;
      // Make sure that this is actually a topic
      if (!topicJson.includes('description')) return;
      const topic = JSON.parse(topicJson) as ProgTopicEntity;
      handleTopicClicked(topic);
    }
    folders.forEach((folder) =>
      folder.addEventListener('click', onFolderClicked)
    );

    const files = Array.from(document.getElementsByClassName('file'));
    function onFileClicked(e: Event) {
      const target = e.target as HTMLElement;
      const nameWasClicked = target.classList.contains('name');
      if (!nameWasClicked) return;
      // The snippet as an object is stored to the 'extra' attribute as a JSON string.
      const snippetJson = target.getElementsByClassName('extra')[0].textContent;
      // Make sure that this is actually a snippet
      if (!snippetJson.includes('content')) return;
      const snippet = JSON.parse(snippetJson) as ProgSnippetEntity;
      handleSnippetClicked(snippet);
    }
    files.forEach((file) => file.addEventListener('click', onFileClicked));
    return () => {
      folders.forEach((folder) =>
        folder.removeEventListener('click', onFolderClicked)
      );
      files.forEach((file) => file.removeEventListener('click', onFileClicked));
    };
  }, [dispatch, topics]);

  // Handle selected topic highlight
  useEffect(() => {
    if (!selectedTopic) return;
    const contentNode = Array.from(
      document.getElementsByClassName('extra')
    ).filter((e) => e.textContent.startsWith(`{"id":"${selectedTopic.id}"`))[0];
    const folderName = contentNode.parentElement;
    folderName.classList.add('font-bold');
    folderName.classList.add('underline');
    return () => {
      folderName.classList.remove('font-bold');
      folderName.classList.remove('underline');
    };
  }, [selectedTopic]);

  useEffect(() => {
    if (!selectedSnippet) return;
    const contentNode = Array.from(
      document.getElementsByClassName('extra')
    ).filter((e) =>
      e.textContent.startsWith(`{"id":"${selectedSnippet.id}"`)
    )[0];
    const fileName = contentNode.parentElement;
    fileName.classList.add('italic');
    fileName.classList.add('font-bold');
    return () => {
      fileName.classList.remove('italic');
      fileName.classList.remove('font-bold');
    };
  }, [selectedSnippet]);

  return (
    <div id="topic-tree">
      <Tree value={fileTreeFromTopicsWithSnippets(topics)} />
    </div>
  );
}

export default TopicTree;
