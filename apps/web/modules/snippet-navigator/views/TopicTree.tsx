import { Tree } from '@geist-ui/core';
import { useSnippetNavigatorState } from '../context/SnippetNavigatorContext';
import { fileTreeFromTopicsWithSnippets } from '../utils/tree-file.util';

function TopicTree() {
  const {
    state: { topics },
  } = useSnippetNavigatorState();
  const treeValue = fileTreeFromTopicsWithSnippets(topics);
  return (
    <div id="topic-tree" className="px-4 py-2">
      <Tree value={treeValue} onClick={console.log} />
    </div>
  );
}

export default TopicTree;
